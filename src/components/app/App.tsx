import React from 'react';
import cx from 'classnames';
import {useTheme} from '../../hooks/useTheme';
import Sidebar from '../common/sidebar/Sidebar';
import Shells from '../common/shells/Shells';
import {ShellProvider} from '../../context/shell';

import './App.css';

function App() {
  const {theme} = useTheme()!;

  const classnames = cx(['app', `theme--${theme}`]);

  return (
    <div className={classnames}>
      <ShellProvider>
        <Shells />
        <Sidebar />
      </ShellProvider>
    </div>
  );
}

export default App;
