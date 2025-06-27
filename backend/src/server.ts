import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import Routes
import guestRoutes from './routes/guestRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes'; // ✅ Protected admin dashboard routes

// Initialize Express app
const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/guests', guestRoutes);   // ➤ Guest endpoints
app.use('/api/auth', authRoutes);      // ➤ Admin register/login
app.use('/api/admin', adminRoutes);    // ➤ Admin dashboard + protected data

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const PORT: number = parseInt(process.env.PORT || '5000', 10);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
