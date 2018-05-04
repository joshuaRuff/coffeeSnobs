import axios from 'axios';
import config from './config';

const getTemplateIds = (accountId, token) => {
  const url = `${config.apiUrl}/pages/${accountId}/template?apikey=${config.apikey}&scp=true&idOnly=true&restrictedOnly=true`;
  return axios({ url, method: 'get', headers: { Authorization: token } });
};

export default {
  getTemplateIds,
};
