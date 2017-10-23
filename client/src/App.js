import React from 'react'
import { connect } from 'react-redux'

import { fetchUser } from './actions'
import Header from './components/Header'
import DashBoard from './components/DashBoard'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div className="fullscreen">
        <Header />
        <DashBoard />
      </div>
    )
  }
}

export default connect(null, { fetchUser })(App)
