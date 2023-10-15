const DeliveryNotice = require("../models/deliveryNotice");
const bodyParser = require('body-parser');
const router = require("express").Router();

//creating a delivery Notice
const createDeliveryNotice = async (req, res) => {
    const newNotice = new DeliveryNotice(req.body);
  
    newNotice
      .save()
      .then(() => {
        res.json("Delivery Notice Added");
      })
      .catch((err) => {
        console.log(err);
      });
}

//Getting all Delivery Notice
const allNotices = async (req, res) => {

    DeliveryNotice.find().then((notices)=>{
        res.json(notices)
    }).catch((err)=>{
        console.log(err)
    })
}

//Getting a single Delivery Notice
const singleNotice = (req, res) => {
    const NoticeId = req.params.id;
  
    DeliveryNotice.findById(NoticeId)
      .then((notices) => {
        if (!notices) {
          return res.status(404).json({ error: "No such Notices" });
        }
        res.status(200).json(notices);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: "Error with getting Notices", message: err.message });
      });
}

//Update a single Order
const updateNotice = async (req, res) => {
    try {
        const updatedNotice = await DeliveryNotice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNotice);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Order' });
    }
}

//Delete a single Order
const deleteNotice = (req, res) => {
    try {
        DeliveryNotice.findByIdAndRemove(req.params.id);
        res.json({ message: 'Delivery Notice deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Notice' });
    }
}


module.exports = {
    createDeliveryNotice,
    allNotices,
    singleNotice,
    updateNotice,
    deleteNotice
};