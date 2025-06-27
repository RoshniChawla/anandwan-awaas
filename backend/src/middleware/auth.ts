import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include admin property
interface AuthRequest extends Request {
  admin?: any;
}

// Middleware to verify JWT token
export default function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    req.admin = decoded; // Store decoded admin info in request
    next(); // Proceed to the next middleware/route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
