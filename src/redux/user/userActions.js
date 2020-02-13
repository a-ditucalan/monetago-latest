/**  Copyright 2020 MonetaGo, Inc.  All Rights Reserved.
 *  This code is copyrighted material that is confidential andproprietary to MonetaGo, Inc.
 *  and may not (in whole or in part) be published, publicly displayed,copied, modified or
 *  used in any way other than as expressly permitted in a writtenagreement executed by
 *  MonetaGo, Inc.  No portion of this code may be used to createderivative works or exploited
 *  in any other way without MonetaGo, Inc.’s prior written consent.  Noportion of this code
 *  may be transmitted or redistributed to any person without MonetaGo,Inc.’s prior written
 *  consent. This notice may not be deleted or modified without MonetaGo,Inc.’s consent.
 */

import { userConstants } from './userTypes'
import axioz from '../../common/ApiUtils'
import Authentication from '../../common/Authentication'

const callGetProfileApi = route => {
  // GET - Get User Profile
  axioz('get', '/auth/me', {
    headers: {
      Authorization: `Bearer ${Authentication.load()}`
    }
  })
    .then(response => {

      Authentication.saveUserProfile(JSON.stringify(response.data))
      route.push('/dashboard')
    })
    .catch(err => {
      console.log(err)
    })
}

export const login = (email, password, route) => {
  return dispatch => {
    localStorage.clear()

    // POST - Login and Create Session
    axioz('post', '/auth/signin', {
      email: email,
      password: password
    })
      .then(response => {

        Authentication.saveAccessToken(response.data.token)
        Authentication.saveTokenExpiration(response.data.expires)
        callGetProfileApi(route)
        dispatch(success())
      })
      .catch(err => {
        console.log(err)

        const notif = {
          open: true,
          status: 'notif-failure',
          icon: 'warning circle',
          msg: err.data.message
        }

        dispatch(setNotif(notif))

        setTimeout(() => {
          const notif = {
            open: false,
            status: 'notif-failure',
            icon: 'warning circle',
            msg: err.data.message
          }

          dispatch(setNotif(notif))
        }, 3500)
      })
  }
}

export const logout = route => {
  localStorage.clear()
  route.push('/')
  return { type: userConstants.USER_LOGOUT }
}

export const refreshToken = () => {
  // GET - Refresh User Token
  axioz('get', '/auth/refresh')
    .then(response => {

      Authentication.saveAccessToken(response.data.token)
      Authentication.saveTokenExpiration(response.data.expires)
    })
    .catch(err => {
      console.log(err)
    })

  return { type: userConstants.REFRESH_TOKEN }
}

export const createUsers = data => {
  //Create user for organization and admin
  return dispatch => {
    axioz('post', '/useraccounts', data)
      .then(response => {

        dispatch(requestCreate(true))

        const notif = {
          open: true,
          status: 'notif-success',
          icon: 'check circle',
          msg: 'Account Created Successfully!'
        }

        dispatch(setNotif(notif))

        setTimeout(() => {
          const notif = {
            open: false,
            status: 'notif-success',
            icon: 'check circle',
            msg: 'Account Created Successfully!'
          }

          dispatch(setNotif(notif))
        }, 3500)
      })
      .catch(err => {
        console.log(err)
      })

    setTimeout(() => {
      dispatch(requestCreate(false))
    }, 5000)
  }
}

