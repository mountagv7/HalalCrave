const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'halal-secret'; // put this in .env in production

const createToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ email, password });
    await user.save();

    const token = createToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { register, login };
