export function testAction(test) {
  return {
    type: 'TEST_ACTION_404',
    payload: { test },
  };
}

export function testAction2(test) {
  return {
    type: 'TEST_ACTION2_404',
    payload: { test },
  };
}

export default {
  testAction,
  testAction2,
};
