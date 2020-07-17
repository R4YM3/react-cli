import React from 'react';
import {Program} from '../Program';
import Package from '../../../package.json';
import {IInterpretedCommand} from '../../types';
import TextWrapper from '../../components/common/text/Text';

export default new Program({
  name: 'whoami',
  description: 'tells something about whoami',
  version: '1',
  defaultCommand: {
    name: 'info',
    abbreviation: 'i',
    description: 'returns some information',
    execute(interpretedCommand: IInterpretedCommand) {
      return (
        <TextWrapper>
          Spare time project of Raymond Schweers.<br/>
          To explore, learn and seek new technologies and by doing so creating a handy<br/>
          command line interface build with: TypeScript, React, and Sass.<br/>
          version: {Package.version}
        </TextWrapper>
      );
    },
  },
  commands: [
    {
      name: 'test',
      abbreviation: 't',
      description: 'tells something about this application',
      execute(interpretedCommand: IInterpretedCommand) {
        return (<TextWrapper>test runned..</TextWrapper>)
      },
    },
  ],
});
