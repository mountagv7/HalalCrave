const restaurantSchema = new mongoose.Schema({
  title: String,             // SerpAPI result name
  address: String,
  rating: Number,
  thumbnail: String,
  coordinates: {
    type: [Number],          // Optional
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
