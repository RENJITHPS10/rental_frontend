import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
});



export const confirmDriverAssignmentAPI = async (bookingId) => {
  const response = await axios.post(`${API_URL}/drivers/${bookingId}/confirm`, {}, getAuthHeader());
  return response.data;
};

export const completePickupDropAPI = async (bookingId) => {
  const response = await axios.post(`${API_URL}/drivers/${bookingId}/complete`, {}, getAuthHeader());
  return response.data;
};

export const reportConditionAPI = async (bookingId, conditionData) => {
  const response = await axios.post(`${API_URL}/drivers/${bookingId}/report`, conditionData, {
    ...getAuthHeader(),
    headers: { ...getAuthHeader().headers, 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getDriverEarningsAPI = async () => {
  const response = await axios.get(`${API_URL}/drivers/earnings`, getAuthHeader());
  return response.data;
};

export const rateDriverAPI = async (bookingId, ratingData) => {
  const response = await axios.post(`${API_URL}/drivers/${bookingId}/rate`, ratingData, getAuthHeader());
  return response.data;
};

export const getCarLocationAPI = async (bookingId) => {
  const response = await axios.get(`${API_URL}/drivers/${bookingId}/location`, getAuthHeader());
  return response.data;
};

export const updateCarLocationAPI = async (bookingId, locationData) => {
  const response = await axios.put(`${API_URL}/drivers/${bookingId}/location`, locationData, getAuthHeader());
  return response.data;
};

export const getDriverReviewsAPI = async () => {
  const response = await axios.get(`${API_URL}/drivers/reviews`, getAuthHeader());
  return response.data;
};
export const getDriverProfileAPI = async () => { // No userId needed, backend uses req.user.id
  const response = await axios.get(`${API_URL}/drivers/profile`, getAuthHeader());
  console.log(response.data)
  return response.data;
};

// Update driver profile
export const updateDriverAPI = async ({ driverId, location, availability }) => {
  const response = await axios.put(
    `${API_URL}/drivers/${driverId}`,
    { location, availability },
    getAuthHeader()
  );
  return response.data;
};