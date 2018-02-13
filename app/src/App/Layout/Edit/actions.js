function testAction(test) {
  return {
    type: 'TEST_ACTION_LOGIN',
    payload: { test },
  };
}

function captureTemplate(params) {
  return {
    type: 'CAPTURE_TEMPLATE',
    payload: params,
  };
}

export default {
  testAction,
  captureTemplate,
};
