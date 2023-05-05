const express = require('express');
const router = express.Router();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User created successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
