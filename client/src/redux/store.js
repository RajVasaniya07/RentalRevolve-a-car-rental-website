import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
import { usersReducer } from './reducers/usersReducer';
import { sellersReducer } from './reducers/sellersReducer';
import { rentalReducer } from './reducers/rentalReducer';

const rootReducer = combineReducers({
  carsReducer,
 alertsReducer,
 bookingsReducer,
 usersReducer,
 sellersReducer,
 rentalReducer,
 

});

// Use composeWithDevTools correctly
const composeEnhancers = composeWithDevTools({
  // Specify extension options if needed
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;
