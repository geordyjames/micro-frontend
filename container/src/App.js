import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/" render={() => <MarketingLazy />} exact={true} />
              <Route path="/pricing" render={() => <MarketingLazy />} />
              <Route
                path="/dashboard"
                render={() =>
                  !isSignedIn ? (
                    <Redirect to="/auth/signin" />
                  ) : (
                    <DashboardLazy />
                  )
                }
              />
              <Route
                path="/auth"
                render={() => (
                  <AuthLazy
                    onSignIn={() => {
                      setIsSignedIn(true);
                    }}
                  />
                )}
              />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
