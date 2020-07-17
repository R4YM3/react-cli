import React from 'react';
import ReactDOM from 'react-dom';
import './styling/global.scss';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from './context/theme';
import {UserProvider} from './context/user';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
