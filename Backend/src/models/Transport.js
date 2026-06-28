const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['bus', 'train', 'flight', 'car'],
        required: true,
    },

    operator: {
        type: String
    },

    source: {
        type: String,
        required: true,
    },

    destination: {
        type: String,
        required: true,
    },

    departureTime: {
        type: String,
        required: true,
    },

    arrivalTime: {
        type: String,
        required: true,
    },

    duration: {
        type: String
    },

    journeyDate: {
        type: Date,
        required: true,
    },

    price: {
        type: Number,
    },

    class: {
        type: String,
    },

    availableSeats: {
        type: Number,
    },

    rating: {
        type: Number,
        default: 4.5,
    }

}, {
    timestamps: true,
});
module.exports = mongoose.model("Transport", transportSchema);