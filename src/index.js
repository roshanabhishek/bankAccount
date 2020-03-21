import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import * as serviceWorker from './registerServiceWorker';
import theme from './theme/theme';

ReactDOM.render((
  <BrowserRouter basename="/bankAccount">
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>
), document.getElementById('root'));

// Reasons why we unregistered service worker:
// https://github.com/facebook/create-react-app/issues/2554
serviceWorker.unregister();
