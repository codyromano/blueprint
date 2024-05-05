import React from "react";

type Props = {
  cash: number;
  happiness: number | null;
};

export default function GameVitalStatsHeader({ cash, happiness }: Props) {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        fontFamily: "Japandi",
        fontWeight: "bold",
        justifyContent: "flex-end",
        marginBottom: "0.5rem",
        width: "95%",
        top: "-1rem",
        color: "#fff",
      }}
    >
      {happiness !== null && <div>☺️{happiness}</div>}
      <div>${cash}</div>
    </div>
  );
}
