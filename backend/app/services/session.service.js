const session = require('express-session')
const expressStore = require('express-mysql-session')(session)
const pool = require('./db.service')

const options = {
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    connectionLimit: 5,
    endConnectionOnClose: true,
    charset: "utf8_unicode_ci",
    schema: {
        tableName: "enc_sessions",
        columnNames: {
            session_id: "sessionID",
            expires: "sessExp",
            data: "sessData",
        },
    },
}

const store = new expressStore(options, pool)

module.exports = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { sameSite: "lax" }
})