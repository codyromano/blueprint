import React from "react";
import GameState from "../../models/GameState";

export default function DebugOverlay({ state }: { state: GameState }) {
  return (
    <div
      style={{
        position: "fixed",
        maxHeight: "100%",
        overflowY: "scroll",
        color: "#fff",
        top: '1rem',
        left: '1rem',
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <details>
        <summary>Debug</summary>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </details>
    </div>
  );
}
