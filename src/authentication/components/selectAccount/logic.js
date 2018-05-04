import { kea } from 'kea';
import { put } from 'redux-saga/effects';
import PropTypes from 'prop-types';
import { accountsApi, pagesApi } from 'common/api';

import authenicationLogic from 'authentication/logic';

export default kea({

  path: () => ['app', 'auth', 'accounts'],

  actions: () => ({
    getAccounts: token => token,
    selectAccount: accountId => accountId,
    setSelectedAccount: accountInfo => accountInfo,
    setAccounts: accountList => accountList,
  }),

  reducers: ({ actions }) => (
    {
      accounts: [
        {},
        PropTypes.object,
        {
          [actions.setAccounts]: (state, payload) => payload,
        },
      ],
      selectedAccount: [
        {},
        PropTypes.object,
        {
          [actions.setSelectedAccount]: (state, payload) => payload,
        },
      ],
    }
  ),

  // SELECTORS (data from reducer + more)
  selectors: ({ selectors }) => ({
    accounts: [() => [selectors.accounts], accounts => accounts],
    login: [() => [authenicationLogic.selectors.login], login => login],
  }),

  // --- Sagas --- \\

  takeLatest: ({ actions, workers }) => ({
    [actions.getAccounts]: workers.getAccounts,
    [actions.selectAccount]: workers.selectAccount,
  }),

  workers: {

    * getAccounts() {
      const { setAccounts, selectAccount } = this.actions;
      try {
        const login = yield this.get('login');
        if (login.token) {
          const accountList = yield accountsApi.getUserAccounts(login.token);
          yield put(setAccounts(accountList.data));
          const accounts = Object.keys(accountList.data);
          yield put(selectAccount(accounts[0]));
        } else { throw Error('Missing token for getAccounts'); }
      } catch (err) {
        console.log(err);
      }
    },

    * selectAccount(action) {
      const { setSelectedAccount } = this.actions;
      const accountId = action.payload;
      try {
        const accounts = yield this.get('accounts');
        const account = accounts[accountId] || {};
        account.id = accountId;
        yield put(setSelectedAccount(account));
      } catch (err) {
        console.log(err);
      }
    },
  },

  // --- End Sags --- \\

});
