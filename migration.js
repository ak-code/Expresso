// Import sqlite3 and db
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

// Create Employee Table
db.run('DROP TABLE IF EXISTS Employee', error => {
  if (error) {
    console.log(error)
    return;
  }
  db.run(`CREATE TABLE Employee (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  wage INTEGER NOT NULL,
  is_current_employee INTEGER NOT NULL DEFAULT 1);`,
  error => {
    if (error) {
      console.log(error)
      return;
    }
  })
})

// Create Timesheet Table
db.run('DROP TABLE IF EXISTS Timesheet', error => {
  if (error) {
    console.log(error)
    return;
  }
  db.run(`CREATE TABLE Timesheet (
  id INTEGER PRIMARY KEY NOT NULL,
  hours INTEGER NOT NULL,
  rate INTEGER NOT NULL,
  date INTEGER NOT NULL,
  employee_id INTEGER NOT NULL,
  FOREIGN KEY(employee_id) REFERENCES Employee(id));`,
  error => {
    if (error) {
      console.log(error)
      return;
    }
  })
})

// Create Menu Table
db.run('DROP TABLE IF EXISTS Menu', error => {
  if (error) {
    console.log(error)
    return;
  }
  db.run(`CREATE TABLE Menu (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT NOT NULL);`,
  error => {
    if (error) {
      console.log(error)
      return;
    }
  })
})

// Create MenuItem Table
db.run('DROP TABLE IF EXISTS MenuItem', error => {
  if (error) {
    console.log(error)
    return;
  }
  db.run(`CREATE TABLE MenuItem (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  inventory INTEGER NOT NULL,
  price INTEGER NOT NULL,
  menu_id INTEGER NOT NULL,
  FOREIGN KEY(menu_id) REFERENCES Menu(id));`,
  error => {
    if (error) {
      console.log(error)
      return;
    }
  })
})
