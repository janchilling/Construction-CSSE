// Contains the Mongoose model of the Supplier

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    SupplierName : {
    type : String,
    required : true
   },
   SupplierID : {
    type : String,
    required : true
   },
   SupplierEmail : {
      type : String,
      required : true
   },
   SupplierAddress : {
      type : String,
      required : true
   },
   SupplierPhone : {
      type : Number,
      required : true
   },
   Password : {
      type : String,
      required : true
   }

})

const supplier = mongoose.model("supplier",supplierSchema);
module.exports = supplier;