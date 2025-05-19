const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const axios = require('axios');
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

const SERP_API_KEY = process.env.SERPAPI_KEY;
const MONGO_URI = process.env.MONGO_URI;
const LOCATION = '45.5017,-73.5673'; // Montreal
const MAX_PAGES = 3; // ~60 results

console.log("🔑 Loaded API key:", SERP_API_KEY ? '[HIDDEN]' : '❌ Not found');

async function fetchFromSerpAPI(start = 0) {
  const url = `https://serpapi.com/search.json?engine=google_maps&q=halal&ll=@${LOCATION},15z&type=search&start=${start}&api_key=${SERP_API_KEY}`;
  const response = await axios.get(url);
  return response.data.local_results || [];
}

function formatResult(result) {
  const gps = result.gps_coordinates;
  const lat = gps?.latitude;
  const lng = gps?.longitude;

  if (lat == null || lng == null) return null;

  return {
    title: result.title, // ✅ FIXED: changed from 'name' to 'title'
    address: result.address || 'Unknown',
    rating: result.rating || null,
    thumbnail: result.thumbnail || null,
    coordinates: [lng, lat],
    isCertified: false,
    tags: ['halal'],
    addedBy: 'serpapi',
  };
}

async function run() {
  try {
    if (!SERP_API_KEY || !MONGO_URI) throw new Error('Missing env vars');

    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const allResults = [];
    for (let page = 0; page < MAX_PAGES; page++) {
      const start = page * 20;
      console.log(`📡 Fetching page ${page + 1}...`);
      const results = await fetchFromSerpAPI(start);
      if (!results.length) break;

      const formatted = results.map(formatResult).filter(Boolean);
      allResults.push(...formatted);
    }

    const inserted = await Restaurant.insertMany(allResults);
    console.log(`✅ Inserted ${inserted.length} restaurants.`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

run();
