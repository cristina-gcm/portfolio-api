const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const commentsRouter = require('./routes/comments')
const usersRouter = require('./routes/users')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/comments', commentsRouter)
app.use('/users', usersRouter)


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))