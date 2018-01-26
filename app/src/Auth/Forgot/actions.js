import axios from 'axios';

function testAction(test) {
  return {
    type: 'TEST_ACTION_LOGIN',
    payload: { test },
  };
}

function forgot(url, params) {
  return {
    type: 'FORGOT',
    payload: { url, params },
  };
}

export default {
  testAction,
  forgot,
};
