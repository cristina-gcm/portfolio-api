const db = require('../config/db')
const pool = db.getPool()

const createCommentsTable = function() {
  console.log("Create Comments Table")
  pool.query(`CREATE TABLE IF NOT EXISTS comments(
    id serial PRIMARY KEY,
    user_id INTEGER,
    name VARCHAR(255),
    text TEXT,
    page VARCHAR(255)
  );
  `)
    .then((res) => {
      console.log("Comments table created")
    })
    .catch((err) => {
      console.log(err)
    })
}

const createUsersTable = function() {
  console.log("Create Users Table")
  pool.query(`CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR (255),
    terms BOOLEAN,
    age INTEGER,
    account_type VARCHAR(255) 
  );
  `)
    .then((res) => {
      console.log("Users table created")
    })
    .catch((err) => {
      console.log(err)
    })
}

const createAllTables = () => {
  createCommentsTable()
  createUsersTable()
  pool.end()
}

createAllTables()