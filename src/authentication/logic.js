import { kea } from 'kea';
import PropTypes from 'prop-types';
// import { routeSelector } from '/store.js';

export default kea({
  path: () => ['auth', 'user'],

  actions: ({ constants }) => ({
    loginSuccess: value => ({ value }),
    loginError: value => ({ value }),
    forgot: value => ({ value }),
    register: value => ({ value }),
    login: true,
    submit: true,
    submitSuccess: true,
    submitFailure: true,
  }),

  reducers: ({ actions }) => ({
    login: [
      {},
      PropTypes.object,
      { persist: true },
      {
        [actions.loginSuccess]: (state, payload) => {
          const { expires, token } = payload;
          return {
            ...state,
            error: '',
            expires: expires,
            token: token,
          };
        },
      },
    ],
    isSubmitting: [
      false,
      PropTypes.bool,
      {
        [actions.submit]: () => true,
        [actions.submitSuccess]: () => false,
        [actions.submitFailure]: () => false,
      },
    ],
  }),

  // SELECTORS (data from reducer + more)
  selectors: ({ constants, selectors }) => ({}),

  // Sagas: takeLatest
  // Run the following workers every time the action is dispatched,
  // cancel the previous worker if still running Note: sagas are
  // started before your wrapped component's componentDidMount.
  // Actions dispatched before this lifecycle method will not be
  // seen by takeLatest.
  takeLatest: ({ actions, workers }) => ({
    [actions.login]: function* () {
      const { submitSuccess, submitFailure } = this.actions;

      // get the form data...
      const values = yield this.get('values');
      console.log('Submitting form with values:', values);

      // simulate a 1sec async request.
      yield delay(1000);

      if (true) {
        // if the request was successful
        window.alert('Success');
        yield put(submitSuccess());
      } else {
        window.alert('Error');
        yield put(submitFailure());
      }
    },
  }),
});
