const path = require('path')
const loginRequired = require('../middlewares/loginRequired')
const getRooms = require('../queries/getRooms')
const createEmptyRoom = require('../queries/createEmptyRoom')
const getRoomByName = require('../queries/getRoomByName')
const keys = require('../config/keys')
const logger = require('../logger')

module.exports = (app) => {
  app.get('/api/rooms', loginRequired, async (req, res) => {
    try {
      const rooms = await getRooms()

      res.send(rooms)
    } catch (err) {
      logger.log('info', 'Error occured in /api/rooms endpoint')
      res.send(err)
    }
  })

  app.post('/api/room', loginRequired, async (req, res) => {
    try {
      const { roomName } = req.body
      const room = await getRoomByName(roomName)

      if (room) {
        res.send({ err: 'Room name must be unique' })
      }

      await createEmptyRoom(roomName)
      const rooms = await getRooms()

      res.send(rooms)
    } catch (err) {
      logger.log('info', 'Error occured in /api/room endpoint')
      res.send(err)
    }
  })

  app.post('/api/room/message', loginRequired, async (req, res) => {
    try {
      const { roomName, content } = req.body
      const room = await getRoomByName(roomName)
      room.messages.push({ content, sent: Date.now(), user: req.user })

      const savedRoom = await room.save()

      res.send(savedRoom)
    } catch (err) {
      logger.log('info', 'Error occured in /api/room/message endpoint')
      res.send(err)
    }
  })

  app.get('/api/download/:file', loginRequired, (req, res) => {
    const file = req.params.file
    const filePath = path.join(__dirname, `../${keys.uploadDir}/`, file)
    res.download(filePath, file)
  })
}
