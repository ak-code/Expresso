// Import express, router, and db
const express = require('express')
const timesheetRouter = express.Router({mergeParams: true})
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

// Timesheet param
timesheetRouter.param('timesheetId', (req, res, next, timesheetId) => {
  db.get(`SELECT * FROM Timesheet WHERE id = ${timesheetId}`, (error, timesheet) => {
    if (error) {
      next(error)
    } else if (timesheet) {
      req.timesheet = timesheet
      next()
    } else {
      res.sendStatus(404)
    }
  })
})

// Get all timesheet request
timesheetRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Timesheet WHERE Timesheet.employee_id = $employeeId;',
  {
    $employeeId: req.params.employeeId
  }, (error, timesheets) => {
    if (error) {
      next(error)
    } else {
      res.status(200).json({timesheets: timesheets})
    }
  })
})

// Post timesheet request
timesheetRouter.post('/', (req, res, next) => {
  const hours = req.body.timesheet.hours
  const rate = req.body.timesheet.rate
  const date = req.body.timesheet.date
  const employeeId = req.params.employeeId

  db.get('SELECT * FROM Employee WHERE Employee.id = $employeeId', {$employeeId: employeeId}, (error, employee) => {
    if (error) {
      next(error)
    } else {
      if (!hours || !rate || !date || !employee) {
        return res.sendStatus(400)
      }

      db.run(`INSERT INTO Timesheet
      (hours, rate, date, employee_id)
      VALUES ($hours, $rate, $date, $employeeId)`,
      {
        $hours: hours,
        $rate: rate,
        $date: date,
        $employeeId: employeeId
      }, function(error) {
        if (error) {
          next(error)
        } else {
          db.get(`SELECT * FROM Timesheet WHERE Timesheet.id = ${this.lastID}`, (error, timesheet) => {
            res.status(201).json({timesheet: timesheet})
          })
        }
      })
    }
  })
})

// Update timesheet request
timesheetRouter.put('/:timesheetId', (req, res, next) => {
  const hours = req.body.timesheet.hours
  const rate = req.body.timesheet.rate
  const date = req.body.timesheet.date
  const employeeId = req.params.employeeId

  db.get(`SELECT * FROM Employee WHERE Employee.id = ${employeeId}`, (error, employee) => {
    if (error) {
      next(error)
    } else {
      if (!hours || !rate || !date || !employee) {
        return res.sendStatus(400)
      }

      db.run(`UPDATE Timesheet
        SET hours = $hours, rate = $rate,
        date = $date,
        employee_id = $employeeId WHERE Timesheet.id = $timesheetId`,
      {
        $hours: hours,
        $rate: rate,
        $date: date,
        $employeeId: employeeId,
        $timesheetId: req.params.timesheetId
      }, function(error) {
        if (error) {
          next(error)
        } else {
          db.get(`SELECT * FROM Timesheet WHERE Timesheet.id = ${req.params.timesheetId}`, (error, timesheet) => {
            res.status(200).json({timesheet: timesheet})
          })
        }
      })
    }
  })
})

// Delete timesheet request
timesheetRouter.delete('/:timesheetId', (req, res, next) => {
  db.run(`DELETE FROM Timesheet WHERE id = ${req.params.timesheetId};`, (error) => {
    if (error) {
      next(error)
    } else {
      res.sendStatus(204)
    }
  })
})

module.exports = timesheetRouter
