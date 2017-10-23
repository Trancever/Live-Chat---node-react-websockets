const mongoose = require('mongoose')
const User = mongoose.model('users')

module.exports = (username) => {
  return User.findOne({ username })
}
