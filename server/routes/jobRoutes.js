import express from 'express';
import {
  createJob, getAllJobs, getJobById, updateJob, deleteJob, getMyJobs
} from '../controllers/jobController.js';
import { protect, protectOptional, isEmployer } from '../middleware/authMiddleware.js';

const router = express.Router();

// It's public, but if a token cookie exists, req.user will be populated.
router.route('/').get(protectOptional, getAllJobs).post(protect, isEmployer, createJob);

router.route('/myjobs').get(protect, isEmployer, getMyJobs);
router.route('/:id').get(getJobById).put(protect, isEmployer, updateJob).delete(protect, isEmployer, deleteJob);

export default router;