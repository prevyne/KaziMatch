import api from './axiosConfig';

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};
export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};
export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};
export const getLoggedInUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    return null;
  }
};