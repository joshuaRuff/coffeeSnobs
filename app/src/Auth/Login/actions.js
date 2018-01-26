import axios from 'axios';

function testAction(test) {
  return {
    type: 'TEST_ACTION_LOGIN',
    payload: { test },
  };
}

function login(url, params) {
  return {
    type: 'LOGIN',
    payload: { url, params },
  };
}

export default {
  testAction,
  login,
};
