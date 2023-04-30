import { error } from 'console';
import { off } from 'process';
import { fetchLoginUser, checkAuth } from './formGateway';

export const SEND_FORM = 'SEND_FORM';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_ERRORS = 'GET_USER_ERRORS';

export const postLoginForm = (isSendForm) => {
  const action = {
    type: SEND_FORM,
    payload: {
      isSendForm
    }
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
