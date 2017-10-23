const mongoose = require('mongoose')
const { Schema } = mongoose
const messageSchema = require('./message')

const roomSchema = new Schema({
  name: String,
  messages: [messageSchema],
})

mongoose.model('rooms', roomSchema)
