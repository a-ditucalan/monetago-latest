/**  Copyright 2020 MonetaGo, Inc.  All Rights Reserved.
 *  This code is copyrighted material that is confidential andproprietary to MonetaGo, Inc.
 *  and may not (in whole or in part) be published, publicly displayed,copied, modified or
 *  used in any way other than as expressly permitted in a writtenagreement executed by
 *  MonetaGo, Inc.  No portion of this code may be used to createderivative works or exploited
 *  in any other way without MonetaGo, Inc.’s prior written consent.  Noportion of this code
 *  may be transmitted or redistributed to any person without MonetaGo,Inc.’s prior written
 *  consent. This notice may not be deleted or modified without MonetaGo,Inc.’s consent.
 */

import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApi, userOrgId, resetSelected, setActiveTab } from '../redux'

import Account from '../pages/dashboard/Account'
import Organization from '../pages/dashboard/Organization'
import Authentication from '../common/Authentication'
import MainNavbar from '../components/MainNavbar'
import Sidebar from '../components/Sidebar'
// import CorporateEntity from '../components/CorporateEntity'
import MyNetwork from './MyNetwork'
// import CorporateTable from '../common/CorporateTable'
import CorporateInformation from './CorportateInformation'
// import GroupEntities from './GroupEntities'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const activeStep = useSelector(state => state.organization.activeSideTab)
  let ActiveTabComponent = Organization
  const authUser = JSON.parse(Authentication.loadUserProfile())
  const dispatch = useDispatch()
  const history = useHistory()
  const [navigationTab, setnavigationTab] = useState({})
  const [activeComponent, setActiveComponent] = useState('')

  const onClickSidebar = e => {
    const navItem = e.currentTarget.firstChild.getAttribute('id')
    setActiveComponent(navItem)
    dispatch(setActiveTab(navItem))
    dispatch(resetSelected())
  }

  const resetToCorporateInfo = () => {
    setActiveComponent('Corporate Information')
    dispatch(setActiveTab('Corporate Information'))
    dispatch(resetSelected())
  }

  if (activeComponent === 'User Management') {
    ActiveTabComponent = Account
  } else if (activeComponent === 'Corporate Group') {
    ActiveTabComponent = Organization
  } else if (activeComponent === 'Corporate Information') {
    ActiveTabComponent = CorporateInformation
  } else if (activeComponent === 'My Network') {
    ActiveTabComponent = MyNetwork
  } else {
    ActiveTabComponent = Account
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(fetchApi(1))
      dispatch(userOrgId(JSON.parse(Authentication.loadUserProfile()).orgId))
      setnavigationTab(JSON.parse(Authentication.loadUserProfile()))

      if (authUser) {
        if (authUser.roles[0] === 'MGADMIN') {
          setActiveComponent('Corporate Group')
        } else {
          setActiveComponent('Corporate Information')
        }
      }
    } else {
      history.push('/')
    }

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (activeStep === 'My Network') {
      setActiveComponent(activeStep)
    }
  }, [activeStep])

  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <div className="dashboard-wrapper">
            <Sidebar
              activeComponent={activeComponent}
              onClickSidebar={onClickSidebar}
              navigationTab={navigationTab.roles ? navigationTab.roles[0] : ''}
            />
            <div className="main-dashboard">
              <MainNavbar resetActiveTab={resetToCorporateInfo} />
              <Component {...props} activeTab={ActiveTabComponent} />
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

export default ProtectedRoute
