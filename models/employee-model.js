const mongoose = require('mongoose')

var employeeSchema = mongoose.Schema({
    Id: String,
    FirstName: String,
    MiddleInitial: String,
    LastName: String,
    DateOfBirth: Date,
    DateOfEmployment: Date, 
    Status: Boolean 
})

module.exports = mongoose.model('Employee', employeeSchema)