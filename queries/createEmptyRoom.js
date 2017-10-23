const mongoose = require('mongoose')
const Room = mongoose.model('rooms')

module.exports = (roomName) => {
  return Room.create({ name: roomName, messages: [] })
}
