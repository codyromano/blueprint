import React from "react";
import GameState from "../../models/GameState";

export default function DebugOverlay({ state }: { state: GameState }) {
  return (
    <div
      style={{
        position: "fixed",
        maxHeight: "100%",
        width: "50%",
        overflowY: "scroll",
        color: "#fff",
        top: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <details>
        <summary>Debug State</summary>
        <pre>{JSON.stringify(state, <br />, 2)}</pre>
      </details>
    </div>
  );
}
