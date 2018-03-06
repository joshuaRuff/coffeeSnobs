function testAction(test) {
  return {
    type: 'TEST_ACTION_LOGIN',
    payload: { test },
  };
}

function selectAccount(accountId) {
  return {
    type: 'SELECT_ACCOUNT',
    payload: { accountId },
  };
}

export default {
  testAction,
  selectAccount,
};
