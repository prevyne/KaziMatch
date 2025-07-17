import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
    },
    requirements: {
      type: [String],
      required: [true, 'Please list at least one requirement'],
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time',
    },
    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'KES' },
      period: {
        type: String,
        enum: ['per hour', 'per day', 'per month', 'per year'],
        default: 'per month',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;