const pg = require('pg')
let pool
let config

if (process.env.DATABASE_URL != undefined) {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
} else {
  config = {
    user: 'portfolio',
    database: 'portfolio',
    password: 'abcd',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
  }
}

const getPool = function() {
    if (pool) return pool
    pool = new pg.Pool(config)
    return pool
}

module.exports = {
    getPool
}