import React, { useCallback, useContext, useMemo } from "react";
import DebugCommand from "../models/DebugCommand";
import DebugContext from "./DebugProvider";

export default function useDebugCommand(): {
  availableCommands: DebugCommand[],
  setCommandCallback: (commandName: DebugCommand, callback: () => void) => void,
  executeCommand: (commandName: DebugCommand) => void,
} {
  const [debugState, setDebugState] = useContext(DebugContext);
  const availableCommands = Object.keys(debugState.commands) as DebugCommand[];

  const setCommandCallbackImpl = useCallback((commandName: DebugCommand, callback: () => void) => {
    setDebugState(state => {
      const newState = {...state};
      newState.commands[commandName] = callback;
      return newState;
    });
  }, []);
  
  const executeCommandImpl = useCallback((commandName: DebugCommand) => {
    debugState.commands[commandName]();
  }, []);

  return useMemo(() => ({
    setCommandCallback: setCommandCallbackImpl,
    availableCommands,
    executeCommand: executeCommandImpl
  }), []);
}