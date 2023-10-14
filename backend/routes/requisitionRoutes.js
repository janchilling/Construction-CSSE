const router = require("express").Router();

//Importing the Controller API's
const {
    createRequisition,
    allRequistions,
    SiteRequisitions,
    singleRequisition,
    updateRequisition,
    deleteRequisition
} = require('../controllers/requisitionController')

//Creating a new requistion
router.post("/newRequisition", createRequisition)

//Get all requisitions in the database
router.get("/allRequistions", allRequistions)

//Get requisitions according to the site in the database
router.get("/siteRequistions/:id", SiteRequisitions)

//Get a single requisition in the database
router.get("/singleRequistions/:id", singleRequisition)

//updating a single Employee
router.put("/updateRequisition/:id", updateRequisition)

//delete a single Employee
router.delete("/deleteRequisitions/:id", deleteRequisition)


module.exports = router;