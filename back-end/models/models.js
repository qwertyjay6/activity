const mongoose = require('mongoose');

// Define the schema for a Badge
const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Define the schema for a Model
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  badges: [badgeSchema],
});

// Define the schema for a Make
const makeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  models: [modelSchema],
});

// Define the schema for a Vehicle
const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  logbook: {
    type: String, // You can store the logbook data as a string or buffer
  },
});

// Create models based on the schemas
const Badge = mongoose.model('Badge', badgeSchema);
const Model = mongoose.model('Model', modelSchema);
const Make = mongoose.model('Make', makeSchema);
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = {
  Badge,
  Model,
  Make,
  Vehicle,
};
