const Requisition = require("../models/requisition")
const bodyParser = require('body-parser');
const router = require("express").Router();

//Creating a new Requisition
const createRequisition = async (req, res) => {
    const newRequisition = new Requisition(req.body);
  
    newRequisition
      .save()
      .then(() => {
        res.json("Requisition Added");
      })
      .catch((err) => {
        console.log(err);
      });
}

//Getting all Requisitions
const allRequistions = async (req, res) => {

    Requisition.find().then((requisitions)=>{
        res.json(requisitions)
    }).catch((err)=>{
        console.log(err)
    })
}

//Getting the requistions according to the site
const SiteRequisitions = async (req, res) => {
    const SiteID = req.params.userID;
  
    Requisition.find({userID : userID}).then((requisitions) => {
        res.json(requisitions)
    }).catch((err) => {
        console.log(err)
    })
}

//Getting a single Requistions
const singleRequisition = (req, res) => {
    const RequisitionId = req.params.id;
  
    Requisition.findById(RequisitionId)
      .then((requisitions) => {
        if (!requisitions) {
          return res.status(404).json({ error: "No such requistions" });
        }
        res.status(200).json(requisitions);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: "Error with getting requistions", message: err.message });
      });
}

//Update a single requistion
const updateRequisition = (req, res) => {
    try {
        const updatedRequisition = Requisition.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRequisition);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update requisition' });
    }
}

//Delete a single requisition
const deleteRequisition = (req, res) => {
    try {
        Requisition.findByIdAndRemove(req.params.id);
        res.json({ message: 'Requisition deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete requisition' });
    }
}

module.exports = { 
    createRequisition,
    allRequistions,
    SiteRequisitions,
    singleRequisition,
    updateRequisition,
    deleteRequisition
};