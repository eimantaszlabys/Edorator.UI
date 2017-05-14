import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import store from './store';

import './styles/bundle.scss';


import reducers from './reducers'
import App from './containers/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));