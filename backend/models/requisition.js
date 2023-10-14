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
      type: String,
      required: true
    },
    Status: {
      type: String,
      required: true
    },
    Materials: {
        type: [material.schema],
        required: true
    },
    TotalAmount: {
      type: Number,
      required: true
    }
  });
  
  const Requisition = mongoose.model('requisitions', requisitionSchema);

  module.exports = Requisition;