import { type Response } from 'express';
import runGraph from '../ai/graph.ai.js';
import { Battle } from '../models/battle.model.js';
import { type AuthRequest } from '../middleware/auth.middleware.js';

export const invokeAi = async (req: AuthRequest, res: Response) => {
  try {
    const { input } = req.body;
    const result = await runGraph(input);

    if (req.user) {
      try {
        await Battle.create({
          userId: req.user._id,
          problem: input,
          solution_1: result.solution_1,
          solution_2: result.solution_2,
          judge: result.judge,
        });
      } catch (error) {
        console.error('Failed to save battle history:', error);
      }
    }

    res.status(200).json({
      message: 'Graph executed successfully',
      success: true,
      result,
    });
  } catch (error) {
    console.error('Error invoking AI:', error);
    res.status(500).json({ message: 'Error running AI battle', error });
  }
};
