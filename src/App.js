/**  Copyright 2020 MonetaGo, Inc.  All Rights Reserved.
 *  This code is copyrighted material that is confidential andproprietary to MonetaGo, Inc.
 *  and may not (in whole or in part) be published, publicly displayed,copied, modified or
 *  used in any way other than as expressly permitted in a writtenagreement executed by
 *  MonetaGo, Inc.  No portion of this code may be used to createderivative works or exploited
 *  in any other way without MonetaGo, Inc.’s prior written consent.  Noportion of this code
 *  may be transmitted or redistributed to any person without MonetaGo,Inc.’s prior written
 *  consent. This notice may not be deleted or modified without MonetaGo,Inc.’s consent.
 */

import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter, Route, Switch } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'
import { refreshToken } from './redux'

import { Portal, Segment, Header, Button, Dimmer } from 'semantic-ui-react'

import NoRouteMatch from './pages/404'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/login'
import Authentication from './common/Authentication'
import Dashboard from './pages/dashboard'
import ResetPassword from './pages/login/ResetPassword'

import 'semantic-ui-css/semantic.min.css'
import './stylesheets/main.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
    this.idleLogout = this._idleLogout.bind(this)

    let expireDate = new Date(
      JSON.parse(localStorage.getItem('tokenExpiration'))
    )

    this.state = {
      today: new Date(),
      openIdleModal: false,
      isAuth: false,
      idleTime: JSON.parse(localStorage.getItem('tokenExpiration'))
        ? expireDate - new Date()
        : 86400000 * 2
    }
  }

  _onAction(e) {
    // console.log('USER DID SOMETHING: ', e)
    // console.log(this.idleTimer.getRemainingTime())

    this.setState({
      idleTime: JSON.parse(localStorage.getItem('tokenExpiration'))
        ? new Date(JSON.parse(localStorage.getItem('tokenExpiration'))) -
          this.state.today
        : 86400000 * 2
    })

    if (Authentication.load() && this.idleTimer) {
      if (
        localStorage.getItem('tokenExpiration') &&
        this.idleTimer.getRemainingTime() < 30000
      ) {
        refreshToken()
      }
      this.setState({
        ...this.state,
        isAuth: true
      })
    } else {
      this.setState({
        ...this.state,
        isAuth: false
      })
    }
  }

  _onActive(e) {
    // console.log('USER IS ACTIVE: ', e)
    return Authentication.load()
      ? this.setState({
          ...this.state,
          isAuth: true
        })
      : this.setState({
          ...this.state,
          isAuth: false
        })
  }

  _onIdle(e) {
    // console.log('USER IS IDLE: ', e)
    this.setState({
      openIdleModal: true,
      isAuth: false
    })

    localStorage.clear()
  }

  _idleLogout() {
    localStorage.clear()
    this.setState({
      openIdleModal: false,
      isAuth: false,
      idleTime: 86400000 * 2
    })
  }

  render() {
    return (
      <HashRouter basename="/">
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref
          }}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.idleTime}
        />

        <div className="App">
          <Switch>
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Login} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route component={NoRouteMatch} />
          </Switch>
        </div>

        <Dimmer.Dimmable dimmed={true}>
          <Portal
            closeOnEscape={false}
            closeOnDocumentClick={false}
            onClose={this.idleLogout}
            open={this.state.openIdleModal}
          >
            <Dimmer verticalAlign="top" active={true}>
              <Segment
                style={{
                  right: '40%',
                  position: 'fixed',
                  top: '30%',
                  zIndex: 1000
                }}
              >
                <div className="idle-modal-content">
                  <img
                    src={require('./assets/svg/login-logo.svg')}
                    className="monetago-logo"
                    alt="Logo"
                  />
                  <Header>Session Expired!</Header>
                  <p className="sub">You've been idle.</p>
                </div>
                <div className="btn-container">
                  <Button
                    className="btn-blue"
                    content="LOGIN AGAIN"
                    onClick={this.idleLogout}
                  />
                </div>
              </Segment>
            </Dimmer>
          </Portal>
        </Dimmer.Dimmable>
      </HashRouter>
    )
  }
}

export default hot(module)(App)
