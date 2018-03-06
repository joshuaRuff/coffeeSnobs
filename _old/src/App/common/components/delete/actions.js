function testAction(test) {
  return {
    type: 'TEST_ACTION_LOGIN',
    payload: { test },
  };
}

function deleteTemplate(id) {
  return {
    type: 'DELETE_TEMPLATE',
    payload: id,
  };
}

export default {
  testAction,
  deleteTemplate,
};
