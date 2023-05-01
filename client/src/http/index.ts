import axios from 'axios';
export const API_URL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});
export default $api;

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//     config.headers['Cookie'] = `token=${token}`;
//   }
//   return config;
// });

// export default api;
