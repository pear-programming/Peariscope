import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import SplashPage from './components/splash-page';

import configureStore from './store/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={SplashPage} />
      </Router>
    </Provider>
  );
}
