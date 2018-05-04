import axios from 'axios';
import config from './config';

const forgot = (accountId, username) => {
  const url = `${config.apiUrl}/user/${accountId}/forgot?apikey=${config.apikey}`;
  return axios.post(url, { username });
};

const login = (accountId, username, password) => {
  const url = `${config.apiUrl}/user/${accountId}/login?apikey=${config.apikey}&profile=true`;
  return axios.post(url, { username, password });
};

const getProfile = (accountId, token) => {
  const url = `${config.apiUrl}/user/${accountId}/profile?apikey=${config.apikey}`;
  return axios({ url, method: 'get', headers: { Authorization: token } });
};

const getUser = (accountId, token, uid) => {
  const url = `${config.apiUrl}/user/${accountId}/${uid}?apikey=${config.apikey}&scp=true`;
  return axios({ url, method: 'get', headers: { Authorization: token } });
};

const getUsers = (accountId, token, nextPageKey) => {
  const nextPageQuery = (nextPageKey) ? `&nextPage=${nextPageKey}` : '';
  const url = `${config.apiUrl}/user/${accountId}/query?apikey=${config.apikey}&scp=true&limit=50&attributes=email,uid,metadata${nextPageQuery}`;
  return axios({ url, method: 'get', headers: { Authorization: token } });
};

const queryUsers = (accountId, token, dynamoKey, value) => {
  const url = `${config.apiUrl}/user/${accountId}/query?apikey=${config.apikey}&scp=true&filter=${dynamoKey}&contains=${value}&attributes=email,uid,metadata`;
  return axios({ url, method: 'get', headers: { Authorization: token } });
};

const register = (accountId, params) => {
  const postParams = {
    username: params.email || '',
    password: params.password || '',
    firstName: params.firstName || '',
    lastName: params.lastName || '',
    metadata: params.metadata || {},
  };
  const url = `${config.apiUrl}/user/${accountId}/register?apikey=${config.apikey}`;
  return axios.post(url, postParams);
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
  getProfile,
  getUser,
  getUsers,
  login,
  logout,
  queryUsers,
  register,
  setStorage,
};
