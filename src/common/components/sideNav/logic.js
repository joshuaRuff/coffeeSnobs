import { kea } from 'kea';
import PropTypes from 'prop-types';

export default kea({
  // Location in Redux tree
  key: props => props.id,
  path: key => ['app', 'sideNav', key],

  // Simplified Actions
  actions: () => ({
    addMenuItems: items => ({ items }),
    removeMenuItems: items => ({ items }),
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
    menuItems: [
      [],
      PropTypes.array,
      {
        [actions.addMenuItems]: (state, payload) => {
          if (payload.key === key.key) { return !state; }
          const { items } = payload;
          const itemKeys = Object.keys(items);
          const menuItems = [...state];

          for (let i = 0; i < itemKeys.length; i += 1) {
            menuItems[itemKeys[i]] = items[itemKeys[i]];
          }

          return menuItems;
        },
        [actions.removeMenuItems]: (state, payload) => {
          if (payload.key === key.key) { return !state; }
          const { items } = payload;
          const itemKeys = Object.keys(items);
          const menuItems = [...state];
          for (let i = 0; i < itemKeys.length; i += 1) {
            if (menuItems[itemKeys[i]]) {
              delete menuItems[itemKeys[i]];
            }
          }
          return menuItems;
        },
      },
    ],
  }),
});
