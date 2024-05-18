import CharacterTrait from "../models/CharacterTrait";
import GameState from "../models/GameState";

// Modify the waiting time for plants based on the player's trait
export default function traitObserverOnWaitTimePlants(
  game: GameState,
  totalWaitTimeForStage: number,
): number {
  switch (game.player.trait) {
    case CharacterTrait.BOTANIST: {
      return totalWaitTimeForStage * 0.25;
    }
    case CharacterTrait.DIVA:
    case CharacterTrait.UNSPECIFIED:
    default: {
      return totalWaitTimeForStage;
    }
  }
}