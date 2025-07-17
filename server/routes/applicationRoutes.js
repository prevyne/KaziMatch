import express from 'express';
import {
  applyToJob,
  getApplicationsForJob,
  getMyApplications,
} from '../controllers/applicationController.js';
import { protect, isSeeker, isEmployer } from '../middleware/authMiddleware.js';

const router = express.Router();

// A seeker getting their own application history
router.route('/seeker/me').get(protect, isSeeker, getMyApplications);

// An employer getting all applicants for one of their jobs
router.route('/job/:job_id').get(protect, isEmployer, getApplicationsForJob);

// A seeker applying to a specific job
router.route('/:job_id').post(protect, isSeeker, applyToJob);

export default router;