import React from 'react';
import {useShell} from '../../../hooks/useShell';

import './Command.scss';

export interface Props {
  shellIndex: number;
  historyRef: any;
}

export default ({shellIndex, historyRef}: Props) => {
  const {getShellByIndex, setCommandValue,setSuggestionAsValue, submitCommandValue} = useShell()!;
  const shell = getShellByIndex(shellIndex);
  const {suggestion, value} = shell.command;

  function handleValueChange(event: any) {
    setCommandValue(shellIndex, event.target.value);
  }

  function handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      event.stopPropagation();
      handleSuggestion();
    }
  }

  function handleSuggestion() {
    setSuggestionAsValue(shellIndex);
  }

  function handleSubmit() {
    submitCommandValue(shellIndex).then(scrollToBottom);
  }

  function scrollToBottom() {
    historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }

  return (
    <div className="command border-color">
      <form>
        <input
          onChange={handleValueChange}
          className="command__input"
          onKeyDown={handleKeyDown}
          type="text"
          value={value}
          autoFocus
        />
        <span className="command__indicator" />
        <input
          className="command__suggestion"
          type="text"
          readOnly
          value={suggestion}
        />
        <span className="command__hint">
          <span className="command__hint__keycap border-color">↵</span> to
          execute
        </span>
      </form>
    </div>
  );
};
