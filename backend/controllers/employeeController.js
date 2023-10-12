const Employee = require("../models/employee")
const bodyParser = require('body-parser');
const router = require("express").Router();

//Get all employees
const allEmployees = async (req, res) => {

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })
  };

//Updating an employee
const updateEmployee = async (req, res) => {
    let employeeId = req.params.id;
    const {Fullname,Email,Address,Phone,UserType,Gender,Password} = req.body;

    const updateEmployee = {
        Fullname,
        Email,
        Address,
        Phone,
        UserType,
        Gender,
        Password
    }

    const update = await Employee.findByIdAndUpdate(employeeId, updateEmployee).then(()=>{
        res.status(200).send({status: "Employee updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }) 
}

//Deleting a single Employee
const deleteEmployee = (req, res) => {
    let employeeId = req.params.id;

    Employee.findByIdAndDelete(employeeId).then(()=>{
        res.status(200).send({status: "Employee deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting employee", error: err.message});
    })
}

//Get the details of a single Employee
const singleEmployee = (req, res) => {
    let employeeId = req.params.id;

    Employee.findById(employeeId).then((employee)=>{
        res.status(200).send({status: "Employee fetched",employee})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting employee", error: err.message});
    })
}

//Exporting the Functions
module.exports = {
    allEmployees,
    updateEmployee,
    deleteEmployee,
    singleEmployee
}