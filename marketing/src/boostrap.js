import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

export const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      const { pathname } = history.location;

      if (pathname !== nextPathName) {
        history.push(nextPathName);
      }
    }
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing_dev_root');

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory()
    });
  }
}
