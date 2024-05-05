import React from "react";
import "./PopUpNotice.css";
import GameState from "../../models/GameState";
import PositionLayer from "./PositionLayer";

export default function PopUpNotice({
  message,
  onContinue,
}: {
  message: GameState["messages"][number];
  onContinue: () => void;
}) {
  return (
    <div className="pop-up-notice">
      <p className="typography-normal">{message.messageContent}</p>
      <button onClick={onContinue}>Continue</button>
    </div>
  );
}
