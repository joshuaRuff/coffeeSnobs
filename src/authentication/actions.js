// authenication/actions.js
import axios from 'axios';
import * as t from './actionTypes';

export const autologin = (token, expires) => ({
  type: t.LOGIN_SUCCESS,
  payload: { token, expires },
});

const apiUrl = '';
// forgotPasswordUrl = `${this.props.apiUrl}/users/forgot`;
// loginUrl = `${this.props.apiUrl}/user/${this.props.accountId}/login`;
// register = `${this.props.apiUrl}/users/login`;

export const login = payload => async(dispatch) => {
  try {
    const res = await axios.post(apiUrl, payload);
    const { token, expires } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpires', expires);
    dispatch({
      type: t.LOGIN_SUCCESS,
      payload: { token, expires },
    });
  } catch (e) {
    const error = e.response.data.message || e;
    dispatch({
      type: t.LOGIN_ERROR,
      payload: { error },
    });
  }
};

export const forgot = (url, params) => ({
  type: t.FORGOT,
  payload: { url, params },
});

export const register = (url, params) => ({
  type: t.REGISTER,
  payload: { url, params },
});
