import initialState from './initialState';

export default (state = initialState.app, action) => {
  switch (action.type) {
  case 'TEST_ACTION': {
    return {
      ...state,
      test: action.payload.test,
    };
  }

  case 'SELECT_ACCOUNT': {
    return {
      ...state,
      accountId: action.payload.accountId,
    };
  }

  case 'GET_TEMPLATES_SUCCESS': {
    return {
      ...state,
      templates: action.payload.data,
      templatesFetched: true,
    };
  }

  case 'GET_TEMPLATES_ERROR': {
    return {
      ...state,
      templatesError: action.payload.e,
      templatesFetched: true,
    };
  }

  case 'GET_LAYOUTS_SUCCESS': {
    return {
      ...state,
      layouts: action.payload.data,
      layoutsFetched: true,
    };
  }

  case 'GET_LAYOUTS_ERROR': {
    return {
      ...state,
      layoutsError: action.payload.e,
      layoutsFetched: true,
    };
  }

  case 'CAPTURE_TEMPLATE': {
    const selectedTemplate = action.payload;
    return {
      ...state,
      selectedTemplate,
    };
  }

  case 'UPDATE_TEMPLATE': {
    const { templates, layouts } = { ...state };
    const { template } = action.payload;
    if (template.templateId) {
      templates[template.templateId] = template;
    } else if (template.layoutId) {
      layouts[template.layoutId] = template;
    }
    return {
      ...state,
      layouts,
      templates,
    };
  }

  case 'DELETE_TEMPLATE': {
    const { templates, layouts } = { ...state };
    if (action.payload.template) {
      delete templates[action.payload.template];
    } else if (action.payload.layout) {
      delete layouts[action.payload.layout];
    }
    return {
      ...state,
      layouts,
      templates,
    };
  }

  default: return state;
  }
};
