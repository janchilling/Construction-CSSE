const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  MaterialName: {
    type: String,
    required: true
  },
  MaterialQuantity: {
    type: Number,
    required: true
  }
});

const Material = mongoose.model('materials', materialSchema);

module.exports = Material;