import CharacterTrait from "../models/CharacterTrait";
import GameState from "../models/GameState";
import tenantMap from "../models/Tenants";
import getObjectValues from "../utils/getObjectValues";
import nullThrows from "../utils/nullThrows";


function getTraitHappinessMultiplier(trait: CharacterTrait): number {
  switch (trait) {
    case CharacterTrait.BOTANIST:
    case CharacterTrait.DIVA:
    case CharacterTrait.UNSPECIFIED:
      return 1;
    case CharacterTrait.HOSTESS:
      return 2;
  }
}

export default function reduceAdjustHappinessOnItemAssemble(
  newItem: NonNullable<GameState['furniture'][string]>,
  state: GameState
): GameState {
  const newState = {...state};
  const tenants = getObjectValues(newState.tenants);

  // Increase the happiness of all tenants by a small amount based on quality
  // of the item that was assembled
  for (const currentTenant of tenants) {
    currentTenant.happiness = Math.round(
      Math.min(
        100, currentTenant.happiness + nullThrows(newItem.assemblyQuality) *
          getTraitHappinessMultiplier(newState.player.trait)
      )
    );
  }

  // Award a major happiness boost to a specific tenant if the new item was their favorite
  const tenantFavorite = tenants
    .find(item => tenantMap[item.id].preferredItem === nullThrows(newItem.furnitureName));
  
  if (tenantFavorite != null) {
    tenantFavorite.happiness = Math.round(
      Math.min(100, tenantFavorite.happiness + 20)
    );
  }

  return newState;
}