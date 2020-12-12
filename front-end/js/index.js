localStorage.setItem('authHeader', '213hd8unds81802hd')

const deleteEmployee = (employeeId) => {
    return fetch('/employees/deleteEmployee', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'employeeId': employeeId,
            'Authorization': localStorage.getItem('authHeader')
        },
    })
}

const editEmployee = (ID, firstName, middleInitial, lastName, DOB, DOE, status, editedId) => {
    return fetch('/employees/editEmployee', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authHeader')
        },
        body: JSON.stringify({ editedId: editedId, employeeId: ID, firstName: firstName, middleInitial: middleInitial, lastName: lastName, dateOfBirth: DOB, dateOfEmployment: DOE, status: status })  //if you do not want to send any addional data,  replace the complete JSON.stringify(YOUR_ADDITIONAL_DATA) with null
    })
}

const getEmployees = () => {
    return fetch('/employees/getEmployees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authHeader')
        }
    })
}

const addEmployee = (ID, firstName, middleInitial, lastName, DOB, DOE, status) => {
    return fetch('/employees/addEmployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authHeader')
        },
        body: JSON.stringify({ employeeId: ID, firstName: firstName, middleInitial: middleInitial, lastName: lastName, dateOfBirth: DOB, dateOfEmployment: DOE, status: status })  //if you do not want to send any addional data,  replace the complete JSON.stringify(YOUR_ADDITIONAL_DATA) with null
    })
}

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        dialog: false,
        menu: false,
        creatingNewUser: false,
        editingUser: false,
        menu2: false,
        date: null,
        date2: null,
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
        headers: [
            {
                text: 'Id',
                align: 'left',
                sortable: false,
                value: 'Id',
            },
            { text: 'First Name', value: 'FirstName' },
            { text: 'Middle Initial', value: 'MiddleInitial' },
            { text: 'Last Name', value: 'LastName' },
            { text: 'DOB', value: 'DateOfBirth' },
            { text: 'Date Of Employment', value: 'DateOfEmployment' },
            { text: 'Active', value: 'Status' },
            { text: 'Actions', value: 'action', sortable: true },
        ],
        employees: [],
        active: [true, false],
        editedIndex: -1,
        editedItem: {
            Id: null,
            FirstName: null,
            MiddleInitial: null,
            LastName: null,
            DateOfBirth: null,
            DateOfEmployment: null,
            Status: null,
            EditedId: null
        },
        defaultItem: {
            Id: null,
            FirstName: null,
            MiddleInitial: null,
            LastName: null,
            DateOfBirth: null,
            DateOfEmployment: null,
            Status: false,
            EditedId: ''
        },
        newItem: {
            Id: null,
            FirstName: null,
            MiddleInitial: null,
            LastName: null,
            DateOfBirth: null,
            DateEmployed: null,
            Status: false,
            EditedId: null
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Add Employee' : 'Edit Employee'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            getEmployees()
                .then(response => {
                    const status = response.status

                    if (status === 401) return Swal.fire('Auth Failure!', 'You are not authorized.', 'error')

                    return response.json()
                })
                .then(data => {

                    for (let i = 0; i < data.length; i++) {
                        const element = data[i]

                        element.DateOfEmployment = moment(element.DateOfEmployment).format("MMM Do YYYY")
                        element.DateOfBirth = moment(element.DateOfBirth).format("MMM Do YYYY")
                    }

                    this.employees = data
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire('Failure!', 'There was a problem removing the employee.', 'error')
                })
        },

        editItem(item) {
            this.editingUser = true
            this.creatingNewUser = false
            localStorage.setItem('editedId', item.Id)
            this.editedIndex = this.employees.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        createNewEmploymentDate(date) {
            this.dateEmployment = date
        },

        createNewDateOfBirth(date) {
            this.dateBirth = date
        },

        createNewEmployee() {
            if (this.editingUser === true) return Swal.fire('Failure!', 'You are edting an employee, not saving.', 'error')

            const id = this.editedItem.Id
            const first = this.editedItem.FirstName
            const middle = this.editedItem.MiddleInitial
            const last = this.editedItem.LastName
            const dob = this.date
            const doe = this.date2

            const fieldsActive = id !== null && first !== null && middle !== null && last !== null && dob !== null && doe !== null

            if (!fieldsActive) return Swal.fire('Failure!', 'Please fill in all available fields.', 'error')

            this.newItem.Id = this.editedItem.Id
            this.newItem.FirstName = this.editedItem.FirstName
            this.newItem.MiddleInitial = this.editedItem.MiddleInitial
            this.newItem.LastName = this.editedItem.LastName
            this.newItem.Status = this.editedItem.Status
            this.newItem.DateOfEmployment = this.date2
            this.newItem.DateOfBirth = this.date

            if (this.editedItem.Status == false) return Swal.fire('Failure!', 'You are not allowed to add a new employee as inactive.', 'error')

            addEmployee(this.newItem.Id, this.newItem.FirstName, this.newItem.MiddleInitial, this.newItem.LastName, this.newItem.DateOfBirth, this.newItem.DateOfEmployment, this.newItem.Status)
                .then(response => {
                    const status = response.status

                    if (status === 401) return Swal.fire('Auth Failure!', 'You are not authorized.', 'error')

                    if (response.ok) Swal.fire('Employee Added!', 'The employee has been added to the system.', 'success')

                    else return Swal.fire('Error adding Employee!', 'The employee was not added. Check the ID to make sure its not a duplicate.', 'error')

                    this.newItem.DateOfEmployment = moment(this.newItem.DateOfEmployment).format("MMM Do YYYY")
                    this.newItem.DateOfBirth = moment(this.newItem.DateOfBirth).format("MMM Do YYYY")

                    this.employees.push(this.newItem)

                    return response.ok
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire('Failure!', 'There was a problem adding the employee.', 'error')
                })

        },

        deleteItem(item) {
            const index = this.employees.indexOf(item)
            const employeeId = item.Id

            Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!' })
                .then((result) => {
                    if (result.isConfirmed) {
                        deleteEmployee(employeeId)
                            .then(response => {
                                const status = response.status

                                if (status === 401) return Swal.fire('Auth Failure!', 'You are not authorized.', 'error')
                                if (response.ok) Swal.fire('Employee Removed!', 'The employee has been removed from the system.', 'success')

                                this.employees.splice(index, 1)

                                return response.ok
                            })
                            .catch(err => {
                                console.log(err)
                                Swal.fire('Failure!', 'There was a problem removing the employee.', 'error')
                            })
                    }
                })
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save() {
            if (this.creatingNewUser) return Swal.fire('Failure!', 'You are creating a user, not editing.', 'error')

            const Id = this.editedItem.Id
            const firstName = this.editedItem.FirstName
            const middleInitial = this.editedItem.MiddleInitial
            const lastName = this.editedItem.LastName
            const DOB = this.editedItem.DateOfBirth
            const DOE = this.editedItem.DateOfEmployment
            const Status = this.editedItem.Status
            const editedId = localStorage.getItem('editedId')

            editEmployee(Id, firstName, middleInitial, lastName, DOB, DOE, Status, editedId)
                .then(response => {
                    const status = response.status

                    if (status === 401) return Swal.fire('Auth Failure!', 'You are not authorized.', 'error')
                    if (response.ok) Swal.fire('Employee Edited!', 'The employee has been successfully edited.', 'success')

                    return response.ok
                })
                .catch(err => {
                    Swal.fire('Failure!', 'There was a problem editing the employee.', 'error')
                })

            if (this.editedIndex > -1) {
                Object.assign(this.employees[this.editedIndex], this.editedItem)
                if (Status === false) this.employees.splice(this.editedIndex, 1)
            } else {
                this.employees.push(this.editedItem)
            }

            this.editingUser = false

            this.close()
        },
        createNewItem() {
            this.creatingNewUser = true
            this.editingUser = false
        }
    },
})