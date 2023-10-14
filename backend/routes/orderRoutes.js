const router = require("express").Router();

//Importing the Controller API's
const {
    createOrder,
    allOrders,
    singleOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController')

//Creating a new Order
router.post("/newOrder", createOrder)

//Get all Orders in the database
router.get("/allOrders", allOrders)

//Get a single Order in the database
router.get("/singleOrder/:id", singleOrder)

//updating a single Order
router.put("/updateOrder/:id", updateOrder)

//delete a single Order
router.delete("/deleteOrder/:id", deleteOrder)


module.exports = router;