'use strict'

module.exports = {
  production: {
    client: process.env.DB_CLIENT,
    connection: {
        host : process.env.DB_HOST,
        port: process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    },
    pool: {
      min: 0,
      max: 7,
      afterCreate: (conn, done) => {
        conn.query('SET NAMES ' + process.env.DB_CHARSET, (err) => {
          done(err, conn);
        });
      }
    },
    debug: false,
    acquireConnectionTimeout: 10000
  }
}