import express from 'express';
import runGraph from "./ai/graph.ai.js"
import cors from "cors"
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import battleRoutes from './routes/battle.routes.js';
import { optionalAuth, type AuthRequest } from './middleware/auth.middleware.js';
import { Battle } from './models/battle.model.js';
// Initialize passport config
import './config/passport.config.js';

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


app.get('/', async (req, res) => {

    const result = await runGraph("Write an code for Factorial function in js")

    res.json(result)
})

// Mount routes
app.use('/auth', authRoutes);
app.use('/api/battles', battleRoutes);

app.post("/invoke", optionalAuth, async (req: AuthRequest, res) => {

    const { input } = req.body
    const result = await runGraph(input)

    // Save to battle history if user is authenticated
    if (req.user) {
        try {
            await Battle.create({
                userId: req.user._id,
                problem: input,
                solution_1: result.solution_1,
                solution_2: result.solution_2,
                judge: result.judge
            });
        } catch (error) {
            console.error('Failed to save battle history:', error);
        }
    }

    res.status(200).json({
        message: "Graph executed successfully",
        success: true,
        result
    })

})



export default app;