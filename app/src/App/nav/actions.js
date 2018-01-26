function testAction(test) {
  return {
    type: 'TEST_ACTION',
    payload: { test },
  };
}

function testAction2(test) {
  return {
    type: 'TEST_ACTION2',
    payload: { test },
  };
}

export default {
  testAction,
  testAction2,
};
