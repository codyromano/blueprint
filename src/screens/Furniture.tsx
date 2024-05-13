import React, { useContext, useEffect, useRef, useState } from "react";
import {Img as Image} from "react-image";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import GameState from "../models/GameState";

import FurnitureModels, { BASE_IMAGE_SIZE } from "../models/Furniture";
import useFocalPoint from "../utils/useFocalPoint";
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from "@mui/material";
import GameContext from "../state/GameStateProvider";
import Draggable from "react-draggable";

import type Position from '../models/Position';
import { convertPixelCoordsToPosition } from "../utils/positionUtils";

import "./Furniture.css";

type Props = {
  onTouchEnd: () => void;
  onDragPositionChanged: (position: Position | null) => void;
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

  if (!ownedItem) {
    throw new Error("no owned item");
  }
  const { id, status, furnitureName, position } = ownedItem;
  const model = FurnitureModels[furnitureName];
  const imageId = FurnitureModels[furnitureName].id;

  // Don't show the context menu when the furniture is unassembled (box)
  const open = status !== 'blueprint' && Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  const imageSrc =
    status === "blueprint" ? `/images/box.webp` : `/images/${imageId}.webp`;

  // Default box aspect ratio: 500px / 302px = 1.65
  const aspectRatio = status === "blueprint" ? 1.65 : model.aspectRatio;
  const scale = status === "blueprint" ? 1.5 : model.scale;
  
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


      <Draggable onStart={event => event.preventDefault()} onDrag={(_event, {x, y}) => {
        console.log(x, y);
        // onDragPositionChanged(convertPixelCoordsToPosition(x, y));
      }} onStop={(event, data) => {
          const mouseDownTime = mouseDownStartTimeRef.current; 
          setFocalPoint(null);
          onTouchEnd();
          
          // When dragging stops, get the computed fixed position of the target element
          // so that we can persist it for the next time the scene renders
          const {left, top} = window.getComputedStyle(data.node);
          console.log(left, top);

          // Only display the context menu on single taps (<250ms)
          // Probably a better way to do this
          if (status !== 'blueprint' && mouseDownTime != null && Date.now() - mouseDownTime < 250) {
            // @ts-ignore
            // setAnchorEl(event.currentTarget);
          }
        }}
        onMouseDown={() => {
          mouseDownStartTimeRef.current = Date.now();
        }}>
      <div
        onMouseUp={onTouchEnd}
        role="button"
        onClick={(event) => {
          const mouseDownTime = mouseDownStartTimeRef.current; 
          setFocalPoint(null);

          // Only display the context menu on single taps (<250ms)
          // Probably a better way to do this
          if (status !== 'blueprint' && mouseDownTime != null && Date.now() - mouseDownTime < 250) {
            setAnchorEl(event.currentTarget);
          }
        }}
        className={getClassNameWithFocalPoint('FURNITURE_ITEM', 'furniture-item')}
        style={{
          position: "absolute",
          top: ownedItem.position[1] ?? '50vh',
          left: ownedItem.position[0],
          zIndex: 3,
          width: `${BASE_IMAGE_SIZE * scale}%`,
          paddingBottom: `${BASE_IMAGE_SIZE * scale / aspectRatio}%`,
          backgroundImage: `url(${imageSrc})`,
          backgroundRepeat: 'no-repeat',
          cursor: "pointer",
         // top: '50vh',
        }}
      />
      </Draggable>
      </>
    </ClickAwayListener>
  );
}
