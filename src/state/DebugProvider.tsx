import React, { Dispatch, SetStateAction } from "react";
import DebugCommand from "../models/DebugCommand";


export type DebugProviderState = {
  commands: Record<DebugCommand, () => void>,
};

export const getInitialDebugProvider = (): DebugProviderState => {
  return {
    commands: {
      'FINISH_PUZZLE_THREE_STARS': () => {},
      'COLLECT_MONEY_CHEAT': () => {},
      'FREEZE_TIME': () => {},
    }
  };
};

const DebugContext = React.createContext<
  [DebugProviderState, Dispatch<SetStateAction<DebugProviderState>>]
>([getInitialDebugProvider(), () => {}]);

export default DebugContext;
