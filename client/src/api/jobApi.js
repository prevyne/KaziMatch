import axios from 'axios';

// The browser automatically sends the auth cookie, so no token is needed here.
export const getAllJobs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`/api/jobs?${params}`);
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await axios.get(`/api/jobs/${jobId}`);
  return response.data;
};

// The token is still needed for routes that require it in the header,
// but for cookie-based auth, it's often managed automatically.
export const getMyJobs = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get('/api/jobs/myjobs', config);
  return response.data;
};

export const createJob = async (jobData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post('/api/jobs', jobData, config);
  return response.data;
};