import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import {Img as Image} from "react-image";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import GameState from "../models/GameState";

import FurnitureModels, { BASE_IMAGE_SIZE } from "../models/Furniture";
import useFocalPoint from "../utils/useFocalPoint";
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Icon, IconButton, Typography } from "@mui/material";
import GameContext from "../state/GameStateProvider";
import Draggable from "react-draggable";
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowUpSharp';
import KeyboardDoubleArrowUpSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';

import type Position from '../models/Position';
import { convertPixelCoordsToPosition } from "../utils/positionUtils";

import "./Furniture.css";
import reduceGameState from "../state/reduceGameState";
import GameActions from "../state/GameActions";
import { stagedItemAspectRatioOverride } from "../utils/itemStageUtils";
import { Pets, Water, WaterDrop } from "@mui/icons-material";
import WaterIcon from "./WaterIcon";
import { useAudioPlayer } from "react-use-audio-player";

type Props = {
  onTouchEnd: () => void;
  onDragPositionChanged: (position: Position | null) => void;
  ownedItem: NonNullable<GameState["furniture"][string]>;
  isFocalPoint: boolean;
  zIndex: number;
  imageUrl: string;
  overheadContent: null | ReactNode;
};

const defaultPosition = {
  left: "calc(50vw - 7.5vw)",
  bottom: "0px",
};

function getPositionRelativeToParent(element: HTMLElement): { x: number; y: number } {
  const parent = element.offsetParent as HTMLElement;
  if (!parent) {
      throw new Error("Element has no offset parent.");
  }

  let x = (element.offsetLeft / parent.offsetWidth) * 100;
  let y = (element.offsetTop / parent.offsetHeight) * 100;

  // Account for translate values
  const computedStyle = window.getComputedStyle(element);
  const transform = computedStyle.transform;

  if (transform && transform !== "none") {
      const matrix = new DOMMatrix(transform);
      x += (matrix.m41 / parent.offsetWidth) * 100;
      y += (matrix.m42 / parent.offsetHeight) * 100;
  }

  return { x, y };
}

export const OVERHEAD_CONTENT_CONTAINER_HEIGHT = "4rem";

function AssemblyQualityRating({
  rating
}: {
  rating: number | undefined
}) {
  return rating == null ? null : (
    <div style={{ fontSize: '0.75rem'}}>
      {new Array(rating).fill(null).map(() => '★').join('')}
      {new Array(3 - rating).fill(null).map(() => '☆').join('')}
    </div>
  );
}

