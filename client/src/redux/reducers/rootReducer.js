// Import necessary dependencies
import { combineReducers } from 'redux';
import rentalReducer from './rentalReducer';

// Combine reducers
const rootReducer = combineReducers({
  rental: rentalReducer,
});

export default rootReducer;