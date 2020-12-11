const constants = require('./constants/constants')

require('dotenv').config()

//*** Modules ***
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

//*** Routes ***
const employeeRoute = require(constants.employeesRoute)

//*** Services ***
const mongoConnection = require(constants.mongoConnect)

mongoConnection.connectToMongoDb(mongoose)

app.use(express.static(constants.frontEnd))
app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(morgan(constants.dev))

app.use((req, res, next) => {
    //Mocked API authorization
    const authToken = req.headers.authorization

    if (authToken !== process.env.authHeaderKey) return res.sendStatus(401)

    next()
})

app.use(constants.employees, employeeRoute)

app.listen(constants.port)

console.log(constants.serverActive)