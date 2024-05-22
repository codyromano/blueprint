import GameState from "../models/GameState";

export default function reduceUpdateItemPositionsOnInitialLoad(state: GameState): GameState {
  const game = {...state};

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
}