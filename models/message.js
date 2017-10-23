const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  sent: Date,
  content: String,
  type: String,
  path: String,
})

module.exports = messageSchema
