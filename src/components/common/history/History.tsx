import React from 'react';
import Prompt from '../prompt/Prompt';
import {useShell} from '../../../hooks/useShell';
import {IHistory} from '../../../context/shell';

import './History.scss';

interface IProps {
  shellIndex: number;
  historyRef: any;
}

export default ({shellIndex, historyRef}: IProps, test: any) => {
  const {getShellByIndex} = useShell()!;
  const shell = getShellByIndex(shellIndex);

  return (
    <ul className="history unlist" ref={historyRef}>
      {shell.history.map((historyEntry: IHistory) => entry(historyEntry))}
    </ul>
  );
};

const entry = ({user, value, response, created}: IHistory) => {
  return (
    <li key={created}>
      {user ? <Prompt user={user} /> : null}
      {value ? <div className="history__value">{value}</div> : null}
      {response ? <div className="history__response">{response}</div> : null}
    </li>
  );
};
