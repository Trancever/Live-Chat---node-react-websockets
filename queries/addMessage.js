const mongoose = require('mongoose')
const Room = mongoose.model('rooms')

module.exports = async ({ content, roomName, user, type, path }) => {
  const room = await Room.findOne({ name: roomName })
  room.messages.push({ content, sent: new Date(), user, type, path })

  return room.save()
}
