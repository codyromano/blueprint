import React, { Dispatch, SetStateAction } from "react";
import GameState from "../models/GameState";
import Markers from "../models/Markers";

export const INITIAL_CASH = 100;

export const getInitialGameState = (): GameState => {
  return {
    lastUpdatedTime: Date.now(),
    focalPoint: null,
    player: {
      id: "1",
      cash: INITIAL_CASH,
    },
    markers: {},
    messages: [
      {
        id: 'LEARN_TO_BUY_FURNITURE',
        messageContent: "The house feels empty. Let's buy furniture.",
        messageType: "pop-up",
        isDismissed: false,
      },
    ],
    tenants: {},
    furniture: {},
  };
};

const GameContext = React.createContext<
  [GameState, Dispatch<SetStateAction<GameState>>]
>([getInitialGameState(), () => {}]);

export default GameContext;
