import React, { Dispatch, SetStateAction } from "react";
import GameState from "../models/GameState";
import Markers from "../models/Markers";

export const INITIAL_CASH = 100;
export const GAME_STORAGE_KEY = '_temp_hf_key_';

export const getInitialGameState = (): GameState => {
  // TODO: Replace with proper game save system
  const saved = window.localStorage.getItem(GAME_STORAGE_KEY);
  const game = saved == null ? ({
    lastUpdatedTime: Date.now(),
    layerZIndex: [],
    focalPoint: null,
    puzzlesUnlocked: {},
    actionsCompleted: {},
    player: {
      id: "1",
      cash: INITIAL_CASH,
    },
    itemStages: {},
    initialLoadCoords: {},
    markers: {},
    messages: [
      {
        id: 'LEARN_TO_BUY_FURNITURE',
        messageContent: "The house feels empty. First, let's buy a bed.",
        messageType: "pop-up",
        isDismissed: false,
      },
    ],
    tenants: {},
    furniture: {},
  } as GameState) : (JSON.parse(saved) as GameState);

  for (const itemId in game.initialLoadCoords) {
    const coords = game.initialLoadCoords[itemId];
    const item = game.furniture[itemId];

    if (item == null) {
      console.warn(`Item ID ${itemId} no longer exists. Deleting position metadata`);
      delete game.initialLoadCoords[itemId];
    } else {
      item.coords = coords;
    }
  }

  return game;
};

const GameContext = React.createContext<
  [GameState, Dispatch<SetStateAction<GameState>>]
>([getInitialGameState(), () => {}]);

export default GameContext;
