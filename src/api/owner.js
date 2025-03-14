import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
});

export const getOwnerEarningsAPI = async () => {
  const response = await axios.get(`${API_URL}/owner/earnings`, getAuthHeader());
  return response.data;
};

export const getOwnerReviewsAPI = async () => {
  const response = await axios.get(`${API_URL}/vehicles/owner/reviews`, getAuthHeader());
  return response.data;
};