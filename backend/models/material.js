const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  // MaterialID: {
  //   type: String,
  //   required: true
  // },
  MaterialName: {
    type: String,
    required: true
  },
  // MaterialPrice: {
  //   type: Number,
  //   required: true
  // },
  MaterialQuantity: {
    type: Number,
    required: true
  }
});

const Material = mongoose.model('materials', materialSchema);

module.exports = Material;