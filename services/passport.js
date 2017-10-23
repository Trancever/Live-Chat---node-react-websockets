const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
})

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username })

        const matchResult = await bcrypt.compare(password, user.password)

        if (matchResult) {
          user.password = undefined
          return done(null, user)
        }

        return done(null, false)
      } catch (err) {
        return done(err)
      }
    }
  )
)
