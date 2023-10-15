const mongoose = require('mongoose');

const material = require('./material');

const orderSchema = new mongoose.Schema({
    SupplierName: {
      type: String,
      required: true
    },
    RequisitionID: {
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
    TotalAmount:{
        type: Number,
      required: true
    },
    Materials: {
        type: [material.schema],
        required: true
    },
    CardType: {
        type: String,
        
    },
    CardNumber: {
      type: Number,
      
  }
  });
  
  const Order = mongoose.model('orders', orderSchema);
  
  module.exports = Order;