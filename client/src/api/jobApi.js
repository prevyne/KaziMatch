import api from './axiosConfig';

export const getAllJobs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/jobs?${params}`);
  return response.data;
};
export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};
export const getMyJobs = async () => {
  const response = await api.get('/jobs/myjobs');
  return response.data;
};
export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};