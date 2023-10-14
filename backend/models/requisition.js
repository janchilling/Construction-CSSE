const mongoose = require('mongoose');

const material = require('./material');

const requisitionSchema = new mongoose.Schema({
    SiteManagerID: {
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
        type: [material.schema],
        required: true
      }
  });
  
  const Requisition = mongoose.model('requisitions', requisitionSchema);
  
  module.exports = Requisition;