import initialState from './initialState';

export default (state = initialState.auth, action) => {
  switch (action.type) {
  case 'TEST_ACTION_LOGIN': {
    return {
      ...state,
      test: action.payload.test,
    };
  }

  case 'LOGIN_SUCCESS': {
    return {
      ...state,
      error: '',
      expires: action.payload.expires,
      token: action.payload.token,
    };
  }

  case 'LOGIN_ERROR': {
    return {
      ...state,
      error: action.payload.error,
    };
  }

  case 'LOGOUT': {
    return {
      ...state,
      token: '',
      expires: '',
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
