import {Program} from '../Program';
import {IInterpretedCommand} from '../../types';

export default new Program({
  name: 'author',
  description: 'tells something about an author',
  version: '1',
  commands: [
    {
      name: 'btw',
      description: 'return btw number',
      hidden: true,
      execute(interpretedCommand: IInterpretedCommand) {
        return '12345667';
      },
    },
    {
      name: 'iban',
      description: 'return IBAN number',
      hidden: true,
      execute(interpretedCommand: IInterpretedCommand) {
        return '1234 5678 1234';
      },
    },
    {
      name: 'raymond',
      description: 'Tells something about Raymond Schweers',
      hidden: true,
      execute(interpretedCommand: IInterpretedCommand) {
        return 'it\'s me!';
      },
    }
  ],
});
