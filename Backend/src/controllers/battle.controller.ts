import { type Response } from 'express';
import { Battle } from '../models/battle.model.js';
import { type AuthRequest } from '../middleware/auth.middleware.js';

export const getBattles = async (req: AuthRequest, res: Response) => {
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
};

export const getBattleById = async (req: AuthRequest, res: Response) => {
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
};

export const deleteBattle = async (req: AuthRequest, res: Response) => {
  try {
    const battle = await Battle.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id,
    });

    if (!battle) {
      res.status(404).json({ message: 'Battle not found or unauthorized' });
      return;
    }

    res.json({ message: 'Battle deleted successfully', id: battle._id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting battle', error });
  }
};
