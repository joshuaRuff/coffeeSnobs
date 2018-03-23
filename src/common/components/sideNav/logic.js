import { kea } from 'kea';
import PropTypes from 'prop-types';

export default kea({
  // Location in Redux tree
  key: props => props.id,
  path: key => ['app', 'sideNav', key],

  // Simplified Actions
  actions: () => ({
    toggle: toggle => ({ toggle }),
  }),

  // Reducer Logic
  reducers: ({ actions, key }) => ({
    collapsed: [
      false,
      PropTypes.bool,
      {
        [actions.toggle]: (state, payload) => {
          if (payload.key === key) { return !state; }
          return state;
        },
      },
    ],
  }),
});
