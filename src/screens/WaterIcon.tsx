import { Water, WaterDrop } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import GameState from "../models/GameState";
import GameContext from "../state/GameStateProvider";
import nullThrows from "../utils/nullThrows";
import { getSecondsUntilNextStage } from "../utils/itemStageUtils";
import { formatCountdown } from "../utils/timeUtils";
import traitObserverOnWaitTimePlants from "../state/traitObserverOnWaitTimePlants";
import Furniture from "../models/Furniture";

export default function WaterIcon({
  ownedItem
}: {
  ownedItem: NonNullable<GameState['furniture'][string]>
}) {
  const [game, setGame] = useContext(GameContext);
  const {currentStage, stageLastChangedTime} = game.itemStages[ownedItem.id] ?? {};

  const onClickWater = () => {
    setGame(state => {
      const newState = {...state};

      newState.itemStages[ownedItem.id].currentStage += 1;
      newState.itemStages[ownedItem.id].stageLastChangedTime = Date.now();

      return newState;
    });
  };

  const model = Furniture[ownedItem.furnitureName];
  if (model.category !== 'plant' || ownedItem.status !== 'assembled' || currentStage === 3) {
    return null;
  }

  const secondsUntilNextStage = getSecondsUntilNextStage(game, ownedItem.id);

  return (
    <IconButton
      onClick={onClickWater}
      disabled={secondsUntilNextStage > 0}
      color={secondsUntilNextStage === 0 ? 'primary' : 'secondary'}
    >
      <WaterDrop />
    </IconButton>
  );
}