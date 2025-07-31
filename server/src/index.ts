// Load environment variables from .env file at the very beginning
import dotenv from 'dotenv';
dotenv.config();

// Import required libraries using ES Modules syntax
import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import your API routes (will be converted to TS in next steps)
import apiRoutes from './routes/api'; // This import will be valid after routes/api.ts conversion

const app: Application = express();
const PORT = process.env.PORT || 4000; // Use 4000 as default as per your original code

// --- Middleware Setup ---

// Helmet: Helps secure the app by setting various HTTP headers.
app.use(helmet());

// CORS: Enables Cross-Origin Resource Sharing.
// Configured with specific origins from your provided code, plus environment variable support.
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Express.json: Parses incoming requests with JSON payloads.
app.use(express.json());

// Morgan: HTTP request logger middleware.
app.use(morgan('dev')); // 'dev' format for development logging

// --- API Routes Connection ---
// Example health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'AI Lesson Backend API is healthy!' });
});

// Connect the main API routes
app.use('/api', apiRoutes);

// --- MongoDB Connection & Server Start ---
// Use process.env.MONGODB_URI for consistency with previous steps
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ignite-curiosity';

mongoose.connect(MONGODB_URI, { })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err: any) => console.error('MongoDB connection error:', err)); // Add type for error

// --- Error Handling Middleware ---
// This middleware will catch any errors thrown from routes or previous middleware.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack to the server console
  res.status(500).json({ error: 'Something went wrong on the server!' }); // Send a user-friendly error response
});

// Handle 404 Not Found routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});
