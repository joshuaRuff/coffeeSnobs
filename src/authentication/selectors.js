// authentication/selectors.js
//
// Selectors provide a way to query data from the module state. While they are not
// normally named as such in a Redux project, they are always present. The first argument
// of connect is a selector in that it selects values out of the state atom, and returns
// an object representing a component’s props. Common selectors by placed in the
// `selectors.js` file so they can not only be reused within the module, but potentially
// be used by other modules in the application.
// https://jaysoo.ca/2016/02/28/applying-code-organization-rules-to-concrete-redux-code/
//

import { createSelector } from 'reselect';
import _ from 'lodash';
import { NAME } from './constants';

// export const getAll = state => state[NAME];
//
// export const getCompleted = _.compose(filterCompleted, getAll);
//
// export const getActive = _.compose(filterActive, getAll);
//
// export const getCounts = createSelector(getAll, getCompleted, getActive, (allTodos, completedTodos, activeTodos) => ({
//   all: allTodos.length,
//   completed: completedTodos.length,
//   active: activeTodos.length,
// }));
