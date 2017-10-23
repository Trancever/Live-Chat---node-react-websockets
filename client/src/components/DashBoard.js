import React from 'react'
import { connect } from 'react-redux'

import MainWrapper from './MainWrapper'

const DashBoard = props => {
  function renderLoginTip() {
    return (
      <section className="hero is-light is-large">
        <div className="hero-body">
          <div className="container">
            <p className="center is-size-2">
              You need to be authenticated to use the application
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div>
      {props.username ? <MainWrapper /> : renderLoginTip()}
    </div>
  )
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(mapStateToProps)(DashBoard)
