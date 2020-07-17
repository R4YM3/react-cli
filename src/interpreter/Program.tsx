import React from 'react';
import {
  ICommand,
  IProgram,
  IProgramCommand,
  IInterpretedCommand,
} from '../types';
import TextWrapper, {TEXT_TYPES} from '../components/common/text/Text';

export class Program {
  public name: string;
  private description: string;
  public commands: ICommand[] = [];

  private help: ICommand;
  private info: ICommand;
  private version: ICommand;
  private defaultCommand: ICommand;

  constructor({
    name,
    description,
    version,
    defaultCommand,
    commands,
  }: IProgram) {
    this.name = name;
    this.description = description;

    this.help = {
      name: 'help',
      abbreviation: 'h',
      description: 'program help',
      execute(InterpretedCommand) {
        const commandNames = commands.reduce(
          (commandNames: string[], program: IProgramCommand) => {
            if (!program.hidden) {
              commandNames.push(program.name);
            }
            return commandNames;
          },
          [],
        );

        const commandsHelp = commandNames.length ? (
          <>
            <p>Commands available: {commandNames.toString()}</p>
            <p>
              <TextWrapper type={TEXT_TYPES.BOLD}>
                {name} {'<command>'} --help
              </TextWrapper>{' '}
              for more information about a specific command (not yet
              implemented)
            </p>
          </>
        ) : null;

        return (
          <>
            <p>
              Usage{' '}
              <TextWrapper type={TEXT_TYPES.BOLD}>
                {name} {'<command>'}
              </TextWrapper><br/>
            </p>
            <p>
              description: {description}
            </p>
            {commandsHelp}
          </>
        );
      },
    };

    this.info = {
      name: 'info',
      abbreviation: 'i',
      description: 'returns the description of the program',
      execute(interpretedCommand) {
        return description;
      },
    };

    this.version = {
      name: 'version',
      abbreviation: 'v',
      description: 'returns the current version',
      execute(interpretedCommand) {
        return version;
      },
    };

    this.defaultCommand = defaultCommand ? defaultCommand : this.help;

    this.commands = [this.help, this.info, this.version, ...commands];
  }

  private commandNotFound(interpretedCommand: IInterpretedCommand): string {
    return `command not found: ${interpretedCommand.command.name}`;
  }

  public execute(
    interpretedCommand: IInterpretedCommand,
  ): string | React.ReactNode {
    if (!interpretedCommand.command || !interpretedCommand.command.name) {
      return this.defaultCommand.execute(interpretedCommand);
    }

    const command = this.commands.find(
      (command: ICommand): boolean =>
        command.name === interpretedCommand.command.name ||
        command.abbreviation === interpretedCommand.command.name,
    );

    if (!command) {
      return this.commandNotFound(interpretedCommand);
    }

    return command.execute(interpretedCommand);
  }
}
