const router = require("express").Router();

//Importing the Controllers API's
const {
    createDeliveryNotice,
    allNotices,
    singleNotice,
    updateNotice,
    deleteNotice
} = require('../controllers/deliverNoticeController')

//Creating a new Notices
router.post("/newNotice", createDeliveryNotice)

//Get all Notices in the database
router.get("/allNotices", allNotices)

//Get a single Notices in the database
router.get("/singleNotice/:id", singleNotice)

//updating a single Notices
router.put("/updateNotice/:id", updateNotice)

//delete a single Notices
router.delete("/deleteNotice/:id", deleteNotice)

module.exports = router;