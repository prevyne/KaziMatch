import axios from 'axios';

export const registerUser = async (userData) => {
  const response = await axios.post('/api/auth/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post('/api/auth/login', userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post('/api/auth/logout');
  return response.data;
};

// This function checks if a user session exists by calling the /api/auth/me endpoint
export const getLoggedInUser = async () => {
  try {
    const response = await axios.get('/api/auth/me');
    return response.data;
  } catch (error) {
    // It's expected this might fail if no one is logged in, so we return null
    return null;
  }
};