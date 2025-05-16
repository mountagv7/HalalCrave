const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: '2dsphere' // for geolocation queries
  },
  isCertified: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String] // e.g. ["zabiha", "fast food", "family-friendly"]
  },
  addedBy: {
    type: String,
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
