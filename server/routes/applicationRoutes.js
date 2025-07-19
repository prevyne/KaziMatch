import express from 'express';
import {
  applyToJob,
  getApplicationsForJob,
  getMyApplications,
  updateApplicationStatus,
  deleteApplication
} from '../controllers/applicationController.js';
import { protect, isSeeker, isEmployer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id')
    .put(protect, isEmployer, updateApplicationStatus)
    .delete(protect, isEmployer, deleteApplication);

router.route('/seeker/me').get(protect, isSeeker, getMyApplications);
router.route('/job/:job_id').get(protect, isEmployer, getApplicationsForJob);
router.route('/:job_id').post(protect, isSeeker, applyToJob);

export default router;