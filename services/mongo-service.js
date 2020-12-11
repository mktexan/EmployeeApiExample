const EmployeeModel = require('../models/employee-model')

const constants = require('../constants/constants')

const deleteEmployee = async (employeeId) => {
    return new Promise((resolve, reject) => {
        EmployeeModel.deleteOne({ 'Id': employeeId }, async (err, deleted) => {
            if (err) return reject(err)

            return resolve()
        })
    })
}

const getEmployees = async () => {
    return new Promise((resolve, reject) => {
        EmployeeModel.find({ Status: true }, async (err, employees) => {
            if (err) return reject(err)

            return resolve(employees)
        })
    })
}

const modifyEmployee = async (employeeId, editedId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, status) => {
    return new Promise((resolve, reject) => {
        EmployeeModel.findOne({ 'Id': editedId }, async (err, employee) => {
            if (err) return reject(err)
            if (!employee) return reject(constants.employeeDoesNotExist)

            if (employeeId !== editedId) {
                await internalDeleteEmployee(employeeId, editedId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, status)
                return resolve()
            }

            employee.Id = employeeId
            employee.FirstName = firstName
            employee.MiddleInitial = middleInitial
            employee.LastName = lastName
            employee.DateOfBirth = dateOfBirth
            employee.DateOfEmployment = dateOfEmployment
            employee.Status = status

            employee.save()

            return resolve()
        })
    })
}

const addEmployee = async (employeeId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, active) => {
    return new Promise(async (resolve, reject) => {
        const exists = await checkEmployeeExists(employeeId)

        if (exists) return reject()

        EmployeeModel.findOne({ 'Id': employeeId }, async (err, employee) => {
            if (err) return reject(err)
            if (employee) return reject(constants.employeeExists)

            let model = new EmployeeModel({
                Id: employeeId,
                FirstName: firstName,
                MiddleInitial: middleInitial,
                LastName: lastName,
                DateOfBirth: dateOfBirth,
                DateOfEmployment: dateOfEmployment,
                Status: active
            })

            model.save()

            return resolve()
        })
    })
}

const internalDeleteEmployee = (employeeId, editedId, firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment, status) => {
    return new Promise((resolve, reject) => {
        EmployeeModel.deleteOne({ 'Id': editedId }, async (err, deleted) => {
            if (err) return reject(err)

            let model = new EmployeeModel({
                Id: employeeId,
                FirstName: firstName,
                MiddleInitial: middleInitial,
                LastName: lastName,
                DateOfBirth: dateOfBirth,
                DateOfEmployment: dateOfEmployment,
                Status: status
            })

            model.save()

            return resolve()
        })
    })
}

const checkEmployeeExists = (employeeId) => {
    return new Promise((resolve, reject) => {
        EmployeeModel.findOne({ 'Id': employeeId }, async (err, employee) => {
            if (err) return resolve(false)

            if (employee === null) return resolve(false)

            return resolve(true)
        })
    })
}

module.exports = { deleteEmployee, addEmployee, getEmployees, modifyEmployee }