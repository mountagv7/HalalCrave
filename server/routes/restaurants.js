const mongoose = require('mongoose'); // ✅ This line was missing

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  rating: Number,
  thumbnail: String,
  coordinates: {
    type: [Number],
    index: '2dsphere'
  },
  isCertified: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String]
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
