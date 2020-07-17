import React from 'react';
import modules from './programs';
import {decodeRawCommandValue} from '../helpers/interpreter';
import {IInterpretedCommand, IRawCommand, ICommand} from '../types';

// program [command] [-argrumentKey agrumentValue] [subcommand] [--agrumentKey agrumentValue] [subsubcommand]
export default (rawCommandValue: IRawCommand): string | React.ReactNode => {
  if (!rawCommandValue) return '';

  const command = decodeRawCommandValue(rawCommandValue);

  if (!command.program || command.program === '') {
    return '';
  }

  return interpret(command);
};

function interpret(
  interpretedCommand: IInterpretedCommand,
): string | React.ReactNode {
  const module = modules.find(
    module => module.name === interpretedCommand.program,
  );

  if (!module) {
    return notValidCommand(interpretedCommand);
  }

  return module.execute(interpretedCommand);
}

export function notValidCommand(command: IInterpretedCommand): string {
  return `command not found: ${command.program}`;
}

export function getSuggestion(rawCommandValue: IRawCommand): string {
  console.log('IRawCommand', rawCommandValue);
  console.log('MODULES', modules);
  console.log('decoded', decodeRawCommandValue(rawCommandValue));

  if (!rawCommandValue) return '';
  const interpretedCommand = decodeRawCommandValue(rawCommandValue);

  let program;
  let command;
  let option;

  program = modules.find(module =>
    module.name.startsWith(interpretedCommand.program),
  );

  if (program && program.commands) {
    command = program.commands.find((cmd: ICommand) => {
      if (cmd?.hidden) {
        return rawCommandValue;
      }
      return cmd.name.startsWith(interpretedCommand.command?.name);
    });

    if (command) {
        return `${program.name} ${command.name} `;
    }

    return `${program.name} `;
  }

  // is program? search program suggestion
  // starts with - search agruments in program (when only program
  // is command? search agruments in command

  return rawCommandValue;
}
