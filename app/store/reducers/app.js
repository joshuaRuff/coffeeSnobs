import initialState from './initialState';

export default (state = initialState.app, action) => {
  switch (action.type) {
  case 'TEST_ACTION': {
    return {
      ...state,
      test: action.payload.test,
    };
  }

  case 'TEST_ACTION2': {
    return {
      ...state,
      test: 'success2',
    };
  }

  default: return state;
  }
};
