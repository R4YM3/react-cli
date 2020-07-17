import React from 'react';

export type IRawCommand = string;

export interface ICommand {
  name: string;
  abbreviation?: string;
  description: string;
  execute(arg0: IInterpretedCommand): string | React.ReactNode;
}

export interface IInterpretedCommand {
  program: string;
  value: string;
  command: IInterpretedCommands;
}

export interface IInterpretedCommands {
  name: string;
  agruments: IInterpretedCommandAgrument[];
  command?: IInterpretedCommands;
}

interface IInterpretedCommandAgrument {
  [id: string]: string;
}

export interface IGetCommmandsWithAgruments {
  commands:IInterpretedCommands[];
  logged: number[];
}

export interface IProgram {
  program: string;
  description: string;
  version: string;
  defaultCommand?: IProgramCommand;
  commands: IProgramCommand[];
}

export interface IProgramCommand {
  name: string;
  description: string;
  abbreviation?: string;
  hidden?: boolean;
  execute(arg0: IInterpretedCommand): string | React.ReactNode;
}
