import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import socketIOClient from 'socket.io-client'
import SocketIOFileClient from 'socket.io-file-client'
import { connect } from 'react-redux'
import classNames from 'classnames'
import axios from 'axios'

import { addMessage } from '../actions'
import { WEBSOCKET_CONNECT } from '../endpoints'

class ChatWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      socket: null,
      uploader: null,
    }

    _.bindAll(this, 'contentChanged', 'handleMessageSend', 'handleFileUpload', 'openFileInput', 'handleFileDownload')
  }

  componentDidMount() {
    const socket = socketIOClient(WEBSOCKET_CONNECT)
    const uploader = new SocketIOFileClient(socket)
    socket.on('SingleRoom', data => this.props.addMessage(data))
    socket.on('FileSent', data => {
      this.emitMessage(
        'UserInfoAboutFile',
        {
          fileInfo: data.fileInfo, userInfo: this.props.auth, roomName: this.props.rooms[this.props.current].name,
        }
      )
    })
    this.setState({ socket, uploader })
  }

  componentWillUnmount() {
    this.state.socket.disconnect()
    this.setState({ socket: null, uploader: null })
  }

  componentDidUpdate() {
    this.chat.scrollTop = this.chat.scrollHeight
  }

  emitMessage(type, data) {
    this.state.socket.emit(type, data)
  }

  contentChanged(e) {
    this.setState({ content: e.target.value })
  }

  handleMessageSend(room) {
    this.emitMessage('AddMessage', { content: this.state.content, roomName: room.name, user: this.props.auth })
    this.setState({ content: '' })
  }

  renderInfoMessage() {
    return (
      <p className="center has-text-primary is-size-4 margin-top-15">
        Be the first who write
      </p>
    )
  }

  openFileInput() {
    this.fileInput.click()
  }

  handleFileUpload() {
    this.state.uploader.upload(this.fileInput)
  }

  handleFileDownload(fileName) {
    axios.get(`/api/download/${fileName}`)
  }

  renderFile(itemClass, message, isOwn) {
    return (
      <a href={`/api/download/${message.path}`} className="has-text-dark" download>
        <div className={itemClass}>
          <p><i className="fa fa-file-o margin-right-5" aria-hidden="true" />{message.path}</p>
          <p className="is-size-7 has-text-light">
            {isOwn ? 'You' : message.user.username} {moment(message.sent).format('DD-MMM-YYYY')}
          </p>
        </div>
      </a>
    )
  }

  renderMessage(itemClass, message, isOwn) {
    return (
      <div className={itemClass}>
        <p>{message.content}</p>
        <p className="is-size-7 has-text-light">
          {isOwn ? 'You' : message.user.username} {moment(message.sent).format('DD-MMM-YYYY')}
        </p>
      </div>
    )
  }

  renderChatContent(room) {
    const messages = room.messages.map((message, id) => {
      const isOwn = message.user.username === this.props.auth.username
      const isFile = message.type === 'file'
      const itemClass = classNames({
        'notification': true,
        'block-message': true,
        'is-info': isOwn,
        'is-success': !isOwn,
        'level-right': isOwn,
        'level-left': !isOwn,
        'file-item': isFile,
      })
      const liClass = isOwn ? 'level margin-right-5' : 'level margin-left-5'
      return (
        <li key={id} className={liClass}>
          {isOwn ? <div className="level-left" /> : null}
          {isFile ? this.renderFile(itemClass, message, isOwn) : this.renderMessage(itemClass, message, isOwn)}
        </li>
      )
    })
    return (
      <ul className="messages-list">
        {messages}
      </ul>
    )
  }

  render() {
    const currentRoom = this.props.rooms[this.props.current]
    return (
      <div className="panel margin-top-15">
        <p className="panel-heading">
          Chat - {currentRoom.name}
        </p>
        <div className="chat-content" ref={e => { this.chat = e }}>
          {currentRoom.messages.length === 0 ? this.renderInfoMessage() : this.renderChatContent(currentRoom)}
        </div>
        <div className="box">
          <textarea
            className="textarea"
            placeholder="e.g. Hello world"
            onChange={this.contentChanged}
            value={this.state.content}
          >
          </textarea>
          <div className="level">
            <div className="level-left" />
            <div className="level-right">
              <input
                type="file"
                className="inputfile"
                ref={e => { this.fileInput = e }}
                onChange={this.handleFileUpload}
              />
              <a className="button is-primary level-right margin-top-15" onClick={this.openFileInput}>
                <i class="fa fa-upload margin-right-5" aria-hidden="true" />
                Send File
              </a>
              <a
                className="button is-primary level-right margin-top-15 margin-left-5"
                onClick={_.partial(this.handleMessageSend, currentRoom)}
              >
                Send
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { current: state.currentRoomIndex, rooms: state.rooms, auth: state.auth }
}

export default connect(mapStateToProps, { addMessage })(ChatWrapper)
