import React from 'react';
import modules from './programs';
import {decodeRawCommandValue} from '../helpers/interpreter';
import {IInterpretedCommand, IRawCommand} from '../types';

// program [command] [-argrumentKey agrumentValue] [subcommand] [--agrumentKey agrumentValue] [subsubcommand]
export default (rawCommandValue: IRawCommand): string | React.ReactNode => {
  if (!rawCommandValue) return '';

  const command = decodeRawCommandValue(rawCommandValue);

  if (!command.program || command.program === '') {
    return '';
  }

  return interpret(command);
};

function interpret(interpretedCommand: IInterpretedCommand): string | React.ReactNode{
  const module = modules.find(
    module => module.program === interpretedCommand.program,
  );

  if (!module) {
    return notValidCommand(interpretedCommand);
  }

  return module.execute(interpretedCommand);
}

export function notValidCommand(command: IInterpretedCommand): string {
  return `command not found: ${command.program}`;
}
