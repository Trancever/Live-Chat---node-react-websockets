const passport = require('passport')
const bcrypt = require('bcrypt')
const getUserByUsername = require('../queries/getUserByUsername')
const createNewUser = require('../queries/createNewUser')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ response: 'I\'m alive' }).status(200)
  })

  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
  })

  app.get('/auth/logout', (req, res) => {
    req.logout()
    res.send({ loggedOut: true })
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })

  app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body
    const user = await getUserByUsername(username)

    if (user) res.send({ error: 'User with this username already exists' })
    const hashPass = await bcrypt.hash(password, 10)
    const newUser = await createNewUser(username, hashPass)
    res.send(Object.assign({}, newUser, { password: undefined }))
  })
}
