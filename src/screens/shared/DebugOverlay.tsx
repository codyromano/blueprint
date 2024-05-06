import React, { useState } from "react";
import GameState from "../../models/GameState";
import useDebugCommand from "../../state/useDebugCommand";

const tabButtonStyle = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.05rem',
  flex: 1
};

export default function DebugOverlay({ state }: { state: GameState }) {
  const {availableCommands, executeCommand} = useDebugCommand();
  const [currentTab, setCurrentTab] = useState<'state' | 'commands'>('state');

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

        <menu style={{display: 'flex'}}>
          <button onClick={() => setCurrentTab('state')} style={tabButtonStyle}>State</button>
          <button onClick={() => setCurrentTab('commands')} style={tabButtonStyle}>Commands</button>
        </menu>

        {currentTab === 'state' && <pre>{JSON.stringify(state, null, 2)}</pre>}
        {currentTab === 'commands' && (
          <div>
            {availableCommands.map(command => <button
            style={{
              color: "#fff",
              border: "solid #fff",
              padding: "0.5rem",
              marginBottom: "1rem",
            }}
            onClick={() => {
              executeCommand(command);
            }}>{command}</button>)}
          </div>
        )}
      </details>
    </div>
  );
}
