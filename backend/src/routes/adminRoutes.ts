// adminRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Guest from '../models/Guest';

dotenv.config();
const router = express.Router();

// Middleware to verify token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn("🚫 No or malformed token:", authHeader);
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    (req as any).admin = decoded;
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Protected admin dashboard stats route
router.get('/dashboard-stats', verifyToken, async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();

    const currentGuests = await Guest.countDocuments({
      dateOfArrival: { $lte: currentDate },
      dateOfDeparture: { $gte: currentDate }
    });

    const upcomingArrivals = await Guest.countDocuments({
      dateOfArrival: { $gt: currentDate }
    });

    const totalBookings = await Guest.countDocuments();

    const mealIncludedGuests = await Guest.countDocuments({ mealsIncluded: true });

    res.json({
      currentGuests: currentGuests ?? 0,
      upcomingArrivals: upcomingArrivals ?? 0,
      totalBookings: totalBookings ?? 0,
      activePrograms: mealIncludedGuests ?? 0 // renamed for frontend compatibility
    });
  } catch (err: any) {
    console.error("🔥 Dashboard stats error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
