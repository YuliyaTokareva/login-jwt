import { error } from 'console';
import { off } from 'process';
import { fetchLoginUser, checkAuth, logoutUser } from './formGateway';

export const SEND_FORM = 'SEND_FORM';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_ERRORS = 'GET_USER_ERRORS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const IS_LOADING = 'IS_LOADING';

export const logoutUserRecieved = () => {
  const action = {
    type: USER_LOGOUT
  };
  return action;
};
export const logadingRecieved = () => {
  const action = {
    type: IS_LOADING
  };
  return action;
};
export const loginUserRecieved = (userData) => {
  const action = {
    type: GET_USER_DATA,
    payload: {
      userData
    }
  };
  return action;
};
export const userErrors = (loginErrors) => {
  const action = {
    type: GET_USER_ERRORS,
    payload: {
      loginErrors
    }
  };
  return action;
};

export const postLoginUser = (userData) => {
  // eslint-disable-next-line
  const thunkAction = function (dispatch) {
    fetchLoginUser(userData).then((userInfo) => {
      if (userInfo.status === 200) {
        dispatch(loginUserRecieved(userInfo.data.user));
      } else {
        dispatch(userErrors(userInfo));
      }
    });
  };
  return thunkAction;
};
export const postRegisterUser = (userData) => {
  // eslint-disable-next-line
  const thunkAction = function (dispatch) {
    fetchLoginUser(userData).then((userInfo) => dispatch(loginUserRecieved(userInfo)));
  };
  return thunkAction;
};

export const refreshUser = () => {
  // eslint-disable-next-line
  const thunkAction = function (dispatch) {
    dispatch(logadingRecieved());
    checkAuth().then((userInfo) => {
      console.log(userInfo);
      if (userInfo.status === 200) {
        dispatch(loginUserRecieved(userInfo.data.user));
      } else {
        dispatch(userErrors(userInfo));
      }
    });
  };
  return thunkAction;
};
export const logOutUser = (userData) => {
  // eslint-disable-next-line
  const thunkAction = function (dispatch) {
    logoutUser(userData).then(() => dispatch(logoutUserRecieved()));
  };
  return thunkAction;
};
