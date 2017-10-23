const mongoose = require('mongoose')
const Room = mongoose.model('rooms')

module.exports = (roomName) => {
  return Room.findOne({ name: roomName })
}
