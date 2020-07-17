import React, {useRef} from 'react';
import {useShell} from '../../../hooks/useShell';
import History from '../history/History';
import Command from '../command/Command';
import IconButton from '../iconButton/IconButton';

import './shell.scss';

interface IProps {
  shellIndex: number;
}

export default ({shellIndex}: IProps) => {
  const historyRef = useRef(null);
  const {removeShellByIndex, getShellTitle, setShellName} = useShell()!;
  const shellTitle = getShellTitle(shellIndex);

  function handleChange(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setShellName(shellIndex, event.target.value);
  }

  return (
    <article className="shell border-color">
      <header className="shell__header">
        <h3 className="shell__title border-color">
          <input
            className="text-center width-100"
            type="text"
            value={shellTitle}
            onChange={handleChange}
          />
        </h3>
        <div className="shell__header__right">
          <IconButton onClick={() => removeShellByIndex(shellIndex)}>
            ✕
          </IconButton>
        </div>
      </header>
      <History shellIndex={shellIndex} historyRef={historyRef} />
      <Command shellIndex={shellIndex} historyRef={historyRef} />
    </article>
  );
};
