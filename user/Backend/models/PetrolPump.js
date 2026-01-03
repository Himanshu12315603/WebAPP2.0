//  const mongoose = require('mongoose');

// const petrolPumpSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   lat: Number,
//   lon: Number,
//   name: String,
//   operator: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('PetrolPump', petrolPumpSchema);


const mongoose = require('mongoose');

const petrolPumpSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  operator: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  fuelTypes: {
    type: [String],
    default: ['Petrol', 'Diesel']
  },
  prices: {
    type: Map,
    of: Number,
    default: { 'Petrol': 101.5, 'Diesel': 87.9 }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PetrolPump', petrolPumpSchema);
