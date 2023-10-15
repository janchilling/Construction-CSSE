const router = require("express").Router();

//Importing the Controllers API's
const {
    AllocateABudget,
    allAllocates,
    singleAllocate,
    updateAllocate,
    deleteAllocate
} = require('../controllers/allocateBudgetController')

//Creating a new Order
router.post("/newAllocate", AllocateABudget)

//Get all Orders in the database
router.get("/allAllocates", allAllocates)

//Get a single Order in the database
router.get("/singleAllocate/:id", singleAllocate)

//updating a single Order
router.put("/updateAllocate/:id", updateAllocate)

//delete a single Order
router.delete("/deleteAllocate/:id", deleteAllocate)

module.exports = router;