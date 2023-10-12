const router = require("express").Router();

//Importing the Controller API's
const {
    allSuppliers,
    updateSupplier,
    deleteSupplier,
    singleSupplier
} = require('../controllers/supplierController')

//Get all Employees in the database
router.get("/allSupplier", allSuppliers)

//updating a single Employee
router.put("/updateSupplier/:id", updateSupplier)

//delete a single Employee
router.delete("/deleteSupplier/:id", deleteSupplier)

//Get details of a single Employee 
router.get("/getSupplier/:id", singleSupplier)


module.exports = router;