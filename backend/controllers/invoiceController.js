const Invoice = require("../models/invoice")
const bodyParser = require('body-parser');
const router = require("express").Router();

//Creating a new Invoice
const createInvoice = async (req, res) => {
    const newInvoice = new Invoice(req.body);
  
    newInvoice
      .save()
      .then(() => {
        res.json("Invoice Added");
      })
      .catch((err) => {
        console.log(err);
      });
}

//Getting all Invoices
const allInvoices = async (req, res) => {

    Invoice.find().then((Invoices)=>{
        res.json(Invoices)
    }).catch((err)=>{
        console.log(err)
    })
}

//Getting a single Invoice
const singleInvoice = (req, res) => {
    const InvoiceId = req.params.id;
  
    Invoice.findById(InvoiceId)
      .then((Invoices) => {
        if (!Invoices) {
          return res.status(404).json({ error: "No such Invoices" });
        }
        res.status(200).json(Invoices);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: "Error with getting Invoices", message: err.message });
      });
}

//Update a single Invoice
const updateInvoice = (req, res) => {
    try {
        const updatedInvoice = Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Invoice' });
    }
}

//Delete a single Invoice
const deleteInvoice = (req, res) => {
    try {
        Invoice.findByIdAndRemove(req.params.id);
        res.json({ message: 'Invoice deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Invoice' });
    }
}

module.exports = { 
    createInvoice,
    allInvoices,
    singleInvoice,
    updateInvoice,
    deleteInvoice
};