const router = require("express").Router();

//Importing the Controller API's
const {
    allEmployees,
    updateEmployee,
    deleteEmployee,
    singleEmployee
} = require('../controllers/employeeController')

//Get all Employees in the database
router.get("/allEmployees", allEmployees)

//updating a single Employee
router.put("/updateEmployee/:id", updateEmployee)

//delete a single Employee
router.delete("/deleteEmployee/:id", deleteEmployee)

//Get details of a single Employee 
router.get("/getEmployee/:id", singleEmployee)


module.exports = router;