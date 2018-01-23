const cors = require('cors')
const errorhandler = require('errorhandler')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const apiRouter = require('./api/api.js')

app.use(cors())
app.use(errorhandler())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api', apiRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

module.exports = app
