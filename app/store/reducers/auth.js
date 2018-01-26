import initialState from './initialState';

export default (state = initialState.auth, action) => {
  switch (action.type) {
  case 'TEST_ACTION_LOGIN': {
    return {
      ...state,
      test: action.payload.test,
    };
  }

  case 'LOGIN': {
    return {
      ...state,
      params: action.payload.params,
      url: action.payload.url,
    };
  }

  case 'REGISTER': {
    return {
      ...state,
      params: action.payload.params,
      url: action.payload.url,
    };
  }

  case 'FORGOT': {
    return {
      ...state,
      params: action.payload.params,
      url: action.payload.url,
    };
  }

  default: return state;
  }
};
