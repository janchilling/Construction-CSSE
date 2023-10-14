const router = require("express").Router();

//Importing the Controller API's
const {
    createRequisition,
    allRequistions,
    singleRequisition,
    updateRequisition,
    deleteRequisition
} = require('../controllers/requisitionController')

//Creating a new requistion
router.post("/newRequisition", createRequisition)

//Get all requisitions in the database
router.get("/allRequistions", allRequistions)

//Get a single requisition in the database
router.get("/singleRequistions/:id", singleRequisition)

//updating a single Requisition
router.put("/updateRequisition/:id", updateRequisition)

//delete a single Requisition
router.delete("/deleteRequisitions/:id", deleteRequisition)


module.exports = router;