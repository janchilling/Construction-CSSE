const router = require("express").Router();

//Importing the Controllers API's
const {
    AllocateABudget,
    allAllocates,
    singleAllocate,
    updateAllocate,
    deleteAllocate,
    updateAllocateBudget,
    singleAllocateBudget
} = require('../controllers/allocateBudgetController')

//Creating a new Allocate budget
router.post("/newAllocate", AllocateABudget)

//Get all Allocate budget in the database
router.get("/allAllocates", allAllocates)

//Get a single Allocate budget in the database
router.get("/singleAllocate/:id", singleAllocate)

//updating a single Allocate budget
router.put("/updateAllocate/:id", updateAllocate)

//delete a single Allocate budget
router.delete("/deleteAllocate/:id", deleteAllocate)

//updating a single Allocate budget based on RequsitionID
router.put("/UpdateAllocateBudget/:id", updateAllocateBudget)

//Fetch a single Allocate budger based on RequsitionID
router.get("/FetchAllocateBudget/:id", singleAllocateBudget)

module.exports = router;