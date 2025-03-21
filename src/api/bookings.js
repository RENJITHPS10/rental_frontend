import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
});

export const createBookingAPI = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData, getAuthHeader());
  return response.data;
};

export const getCustomerBookingsAPI = async () => {
  const response = await axios.get(`${API_URL}/bookings`, getAuthHeader());
    return response.data;
};
export const getOwnerBookingsAPI = async () => {
  const response = await axios.get(`${API_URL}/bookings`, getAuthHeader());
    return response.data;
};

export const cancelBookingAPI = async (bookingId) => {
  const response = await axios.put(`${API_URL}/bookings/${bookingId}/cancel`, {}, getAuthHeader());
  return response.data;
};

export const confirmDriverAPI = async (bookingId) => {
  const response = await axios.put(`${API_URL}/bookings/${bookingId}/confirm-driver`, {}, getAuthHeader());
  return response.data;
};

export const submitConditionReportAPI = async (bookingId, conditionData) => {
  const response = await axios.post(`${API_URL}/bookings/${bookingId}/condition-report`, conditionData, {
    ...getAuthHeader(),
    headers: { ...getAuthHeader().headers, 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// ../../api/bookings.js
export const getBookingByIdAPI = async (bookingId) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/${bookingId}`, getAuthHeader());
    console.log('API Response:', response.data); // Debug
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};
export const approveBookingAPI = async (bookingId, approval) => {
  const response = await axios.put(`${API_URL}/bookings/${bookingId}/approve`, { approval }, getAuthHeader());
  return response.data;
};

export const getDriverBookingsAPI = async () => {
  const response = await axios.get(`${API_URL}/drivers/bookings`, getAuthHeader());
  return response.data;
};

export const makePaymentAPI = async ({ bookingId, paymentMethodId }) => {
  const response = await axios.post(
    `${API_URL}/payments/${bookingId}`, // Match backend route
    { bookingId, paymentMethodId },
    getAuthHeader()
  );
  return response.data;
};
export const submitRatingAPI = async (bookingId, ratingData) => {
  const response = await axios.post(`${API_URL}/vehicles/${bookingId}/rate`, ratingData, getAuthHeader());
  return response.data;
};

export const cancelDriverRequestAPI = async (bookingId) => {
  const response = await axios.put(
    `${API_URL}/bookings/${bookingId}/cancel-driver`,
    {},
    getAuthHeader()
  );
  return response.data;
};
