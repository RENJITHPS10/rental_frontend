import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
});

export const getOwnerEarningsAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/owners/earnings`, getAuthHeader());
    console.log('Owner Earnings Response:', response.data); // Debug
    return response.data;
  } catch (error) {
    console.error('Owner Earnings Error:', error.response?.data || error.message);
    throw error;
  }
};

export const getOwnerReviewsAPI = async () => {
  const response = await axios.get(`${API_URL}/vehicles/owner/reviews`, getAuthHeader());
  return response.data;
};