import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// The 'protect' middleware will be executed before the controller function for these routes
router.post('/logout', protect, logoutUser);
router.get('/me', protect, getMe);

export default router;