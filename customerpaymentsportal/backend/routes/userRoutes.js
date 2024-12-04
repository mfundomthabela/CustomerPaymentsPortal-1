// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assume you have a User model defined
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For token-based authentication
const { body, validationResult } = require('express-validator'); // For input validation

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token; // Assuming token is stored in cookies
  if (!token) {
    return res.sendStatus(403); // Forbidden
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// User Registration
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ msg: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// User Authentication (Login)
router.post('/login', [
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ msg: 'Logged in successfully', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// Fetch User Data
router.get('/me', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
    if (!user) {
      return res.sendStatus(404); // Not Found
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// Update User Profile
router.put('/me', authenticateJWT, async (req, res) => {
  const { name, email } = req.body;
  
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true }).select('-password');
    if (!updatedUser) {
      return res.sendStatus(404); // Not Found
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
