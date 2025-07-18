import api from './axiosConfig';

// Updates the logged-in user's profile
export const updateUserProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.put('/api/users/profile', profileData, config);
  return response.data;
};