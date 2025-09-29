const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

const createApiCall = (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  return fetch(url, config);
};

export const api = {
  register: (userData) => createApiCall('/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  login: (credentials) => createApiCall('/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  getProfile: (token) => createApiCall('/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }),

  createEnquiry: (data, token) => createApiCall('/enquiry', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  }),

  getUserEnquiries: (token) => createApiCall('/enquiries', {
    headers: { 'Authorization': `Bearer ${token}` }
  }),

  getAllEnquiries: (token) => createApiCall('/admin/enquiries', {
    headers: { 'Authorization': `Bearer ${token}` }
  }),

  updateEnquiryStatus: (id, status, token) => createApiCall(`/admin/enquiry/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
    headers: { 'Authorization': `Bearer ${token}` }
  }),

  getAllUsers: (token) => createApiCall('/admin/users', {
    headers: { 'Authorization': `Bearer ${token}` }
  }),

  deleteUser: (id, token) => createApiCall(`/admin/user/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  }),

  getAdminStats: (token) => createApiCall('/admin/stats', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
};

export default api;
