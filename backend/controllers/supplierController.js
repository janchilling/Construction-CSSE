const Supplier = require("../models/supplier")
const bodyParser = require('body-parser');
const router = require("express").Router();

//Get all Supplier
const allSuppliers = async (req, res) => {

    Supplier.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })
  };

//Updating a Supplier
const updateSupplier = async (req, res) => {
    let supplierId = req.params.id;
    const {SupplierName, SupplierID, SupplierEmail, SupplierAddress, SupplierPhone, Password} = req.body;

    const updateSupplier = {
        SupplierName,
        SupplierID,
        SupplierEmail,
        SupplierAddress,
        SupplierPhone,
        Password
    }

    const update = await Supplier.findByIdAndUpdate(supplierId, updateSupplier).then(()=>{
        res.status(200).send({status: "Supplier updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }) 
}

//Deleting a single Supplier
const deleteSupplier = (req, res) => {
    let supplierId = req.params.id;

    Supplier.findByIdAndDelete(supplierId).then(()=>{
        res.status(200).send({status: "Supplier deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting Supplier", error: err.message});
    })
}

//Get the details of a single Supplier
const singleSupplier = (req, res) => {
    let supplierId = req.params.id;

    Supplier.findById(supplierId).then((supplier)=>{
        res.status(200).send({status: "Supplier fetched",supplier})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting supplier", error: err.message});
    })
}

//Exporting the Functions
module.exports = {
    allSuppliers,
    updateSupplier,
    deleteSupplier,
    singleSupplier
}