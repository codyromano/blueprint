import React, { useEffect } from "react";
import Image from "./shared/Image";
import GameState from "../models/GameState";

import FurnitureModels from "../models/Furniture";
import useDraggableItem from "../utils/useDraggableItem";

type Props = {
  onTouchEnd: () => void;
  onDragPositionChanged: (x: number, y: number) => void;
  ownedItem: GameState["furniture"][string];
  isFocalPoint: boolean;
};

const defaultPosition = {
  left: "calc(50vw - 7.5vw)",
  bottom: "0px",
};

// Presentation only component
export default function Furniture({
  onTouchEnd,
  onDragPositionChanged,
  isFocalPoint = true,
  ownedItem,
}: Props) {
  const [draggableItemRef, domPosition] = useDraggableItem();

  useEffect(() => {
    onDragPositionChanged(domPosition.x, domPosition.y);
  }, [domPosition]);

  if (!ownedItem) {
    throw new Error("no owned item");
  }
  const { id, status, furnitureName, position } = ownedItem;
  const imageId = FurnitureModels[furnitureName].id;

  const imageSrc =
    status === "blueprint" ? `/images/box.png` : `/images/${imageId}.png`;

  return (
    <div
      ref={draggableItemRef}
      onMouseUp={onTouchEnd}
      role="button"
      className={`furniture-item ${isFocalPoint ? "focal-point" : ""}`}
      style={{
        position: "absolute",
        zIndex: 3,
        width: "15vw",
        cursor: "pointer",
        ...(position == null
          ? {}
          : {
              left: position[0],
              top: position[1],
            }),
      }}
    >
      <Image width="100%" src={imageSrc} />
    </div>
  );
}
