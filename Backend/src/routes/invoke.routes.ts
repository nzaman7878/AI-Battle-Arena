import express from 'express';
import { optionalAuth } from '../middleware/auth.middleware.js';
import { invokeAi } from '../controllers/invoke.controller.js';

const router = express.Router();

router.post('/', optionalAuth, invokeAi);

export default router;
