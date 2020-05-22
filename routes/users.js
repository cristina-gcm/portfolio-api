const Router = require('express-promise-router')
const router = new Router()

const users = require('../controllers/users')

//router.get('/:page(photography|graphic-design|paintings|sketches)', comments.getAll)

router.post('/register', users.createUser)
router.post('/login', users.loginUser)

//router.delete('/:page(photography|graphic-design|paintings|sketches)/:id', comments.deleteComment)

module.exports = router