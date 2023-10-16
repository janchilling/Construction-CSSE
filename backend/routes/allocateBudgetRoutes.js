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

//Creating a new Allocate
router.post("/newAllocate", AllocateABudget)

//Get all Allocates in the database
router.get("/allAllocates", allAllocates)

//Get a single Allocate in the database
router.get("/singleAllocate/:id", singleAllocate)

//updating a single Allocate
router.put("/updateAllocate/:id", updateAllocate)

//delete a single Allocate
router.delete("/deleteAllocate/:id", deleteAllocate)

//updating a single Allocate based on RequsitionID
router.put("/UpdateAllocateBudget/:id", updateAllocateBudget)

//Fetch a single Allocate based on RequsitionID
router.put("/FetchAllocateBudget/:id", singleAllocateBudget)

module.exports = router;