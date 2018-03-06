import axios from 'axios';

function autologin(token, expires) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: { token, expires },
  };
}

function loginAction(token, expires) {
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpires', expires);
  return {
    type: 'LOGIN_SUCCESS',
    payload: { token, expires },
  };
}

function login(url, payload) {
  return async(dispatch) => {
    try {
      const res = await axios.post(url, payload);
      const { token, expires } = res.data;
      dispatch(loginAction(token, expires));
    } catch (e) {
      const error = e.response.data.message || e;
      dispatch({ type: 'LOGIN_ERROR', payload: { error } });
    }
  };
}

export default {
  autologin,
  login,
};
