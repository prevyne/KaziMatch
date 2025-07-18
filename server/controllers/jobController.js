import Job from '../models/jobModel.js';
import Application from '../models/applicationModel.js';
import { performMatchAnalysis } from '../services/aiMatchingService.js';

export const getAllJobs = async (req, res, next) => {
  console.log('--- [2] Executing getAllJobs controller ---');
  console.log('Is req.user present inside controller?', !!req.user);
  if (req.user) {
    console.log('User role:', req.user.role);
  }

  try {
    const { keyword, location, jobType } = req.query;
    const filter = { isActive: true };
    if (keyword) filter.title = { $regex: keyword, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (jobType) filter.jobType = jobType;

    const jobs = await Job.find(filter).populate('employer', 'name profile.companyName').sort({ createdAt: -1 });

    if (req.user && req.user.role === 'seeker') {
      console.log('--- [3] User is a seeker, attempting AI analysis ---');
      const jobsWithScores = await Promise.all(
        jobs.map(async (job) => {
          const analysis = await performMatchAnalysis(req.user, job);
          return { ...job.toObject(), matchScore: analysis.score };
        })
      );
      return res.status(200).json({ success: true, count: jobsWithScores.length, data: jobsWithScores });
    }

    console.log('--- [3] User is not a seeker or not logged in, returning public job list ---');
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    next(error);
  }
};

// --- Other controller functions ---
export const createJob = async (req, res, next) => { try { req.body.employer = req.user.id; const job = await Job.create(req.body); res.status(201).json({ success: true, data: job }); } catch (error) { next(error); } };
export const getMyJobs = async (req, res, next) => { try { const jobs = await Job.find({ employer: req.user.id }).sort({ createdAt: -1 }); const jobsWithCounts = await Promise.all(jobs.map(async (job) => { const applicantCount = await Application.countDocuments({ job: job._id }); return { ...job.toObject(), applicantCount }; })); res.status(200).json({ success: true, count: jobsWithCounts.length, data: jobsWithCounts }); } catch (error) { next(error); } };
export const getJobById = async (req, res, next) => { try { const job = await Job.findById(req.params.id).populate('employer', 'name profile.companyName'); if (!job) { res.status(404); throw new Error('Job not found'); } res.status(200).json({ success: true, data: job }); } catch (error) { next(error); } };
export const updateJob = async (req, res, next) => { try { let job = await Job.findById(req.params.id); if (!job) { res.status(404); throw new Error('Job not found'); } if (job.employer.toString() !== req.user.id) { res.status(403); throw new Error('User not authorized'); } job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); res.status(200).json({ success: true, data: job }); } catch (error) { next(error); } };
export const deleteJob = async (req, res, next) => { try { const job = await Job.findById(req.params.id); if (!job) { res.status(404); throw new Error('Job not found'); } if (job.employer.toString() !== req.user.id) { res.status(403); throw new Error('User not authorized'); } await Job.findByIdAndDelete(req.params.id); res.status(200).json({ success: true, message: 'Job removed' }); } catch (error) { next(error); } };