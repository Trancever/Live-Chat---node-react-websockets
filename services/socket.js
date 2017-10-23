const http = require('http')
const socketIo = require('socket.io')
const SocketIOFile = require('socket.io-file')
const keys = require('../config/keys')
const logger = require('winston')

const addMessage = require('../queries/addMessage')

const handleAddMessage = async (data, io) => {
  await addMessage(Object.assign({}, data, { path: '', type: 'message' }))
  io.sockets.emit('SingleRoom', Object.assign({}, data, { sent: new Date(), path: '', type: 'message' }))
}

const handleAddFile = async (data, io) => {
  const file = Object.assign({}, { user: data.userInfo, content: '', path: data.fileInfo.name, type: 'file', roomName: data.roomName })
  await addMessage(file)
  io.sockets.emit('SingleRoom', Object.assign({}, file))
}

module.exports = (app) => {
  const server = http.createServer(app)
  const io = socketIo(server)

  io.on('connection', socket => {
    logger.log('info', 'New client connected')
    socket.on('AddMessage', data => handleAddMessage(data, io))
    socket.on('disconnect', () => logger.log('info', 'Client disconnected'))
    socket.on('UserInfoAboutFile', data => handleAddFile(data, io))

    const uploader = new SocketIOFile(socket, {
      uploadDir: keys.uploadDir,
      maxFileSize: 4194304,
      chunkSize: 10240,
      transmissionDelay: 0,
      overwrite: true,
    })

    uploader.on('start', (fileInfo) => {
      logger.log('info', 'Start uploading')
      logger.log('info', `Filename: ${fileInfo.name}`)
    })
    uploader.on('stream', (fileInfo) => {
      logger.log('info', `Filename: ${fileInfo.name}, ${fileInfo.wrote} / ${fileInfo.size} byte(s)`)
    })
    uploader.on('complete', (fileInfo) => {
      logger.log('info', 'Upload Complete.')
      uploader.socket.emit('FileSent', { fileInfo })
    })
    uploader.on('error', (err) => {
      logger.log('error', err)
    })
    uploader.on('abort', (fileInfo) => {
      logger.log('error: ', `Uploading ${fileInfo.name} aborted`)
    })
  })

  return server
}
