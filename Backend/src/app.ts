import express from 'express';
import runGraph from "./ai/graph.ai.js"
import cors from "cors"
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import battleRoutes from './routes/battle.routes.js';
import invokeRoutes from './routes/invoke.routes.js';

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
app.use('/invoke', invokeRoutes);

export default app;