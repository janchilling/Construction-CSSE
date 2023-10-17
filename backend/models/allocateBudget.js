// Contains the Mongoose model of the Allocated Budget

const mongoose = require('mongoose');

const allocateBudgetSchema = new mongoose.Schema({
    RequisitionID: {
        type: String,
        required: true
    },
    SiteName: {
        type: String,
        
    },
    TotalAmountRequired: {
        type: Number,
        
    },
    AllocateBudget: {
        type: Number,
        required: true
    },
    StartDate: {
        type: String,
        
    },
    EndDate: {
        type: String,
        
    },
});

const AllocateBudget = mongoose.model('allocateBudget', allocateBudgetSchema);

module.exports = AllocateBudget;