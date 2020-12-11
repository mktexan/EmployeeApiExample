const databaseService = require('../services/mongo-service')

const deleteEmployee = async (employeeId) => {
    await databaseService.deleteEmployee(employeeId)

    return
}

const addEmployee = async ({ employeeId, firstName, lastName, middleInitial, dateOfBirth, dateOfEmployment, status }) => {
    await databaseService.addEmployee(employeeId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, status)

    return
}

const getEmployees = async () => {
    const employees = await databaseService.getEmployees()

    return employees
}

const modifyEmployee = async ({ employeeId, editedId, firstName, lastName, middleInitial, dateOfBirth, dateOfEmployment, status }) => {
    await databaseService.modifyEmployee(employeeId, editedId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, status)

    return
}

module.exports = { deleteEmployee, addEmployee, getEmployees, modifyEmployee }