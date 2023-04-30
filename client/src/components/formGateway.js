import axios from 'axios';
import $api from '../http/index';
const BASE_URL = process.env.REACT_APP_BASE_URL;

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

      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhNHRvbmFkb0BnbWFpbC5jb20iLCJpZCI6IjY0NDE2YWNmYzI3ZDUzZjc2NmNmY2I0YiIsImlhdCI6MTY4Mjg2MzM4MCwiZXhwIjoxNjg1NDU1MzgwfQ.s3PVxMF0qfv5dbGEjbGW4OCMxUfOqT1VaSdf8na2SDg`,
        'Content-Type': 'application/json'
      }
    });
    localStorage.setItem('token', response.data.accessToken);

    return response;
  } catch (error) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message;
  }
};
