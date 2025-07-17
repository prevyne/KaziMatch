import axios from 'axios';

export const getAllJobs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`/api/jobs?${params}`);
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await axios.get(`/api/jobs/${jobId}`);
  return response.data;
};

export const getMyJobs = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get('/api/jobs/myjobs', config);
  return response.data;
};

// New function to create a job posting
export const createJob = async (jobData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post('/api/jobs', jobData, config);
  return response.data;
};