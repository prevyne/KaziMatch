import Application from '../models/applicationModel.js';
import Job from '../models/jobModel.js';
import Match from '../models/matchModel.js';
import { performMatchAnalysis } from '../services/aiMatchingService.js';

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

    // Step 1: Create and SAVE the application first to get a valid ID.
    const application = await Application.create({
      job: job_id,
      seeker: seekerId,
      employer: job.employer,
    });

    // Step 2: Run our local algorithm.
    const analysisResult = performMatchAnalysis(req.user, job);

    // Step 3: Create the Match document with the results.
    const match = await Match.create({
      application: application._id, // Use the ID from the created application
      seeker: seekerId,
      job: job_id,
      score: analysisResult.score,
      summary: analysisResult.summary,
      strengths: analysisResult.strengths,
      weaknesses: analysisResult.weaknesses,
    });

    // Step 4: Link the match back to the application and save the update.
    application.matchAnalysis = match._id;
    await application.save();

    res.status(201).json({ success: true, message: 'Application submitted successfully.', data: application });
  } catch (error) {
    next(error);
  }
};

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
    applications.sort((a, b) => {
        const scoreA = a.matchAnalysis ? a.matchAnalysis.score : 0;
        const scoreB = b.matchAnalysis ? b.matchAnalysis.score : 0;
        return scoreB - scoreA;
    });
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({ seeker: req.user.id })
            .populate({ path: 'job', select: 'title company location' })
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (error) {
        next(error);
    }
};

export const updateApplicationStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('job');
        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }
        if (application.job.employer.toString() !== req.user.id) {
            res.status(403);
            throw new Error('User not authorized to update this application');
        }
        application.status = status;
        await application.save();
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        next(error);
    }
};

export const deleteApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id).populate('job');
        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }
        if (application.job.employer.toString() !== req.user.id) {
            res.status(403);
            throw new Error('User not authorized to delete this application');
        }
        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Application removed' });
    } catch (error) {
        next(error);
    }
};