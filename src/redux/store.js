import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from "redux-thunk"
import { carsReducer } from './reducers/carReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { reservsReducer } from './reducers/reservsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    carsReducer,
    alertsReducer,
    reservsReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
   
  )
);

export default store