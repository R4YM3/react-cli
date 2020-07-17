import React from 'react';
import Command from '../components/common/command/Command';

export default {
  title: 'Command',
  component: Command,
};

export const Suggestion = () => (
  <Command value="npm run d" suggestion="npm run dev" />
);

export const Hint = () => (
  <Command value="npm run d" suggestion="npm run dev" />
);
