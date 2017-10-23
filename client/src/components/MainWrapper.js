import React from 'react'
import { connect } from 'react-redux'

import Sidebar from './Sidebar'
import ChatWrapper from './ChatWrapper'

const MainWrapper = (props) => {
  return (
    <section className="main-content columns is-fullheight">
      <Sidebar />
      <div className="column is-3" />
      <div className="column is-4 margin-top-15">
        {
          props.current !== null
            ? <ChatWrapper />
            : <p className="center is-size-4 has-text-dark">Select room or create new one</p>
        }
      </div>
    </section >
  )
}

const mapStateToProps = state => {
  return { current: state.currentRoomIndex }
}

export default connect(mapStateToProps)(MainWrapper)
