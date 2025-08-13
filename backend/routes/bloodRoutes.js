import express from 'express';
import Blood from '../models/Blood.js';

const router = express.Router();

// Register a new blood donor
router.post('/donors', async (req, res) => {
  try {
    const donor = new Blood(req.body);
    await donor.save();
    res.status(201).json({ message: 'Donor registered successfully', donor });
  } catch (error) {
    res.status(400).json({ message: 'Error registering donor', error });
  }
});

// ...other routes (getDonors, etc.)

export default router;
