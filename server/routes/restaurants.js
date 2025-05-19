const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant'); // make sure you have a Restaurant model

router.get('/', async (req, res) => {
  const location = req.query.location || 'Montreal';
  console.log('📡 Fetching restaurants from MongoDB for location:', location);

  try {
    const restaurants = await Restaurant.find({ address: { $regex: location, $options: 'i' } });
    console.log(`✅ Found ${restaurants.length} restaurants in DB`);
    res.json(restaurants);
  } catch (err) {
    console.error('❌ Error fetching from DB:', err.message);
    res.status(500).json({ error: 'Failed to fetch from DB' });
  }
});

module.exports = router;
