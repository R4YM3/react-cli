import {
  IRawCommand,
  IInterpretedCommand,
  IInterpretedCommands,
  IGetCommmandsWithAgruments,
} from '../types';

export function decodeRawCommandValue(rawCommandValue: IRawCommand) {
  const parameters = rawCommandValue.split(' ') as string[];
  const program = parameters.shift() as string;

  const commandsWithAgruments = getCommandsWithAgruments(parameters).commands;
  const command = createRecursiveCommands(commandsWithAgruments);

  return {
    program,
    value: rawCommandValue,
    // @ts-ignore
    command: command.command,
  } as IInterpretedCommand;
}

function getCommandsWithAgruments(parameters: string[]) {
  return parameters.reduce(
    (response: IGetCommmandsWithAgruments, value: string, index: number) => {
      if (response.logged.find((i: number) => index === i)) {
        return response;
      }

      const commands = response.commands;

      if (value.startsWith('-') || value.startsWith('--')) {
        const {agrument, agrumentValueIndex} = getAgrument(parameters, index);
        const command = commands[response.commands.length - 1];

        command.agruments.push(agrument);

        response.logged.push(agrumentValueIndex);
        return response;
      }

      commands.push({name: parameters[index], agruments: []});
      return response;
    },
    {
      logged: [],
      commands: [],
    } as IGetCommmandsWithAgruments,
  );
}

function createRecursiveCommands(
  commandsWithAgruments: IInterpretedCommands[],
) {
  let command = {};

  let currentCommand = command;

  commandsWithAgruments.forEach(
    (commandWithAgrument: IInterpretedCommands, index: number) => {
      const depth = index + 1;

      for (let i = 0; i < depth; i++) {
        // @ts-ignore
        if (currentCommand && currentCommand.command) {
          // @ts-ignore
          currentCommand = currentCommand.command as IInterpretedCommands;
        } else {
          currentCommand = currentCommand as IInterpretedCommands;
        }
      }
      // @ts-ignore
      currentCommand.command = commandWithAgrument;
    },
  );

  return command;
}

function getAgrument(parameters: string[], keyIndex: number) {
  const agrumentKey = parameters[keyIndex].replace(/-/g, '');
  const agrumentValueIndex = keyIndex + 1;
  const agrumentValue = parameters[agrumentValueIndex];

  const agrument = {
    [agrumentKey]: agrumentValue,
  };

  return {
    agrumentValueIndex,
    agrument,
  };
}
