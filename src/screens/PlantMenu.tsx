import { ArrowDownwardTwoTone, Celebration, DoneAll, DoneOutlineOutlined, PartyMode, Water } from "@mui/icons-material";
import { Box, IconButton, LinearProgress, Typography } from "@mui/material";
import React, { useContext } from "react";
import GameState from "../models/GameState";
import GameContext from "../state/GameStateProvider";
import nullThrows from "../utils/nullThrows";
import { getSecondsUntilNextStage } from "../utils/itemStageUtils";
import { formatCountdown } from "../utils/timeUtils";
import traitObserverOnWaitTimePlants from "../state/traitObserverOnWaitTimePlants";
import { OVERHEAD_CONTENT_CONTAINER_HEIGHT } from "./Furniture";

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

      newState.itemStages[ownedItem.id].currentStage += 1;
      newState.itemStages[ownedItem.id].stageLastChangedTime = Date.now();

      return newState;
    });
  };

  if (ownedItem.status !== 'assembled') {
    return null;
  }

  // Maximum growth
  if (currentStage === 3) {
    return <Box display="flex" alignContent={"center"} alignItems="center">
      <Typography style={{opacity: 0.5}}>Level 3/3 <DoneAll fontSize="small" /></Typography>
    </Box>;
  }

  const secondsUntilNextStage = getSecondsUntilNextStage(game, ownedItem.id);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height={OVERHEAD_CONTENT_CONTAINER_HEIGHT}>
      {secondsUntilNextStage === 0 ? (
        <>
          <Typography variant="caption" color="success">Water me</Typography>
          <ArrowDownwardTwoTone />
        </>
      ) : (
      <>
        <Typography variant="caption">Lvl {currentStage}/3</Typography>
        <Typography variant="caption" sx={{opacity: 0.5}}>{formatCountdown(secondsUntilNextStage)}</Typography>
      </>
      )}
    </Box>
  );
}