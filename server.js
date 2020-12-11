const constants = require('./constants/constants')

require(constants.dotEnv).config()

//*** Modules ***
const bodyParser = require(constants.bodyParser)
const express = require(constants.express)
const cors = require(constants.cors)
const morgan = require(constants.morgan)
const mongoose = require(constants.mongoose)

const app = express()

//*** Routes ***
const employeeRoute = require(constants.employeesRoute)

const EmployeeModel = require('./models/employee-model')

//*** Services ***
const mongoConnection = require(constants.mongoConnect)

mongoConnection.connectToMongoDb(mongoose)

app.use(express.static(constants.frontEnd))
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '200mb' }))
app.use(express.json({ limit: '200mb' }))
app.use(require(constants.bodyParser).urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(constants.dev))

app.use(constants.employees, employeeRoute)

app.listen(constants.port)

console.log(constants.serverActive)

// let model = new EmployeeModel({
//     Id: '1',
//     FirstName: "John",
//     MiddleInitial: 'S',
//     LastName: "Smithson",
//     DateOfBirth: new Date(),
//     DateOfEmployment: new Date(),
//     Status: true
// })

// model.save()