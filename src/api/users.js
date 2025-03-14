import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
});

export const registerUserAPI = async (formData) => {
  const response = await axios.post(`${API_URL}/users/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const loginUserAPI = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  console.log(response.data)
  return response.data;
 
};

export const updateProfileAPI = async (formData) => {
  const response = await axios.put(`${API_URL}/users/profile`, formData, {
    ...getAuthHeader(),
    headers: { ...getAuthHeader().headers, 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getLicenseStatusAPI = async () => {
  const response = await axios.get(`${API_URL}/users/license-status`, getAuthHeader());
  return response.data;
};