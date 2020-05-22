const Router = require('express-promise-router')
const router = new Router()
const auth = require('../controllers/auth')

const comments = require('../controllers/comments')

router.get('/:page(photography|graphic-design|paintings|sketches)', comments.getAll)

router.post('/:page(photography|graphic-design|paintings|sketches)', auth.checkToken, comments.addComment)

router.delete('/:id', auth.checkToken, comments.deleteComment)

module.exports = router