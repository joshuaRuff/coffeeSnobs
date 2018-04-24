import { kea } from 'kea';
import { put } from 'redux-saga/effects';
import PropTypes from 'prop-types';
import { accounts, users } from 'common/api';

export default kea({

  path: () => ['app', 'auth', 'user'],

  actions: () => ({
    forgot: username => username,
    getAccounts: token => token,
    getProfile: token => token,
    login: params => params,
    logout: () => true,
    register: formData => formData,
    setIsSubmitting: value => ({ value }),
    setError: (error, errorMessage) => ({ error, errorMessage }),
    setForgot: message => message,
    setLogin: (token, expires, role) => ({ token, expires, role }),
    setProfile: params => params,
    setSelectedAccount: accountId => accountId,
    setAccounts: accountList => accountList,
  }),

  reducers: ({ actions }) => (
    {

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

      isSubmitting: [
        false,
        PropTypes.bool,
        {
          [actions.setIsSubmitting]: (state, payload) => payload.value,
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

      profile: [
        {},
        PropTypes.object,
        {
          [actions.setProfile]: (state, payload) => payload,
        },
      ],

      accounts: [
        {},
        PropTypes.object,
        {
          [actions.setAccounts]: (state, payload) => payload,
        },
      ],
      selectedAccount: [
        '',
        PropTypes.string,
        {
          [actions.setSelectedAccount]: (state, payload) => payload,
        },
      ],
    }
  ),

  // SELECTORS (data from reducer + more)
  // selectors: ({ constants, selectors }) => ({}),

  // --- Sagas --- \\

  takeLatest: ({ actions, workers }) => ({
    [actions.forgot]: workers.forgotSubmit,
    [actions.getAccounts]: workers.getAccounts,
    [actions.getProfile]: workers.getProfile,
    [actions.login]: workers.loginSubmit,
    [actions.logout]: workers.logout,
    [actions.register]: workers.registerSubmit,
  }),

  workers: {

    * getAccounts(action) {
      const { setAccounts } = this.actions;
      const token = action.payload;
      try {
        const accountList = yield accounts.getUserAccounts(token);
        yield put(setAccounts(accountList.data));
      } catch (err) {
        console.log(err);
      }
    },

    * getProfile(action) {
      const { setProfile } = this.actions;
      const token = action.payload;
      try {
        const profile = yield users.getProfile('-uniqueAccountId_1', token);
        yield put(setProfile(profile.data));
      } catch (err) {
        console.log(err);
      }
    },

    * loginSubmit(action) {
      const {
        setError,
        setIsSubmitting,
        setLogin,
        setProfile,
      } = this.actions;

      const {
        userName,
        password,
        remember,
      } = action.payload;

      try {
        // Restore store to defaults
        yield put(setIsSubmitting(true));
        yield put(setError(false, ''));

        // Do call to our api users endpoint
        const response = yield users.login('-uniqueAccountId_1', userName, password);
        const { expires, token, profile } = response.data;

        // Check if user checked to remember login, if so, save it to localStorage
        if (remember) { users.setStorage(token, expires); }

        // Update store with token
        yield put(setIsSubmitting(false));
        yield put(setProfile(profile));
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
        const response = yield users.forgot('-uniqueAccountId_1', username);

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
        users.logout();
        yield put(setLogin('', '', ''));
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
        const response = yield users.register('-uniqueAccountId_1', action.payload);
        const { expires, token } = response.data;

        // Update store with success message
        yield put(setIsSubmitting(false));
        yield put(setLogin(token, expires, 'user'));
      } catch (err) {
        const errorMessage = err.response.data.message || err;
        yield put(setIsSubmitting(false));
        yield put(setError(true, errorMessage));
      }
    },
  },

  // --- End Sags --- \\

});
