import { Water } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import GameState from "../models/GameState";
import GameContext from "../state/GameStateProvider";
import nullThrows from "../utils/nullThrows";
import { getSecondsUntilNextStage } from "../utils/itemStageUtils";
import { formatCountdown } from "../utils/timeUtils";

export default function PlantMenu({
  ownedItem
}: {
  ownedItem: NonNullable<GameState['furniture'][string]>
}) {
  const [game, setGame] = useContext(GameContext);
  const {currentStage, stageLastChangedTime} = game.itemStages[ownedItem.id];

  const onClickWater = () => {
    setGame(state => {
      const newState = {...state};

      if (getSecondsUntilNextStage(state, ownedItem.id) === 0) {
        newState.itemStages[ownedItem.id].currentStage += 1;
        newState.itemStages[ownedItem.id].stageLastChangedTime = Date.now();
      }

      return newState;
    });
  };

  if (ownedItem.status !== 'assembled') {
    return null;
  }

  // Maximum growth
  if (currentStage === 3) {
    return <Box>🥳</Box>;
  }

  const secondsUntilNextStage = getSecondsUntilNextStage(game, ownedItem.id);

  return secondsUntilNextStage === 0 ? (
    <IconButton onClick={onClickWater} size="large" color="primary">
      <Water sx={{fontSize: '5rem'}} />
    </IconButton>
  ) : (
    <Box>
      <Typography sx={{opacity: 0.5}}>{formatCountdown(secondsUntilNextStage)}</Typography>
    </Box>
  );
}