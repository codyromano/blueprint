import React from "react";
import GameState from "../models/GameState";
import {Img as Image} from "react-image";
import "./Tenant.css";
import { IconButton, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes > 0 ? `${minutes}m` : '';
  const formattedSeconds = `${remainingSeconds}s`;

  return [formattedMinutes, formattedSeconds].join(' ');
}

const TenantMoodIcon = ({
  happiness
}: {
  happiness: number
}) => {
  if (happiness >= 90) {
    return <MoodIcon />;
  }
  if (happiness >= 75) {
    return <SentimentSatisfiedIcon />;
  }
  if (happiness >= 50) {
    return <SentimentDissatisfiedIcon />;
  }
  return <SentimentVeryDissatisfiedIcon />;
}

export default function Tenant({
  tenant,
  index,
  onCollectMoney,
  secondsUntilMoneyIsReady,
}: {
  tenant: GameState["tenants"][string];
  index: number;
  onCollectMoney: () => void;
  secondsUntilMoneyIsReady: number,
}) {
  return (
    <>
      <div
        className="tenant"
        style={{
          bottom: `${tenant.position[1] / 2}vh`,
          left: `${tenant.position[0]}vw`,
        }}
      >
          <div style={{
            position: 'absolute', 
            top: '-2.5rem',
            left: 0,
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}>          
              <div style={{display: 'flex', flexDirection: 'column'}}>

              {secondsUntilMoneyIsReady === 0 ? (
              <IconButton
                style={{zIndex: 499, position: 'relative'}}
                onClick={onCollectMoney} color="primary" size="large">
                <AttachMoneyIcon fontSize="large" />
              </IconButton>
              ) : (
                <>
                <div style={{display: 'flex', zIndex: 499, position: 'relative'}}>
                  <TenantMoodIcon happiness={tenant.happiness} />
                  <Typography>{tenant.happiness}</Typography>
                </div>
                <div style={{display: 'flex'}}>
                  <AccessTimeIcon />
                  <Typography>{formatCountdown(secondsUntilMoneyIsReady)}</Typography>
                </div>
                </>
              )}


              </div>
          </div>
      
        <Image src={`/images/tenant.gif`} style={{position: 'relative', pointerEvents: 'none', zIndex: 499, width: '20vw'}} />
      </div>
    </>
  );
}
