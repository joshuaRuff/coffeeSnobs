function testAction(test) {
  return {
    type: 'TEST_ACTION_LOGIN',
    payload: { test },
  };
}

export default {
  testAction,
};
