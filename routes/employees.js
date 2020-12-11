const express = require('express')
const app = express()

const employeeController = require('../controllers/employee-controller')

app.delete("/deleteEmployee", (req, res) => {
    const employeeId = req.headers.employeeid

    employeeController.deleteEmployee(employeeId)
        .then(_ => res.sendStatus(200))
        .catch(err => res.sendStatus(400))
})

app.post("/addEmployee", (req, res) => {
    employeeController.addEmployee(req.body)
        .then(_ => res.sendStatus(200))
        .catch(err => res.sendStatus(400))
})

app.get("/getEmployees", (req, res) => {
    employeeController.getEmployees()
        .then(employees => res.send(employees))
        .catch(err => res.sendStatus(400))
})

app.put("/editEmployee", (req, res) => {
    employeeController.modifyEmployee(req.body)
        .then(_ => res.sendStatus(200))
        .catch(err => res.sendStatus(400))
})


module.exports = app