
import * as React from 'react';

import Typography from '@mui/material/Typography';

import { AttachMoney, SentimentSatisfied } from '@mui/icons-material';
import { Box } from '@mui/system';



type Props = {
  cash: number;
  happiness: number | null;
};

const formatCurrency = (n: number): string => {
  const usd = Intl.NumberFormat('en-US');
  return usd.format(n);
};


export default function GameVitalStatsHeader({ cash, happiness }: Props) {
  return (
    <Box width="100%" bgcolor="#fff" alignItems="center"  style={{display: 'flex', padding: '1rem', position: 'absolute', top: 0, left: 0, justifyItems: 'center'}}>
      <Box display={"flex"} justifyContent={"center"} alignItems="center" gap="5px" flex={1}>
        <SentimentSatisfied />
        <Typography fontSize="x-large">{happiness ?? '0'}</Typography>
      </Box>

      <Box display={"flex"} alignItems="center" justifyContent={"center"} gap="1px" flex={1}>
        <AttachMoney />
        <Typography fontSize="x-large">{formatCurrency(cash)}</Typography>
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
