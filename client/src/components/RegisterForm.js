import React from 'react'
import _ from 'lodash'

class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      secondPassword: '',
    }
    _.bindAll(this, 'register', 'usernameChanged', 'passwordChanged', 'secondPasswordChanged')
  }

  register() {
    this.props.submit({ username: this.state.username, password: this.state.password })
    this.setState({ username: '', password: '', secondPassword: '' })
  }

  usernameChanged(e) {
    this.setState({ username: e.target.value })
  }

  passwordChanged(e) {
    this.setState({ password: e.target.value })
  }

  secondPasswordChanged(e) {
    this.setState({ secondPassword: e.target.value })
  }

  render() {
    const cssClass = this.props.show ? 'modal is-active' : 'modal'

    return (
      <div className={cssClass}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Register</p>
            <button className="delete" aria-label="close" onClick={this.props.cancel} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Username*</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="John Deer"
                  value={this.state.username}
                  onChange={this.usernameChanged}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password*</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="XyZ12_3"
                  value={this.state.password}
                  onChange={this.passwordChanged}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-key" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password (again)*</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="XyZ12_3"
                  value={this.state.secondPassword}
                  onChange={this.secondPasswordChanged}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-key" />
                </span>
              </div>
              {this.state.password !== this.state.secondPassword ? <p className="help is-danger">Passwords must match</p> : null}
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.register}>Login</button>
            <button className="button" onClick={this.props.cancel}>Cancel</button>
          </footer>
        </div>
      </div>
    )
  }
}

export default RegisterForm
