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
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    (req as any).admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// 🧠 Convert to start and end of current date in IST
const getTodayRangeInIST = () => {
  const now = new Date();

  // Convert to IST offset
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + IST_OFFSET);

  // Set IST start of day
  const start = new Date(istNow);
  start.setHours(0, 0, 0, 0);

  // Set IST end of day
  const end = new Date(istNow);
  end.setHours(23, 59, 59, 999);

  // Convert back to UTC for MongoDB (since DB stores UTC)
  return {
    startUTC: new Date(start.getTime() - IST_OFFSET),
    endUTC: new Date(end.getTime() - IST_OFFSET),
  };
};

// ✅ Dashboard Stats Route with Full-Day Logic
router.get('/dashboard-stats', verifyToken, async (req: Request, res: Response) => {
  try {
    const { startUTC, endUTC } = getTodayRangeInIST();

    const currentGuests = await Guest.countDocuments({
      arrivalDate: { $lte: endUTC },
      departureDate: { $gte: startUTC },
    });

    const upcomingArrivals = await Guest.countDocuments({
      arrivalDate: { $gt: endUTC },
    });

    const totalBookings = await Guest.countDocuments();

    const activePrograms = await Guest.countDocuments({
      mealRequired: true,
    });

    res.json({
      currentGuests,
      upcomingArrivals,
      totalBookings,
      activePrograms,
    });
  } catch (err: any) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
