import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'; // Import your reducers if needed

const store = createStore(rootReducer); // Create the store

export default store;
