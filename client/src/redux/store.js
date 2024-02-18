import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';

const rootReducer = combineReducers({
  carsReducer,
 alertsReducer,
 bookingsReducer,

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