export const updateUserRole = (userID, role) => {
  // Update users
  return dispatch => {
    axioz('patch', `/useraccounts/${userID}`, {
      roles: role
    })
      .then(response => {


        const notif = {
          open: true,
          status: 'notif-success',
          icon: 'check circle',
          msg: 'Account Role Updated Successfully!'
        }

        dispatch(setNotif(notif))

        setTimeout(() => {
          const notif = {
            open: false,
            status: 'notif-success',
            icon: 'check circle',
            msg: 'Account Role Updated Successfully!'
          }

          dispatch(setNotif(notif))
        }, 3500)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const setUserStatus = (userId, action) => {
  if (action === 'activate') {
    // GET - Disable a User Account
    return dispatch => {
      axioz('patch', `/useraccounts/${userId}`, {
        active: true
      })
        .then(response => {


          const notif = {
            open: true,
            status: 'notif-success',
            icon: 'check circle',
            msg: 'Account Activated Successfully!'
          }

          dispatch(setNotif(notif))

          setTimeout(() => {
            const notif = {
              open: false,
              status: 'notif-success',
              icon: 'check circle',
              msg: 'Account Activated Successfully!'
            }

            dispatch(setNotif(notif))
          }, 3500)
        })
        .catch(err => {
          console.log(err)
        })
    }
  } else {
    // PATCH - Disable a User Account
    return dispatch => {
      axioz('patch', `/useraccounts/${userId}/deactivate`)
        .then(response => {


          const notif = {
            open: true,
            status: 'notif-success',
            icon: 'check circle',
            msg: 'Account Deactivated Successfully!'
          }

          dispatch(setNotif(notif))

          setTimeout(() => {
            const notif = {
              open: false,
              status: 'notif-success',
              icon: 'check circle',
              msg: 'Account Deactivated Successfully!'
            }

            dispatch(setNotif(notif))
          }, 3500)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

export const updateUserAccount = data => {
  return dispatch => {
    // PATCH = Update a User Account
    axioz('patch', `/useraccounts/${data.id}`, data)
      .then(response => {

        const notif = {
          open: true,
          status: 'notif-success',
          icon: 'check circle',
          msg: 'Account Updated Successfully!'
        }

        dispatch(setNotif(notif))

        setTimeout(() => {
          const notif = {
            open: false,
            status: 'notif-success',
            icon: 'check circle',
            msg: 'Account Updated Successfully!'
          }

          dispatch(setNotif(notif))
        }, 3500)
      })
      .catch(err => {
        console.log(err)
      })

    dispatch(updateUser(data))
  }
}

export const fetchUserAccount = (id, organizations) => {
  return dispatch => {
    let userData = {}

    // GET - Specific User Accounts
    axioz('get', `/useraccounts/${id}`)
      .then(response => {
        userData = response.data
        userData.organization = organizations.filter(org => {
          return org.orgId === response.data.orgId
        })
        dispatch(fetchUser(userData))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const refreshAccountPassword = email => {
  return dispatch => {
    let accountData

    axioz('get', '/useraccounts')
      .then(response => {
        accountData = response.data
        accountData = accountData._embedded.useraccounts.filter(account => {
          return account.email === email
        })

        axioz('patch', `/useraccounts/${accountData[0].id}/refreshpassword`)
          .then(response => {

            const notif = {
              open: true,
              status: 'notif-success',
              icon: 'check circle',
              msg: 'Please check your inbox for the password reset link'
            }

            dispatch(setNotif(notif))

            setTimeout(() => {
              const notif = {
                open: false,
                status: 'notif-success',
                icon: 'check circle',
                msg: 'Please check your inbox for the password reset link'
              }

              dispatch(setNotif(notif))
            }, 3500)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const requestCreate = created => {
  return { type: userConstants.CREATE_REQUEST, created: created }
}

export const success = () => {
  return { type: userConstants.USER_LOGIN_SUCCESS }
}

const fetchUser = userData => {
  return {
    type: userConstants.FETCH_USER_ACCOUNT,
    data: userData
  }
}

const updateUser = data => {
  return {
    type: userConstants.UPDATE_USER_ACCOUNT,
    data: data
  }
}

export const editAccount = editAccountData => {
  return {
    type: userConstants.EDIT_ACCOUNT,
    editAccountData: editAccountData
  }
}

export const setNotif = notif => {
  return {
    type: userConstants.NOTIF_CONTENT,
    notif: notif
  }
}
