const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: '*', // allow all origins (for now)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
const restaurantRoutes = require('./routes/restaurants');
const authRoutes = require('./routes/auth');
app.use('/restaurants', restaurantRoutes);
app.use('/auth', authRoutes);

// Test root route
app.get('/', (req, res) => {
  res.send('Halal Crave API is running');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
