import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.middleware.js';
import type { IUser } from '../models/user.model.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Initiate Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${config.CLIENT_URL}/login`, session: false }),
  (req, res) => {
    const user = req.user as IUser;
    
    // Generate JWT
    const token = generateToken(user._id as string);

    // Set HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // or 'none' if backend/frontend on different domains, 'lax' is fine for localhost
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.redirect(`${config.CLIENT_URL}/arena`);
  }
);

// Get current user
router.get('/me', requireAuth, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

// Logout
router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: 'Logged out successfully' });
});

export default router;
