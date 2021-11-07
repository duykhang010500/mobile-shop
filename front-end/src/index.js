import React from 'react';
import ReactDOM from 'react-dom';
import './assets/less/app.less'
import 'quill/dist/quill.snow.css';
import './configs/messageConfig'

import App from './App';

import {
  BrowserRouter
} from 'react-router-dom'

import {
  Provider
} from 'react-redux'

import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


