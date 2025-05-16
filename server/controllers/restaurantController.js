const Restaurant = require('../models/Restaurant');

const getAllRestaurants = async (req, res) => {
  try {
    const { certified, tag } = req.query;
    const filter = {};
    if (certified === 'true') filter.isCertified = true;
    if (tag) filter.tags = tag;
    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid data' });
  }
};

module.exports = {
  getAllRestaurants,
  addRestaurant
};
