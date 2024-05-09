import React, { useContext, useEffect, useRef, useState } from "react";
import {Img as Image} from "react-image";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import GameState from "../models/GameState";

import FurnitureModels from "../models/Furniture";
import useDraggableItem from "../utils/useDraggableItem";
import useFocalPoint from "../utils/useFocalPoint";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from "@mui/material";
import GameContext from "../state/GameStateProvider";

type Props = {
  onTouchEnd: () => void;
  onDragPositionChanged: (x: number, y: number) => void;
  ownedItem: NonNullable<GameState["furniture"][string]>;
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
  const {getClassNameWithFocalPoint, setFocalPoint} = useFocalPoint();
  const mouseDownStartTimeRef = useRef<number | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const [_, setGame] = useContext(GameContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = () => {
    setGame(state => {
      const newState = {...state};

      const newFurniture = {...newState.furniture};
      delete newFurniture[ownedItem.id];

      newState.furniture = newFurniture;
      return newState;
    });
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  useEffect(() => {
    onDragPositionChanged(domPosition.x, domPosition.y);
  }, [domPosition]);

  if (!ownedItem) {
    throw new Error("no owned item");
  }
  const { id, status, furnitureName, position } = ownedItem;
  const model = FurnitureModels[furnitureName];
  const imageId = FurnitureModels[furnitureName].id;

  const imageSrc =
    status === "blueprint" ? `/images/box.webp` : `/images/${imageId}.webp`;
  


  return (
    <ClickAwayListener onClickAway={handleClose}>
      <>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
      <Button color="error" onClick={handleClickDelete} endIcon={<DeleteIcon />}>
        Remove
      </Button>

      <Button onClick={() => setAnchorEl(null)}>Cancel</Button>
      </Popover>


      <div
        ref={draggableItemRef}
        onMouseUp={onTouchEnd}
        role="button"
        onMouseDown={() => {
          mouseDownStartTimeRef.current = Date.now();
        }}
        onClick={(event) => {
          const mouseDownTime = mouseDownStartTimeRef.current; 

          // Only display the context menu on single taps (<250ms)
          // Probably a better way to do this
          if (mouseDownTime != null && Date.now() - mouseDownTime < 250) {
            setAnchorEl(event.currentTarget);
          }
        }}
        className={getClassNameWithFocalPoint('FURNITURE_ITEM', 'furniture-item')}
        style={{
          position: "absolute",
          zIndex: 3,
          width: status === 'assembled' ? model.size[0] : '10vw',
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
      </>
    </ClickAwayListener>
  );
}
