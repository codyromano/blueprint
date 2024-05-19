import React from "react";
import GameState from "../models/GameState";
import {Img as Image} from "react-image";
import "./Tenant.css";
import { Button, IconButton, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import getObjectValues from "../utils/getObjectValues";
import Tenants, { TenantName } from "../models/Tenants";
import { BASE_IMAGE_SIZE } from "../models/Furniture";
import nullThrows from "../utils/nullThrows";

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
  rentAmount,
}: {
  rentAmount: number;
  tenant: NonNullable<GameState["tenants"][TenantName]>;
  index: number;
  onCollectMoney: () => void;
  secondsUntilMoneyIsReady: number,
}) {
  const model = Tenants[tenant.id];

  return (
    <>
      <div
        className="tenant"
        style={{
          bottom: `${tenant.position[1] / 2}vh`,
          zIndex: secondsUntilMoneyIsReady === 0 ? 500 : undefined,
          left: `${tenant.position[0]}vw`,
          width: `${BASE_IMAGE_SIZE * model.scale}%`,
          paddingBottom: `${BASE_IMAGE_SIZE * model.scale / model.aspectRatio}%`
        }}
      >
          <div 
          className={`tenant-status ${secondsUntilMoneyIsReady === 0 ? 'tenant-status-rent-ready' : ''}`} 
          style={{
            position: 'absolute', 
            left: 0,
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}>          
              <div style={{display: 'flex', flexDirection: 'column'}}>

              {secondsUntilMoneyIsReady === 0 ? (
              <Button
                color="primary"
                variant="outlined"
                startIcon={<AttachMoneyIcon fontSize="small" />}
                style={{zIndex: 500, backgroundColor: '#fff', position: 'relative'}}
                onClick={onCollectMoney} size="small">
                  Get Rent
              </Button>
              ) : (
                <>
                {/* <div style={{display: 'flex', zIndex: 499, position: 'relative'}}>
                  <TenantMoodIcon happiness={tenant.happiness} />
                  <Typography>{tenant.happiness}</Typography>
                </div>
                <div style={{display: 'flex'}}>
                  <AccessTimeIcon />
                  <Typography>{formatCountdown(secondsUntilMoneyIsReady)}</Typography>
              </div> */}
                </>
              )}
              </div>
          </div>
      
        <div
          className={`tenant-image ${secondsUntilMoneyIsReady === 0 ? 'tenant-image-rent-ready' : ''}`}
          style={{
            position: "absolute",
            background: `url(/images/${model.id}.webp) no-repeat`,
            backgroundSize: '100% 100%',
            pointerEvents: 'none',
            zIndex: 499,
            width: '100%',
            height: '100%',
          }} 
        />
      </div>
    </>
  );
}
