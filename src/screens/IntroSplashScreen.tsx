import React from "react";
import "./IntroSplashScreen.css";
import BaseScreen from "../utils/BaseScreen";

export default function IntroSplashScreen() {
  return (
    <BaseScreen className="intro-splash-screen">
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h1 className="game-title">Blueprint</h1>
      </div>
    </BaseScreen>
  );
}
