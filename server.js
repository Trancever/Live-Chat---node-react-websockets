const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const keys = require('./config/keys')
require('./logger')
require('./models/user')
require('./models/room')
require('./models/message')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [keys.cookieKey],
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/roomRoutes')(app)

const PORT = process.env.PORT || 5000

const server = require('./services/socket')(app)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
