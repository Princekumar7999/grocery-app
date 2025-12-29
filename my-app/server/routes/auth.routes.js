import { Router } from 'express';
import User from '../models/user.model.js';
import { generateToken } from '../utils/generateTokens.js';

const router = Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Create new user
    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email },
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// POST /api/auth/login (basic placeholder)
router.post('/login', async (req, res) => {
  // Implement login logic
  res.status(501).json({ success: false, message: 'Not implemented' });
});

export default router;

