// Import dependencies and express and router
const cors = require('cors')
const errorhandler = require('errorhandler')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const apiRouter = require('./api/api.js')

// Use dependencies
app.use(cors())
app.use(errorhandler())
app.use(morgan('dev'))
app.use(bodyParser.json())

// Use Router
app.use('/api', apiRouter)

// Listen at PORT
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

module.exports = app
