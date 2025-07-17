import Application from '../models/applicationModel.js';
import Job from '../models/jobModel.js';
import Match from '../models/matchModel.js';
import { performMatchAnalysis } from '../services/aiMatchingService.js';

// Helper function to run analysis in the background without blocking the API response
const performAndSaveAnalysis = async (application, seeker, job) => {
  try {
    const analysisResult = await performMatchAnalysis(seeker, job);

    const match = await Match.create({
      application: application._id,
      seeker: seeker._id,
      job: job._id,
      ...analysisResult,
    });

    application.matchAnalysis = match._id;
    await application.save();
    
    console.log(`Match analysis ${match._id} successfully linked to application ${application._id}`);
  } catch (error) {
    console.error(`Failed to perform AI analysis for application ${application._id}:`, error);
  }
};

// @desc    Apply to a job
// @route   POST /api/applications/:job_id
// @access  Private (Seeker)
export const applyToJob = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const seekerId = req.user.id;

    const job = await Job.findById(job_id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }

    const existingApplication = await Application.findOne({ job: job_id, seeker: seekerId });
    if (existingApplication) {
      res.status(400);
      throw new Error('You have already applied for this job');
    }
    
    const application = await Application.create({
      job: job_id,
      seeker: seekerId,
      employer: job.employer,
    });

    // Trigger AI analysis in the background (do not 'await' this)
    performAndSaveAnalysis(application, req.user, job);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. AI analysis is in progress.',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications for a specific job
// @route   GET /api/applications/job/:job_id
// @access  Private (Employer who owns the job)
export const getApplicationsForJob = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const job = await Job.findById(job_id);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    if (job.employer.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User not authorized to view these applications');
    }

    const applications = await Application.find({ job: job_id })
      .populate({ path: 'seeker', select: 'name email profile' })
      .populate('matchAnalysis');
      
    // Sort applications by match score in descending order
    applications.sort((a, b) => {
        const scoreA = a.matchAnalysis ? a.matchAnalysis.score : 0;
        const scoreB = b.matchAnalysis ? b.matchAnalysis.score : 0;
        return scoreB - scoreA;
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications for the logged-in seeker
// @route   GET /api/applications/seeker/me
// @access  Private (Seeker)
export const getMyApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({ seeker: req.user.id })
            .populate({ path: 'job', select: 'title company location' })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (error) {
        next(error);
    }
};