const mongoose = require('mongoose');

const allocateBudgetSchema = new mongoose.Schema({
    SiteName: {
        type: String,
        required: true
    },
    TotalAmountRequired: {
        type: Number,
        required: true
    },
    AllocateBudget: {
        type: Number,
        required: true
    },
    StartDate: {
        type: String,
        required: true
    },
    EndDate: {
        type: String,
        required: true
    },
});

const AllocateBudget = mongoose.model('allocateBudget', allocateBudgetSchema);

module.exports = AllocateBudget;