import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User's own profile route (get and update)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Admin-only routes
router.route('/').get(protect, isAdmin, getUsers);
router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById);

export default router;