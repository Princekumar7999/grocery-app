import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/auth.routes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
// In development we allow requests from local dev servers (Expo Metro, Expo web).
const isDev = process.env.NODE_ENV !== 'production';
const corsOptions = {
  origin: true, // reflect request origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

if (isDev) {
  app.use(cors(corsOptions));
  // Note: global cors middleware handles preflight OPTIONS by default.
} else {
  // In production, restrict origins explicitly.
  app.use(cors({
    origin: ['http://your-production-domain.com'],
    credentials: true,
    methods: corsOptions.methods,
    allowedHeaders: corsOptions.allowedHeaders,
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});