const _ = require('lodash')
const db = require('../config/db')
const pool = db.getPool()
const { SECRET } = require('../controllers/auth')
const jwt = require('jsonwebtoken')


const createUser = async function(request, response) {
  let { name, email, password, terms, age, account_type } = request.body
  let errors = []

  let emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
  if ( !emailRegex.test(email) ) {
    errors.push('Invalid email')
  }

  let emptyFields = _.filter([name, email, password, terms, age, account_type], (item) => _.isNil(item) || _.isNull(item) || item == "")

  if (emptyFields.length > 0) {
    errors.push('Please fill all fields!')
  }

  if ( errors.length > 0 ) {
    response
      .status(422)
      .json({
        error: errors.join(', ')
      })
    return
  }

  const { rows } = await pool.query('INSERT INTO users (name, email, password, terms, age, account_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, email, password, terms, age, account_type])
  response.json({
    success: "User was created, you'll be redirected to login page!",
    user: rows[0]
  })
}

const loginUser = async function(request, response) {
  let { email, password } = request.body
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
  if (rows.length == 0 ) {
    response
      .status(422)
      .json({
        error: "This user doesn't exist!"
      })
    return
  }
  let user = rows[0]
  if (user.password != password) {
    response
      .status(422)
      .json({
        error: "Incorrect password!"
      })
    return
  }
  const token = jwt.sign({email: user.email, id: user.id, name: user.name}, SECRET)
  response.json({
    success: "User authenticated, you'll be redirected!",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  })
}

module.exports = {
  createUser,
  loginUser
}