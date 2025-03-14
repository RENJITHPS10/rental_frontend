import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
});

export const getAllBookingsAPI = async () => {
  const response = await axios.get(`${API_URL}/admin/bookings`, getAuthHeader());
  return response.data;
};

export const getFraudulentUsersAPI = async () => {
  const response = await axios.get(`${API_URL}/admin/fraud`, getAuthHeader());
  return response.data;
};

export const getAllUsersAPI = async () => {
  const response = await axios.get(`${API_URL}/admin/users`, getAuthHeader());
  return response.data;
};

export const updateUserAPI = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/admin/users/${userId}`, userData, getAuthHeader());
  return response.data;
};

export const suspendUserAPI = async (userId, suspend) => {
  const response = await axios.put(`${API_URL}/admin/users/${userId}/suspend`, { suspend }, getAuthHeader());
  return response.data;
};
export const getUnapprovedVehiclesAPI = async () => {
  const response = await axios.get(`${API_URL}/admin/vehicles/unapproved`, getAuthHeader());
    return response.data; // Should return an array of vehicles
}

