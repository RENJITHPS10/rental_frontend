// src/api/support.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
});

export const createSupportTicketAPI = async (ticketData) => {
  const response = await axios.post(`${API_URL}/support`, ticketData, getAuthHeader());
  console.log('Create Ticket Response:', response);
  return response.data;
};

export const getSupportTicketsAPI = async () => {
  const response = await axios.get(`${API_URL}/support`, getAuthHeader());
  console.log(response.data)
  return response.data || []; // For admin or all tickets (if applicable)
};

export const resolveSupportTicketAPI = async (ticketId, resolution) => {
  const response = await axios.put(`${API_URL}/support/${ticketId}/resolve`, { resolution }, getAuthHeader());
  return response.data;
};

export const getCustomerSupportTicketsAPI = async () => {
  const response = await axios.get(`${API_URL}/support/tickets`, getAuthHeader());
  return response.data.tickets || []; // Ensure array return for customer tickets
};