import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { getBattles, getBattleById, deleteBattle } from '../controllers/battle.controller.js';

const router = express.Router();

// Get all battles for the authenticated user
router.get('/', requireAuth, getBattles);

// Get a single battle by ID
router.get('/:id', requireAuth, getBattleById);

// Delete a battle by ID
router.delete('/:id', requireAuth, deleteBattle);

export default router;
