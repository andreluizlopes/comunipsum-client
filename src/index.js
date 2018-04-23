import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles/';
import baseTheme from './baseTheme';
import App from './containers/app/app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AUTH_USER } from './actions/types';

import "./assets/css/main.css";

injectTapEventPlugin();
const target = document.querySelector('#root');

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  target
);