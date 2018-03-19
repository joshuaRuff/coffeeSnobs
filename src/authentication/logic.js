import { kea } from 'kea';
import { put } from 'redux-saga/effects';
import PropTypes from 'prop-types';
import api from 'common/api';

const reducer = {

  forgotError: (state, payload) => ({
    ...state,
    error: true,
    errorMessage: payload,
  }),

  forgotSuccess: (state, payload) => ({
    ...state,
    message: payload,
  }),

  loginSuccess: (state, payload) => {
    const { expires, token } = payload.data;

    return {
      ...state,
      expires,
      token,
    };
  },

  loginError: (state, payload) => {
    const { error } = payload;

    return {
      ...state,
      error: true,
      errorMessage: error,
    };
  },
};

export default kea({

  path: () => ['app', 'auth', 'user'],

  actions: () => ({
    forgot: username => username,
    forgotError: error => error,
    forgotSuccess: data => data,
    login: (username, password) => ({ username, password }),
    loginSuccess: data => ({ data }),
    loginError: error => ({ error }),
    register: value => ({ value }),
    reset: username => ({ username }),
    submitFailure: error => ({ error }),
  }),

  reducers: ({ actions }) => (
    {
      isSubmitting: [
        false,
        PropTypes.bool,
        {
          [actions.forgot]: () => true,
          [actions.forgotError]: () => false,
          [actions.forgotSuccess]: () => false,
          [actions.login]: () => true,
          [actions.loginSuccess]: () => false,
          [actions.loginError]: () => false,
        },
      ],

      error: [
        {},
        PropTypes.object,
        {
          [actions.forgot]: () => ({ error: false, errorMessage: '' }),
          [actions.forgotError]: reducer.forgotError,
          [actions.login]: () => ({ error: false, errorMessage: '' }),
          [actions.loginError]: reducer.loginError,
        },
      ],

      login: [
        {},
        PropTypes.object,
        { persist: true },
        {
          [actions.loginError]: reducer.loginError,
        },
      ],

      forgot: [
        {},
        PropTypes.object,
        {
          [actions.forgotSuccess]: reducer.forgotSuccess,
        },
      ],
    }
  ),

  // SELECTORS (data from reducer + more)
  // selectors: ({ constants, selectors }) => ({}),

  // Sagas:

  takeLatest: ({ actions, workers }) => ({
    [actions.login]: workers.loginSubmit,
    [actions.forgot]: workers.forgotSubmit,
  }),

  workers: {
    * loginSubmit(action) {
      const { loginSuccess, loginError } = this.actions;
      const { username, password } = action.payload;

      try {
        const response = yield api.users.login('-uniqueAccountId_1', username, password);
        yield put(loginSuccess(response.data));
      } catch (err) {
        const error = err.response.data.message || err;
        yield put(loginError(error));
      }
    },

    * forgotSubmit(action) {
      const { forgotError, forgotSuccess } = this.actions;
      const username = action.payload;

      try {
        const response = yield api.users.forgot('-uniqueAccountId_1', username);
        yield put(forgotSuccess(response.data.message));
      } catch (err) {
        const error = err.response.data.message || err;
        yield put(forgotError(error));
      }
    },
  },

  // End Sags

});
