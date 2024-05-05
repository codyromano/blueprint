import React, { Dispatch, SetStateAction } from "react";
import GameState from "../models/GameState";
import Markers from "../models/Markers";

export const getInitialGameState = (): GameState => {
  return {
    lastUpdatedTime: Date.now(),
    player: {
      id: "1",
      cash: 1000,
    },
    markers: {},
    messages: [
      {
        id: Markers.TUTORIAL_BUY_FURNITURE,
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
