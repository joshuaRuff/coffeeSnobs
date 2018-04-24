import axios from 'axios';
import config from './config';

const getUserAccounts = (token) => {
  const url = `${config.apiUrl}/accounts/user?apikey=${config.apikey}&scp=true`;
  return axios({ url, method: 'get', headers: { Authorization: token } });
};

export default {
  getUserAccounts,
};
