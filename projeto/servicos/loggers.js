const winston = require('winston');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({
            level: info,
            filename: 'logs/info.log',
            maxsize: 100000,
            maxFiles: 10
        }),
        new winston.transports.File({ 
            level: 'error',
            filename: 'logs/error.log', 
            maxsize: 100000,
            maxFiles: 10
        }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})


