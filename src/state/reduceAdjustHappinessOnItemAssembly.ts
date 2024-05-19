import GameState from "../models/GameState";
import tenantMap from "../models/Tenants";
import getObjectValues from "../utils/getObjectValues";
import nullThrows from "../utils/nullThrows";

export default function reduceAdjustHappinessOnItemAssemble(
  newItem: NonNullable<GameState['furniture'][string]>,
  state: GameState
): GameState {
  const newState = {...state};
  const tenants = getObjectValues(newState.tenants);

  // Increase the happiness of all tenants by a small amount based on quality
  // of the item that was assembled
  for (const currentTenant of tenants) {
    currentTenant.happiness = Math.min(100, currentTenant.happiness + nullThrows(newItem.assemblyQuality));
  }

  // Award a major happiness boost to a specific tenant if the new item was their favorite
  const tenantFavorite = tenants
    .find(item => tenantMap[item.id].preferredItem === nullThrows(newItem.furnitureName));
  
  if (tenantFavorite != null) {
    tenantFavorite.happiness = Math.min(100, tenantFavorite.happiness + 20);
  }

  return newState;
}