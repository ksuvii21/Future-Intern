const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  horsepower: {
    type: Number,
    required: true,
  },
  topSpeed: {
    type: Number,
    required: true,
  },
  acceleration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  features: [String],
  technicalSpecs: {
    engine: String,
    transmission: String,
    drivetrain: String,
    fuelEconomy: String,
  },
});

module.exports = mongoose.model('Car', carSchema);