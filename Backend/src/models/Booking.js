const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    transportId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Transport',
    },
    journeyDate: {
    type: Date,
    },
    flightDetails: {
    flightNumber: String,
    source: String,
    destination: String,
    journeyDate: Date,
    departureTime: String,
    arrivalTime: String,
    price: Number,
    transportType: String,
    airline: String,
    },
    passengerDetails:{
        fullName: String,
        age: Number,
        gender: String,
        phone: String,
    },
    status:{
        type: String,
        enum:['confirmed', 'cancelled', 'completed'],
        default: 'confirmed',
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Booking', bookingSchema);