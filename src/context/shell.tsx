import React, {useState, createContext, ReactNode} from 'react';
import TextWrapper, {TEXT_TYPES} from '../components/common/text/Text';
import {getTimestamp} from '../helpers/time';
import {IUser} from './user';

export interface IShells {
  instances: IShell[];
}

interface IShell {
  command: ICommand;
  history: IHistory[];
  loading: boolean;
  name: string;
  selected: boolean;
}

interface ICommand {
  loading: boolean;
  suggestion: string;
  valid: boolean;
  value: string;
}

export interface IHistory {
  created: number;
  loading?: boolean;
  response: React.ReactNode | string | undefined;
  value: string;
  user?: IUser;
}

interface IActions {
  addNewShell(): void;
}

const cat = `
                   /)
          /\\___/\\ ((
          \\'@_@'/  ))
          {_:Y:.}_//
----------{_}^-'{_}----------------------`;

const initialMessage = (
  <pre>
    {cat}<br/>
    <p>
      Created to explore and learn,
      <br />
      while doing so creating a toolbelt for development
    </p>
    <p>v0.1 23.05.2020</p>
  </pre>
);

const defaultState = {
  instances: [
    {
      history: [
        {
          created: getTimestamp(),
          loading: false,
          response: initialMessage,
        },
      ],
      command: {
        loading: false,
        suggestion: '',
        valid: true,
        value: '',
      },
      loading: false,
      name: 'Shell',
      selected: false,
    },
  ],
} as IShells;

type ShellContextType = {
  state: IShells;
  setState: (value: IShells) => void;
};

export const ShellContext = createContext<ShellContextType | undefined>(
  undefined,
);

type IProps = {
  children: React.ReactNode;
};

export const ShellProvider = ({children}: IProps) => {
  const [state, setState] = useState(defaultState);

  return (
    <ShellContext.Provider value={{state, setState}}>
      {children}
    </ShellContext.Provider>
  );
};
