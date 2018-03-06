function testAction(test) {
  return {
    type: 'TEST_ACTION_LOGIN',
    payload: { test },
  };
}

function updateTemplate(template) {
  return {
    type: 'UPDATE_TEMPLATE',
    payload: { template },
  };
}

export default {
  testAction,
  updateTemplate,
};
