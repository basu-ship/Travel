const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
    type :{
        type: String,
        enum: ['bus', 'train', 'flight', 'car'],
        required: true,
    },
    source:{
        type: String,
        required: true,
    },
    destination:{
        type: String,
        required: true,
    },
    departureTime :{
        type: String,
        required: true, 
    },
    arrivalTime : {
        type: String,
        required: true,
    },
    price:{
        type: Number,
    },
    class:{
        type: String,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Transport', transportSchema);