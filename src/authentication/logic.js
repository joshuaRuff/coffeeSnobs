import { kea } from 'kea';
import { put } from 'redux-saga/effects';
import PropTypes from 'prop-types';
import api from 'common/api';

export default kea({
  path: () => ['app', 'auth', 'user'],

  actions: () => ({
    loginSuccess: data => ({ data }),
    loginError: error => ({ error }),
    forgot: value => ({ value }),
    register: value => ({ value }),
    login: (username, password) => ({ username, password }),
    submitFailure: error => ({ error }),
  }),

  reducers: ({ actions }) => ({
    login: [
      {},
      PropTypes.object,
      { persist: true },
      {
        [actions.loginSuccess]: (state, payload) => {
          const { expires, token } = payload.data;

          return {
            ...state,
            error: '',
            expires,
            token,
          };
        },

        [actions.loginError]: (state, payload) => {
          const { error } = payload;

          return {
            ...state,
            error,
          };
        },
      },
    ],
    isSubmitting: [
      false,
      PropTypes.bool,
      {
        [actions.login]: () => true,
        [actions.loginSuccess]: () => false,
        [actions.loginError]: () => false,
      },
    ],
  }),

  // SELECTORS (data from reducer + more)
  // selectors: ({ constants, selectors }) => ({}),

  // Sagas: takeLatest
  // Run the following workers every time the action is dispatched,
  // cancel the previous worker if still running Note: sagas are
  // started before your wrapped component's componentDidMount.
  // Actions dispatched before this lifecycle method will not be
  // seen by takeLatest.

  takeLatest: ({ actions, workers }) => ({
    [actions.login]: workers.loginSubmit,
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
  },

});
