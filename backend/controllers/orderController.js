const Order = require("../models/order")
const bodyParser = require('body-parser');
const router = require("express").Router();

//Creating a new Order
const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
  
    newOrder
      .save()
      .then(() => {
        res.json("Order Added");
      })
      .catch((err) => {
        console.log(err);
      });
}

//Getting all Orders
const allOrders = async (req, res) => {

    await Order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
}

//Getting a single Order
const singleOrder = (req, res) => {
    const OrderId = req.params.id;
  
    Order.findById(OrderId)
      .then((orders) => {
        if (!orders) {
          return res.status(404).json({ error: "No such Orders" });
        }
        res.status(200).json(orders);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: "Error with getting Orders", message: err.message });
      });
}

//Update a single Order
const updateOrder = (req, res) => {
    try {
        const updatedOrder = Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Order' });
    }
}

//Delete a single Order
const deleteOrder = (req, res) => {
    try {
        Order.findByIdAndRemove(req.params.id);
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Order' });
    }
}

module.exports = { 
    createOrder,
    allOrders,
    singleOrder,
    updateOrder,
    deleteOrder
};