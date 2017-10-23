const winston = require('winston')

winston.add(winston.transports.File, { filename: 'chat.log' })
