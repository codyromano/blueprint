import React from "react";
import GameState from "../models/GameState";
import {Img as Image} from "react-image";
import "./Tenant.css";

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
        <button
          onClick={onCollectMoney}
          style={{
            backgroundColor: "red",
            cursor: "pointer",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src={`/images/money.webp`} width="7.5vw" />
        </button>
      ) : (
        <div

        style={{
          backgroundColor: "red",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {secondsUntilMoneyIsReady}
      </div>
      )}
      <Image src={`/images/tenant.gif`} width="15vw" />
    </div>
  );
}
