import { kea } from 'kea';
import PropTypes from 'prop-types';

export default kea({
  // Location in Redux tree
  key: props => props.id,
  path: key => ['app', 'counterDynamic', 'counter', key],

  // Simplified Actions
  actions: () => ({
    increment: amount => ({ amount }),
    decrement: amount => ({ amount }),
  }),

  // Reducer Logic
  reducers: ({ actions, key, props }) => ({
    counter: [
      0,
      PropTypes.number,
      {
        [actions.increment]: (state, payload) => (payload.key === key ? state + payload.amount : state),
        [actions.decrement]: (state, payload) => (payload.key === key ? state - payload.amount : state),
      },
    ],
  }),

  // Slectors used to only recompute when their input changes
  selectors: ({ selectors }) => ({
    doubleCounter: [() => [selectors.counter], counter => counter * 2, PropTypes.number],
  }),
});
