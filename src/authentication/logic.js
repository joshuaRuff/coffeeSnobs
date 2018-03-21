import { kea } from 'kea';
import { put } from 'redux-saga/effects';
import PropTypes from 'prop-types';
import api from 'common/api';

export default kea({

  path: () => ['app', 'auth', 'user'],

  actions: () => ({
    forgot: username => username,
    setForgot: message => message,
    login: (username, password, remember) => ({ username, password, remember }),
    logout: () => true,
    register: formData => formData,
    setError: (error, errorMessage) => ({ error, errorMessage }),
    setIsSubmitting: value => ({ value }),
    setLogin: (token, expires) => ({ token, expires }),
  }),

  reducers: ({ actions }) => (
    {
      isSubmitting: [
        false,
        PropTypes.bool,
        {
          [actions.setIsSubmitting]: (state, payload) => payload.value,
        },
      ],

      error: [
        {},
        PropTypes.object,
        {
          [actions.setError]: (state, payload) => ({
            ...state,
            error: payload.error,
            errorMessage: payload.errorMessage,
          }),
        },
      ],

      login: [
        {},
        PropTypes.object,
        { persist: true },
        {
          [actions.setLogin]: (state, payload) => ({
            ...state,
            expires: payload.expires,
            token: payload.token,
          }),
        },
      ],

      forgot: [
        {},
        PropTypes.object,
        {
          [actions.setForgot]: (state, payload) => ({
            ...state,
            message: payload,
          }),
        },
      ],
    }
  ),

  // SELECTORS (data from reducer + more)
  // selectors: ({ constants, selectors }) => ({}),

  // --- Sagas --- \\

  takeLatest: ({ actions, workers }) => ({
    [actions.login]: workers.loginSubmit,
    [actions.forgot]: workers.forgotSubmit,
    [actions.logout]: workers.logout,
    [actions.register]: workers.registerSubmit,
  }),

  workers: {
    * loginSubmit(action) {
      const { setIsSubmitting, setLogin, setError } = this.actions;
      const { username, password, remember } = action.payload;

      try {
        // Restore store to defaults
        yield put(setIsSubmitting(true));
        yield put(setError(false, ''));

        // Do call to our api users endpoint
        const response = yield api.users.login('-uniqueAccountId_1', username, password, remember);
        const { expires, token } = response.data;

        // Check if user checked to remember login, if so, save it to localStorage
        if (remember) { api.users.setStorage(token, expires); }

        // Update store with token
        yield put(setIsSubmitting(false));
        yield put(setLogin(token, expires));
      } catch (err) {
        // Check if normal response message exist, if not, return the whole error
        const errorMessage = err.response.data.message || err;

        // Update store with error message
        yield put(setIsSubmitting(false));
        yield put(setError(true, errorMessage));
      }
    },

    * forgotSubmit(action) {
      const { setError, setForgot, setIsSubmitting } = this.actions;
      const username = action.payload;

      try {
        // Restore store to defaults
        yield put(setIsSubmitting(true));
        yield put(setError(false, ''));

        // Do call to our api users endpoint
        const response = yield api.users.forgot('-uniqueAccountId_1', username);

        // Update store with success message
        yield put(setIsSubmitting(false));
        yield put(setForgot(response.data.message));
      } catch (err) {
        const errorMessage = err.response.data.message || err;
        yield put(setIsSubmitting(false));
        yield put(setError(true, errorMessage));
      }
    },

    * logout() {
      const { setLogin } = this.actions;

      try {
        api.users.logout();
        yield put(setLogin('', ''));
      } catch (err) {
        console.log(err);
      }
    },

    * registerSubmit(action) {
      const { setError, setLogin, setIsSubmitting } = this.actions;
      try {
        // Restore store to defaults
        yield put(setIsSubmitting(true));
        yield put(setError(false, ''));

        // Do call to our api users endpoint
        const response = yield api.users.register('-uniqueAccountId_1', action.payload);
        const { expires, token } = response.data;

        // Update store with success message
        yield put(setIsSubmitting(false));
        yield put(setLogin(token, expires));
      } catch (err) {
        const errorMessage = err.response.data.message || err;
        yield put(setIsSubmitting(false));
        yield put(setError(true, errorMessage));
      }
    },
  },

  // --- End Sags --- \\

});
