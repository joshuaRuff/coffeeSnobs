function testAction(test) {
  return {
    type: 'TEST_ACTION_LOGIN',
    payload: { test },
  };
}

function register(url, params) {
  return {
    type: 'REGISTER',
    payload: { url, params },
  };
}

export default {
  testAction,
  register,
};
