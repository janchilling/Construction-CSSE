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

    await Requisition.find().then((requisitions)=>{
        res.json(requisitions)
    }).catch((err)=>{
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
const updateRequisition = async(req, res) => {
  const RequisitionId = req.params.id;
    try {
        const updateRequisition = await Requisition.findByIdAndUpdate(RequisitionId, req.body, { new: true });
        res.json(updateRequisition);
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

//Exporting the Functions
module.exports = { 
    createRequisition,
    allRequistions,
    singleRequisition,
    updateRequisition,
    deleteRequisition
};