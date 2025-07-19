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

// New function to update status
export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.put(`/applications/${applicationId}`, { status });
  return response.data;
};

// New function to delete application
export const deleteApplication = async (applicationId) => {
  const response = await api.delete(`/applications/${applicationId}`);
  return response.data;
};