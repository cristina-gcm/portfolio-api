const fs = require('fs')
const _ = require('lodash')
const db = require('../config/db')
const pool = db.getPool()

const getAll = async function(request, response) {
  const { rows } = await pool.query('SELECT * FROM comments WHERE page = $1', [request.params.page])
  response.json({
    comments: rows
  })
}

const addComment = async function(request, response) {
  let { text } = request.body
  let { page } = request.params
  let { name, id: user_id } = request.user
  let emptyFields = _.filter([user_id, name, text, page], (item) => _.isNil(item) || _.isNull(item) || item == "")
  console.log(emptyFields)
  if (emptyFields.length > 0) {
    response
      .status(422)
      .json({
        error: 'Please fill all the fields!'
      })
    return
  }

  const { rows } = await pool.query('INSERT INTO comments (user_id, name, text, page) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, name, text, page])
  response.json({
    success: "Comment was added!",
    comment: rows[0]
  })
}

const deleteComment = async function(request, response) {
  let { id: user_id } = request.user
  let { rows: existingRows } = await pool.query('SELECT * FROM comments WHERE id = $1', [request.params.id])
  if ( existingRows.length == 0) {
    response
      .status(422)
      .json({
        error: 'This comment does not exists!'
      })
    return
  }
  if (existingRows[0].user_id != user_id ) {
    response
      .status(422)
      .json({
        error: 'You don\'t have permission to delete this comment!'
      })
    return
  }
  let { rows } = await pool.query('DELETE FROM comments WHERE id = $1', [request.params.id])
    response.json({
      success: "Comment was deleted!"
    })
}

module.exports = {
    getAll,
    addComment,
    deleteComment
}