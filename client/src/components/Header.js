import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { logoutUser, registerUser, loginUser, changeRoom } from '../actions'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      showLoginForm: false,
      showRegisterForm: false,
    }

    _.bindAll(this, 'handleLoginClick', 'handleRegisterClick', 'submitLogin', 'submitRegister', 'cancel', 'handleLogout')
  }

  handleLoginClick() {
    this.setState({ showLoginForm: true })
  }

  handleRegisterClick() {
    this.setState({ showRegisterForm: true })
  }

  submitLogin({ username, password }) {
    this.setState({ showLoginForm: false })
    this.props.loginUser({ username, password })
  }

  submitRegister({ username, password }) {
    this.setState({ showRegisterForm: false })
    this.props.registerUser({ username, password })
  }

  cancel() {
    this.setState({ showLoginForm: false, showRegisterForm: false })
  }

  handleLogout() {
    this.props.logoutUser()
    this.props.changeRoom(null)
  }

  renderLoginLogout() {
    return ([
      <p key="1" className="navbar-item" >You are logged in as: {this.props.username}</p>,
      <a key="2" className="navbar-item" onClick={this.handleLogout}>Logout</a>,
    ])
  }

  renderRegister() {
    return ([
      <a key="1" className="navbar-item is-right" onClick={this.handleLoginClick}>
        Login
      </a>,
      <a key="2" className="navbar-item" onClick={this.handleRegisterClick}>
        Register
      </a>,
    ])
  }

  renderNavRightSection() {
    return this.props.username ? this.renderLoginLogout() : this.renderRegister()
  }

  render() {
    return (
      <nav className="navbar is-primary">
        <div className="navbar-start">
          <div className="navbar-brand">
            <div className="navbar-item">
              <span class="icon has-text-link">
                <i className="fa fa-comments-o fa-2x" aria-hidden="true" />
              </span>
            </div>
            <div className="navbar-item">
              Chat app
            </div>
          </div>
        </div>
        <div className="navbar-end is-right">
          {this.renderNavRightSection()}
        </div>
        <LoginForm
          show={this.state.showLoginForm}
          submit={this.submitLogin}
          cancel={this.cancel}
        />
        <RegisterForm
          show={this.state.showRegisterForm}
          submit={this.submitRegister}
          cancel={this.cancel}
        />
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return state.auth
}

const actions = { logoutUser, registerUser, loginUser, changeRoom }

export default connect(mapStateToProps, actions)(Header)
