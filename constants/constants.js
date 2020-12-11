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

//*** Error Messages ***
const employeeExists = 'Employee already exists!'
const employeeDoesNotExist = 'Employee does not exist!'

const port = process.env.PORT || 8080

const serverActive = `Server Active: ${port}`

module.exports = {
    employees, dev, mongoService,
    port, serverActive, employeeController,
    employeeExists, employeeDoesNotExist, frontEnd, 
    employeesRoute, mongoConnect
}