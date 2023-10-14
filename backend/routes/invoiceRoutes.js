const router = require("express").Router();

//Importing the Controller API's
const {
    createInvoice,
    allInvoices,
    singleInvoice,
    updateInvoice,
    deleteInvoice
} = require('../controllers/invoiceController')

//Creating a new Invoice
router.post("/newInvoice", createInvoice)

//Get all Invoices in the database
router.get("/allInvoices", allInvoices)

//Get a single Invoice in the database
router.get("/singleInvoice/:id", singleInvoice)

//updating a single Invoice
router.put("/updateInvoice/:id", updateInvoice)

//delete a single Invoice
router.delete("/deleteInvoice/:id", deleteInvoice)


module.exports = router;