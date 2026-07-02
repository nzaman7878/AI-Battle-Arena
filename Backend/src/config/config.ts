import dotenv from 'dotenv';

dotenv.config();


const config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
    MISTRALAI_API_KEY: process.env.MISTRAL_API_KEY || '',
    COHERE_API_KEY: process.env.COHERE_API_KEY || '',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-battle-arena',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
}


export default config;