const databaseService = require('../services/mongo-service')

const deleteEmployee = async (employeeId) => {
    await databaseService.deleteEmployee(employeeId)

    return
}

const addEmployee = async (employeeId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, active) => {
    await databaseService.addEmployee(employeeId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, active)

    return
}

const getEmployees = async () => {
    const employees = await databaseService.getEmployees()

    return employees
}

const modifyEmployee = async (employeeId, editedId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, active) => {
    await databaseService.modifyEmployee(employeeId, editedId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, active)

    return
}

module.exports = { deleteEmployee, addEmployee, getEmployees, modifyEmployee }