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
}
