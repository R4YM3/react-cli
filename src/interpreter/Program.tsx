import React from 'react';
import {
  ICommand,
  IProgram,
  IProgramCommand,
  IInterpretedCommand,
} from '../types';
import TextWrapper, {TEXT_TYPES} from '../components/common/text/Text';

export class Program {
  public program: string;
  private description: string;
  private commands: ICommand[] = [];

  private help: ICommand;
  private info: ICommand;
  private version: ICommand;
  private defaultCommand: ICommand;

  constructor({
    program,
    description,
    version,
    defaultCommand,
    commands,
  }: IProgram) {
    this.program = program;
    this.description = description;

    this.help = {
      name: 'help',
      abbreviation: 'h',
      description: 'program help',
      execute(InterpretedCommand) {
        const commandNames = commands.reduce(
          (commandNames: string[], program: IProgramCommand) => {
            commandNames.push(program.name);
            return commandNames;
          },
          [],
        );

        return (
          <>
            <p>
              Usage <TextWrapper type={TEXT_TYPES.BOLD}>{program} {'<command>'}</TextWrapper>
            </p>
            <p>Commands available: {commandNames.toString()}</p>
            <p>
              <TextWrapper type={TEXT_TYPES.BOLD}>{program} {'<command>'} --help</TextWrapper> for more information about the specific command (not yet implemented)
            </p>
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
