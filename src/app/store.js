import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middlewareConfig = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewareConfig.push(logger());
}

const middleware = applyMiddleware(...middlewareConfig);

export default createStore(reducer, middleware);