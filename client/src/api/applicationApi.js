import api from './axiosConfig';

export const applyForJob = async (jobId) => {
  const response = await api.post(`/applications/${jobId}`, null);
  return response.data;
};
export const getMyApplications = async () => {
  const response = await api.get('/applications/seeker/me');
  return response.data;
};
export const getApplicantsForJob = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);
  return response.data;
};