import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import 'features/app/styles.css';
import AppContainer from 'features/app/containers/AppContainer';

import store from 'core/store';

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
, document.getElementById('root'));

// ReactDOM.render(
//   <Provider store={store}>
//     <AppContainer />
//   </Provider>, document.getElementById('root'));