import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
});

export const addVehicleAPI = async (formData) => {
  const response = await axios.post(`${API_URL}/vehicles/add`, formData, {
    ...getAuthHeader(),
    headers: { ...getAuthHeader().headers, 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getVehiclesAPI = async (filters) => {
  const response = await axios.get(`${API_URL}/vehicles`, { params: filters });
  return response.data;
};

export const getOwnerVehiclesAPI = async () => {
  const response = await axios.get(`${API_URL}/vehicles/owner`, getAuthHeader());
  return response.data;
};

export const updateVehicleAPI = async (vehicleId, formData) => {
  const response = await axios.put(`${API_URL}/vehicles/${vehicleId}`, formData, {
    ...getAuthHeader(),
    headers: { ...getAuthHeader().headers, 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteVehicleAPI = async (vehicleId) => {
  const response = await axios.delete(`${API_URL}/vehicles/${vehicleId}`, getAuthHeader());
  return response.data;
};

export const submitRatingAPI = async (bookingId, ratingData) => {
  const response = await axios.post(`${API_URL}/vehicles/${bookingId}/rate-vehicle`, ratingData, getAuthHeader());
  return response.data;
};

export const approveVehicleAPI = async (vehicleId, approval) => {
  const response = await axios.put(`${API_URL}/vehicles/${vehicleId}/approve`, { approval }, getAuthHeader());
  return response.data;
};

export const getAllVehiclesAPI = async () => {
  const response = await axios.get(`${API_URL}/vehicles`, getAuthHeader());
  return response.data;
};
export const getVehicleAPI = async (vehicleId) => {
  const response = await axios.get(`${API_URL}/vehicles/${vehicleId}`, getAuthHeader());
  return response.data;
};