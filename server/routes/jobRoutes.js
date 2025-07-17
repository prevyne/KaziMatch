import express from 'express';
import {
  createJob, getAllJobs, getJobById, updateJob, deleteJob, getMyJobs
} from '../controllers/jobController.js';
import { protect, isEmployer } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for employer to get their own jobs
router.route('/myjobs').get(protect, isEmployer, getMyJobs);

router.route('/').get(getAllJobs).post(protect, isEmployer, createJob);
router.route('/:id').get(getJobById).put(protect, isEmployer, updateJob).delete(protect, isEmployer, deleteJob);

export default router;