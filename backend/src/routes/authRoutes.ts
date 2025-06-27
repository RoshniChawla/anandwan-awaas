import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Admin from '../models/Admin';

dotenv.config();
const router = express.Router();

// Register Admin (run once only)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Login Admin
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
