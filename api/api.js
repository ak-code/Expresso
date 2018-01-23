// Import express and routers
const express = require('express')
const apiRouter = express.Router()
const employeeRouter = require('./employees.js')
const menuRouter = require('./menus.js')

// Use Routers
apiRouter.use('/employees', employeeRouter)
apiRouter.use('/menus', menuRouter)

module.exports = apiRouter
