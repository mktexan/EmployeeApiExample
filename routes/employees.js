const constants = require('../constants/constants')
const authKey = process.env.authHeaderKey

const express = require(constants.express)
const app = express()

const employeeController = require('../controllers/employee-controller')

app.delete("/deleteEmployee", (req, res) => {
    const employeeId = req.headers.employeeid
    const authToken = req.headers.authheader
    
    if (authToken !== process.env.authHeaderKey) return res.sendStatus(400)

    employeeController.deleteEmployee(employeeId)
        .then(_ => res.sendStatus(200))
        .catch(err => res.sendStatus(400))
})

app.post("/addEmployee", (req, res) => {
    const employeeId = req.body.employeeId
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const middleInitial = req.body.middleInitial
    const dateOfBirth = req.body.dateOfBirth
    const dateOfEmployment = req.body.dateOfEmployment
    const active = req.body.status
    const authToken = req.headers.authheader
    
    if (authToken !== process.env.authHeaderKey) return res.sendStatus(400)

    employeeController.addEmployee(employeeId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, active)
        .then(_ => res.sendStatus(200))
        .catch(err => res.sendStatus(400))
})

app.get("/getEmployees", (req, res) => {
    const authToken = req.headers.authheader

    if (authToken !== process.env.authHeaderKey) return res.sendStatus(400)

    employeeController.getEmployees()
        .then(employees => res.send(employees))
        .catch(err => res.sendStatus(400))
})

app.put("/editEmployee", (req, res) => {
    const employeeId = req.body.employeeId
    const editedId = req.body.editedId
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const middleInitial = req.body.middleInitial
    const dateOfBirth = req.body.dateOfBirth
    const dateOfEmployment = req.body.dateOfEmployment
    const active = req.body.status
    const authToken = req.headers.authheader
    
    if (authToken !== process.env.authHeaderKey) return res.sendStatus(400)

    employeeController.modifyEmployee(employeeId, editedId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, active)
        .then(_ => res.sendStatus(200))
        .catch(err => res.sendStatus(400))
})


module.exports = app