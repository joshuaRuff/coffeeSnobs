// todos/reducer.js
import * as t from './actionTypes';

const token = getToken();
const initialState = {
  accountId: '',
  token: token.sessionToken || '',
  expires: token.sessionExpires || '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
  case t.LOGIN_SUCCESS: {
    return {
      ...state,
      error: '',
      expires: action.payload.expires,
      token: action.payload.token,
    };
  }
  case t.LOGIN_ERROR: {
    return {
      ...state,
      error: action.payload.error,
    };
  }
  case t.LOGOUT: {
    return {
      ...state,
      token: '',
      expires: '',
    };
  }
  case t.REGISTER: {
    return {
      ...state,
      params: action.payload.params,
      url: action.payload.url,
    };
  }
  case t.FORGOT: {
    return {
      ...state,
      params: action.payload.params,
      url: action.payload.url,
    };
  }
  default:
    return state;
  }
};

function getToken() {
  const sessionToken = localStorage.token;
  const sessionExpires = localStorage.tokenExpires;
  if (sessionToken && sessionExpires) {
    if (checkTime(sessionExpires)) {
      return { sessionToken, sessionExpires };
    }
  }
  return false;
}

function checkTime(dateString) {
  if (dateString) {
    try {
      const now = Date.now();
      const expires = new Date(dateString).getTime();
      if (now < expires) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }
  return false;
}
