// const mongoose = require('mongoose');

// const BookingSchema = mongoose.Schema({
//     vehicle: String,
//     quantity: Number,
//     dateofbook: String,
//     time: String, // changed from Number
//     location: String,
//     nofnozel: Number
// });

// module.exports = mongoose.model('Bookings' , BookingSchema );

// models/Bookings.js


const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    // vehicle: {
    //     type: String,
    //     required: true
    // },
    quantity: {
        type: Number,
        required: true
    },
    dateofbook: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    // location: {
    //     type: String,
    //     required: true
    // },
    nofnozel: {
        type: Number,
        required: true
    },
    fueltype: {
        type: String,
        required: true
    },
    //  stationname : {
    //     type:String ,
    //     required: true 
    // } ,

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'failed'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        default: null
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PetrolPump',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);