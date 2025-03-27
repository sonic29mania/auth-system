const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoUser } = require('../models/userModel');

async function register(req, res) {
  try {
    const { username, password, role } = req.body;
    const existing = await MongoUser.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new MongoUser({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await MongoUser.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };