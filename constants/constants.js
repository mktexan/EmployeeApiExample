const employees = '/employees'
const dev = 'dev'

// *** Routes ***
const employeesRoute = './routes/employees'
const frontEnd = './front-end'

//*** Controllers ***
const employeeController = '../controllers/employee-controller'

// *** Servicves ***
const mongoService = './services/mongo-service'
const mongoConnect = './services/mongo-connect'

// *** NPM Packages ***
const express = 'express'
const dotEnv = 'dotenv'
const cors = 'cors'
const bodyParser = 'body-parser'
const morgan = 'morgan'
const mongoose = 'mongoose'

//*** Error Messages ***
const employeeExists = 'Employee already exists!'
const employeeDoesNotExist = 'Employee does not exist!'

const port = process.env.PORT || 8080

const serverActive = `Server Active: ${port}`

module.exports = {
    employees, dev, mongoService, express,
    dotEnv, cors, bodyParser, port, serverActive, employeeController,
    employeeExists, employeeDoesNotExist, morgan, mongoose, frontEnd, 
    employeesRoute, mongoConnect
}