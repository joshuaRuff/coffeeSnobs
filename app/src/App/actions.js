import { getWithToken } from './common/functions';

function autologin(token, expires) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: { token, expires },
  };
}

function logout() {
  localStorage.setItem('token', '');
  localStorage.setItem('tokenExpires', '');
  return {
    type: 'LOGOUT',
    payload: {},
  };
}

function getTemplates() {
  return async(dispatch, getState) => {
    try {
      const data = await getWithToken('template?idOnly=false', getState());
      dispatch({ type: 'GET_TEMPLATES_SUCCESS', payload: data });
    } catch (e) {
      dispatch({ type: 'GET_TEMPLATES_ERROR', payload: e });
    }
  };
}

function getLayouts() {
  return async(dispatch, getState) => {
    try {
      const data = await getWithToken('layout?idOnly=false', getState());
      dispatch({ type: 'GET_LAYOUTS_SUCCESS', payload: data });
    } catch (e) {
      dispatch({ type: 'GET_LAYOUTS_ERROR', payload: e });
    }
  };
}

export default {
  autologin,
  getTemplates,
  getLayouts,
  logout,
};
