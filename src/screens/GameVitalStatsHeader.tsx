
import * as React from 'react';

import Typography from '@mui/material/Typography';

import { AttachMoney, Chair, SentimentSatisfied } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Button, CircularProgress, LinearProgress } from '@mui/material';
import Furniture from '../models/Furniture';
import GameContext from '../state/GameStateProvider';
import getObjectValues from '../utils/getObjectValues';



type Props = {
  cash: number;
  happiness: number | null;
  onPressFinish: () => void;
};

const formatCurrency = (n: number): string => {
  const usd = Intl.NumberFormat('en-US');
  return usd.format(n);
};

const ITEMS_TO_END_GAME = 20;


export default function GameVitalStatsHeader({ cash, happiness, onPressFinish }: Props) {
  const [game] = React.useContext(GameContext);
  const ownedItems = Math.min(ITEMS_TO_END_GAME, getObjectValues(game.furniture)
    .filter(item => item.status === 'assembled')
    .length);

  const isGameFinishable = ownedItems === ITEMS_TO_END_GAME;

  return (
    <Box width="100%" alignItems="center" alignContent="center"  style={{display: 'flex', padding: '1.5rem 0.5rem', position: 'absolute', top: 0, left: 0, justifyItems: 'center'}}>
      <Box display={"flex"} justifyContent={"center"} alignItems="center" gap="5px" flex={1}>
        <SentimentSatisfied />
        <Typography fontSize="x-large">{happiness ?? '0'}</Typography>
      </Box>

      <Box display={"flex"} alignItems="center" justifyContent={"center"} gap="1px" flex={1}>
        <AttachMoney />
        <Typography fontSize="x-large">{formatCurrency(cash)}</Typography>
      </Box>

      <Box display={"flex"} alignItems="center" justifyContent={"center"} gap="5px" flex={1}>
        {isGameFinishable ? (
          <Button onClick={onPressFinish} variant="contained" color="success">Finish</Button>
        ) : (
          <>
          <Chair />
          <Typography fontSize="x-large">{ownedItems}/{ITEMS_TO_END_GAME}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
  /*
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: '1.5rem',
        left: 0,
        fontFamily: "Japandi",
        fontWeight: "bold",
        fontSize: "1.25rem",
        justifyContent: "flex-end",
        width: "95%",
        color: "#fff",
      }}
    >
      {happiness !== null && <div>☺️{happiness}</div>}
      <div><i className="fa-solid fa-sack-dollar" style={{marginRight: '0.5rem', color: "#ffffff"}}></i>{cash}</div>
    </div>
  );
  */
}
