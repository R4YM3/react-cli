import {useContext} from 'react';
import {ShellContext} from '../context/shell';
import {getTimestamp} from '../helpers/time';
import {useUser} from './useUser';
import interpret, {getSuggestion} from '../interpreter';

export const useShell = (): any => {
  const {state, setState} = useContext(ShellContext)!;
  const {user} = useUser()!;

  function addNewShell(): void {
    const newState = {
      ...state,
    };
    newState.instances.push({
      command: {
        loading: false,
        suggestion: '',
        valid: true,
        value: '',
      },
      history: [],
      loading: false,
      name: `untitled shell`,
      selected: false,
    });

    setState(newState);
  }

  function removeShellByIndex(index: number) {
    const newState = {
      ...state,
    };
    newState.instances.splice(index, 1);
    setState(newState);
  }

  function getShellByIndex(index: number) {
    return state.instances[index];
  }

  function getShellTitle(index: number) {
    const shell = getShellByIndex(index);
    return shell.name;
  }

  function setCommandValue(shellIndex: number, value: string) {
    const newState = {
      ...state,
    };

    newState.instances[shellIndex].command.value = value;
    newState.instances[shellIndex].command.suggestion = getSuggestion(value);
    setState(newState);
  }

  function setSuggestionAsValue(shellIndex: number) {
    const newState = {
      ...state,
    };

    const suggestion = state.instances[shellIndex].command.suggestion
    newState.instances[shellIndex].command.value = suggestion;
    setState(newState);
  }

  function setShellName(shellIndex: number, value: string) {
    const newState = {
      ...state,
    };
    newState.instances[shellIndex].name = value;
    setState(newState);
  }

  async function submitCommandValue(shellIndex: number) {
    const shell = getShellByIndex(shellIndex);

    shell.history.push({
      created: getTimestamp(),
      response: interpret(shell.command.value),
      user,
      value: shell.command.value,
    });

    shell.command.value = '';
    shell.command.suggestion = '';

    const newState = {
      ...state,
    };
    newState.instances[shellIndex] = shell;

    setState(newState);

    return Promise.resolve();
  }

  return {
    state,
    getShellByIndex,
    getShellTitle,
    addNewShell,
    removeShellByIndex,
    setCommandValue,
    setSuggestionAsValue,
    setShellName,
    submitCommandValue,
  };
};
