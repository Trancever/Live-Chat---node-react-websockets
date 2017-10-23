const mongoose = require('mongoose')
const Room = mongoose.model('rooms')

module.exports = () => {
  return Room
    .find({})
    .populate({
      path: 'messages.user',
    })
}
