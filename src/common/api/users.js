import axios from 'axios';
import config from './config';

// forgot(event) {
//   const url = `${config.apiUrl}/users/forgot`;
//   const payload = {
//     email: this.state.username,
//   };
//   this.props.forgot(url, payload);
// }
//
// register(accountId, email, password) {
//   const url = `${config.apiUrl}/users/login`;
//   this.props.register(url, { email,password});
// }

const login = (accountId, username, password) => {
  const url = `${config.apiUrl}/user/${accountId}/login?apikey=${config.apikey}`;
  return axios
    .post(url, { username, password });
  // .then((response) => {
  //   // const { token, expires } = response.data;
  //   // localStorage.setItem('token', token);
  //   // localStorage.setItem('tokenExpires', expires);
  // })
  // .catch((e) => {
  //   // const error = e.response.data.message || e;
  // });
};

export default {
  login,
};
