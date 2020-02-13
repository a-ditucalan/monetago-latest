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
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout, corpActiveStep } from '../redux'
import { Icon, Popup } from 'semantic-ui-react'

import Authentication from '../common/Authentication'
import Notification from './Notification'

const userViewList = [
  {
    name: 'ABC Services Inc',
    type: 'Corporate Group'
  },
  {
    name: 'ABC Holding Corp',
    type: 'Parent'
  },
  {
    name: 'ABC Services Subsidiary Ltd',
    type: 'Subsidiary'
  }
]

const MainNavbar = ({ resetActiveTab }) => {
  const [user, setUser] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const [viewAs, setViewAs] = useState(userViewList[0])
  const [viewAsIsOpen, setViewAsIsOpen] = useState(false)

  const handleViewAsClick = user => {
    setViewAs(user)
    setViewAsIsOpen(false)
    dispatch(corpActiveStep(user.type))
    resetActiveTab()
  }

  useEffect(() => {
    setUser(JSON.parse(Authentication.loadUserProfile()))
  }, [])

  return (
    <div className="main-navbar">
      {user.roles ? (
        user.roles[0] !== 'MGADMIN' ? (
          <Popup
            className="navbar-view-popup"
            open={viewAsIsOpen}
            onClose={() => setViewAsIsOpen(false)}
            on="click"
            pinned
            basic
            position="bottom left"
            trigger={
              <div
                className={`navbar-view-wrapper ${
                  viewAsIsOpen ? 'active' : ''
                }`}
                onClick={() => setViewAsIsOpen(true)}
              >
                <p className="view-as">Viewing As:</p>
                <h1 className="navbar-user-view">
                  {viewAs.name} <Icon name="dropdown" />
                </h1>
              </div>
            }
            content={
              <div className="navbar-user-popup">
                {userViewList.map((user, i) => {
                  return user.name !== viewAs.name ? (
                    <div
                      key={i}
                      className="user-type"
                      onClick={() => handleViewAsClick(user)}
                    >
                      <h1 className="navbar-user-view">{user.name}</h1>
                      <p>{user.type}</p>
                    </div>
                  ) : null
                })}
              </div>
            }
          />
        ) : (
          <div></div>
        )
      ) : null}
      <div className="navbar-section">
        <Popup
          trigger={
            <div className="navbar-user-wrapper">
              {user.firstName ? (
                <div>
                  <div className="navbar-user-avatar">
                    {/* {`
                      ${user.firstName.charAt(0).toUpperCase()}
                      ${user.lastName.charAt(0).toUpperCase()}
                    `} */}
                    <span>{user.firstName.charAt(0).toUpperCase()}</span>
                    <span>{user.lastName.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="navbar-user-name">
                    {`
                  ${user.firstName.charAt(0).toUpperCase() +
                    user.firstName.slice(1)}
                  ${user.lastName.charAt(0).toUpperCase() +
                    user.lastName.slice(1)}
                `}
                  </div>
                  <Icon name="dropdown" />
                </div>
              ) : null}
            </div>
          }
          on="click"
          pinned
          basic
          position="bottom left"
          content={
            <div className="menu-wrapper">
              <div
                className="menu-item"
                onClick={() => dispatch(logout(history))}
              >
                Logout
              </div>
            </div>
          }
        />
        <Notification />
      </div>
    </div>
  )
}

export default MainNavbar
