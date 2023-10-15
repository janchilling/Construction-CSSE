const AllocateBudget = require("../models/allocateBudget");
const bodyParser = require('body-parser');
const router = require("express").Router();

//Allocating a Budget
const AllocateABudget = async (req, res) => {
    const newAllocate = new AllocateBudget(req.body);
  
    newAllocate
      .save()
      .then(() => {
        res.json("Budget Allocated");
      })
      .catch((err) => {
        console.log(err);
      });
}

//Getting all Allocated Budgets
const allAllocates = async (req, res) => {

    AllocateBudget.find().then((allocates)=>{
        res.json(allocates)
    }).catch((err)=>{
        console.log(err)
    })
}

//Getting a single Delivery Notice
const singleAllocate = (req, res) => {
    const AllocateId = req.params.id;
  
    AllocateBudget.findById(AllocateId)
      .then((allocate) => {
        if (!allocate) {
          return res.status(404).json({ error: "No such Allocated Budget" });
        }
        res.status(200).json(allocate); // Change from 'allocates' to 'allocate'
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: "Error with getting Allocated Budget", message: err.message });
      });
}

//Update a single Order
const updateAllocate = async (req, res) => {
    try {
        const updatedAllocate = await AllocateBudget.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAllocate);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Order' });
    }
}

//Delete a single Order
const deleteAllocate = (req, res) => {
    try {
        AllocateBudget.findByIdAndRemove(req.params.id);
        res.json({ message: 'Allocate budget deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Allocate budget' });
    }
}


module.exports = {
    AllocateABudget,
    allAllocates,
    singleAllocate,
    updateAllocate,
    deleteAllocate
};