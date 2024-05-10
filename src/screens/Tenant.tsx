import React from "react";
import GameState from "../models/GameState";
import {Img as Image} from "react-image";
import "./Tenant.css";
import { IconButton } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
    <div
      className="tenant"
      style={{
        bottom: `${tenant.position[1]}vh`,
        left: `${tenant.position[0]}vw`,
      }}
    >
      {secondsUntilMoneyIsReady === 0 ? (
        <div style={{
          position: 'absolute', 
          top: '-5vh',
          left: 0,
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}>
        <IconButton  onClick={onCollectMoney} color="primary" size="large">
          <AttachMoneyIcon fontSize="large" />
        </IconButton>
        </div>
      ) : (
        <div
        style={{
          cursor: "pointer",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {secondsUntilMoneyIsReady}
      </div>
      )}
      <Image src={`/images/tenant.gif`} style={{width: '20vw'}} />
    </div>
  );
}
