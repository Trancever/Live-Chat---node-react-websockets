const mongoose = require('mongoose')
const User = mongoose.model('users')

module.exports = (username, password) => {
  return User.create({ username, password })
}
