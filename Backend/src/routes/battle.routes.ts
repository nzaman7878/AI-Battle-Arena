import express from 'express';
import { requireAuth, type AuthRequest } from '../middleware/auth.middleware.js';
import { Battle } from '../models/battle.model.js';

const router = express.Router();

// Get all battles for the authenticated user (paginated)
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const battles = await Battle.find({ userId: req.user?._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Battle.countDocuments({ userId: req.user?._id });

    res.json({
      battles,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching battles', error });
  }
});

// Get a single battle by ID
router.get('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const battle = await Battle.findOne({
      _id: req.params.id,
      userId: req.user?._id,
    });

    if (!battle) {
      res.status(404).json({ message: 'Battle not found' });
      return;
    }

    res.json(battle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching battle', error });
  }
});

export default router;
