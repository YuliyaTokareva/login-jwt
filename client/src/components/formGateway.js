import axios from 'axios';
import $api from '../http/index';
const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchLoginUser = async (userData) => {
  try {
    const response = await $api.post('/login', userData);

    const data = response.data;

    localStorage.setItem('token', data.accessToken);
    console.log(localStorage.getItem('token'));
    console.log(data);
    return response;
  } catch (error) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message;
  }
};

export const registrationUser = async (userData) => {
  try {
    const response = await $api.post('/registration', userData);
    localStorage.setItem('token', response.data.accessToken);
    console.log(localStorage.getItem('token'));
    return response.data.user;
  } catch (error) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message;
  }
};

export const logoutUser = async () => {
  try {
    const response = await $api.post('/logout', userData);
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    return response.data.user;
  } catch (error) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message;
  }
};
const getToken = () => {
  return localStorage.getItem('token');
};
export const checkAuth = async () => {
  const token = getToken();

  try {
    const response = await axios.get(`${BASE_URL}/refresh`, {
      withCredentials: true,
      baseURL: BASE_URL,
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data;

    localStorage.setItem('token', data.accessToken);
    console.log(localStorage.getItem('token'));
    console.log(data);
    return response;
  } catch (error) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message;
  }
};
