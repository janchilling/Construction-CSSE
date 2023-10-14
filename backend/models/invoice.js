const mongoose = require('mongoose');

const material = require('./material');

const invoiceSchema = new mongoose.Schema({
    SupplierName: {
      type: String,
      required: true
    },
    RequisitionID: {
        type: String,
        required: true
    },
    OrderID: {
        type: String,
        required: true
    },
    SiteManagerID: {
        type: String,
        required: true
    },
    SiteManagerName: {
        type: String,
        required: true
    },
    SiteName: {
        type: String,
        required: true
    },
    IssuedDate: {
      type: String,
      required: true
    },
    TotalAmount:{
        type: Number,
      required: true
    },
    Materials: {
        type: [material.schema],
        required: true
      }
  });
  
  const Invoice = mongoose.model('invoices', invoiceSchema);
  
  module.exports = Invoice;