const mongoose = require('mongoose');
const material = require('./material');

const deliverNoticeSchema = new mongoose.Schema({
    InvoiceID: {
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
    TotalAmount: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Materials: {
        type: [material.schema],
        required: true
    }
});

const DeliveryNotice = mongoose.model('deliverNotice', deliverNoticeSchema);

module.exports = DeliveryNotice;