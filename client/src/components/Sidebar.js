import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchRooms, createRoom, changeRoom } from '../actions'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      roomName: '',
      isError: false,
    }
    _.bindAll(this, 'handleNewRoomClick', 'roomNameChanged', 'handleRoomChange')
  }

  componentDidMount() {
    this.props.fetchRooms()
  }

  handleNewRoomClick() {
    const { roomName } = this.state
    const room = this.props.rooms.find(room => room.name === roomName)
    if (room) {
      this.setState({ isError: true })
      return
    }
    this.props.createRoom({ roomName })
    this.setState({ roomName: '', isError: false })
  }

  roomNameChanged(e) {
    this.setState({ roomName: e.target.value })
  }

  handleRoomChange(roomName) {
    const index = this.props.rooms.findIndex(room => room.name === roomName)
    this.props.changeRoom(index)
  }

  render() {
    const inputClass = this.state.isError ? 'input is-danger' : 'input'

    return (
      <aside className="column is-2 is-fullheight section sidebar">
        <div className="field has-addons">
          <div className="control">
            <input
              className={inputClass}
              type="text"
              placeholder="Create new room"
              value={this.state.roomName}
              onChange={this.roomNameChanged}
            />
          </div>
          <div className="control">
            <a className="button is-primary" onClick={this.handleNewRoomClick}>
              Create
            </a>
          </div>
        </div>
        <p className="menu-label is-size-6">
          <span>
            <i className="fa fa-comments-o fa-2x" aria-hidden="true" />
          </span>
          Available rooms
        </p>
        <ul className="menu-list">
          {this.props.rooms.map((room, id) => {
            return (
              <li key={id} onClick={_.partial(this.handleRoomChange, room.name)}>
                <a>
                  {room.name}
                </a>
              </li>
            )
          })}
        </ul>
      </aside>
    )
  }
}

const mapStateToProps = state => {
  return { rooms: state.rooms }
}

export default connect(mapStateToProps, { fetchRooms, createRoom, changeRoom })(Sidebar)
