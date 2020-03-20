import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import * as serviceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import theme from './theme/theme';

const loggerMiddleware = createLogger({ predicate: () => { return '__DEV__'; }, logErrors: false });

function configureStore(initialState) {
  const middlewares =  applyMiddleware(thunkMiddleware);

  const enhancer = compose(middlewares);
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore({});

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter basename="/dashboard">
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// Reasons why we unregistered service worker:
// https://github.com/facebook/create-react-app/issues/2554
serviceWorker.unregister();
