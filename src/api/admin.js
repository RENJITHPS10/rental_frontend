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

export const assignDriverAPI = async (bookingId, driverId) => {
  const response = await axios.post(`${API_URL}/drivers/${bookingId}/assign`, { driverId }, getAuthHeader());
  return response.data;
};


export const getAvailableDriversAPI = async (bookingId) => {
  const response = await axios.get(`${API_URL}/drivers/available`, {
    ...getAuthHeader(),
    params: { bookingId },
  });
  return response.data;
};

export const getUnverifiedUsersAPI = async () => {
  const response = await axios.get(`${API_URL}/admin/users/unverified`, getAuthHeader());

  return response.data;
  
};

// Verify user license
export const verifyUserLicenseAPI = async (userId, approve, rejectionReason) => {
  const response = await axios.put(
    `${API_URL}/admin/users/${userId}/verify`,
    { approve, rejectionReason },
    getAuthHeader()
  );
  return response.data;
};

export const fetchConditionReportsAPI = async (bookingId = '') => {
  const url = bookingId
    ? `${API_URL}/admin/condition-reports?bookingId=${bookingId}`
    : `${API_URL}/admin/condition-reports`;
  try {
    const response = await axios.get(url, getAuthHeader());
    console.log('API Response:', response.data); // Debug full response
    return response.data.reports;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};
export const getAllPaymentsAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/payments`, getAuthHeader());
    console.log('Get All Payments Response:', response.data); // Debug
    return response.data.payments; // Return the payments array
  } catch (error) {
    console.error('Get All Payments Error:', error.response?.data || error.message);
    throw error;
  }
};