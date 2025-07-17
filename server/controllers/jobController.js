import Job from '../models/jobModel.js';
import Application from '../models/applicationModel.js';

// @desc    Get all active jobs, with filtering
// @route   GET /api/jobs
// @access  Public
export const getAllJobs = async (req, res, next) => {
  try {
    const { keyword, location, jobType } = req.query;
    const filter = { isActive: true };

    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' }; // Case-insensitive regex search
    }
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (jobType) {
      filter.jobType = jobType;
    }

    const jobs = await Job.find(filter)
      .populate('employer', 'name profile.companyName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Employer)
export const createJob = async (req, res, next) => {
  try {
    req.body.employer = req.user.id;
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs for the logged-in employer
// @route   GET /api/jobs/myjobs
// @access  Private (Employer)
export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({ createdAt: -1 });

    const jobsWithCounts = await Promise.all(
        jobs.map(async (job) => {
            const applicantCount = await Application.countDocuments({ job: job._id });
            return { ...job.toObject(), applicantCount };
        })
    );

    res.status(200).json({ success: true, count: jobsWithCounts.length, data: jobsWithCounts });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name profile.companyName');
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (Employer)
export const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    if (job.employer.toString() !== req.user.id) {
      res.status(403);
      throw new Error('User not authorized to update this job');
    }
    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer)
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    if (job.employer.toString() !== req.user.id) {
      res.status(403);
      throw new Error('User not authorized to delete this job');
    }
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Job removed successfully' });
  } catch (error) {
    next(error);
  }
};