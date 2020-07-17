import { Program } from '../Program';
import {IInterpretedCommand } from '../../types';

export default new Program({
  program: 'author',
  description: 'tells something about an author',
  version: '1',
  commands: [
    {
      name: 'btw',
      description: 'return btw number',
      execute(interpretedCommand : IInterpretedCommand ) {
        return '12345667';
      },
    },
    {
      name: 'iban',
      description: 'return IBAN number',
      execute(interpretedCommand: IInterpretedCommand ) {
        return '1234 5678 1234';
      },
    },
  ],
});
