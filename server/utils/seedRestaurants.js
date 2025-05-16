const mongoose = require('mongoose');
require('dotenv').config();

const Restaurant = require('../models/Restaurant');

const seedData = [
  {
    name: "Halal Guys",
    address: "123 Main St, New York",
    coordinates: [-73.9857, 40.7484],
    isCertified: true,
    tags: ["halal", "fast food"],
    addedBy: "admin"
  },
  {
    name: "Shawarma Palace",
    address: "789 King St, Ottawa",
    coordinates: [-75.6903, 45.4215],
    isCertified: false,
    tags: ["halal", "fast food", "muslim-owned"],
    addedBy: "admin"
  },
  {
    name: "Tandoori Garden",
    address: "456 Curry Ln, Toronto",
    coordinates: [-79.3832, 43.6532],
    isCertified: true,
    tags: ["halal", "restaurant"],
    addedBy: "admin"
  },
  {
    name: "Sweet Ummah Café",
    address: "321 Sugar Blvd, Montreal",
    coordinates: [-73.5673, 45.5017],
    isCertified: false,
    tags: ["halal", "dessert", "muslim-owned"],
    addedBy: "admin"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Restaurant.deleteMany(); // optional: clears existing data
    await Restaurant.insertMany(seedData);
    console.log("✅ Seed data inserted!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  }
}

seed();
