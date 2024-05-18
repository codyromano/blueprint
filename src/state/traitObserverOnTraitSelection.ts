import CharacterTrait from "../models/CharacterTrait";
import Economy from "../models/Economy";
import GameState from "../models/GameState";

export default function traitObserverOnTraitSelection(state: GameState): GameState {
  const newState = {...state};

  switch (newState.player.trait) {
    case CharacterTrait.BOTANIST: {
      // Start with enough cash to purchase two level-one items
      newState.player.cash = Economy.PRICE_LEVEL_1 * 2;
      break;
    }
    case CharacterTrait.DIVA: {
      newState.player.cash += Economy.PRICE_LEVEL_3;
      break;
    }
    case CharacterTrait.HOSTESS:
    case CharacterTrait.UNSPECIFIED: {
      // No status effects

      break;
    }
  }

  return newState;
}