const mongoose = require('mongoose');

const material = require('/models/material');

const orderSchema = new mongoose.Schema({
    OrderID: {
      type: String,
      required: true
    },
    RequisitionID: {
        type: String,
        required: true
    },
    SupplierName: {
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
    Date: {
      type: String,
      required: true
    },
    SiteName: {
      type: Number,
      required: true
    },
    Materials: {
        type: [material],
        required: true
      }
  });
  
  const Order = mongoose.model('orders', orderSchema);
  
  module.exports = Order;