// TODO: Name this something broader than furniture. It also includes
// plants, animals, and decorations.
// Presentation only component
export default function Furniture({
  onTouchEnd,
  onDragPositionChanged,
  isFocalPoint = true,
  zIndex,
  ownedItem,
  overheadContent = null,
  imageUrl,
}: Props) {
  const {getClassNameWithFocalPoint, setFocalPoint} = useFocalPoint();
  const mouseDownStartTimeRef = useRef<number | null>(null);
  const furnitureRef = useRef<HTMLDivElement>(null);

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const [game, setGame] = useContext(GameContext);

  const adjustLayer = (selectedItemId: string, direction: 'up' | 'down') => {
    setGame(state => {
      const newState = reduceGameState(state, {
        action: GameActions.CHANGE_Z_INDEX,
        selectedItemId,
        changeZIndex: direction,
        lastUpdatedTime: Date.now(),
        entropy: Math.random(),
      });

      return newState;
    });
  };

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

  const currentStage = game.itemStages[id]?.currentStage;

  // Certain items such as plants have different images for each stage of growth
  // We want to adjust the aspect ratio accordingly
  const aspectRatioForStagedItem = stagedItemAspectRatioOverride[model.id]?.[currentStage];
    
  // Default box aspect ratio: 500px / 302px = 1.65
  const aspectRatio = status === "blueprint" ? 1.65 : (aspectRatioForStagedItem ?? model.aspectRatio);
  const scale = status === "blueprint" ? 1.5 : model.scale;
  const imageWidth = BASE_IMAGE_SIZE * scale;

  const imagePaddingBottom = BASE_IMAGE_SIZE * scale / aspectRatio;

  const {load } = useAudioPlayer();
  
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
        <Box padding="5px">
        <Box display="flex" justifyContent={"space-between"}>
          <Typography variant="caption" fontWeight={"bold"}>{model.displayName}</Typography>
          <AssemblyQualityRating rating={ownedItem.assemblyQuality} />
        </Box>

        <Box display="flex" gap="2px">

          <WaterIcon ownedItem={ownedItem} />

          {ownedItem.furnitureName === 'momo' && (
            <IconButton disabled={false} onClick={() => {
              load('/audio/howl.mp3', {autoplay: true});
            }}>
              <Pets />
            </IconButton>
          )}

          {/* TODO: Update disabled */}
          <IconButton disabled={false} onClick={() => adjustLayer(ownedItem.id, 'down')}>
            <KeyboardDoubleArrowUpSharpIcon />
          </IconButton>

          <IconButton disabled={false} onClick={() => adjustLayer(ownedItem.id,'up')}>
            <KeyboardDoubleArrowDownSharpIcon />
          </IconButton>

          <IconButton color="error" onClick={handleClickDelete}>
            <DeleteIcon/>
          </IconButton>
        </Box>
        </Box>

      {/* <Button onClick={() => setAnchorEl(null)}>Cancel</Button> */}
      </Popover>


      <Draggable
        onDrag={(_event, data) => {
          // onDragPositionChanged(convertPixelCoordsToPosition(x, y));
        }} onStop={(event, data) => {
          const {x, y} = getPositionRelativeToParent(data.node);

          setGame(state => reduceGameState(state, {
            action: GameActions.UPDATE_ITEM_COORDS,
            selectedItemId: ownedItem.id,
            lastUpdatedTime: Date.now(),
            entropy: Math.random(),
            newCoords: {
              x: x / 100,
              y: y / 100
            }
          }));

          const mouseDownTime = mouseDownStartTimeRef.current; 
          setFocalPoint(null);
          onTouchEnd();

          // @ts-ignore
          if (!event.target.matches('.furniture-item')) {
            setAnchorEl(null);
            return;
          }
          
          // When dragging stops, get the computed fixed position of the target element
          // so that we can persist it for the next time the scene renders
          // const {left, top} = window.getComputedStyle(data.node);

          // Only display the context menu on single taps (<250ms)
          // Probably a better way to do this
          if (status !== 'blueprint' && mouseDownTime != null && Date.now() - mouseDownTime < 250) {
            // @ts-ignore
            setAnchorEl(furnitureRef.current);
          }
        }}
        onMouseDown={() => {
          mouseDownStartTimeRef.current = Date.now();
        }}>      
      <div
        onMouseUp={onTouchEnd}
        ref={furnitureRef}
        role="button"
        onClick={(event) => {
          const mouseDownTime = mouseDownStartTimeRef.current; 
          setFocalPoint(null);

          // @ts-ignore
          if (!event.target.matches('.furniture-item')) {
            setAnchorEl(null);
            return;
          }

          // Only display the context menu on single taps (<250ms)
          // Probably a better way to do this
          if (
            status !== 'blueprint' &&
            mouseDownTime != null &&
            Date.now() - mouseDownTime < 250) {
            setAnchorEl(event.currentTarget);
          }
        }}
        className={getClassNameWithFocalPoint('FURNITURE_ITEM', 'furniture-item')}
        style={{
          position: "absolute",
          // top: ownedItem.position[1],
          // left: ownedItem.position[0],
          top: `${ownedItem.coords.y * 100}%`,
          left: `${ownedItem.coords.x * 100}%`,
          zIndex,
          width: `${imageWidth}%`,
          paddingBottom: `${imagePaddingBottom}%`,
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: 'no-repeat',
          cursor: "pointer",
        }}
      >
        <Box
          className="overhead-content"
          position="absolute"
          width="100%"
          overflow="hidden"
          top={`-${OVERHEAD_CONTENT_CONTAINER_HEIGHT}`}
          display="flex"
          justifyItems={"center"}
          justifyContent={"center"}
        >
          {overheadContent}
        </Box>
      </div>
      </Draggable>
      </>
    </ClickAwayListener>
  );
}
