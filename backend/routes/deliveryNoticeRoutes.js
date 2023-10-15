const router = require("express").Router();

//Importing the Controllers API's
const {
    createDeliveryNotice,
    allNotices,
    singleNotice,
    updateNotice,
    deleteNotice
} = require('../controllers/deliverNoticeController')

//Creating a new Order
router.post("/newNotice", createDeliveryNotice)

//Get all Orders in the database
router.get("/allNotices", allNotices)

//Get a single Order in the database
router.get("/singleNotice/:id", singleNotice)

//updating a single Order
router.put("/updateNotice/:id", updateNotice)

//delete a single Order
router.delete("/deleteNotice/:id", deleteNotice)

module.exports = router;