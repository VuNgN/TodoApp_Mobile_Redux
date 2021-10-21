import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import todoReducer from '../reducer/reducer';

const reducers = combineReducers({
  todos: todoReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers();

// other store enhancers if any

export default createStore(reducers, enhancer);
