import axios from 'axios';

export const applyForJob = async (jobId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(`/api/applications/${jobId}`, null, config);
  return response.data;
};

export const getMyApplications = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get('/api/applications/seeker/me', config);
  return response.data;
};

// Gets all applicants for a specific job. Requires employer's token.
export const getApplicantsForJob = async (jobId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`/api/applications/job/${jobId}`, config);
  return response.data;
};