import express from 'express';
import passport from 'passport';
import config from '../config/config.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { googleCallback, getCurrentUser, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// Initiate Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${config.CLIENT_URL}/login`, session: false }),
  googleCallback
);

// Get current user
router.get('/me', requireAuth, getCurrentUser);

// Logout
router.post('/logout', logout);

export default router;
