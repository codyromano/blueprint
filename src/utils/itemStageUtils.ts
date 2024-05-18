import FurnitureModels, { FurnitureName } from "../models/Furniture";
import GameState from "../models/GameState";
import nullThrows from "./nullThrows";


// Provide a preview image for an item that the player doesn't own
export function getImageUrlForUnownedItemPreview(state: GameState, furnitureName: FurnitureName) {
  const model = FurnitureModels[furnitureName];

  switch (model.category) {
    case 'plant': {
      return `/images/${model.id}_stage1.webp`;
    }
    default: {
      return `/images/${model.id}.webp`;
    }
  }
}

// Provide an image for an item owned by the player
export function getImageUrlForItem(state: GameState, itemId: string) {
  const item = nullThrows(
    state.furniture[itemId],
    `Expected player to own item with ID ${itemId}`
  );

  // Always display a box when furniture is unassembled
  if  (item.status === "blueprint") {
    return `/images/box.webp`;
  } 

  const model = FurnitureModels[item.furnitureName];

  switch (model.category) {
    case 'plant': {
      const currentStage = nullThrows(
        state?.itemStages[itemId]?.currentStage,
        `Expected purchased item ${itemId} to have growth stage info b/c of its category`
      );

      return `/images/${model.id}_stage${currentStage}.webp`;
    }
    default: {
      return `/images/${model.id}.webp`;
    }
  }
}