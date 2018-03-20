import axios from 'axios';
import config from './config';

const forgot = (accountId, username) => {
  const url = `${config.apiUrl}/user/${accountId}/forgot?apikey=${config.apikey}`;
  return axios.post(url, { username });
};

const login = (accountId, username, password) => {
  const url = `${config.apiUrl}/user/${accountId}/login?apikey=${config.apikey}`;
  return axios.post(url, { username, password });
};

const setStorage = (token, exp) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expires', exp);
};

const logout = () => {
  localStorage.setItem('token', '');
  localStorage.setItem('expires', '');
};

export default {
  forgot,
  login,
  logout,
  setStorage,
};
