import React from 'react';
import Shell from '../shell/Shell';
import {useShell} from '../../../hooks/useShell';

import './shells.scss';

export default () => {
  const {state: shells} = useShell()!;

  return (
    <div className="shells">
      {shells.instances.map((shell: any, index:any) => (
        <Shell shellIndex={index} key={index} />
      ))}
    </div>
  );
};
