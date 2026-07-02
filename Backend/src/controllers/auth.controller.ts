import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import type { IUser } from '../models/user.model.js';
import { type AuthRequest } from '../middleware/auth.middleware.js';

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const googleCallback = (req: Request, res: Response) => {
  const user = req.user as IUser;
  const token = generateToken(user._id as string);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${config.CLIENT_URL}/arena`);
};

export const getCurrentUser = (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: 'Logged out successfully' });
};
