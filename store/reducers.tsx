import { combineReducers } from 'redux';

const counterReducer = (state = 0, action: { type: any; }) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: counterReducer,
  // Add other reducers here
});

export default rootReducer;
