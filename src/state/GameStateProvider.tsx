import React, { Dispatch, SetStateAction } from "react";
import GameState from "../models/GameState";
import Markers from "../models/Markers";
import CharacterTrait from "../models/CharacterTrait";
import Economy from "../models/Economy";
import reduceUpdateItemPositionsOnInitialLoad from "./reduceUpdateItemPositionsOnInitialLoad";
import RewardVideo from "../models/RewardVideo";
import { rand } from "../utils/puzzleUtils";

export const GAME_STORAGE_KEY = '_temp_hf_key_';

// Bump cache to invalidate local storage
const CACHE_KEY = 2;

export const getInitialGameState = (): GameState => {
  // TODO: Replace with proper game save system
  const saved = window.localStorage.getItem(GAME_STORAGE_KEY);
  let validSave: null | GameState = null;

  if (saved != null) {
    const parsed = JSON.parse(saved) as GameState;
    if (parsed?.session?.cacheKey === CACHE_KEY) {
      validSave = parsed;
    }
  }

  const game = validSave ?? ({
    session: {
      cacheKey: CACHE_KEY,
      rewardVideo: rand(RewardVideo),
    },
    lastUpdatedTime: Date.now(),
    layerZIndex: [],
    focalPoint: null,
    puzzlesUnlocked: {},
    actionsCompleted: {},
    player: {
      id: "1",
      // Start with roughly the amount of three basic items
      cash: Economy.PRICE_LEVEL_1 * 3,
      trait: CharacterTrait.UNSPECIFIED,
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
  } as GameState);

  return reduceUpdateItemPositionsOnInitialLoad(game);
};

const GameContext = React.createContext<
  [GameState, Dispatch<SetStateAction<GameState>>]
>([getInitialGameState(), () => {}]);

export default GameContext;
