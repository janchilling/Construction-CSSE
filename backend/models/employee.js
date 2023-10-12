// Contains the Mongoose model of the employee(Site Manager, Procurement Staff, Management)

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
   Fullname : {
    type : String,
    required : true
   },
   EmployeeID : {
    type : String,
    required : true
   },
   Email : {
      type : String,
      required : true
   },
   Address : {
      type : String,
      required : true
   },
   Phone : {
      type : Number,
      required : true
   },
   UserType : {
    type : String,
    required : true
   },
   Gender : {
    type : String,
    required : true
   },
   Password : {
      type : String,
      required : true
   }

})

const employee = mongoose.model("employee",employeeSchema);
module.exports = employee;