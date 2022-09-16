'use strict'

import 'dotenv/config';
import date from 'date-and-time';
import path from 'path';
import { createLogger, format, transports } from 'winston';

let datelog = date.format(new Date(), "YYYY-MM-DD");

/**
 * logs auth
*/
let filename_logger_auth = path.join(process.env.path_logs, 'logs-auth-'+datelog+'.log');
const authLogger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
      format.label({ label: path.basename(process.env.path_logs+filename_logger_auth) }),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    ),
    transports: [
      new transports.File({
        filename: filename_logger_auth,
        format: format.combine(
          format.printf(
            info =>
              `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
          )
        )
      })
    ]
});


/**
 * logs event
*/
let filename_logger_event = path.join(process.env.path_logs, 'logs-event-'+datelog+'.log');
const eventLogger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
      format.label({ label: path.basename(process.env.path_logs+filename_logger_event) }),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    ),
    transports: [
      new transports.File({
        filename: filename_logger_event,
        format: format.combine(
          format.printf(
            info =>
              `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
          )
        )
      })
    ]
});


module.exports = {
  authLogger,
  eventLogger
};