import React from 'react'
import _ from 'lodash'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
    _.bindAll(this, 'login', 'usernameChanged', 'passwordChanged')
  }

  login() {
    this.props.submit({ username: this.state.username, password: this.state.password })
    this.setState({ username: '', password: '' })
  }

  usernameChanged(e) {
    this.setState({ username: e.target.value })
  }

  passwordChanged(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    const cssClass = this.props.show ? 'modal is-active' : 'modal'

    return (
      <div className={cssClass}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Login</p>
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
                  <i className="fa fa-user" />
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
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.login}>Login</button>
            <button className="button" onClick={this.props.cancel}>Cancel</button>
          </footer>
        </div>
      </div>
    )
  }
}

export default LoginForm
