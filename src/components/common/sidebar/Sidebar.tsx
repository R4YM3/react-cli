import React from 'react';
import {useShell} from '../../../hooks/useShell';
import {useTheme} from '../../../hooks/useTheme';
import IconButton from '../iconButton/IconButton';
import './Sidebar.scss';

function Sidebar() {
  const {theme, setTheme} = useTheme()!;
  const {addNewShell} = useShell()!;

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <aside className="sidebar">
      <header className="hide">
        <h5 className="hide">Website naam</h5>
      </header>

      <ul className="sidebar__top unlist">
        <li>
          <IconButton onClick={addNewShell}>✛</IconButton>
        </li>
        {/*
        <li>
          <IconButton>↭</IconButton>
        </li>
        */}
      </ul>

      <ul className="sidebar__center unlist border-color">
        <li>
          <IconButton onClick={() => setTheme(nextTheme)}>◐</IconButton>
        </li>
        {/*
        <li>
          <IconButton>⁉</IconButton>
        </li>
        <li>
          <IconButton>⇅</IconButton>
        </li>
        <li>
          <IconButton>⇥</IconButton>
        </li>i
        */}
      </ul>
    </aside>
  );
}

export default Sidebar;
