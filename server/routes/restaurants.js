const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
  const location = req.query.location || 'Montreal, Quebec, Canada';
  console.log('📡 Request received for location:', location);

  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_local',
        q: 'halal restaurants',
        location,
        api_key: process.env.SERPAPI_KEY
      }
    });

    const results = response.data.local_results;

    if (!results || results.length === 0) {
      console.warn('⚠️ No results returned from SerpAPI.');
      return res.status(200).json([]); // ✅ Fix: Return empty array, not 204
    }

    console.log(`✅ Returning ${results.length} results`);
    res.json(results);
  } catch (err) {
    console.error('❌ Error from SerpAPI:', err.message);
    res.status(500).json({ error: 'Failed to fetch data from SerpAPI' });
  }
});

module.exports = router;
