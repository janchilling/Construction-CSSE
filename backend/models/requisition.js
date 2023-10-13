const mongoose = require('mongoose');

const material = require('/models/material');

const requisitionSchema = new mongoose.Schema({
    RequisitionID: {
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
    Status: {
      type: Number,
      required: true
    },
    Materials: {
        type: [material],
        required: true
      }
  });
  
  const Requisition = mongoose.model('requisitions', requisitionSchema);
  
  module.exports = Requisition;