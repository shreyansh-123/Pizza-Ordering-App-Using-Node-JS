const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'order_placed'
    },
    payment_type: {
        type: String,
        default: "COD"
    }
}, {timestamps: true});

const data = mongoose.model('order', Order);

module.exports = data;