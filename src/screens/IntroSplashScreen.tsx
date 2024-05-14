import React from "react";
import "./IntroSplashScreen.css";
import BaseScreen from "../utils/BaseScreen";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box marginBottom="2rem">
          <img src="/images/keroppi.webp" style={{width: 200}}/>
        </Box>

        <h1 className="game-title">House Fashionista</h1>

        <Box display="flex" padding="1rem 2.5rem 2.5rem 2.5rem" justifyContent={"space-between"} width="100%" maxWidth="500px">
          <h2>Art by Jacquie Yu</h2>
          <h2>Code by Cody Yu Romano</h2>
        </Box>

        <Link to="/play">
          <Button variant="contained" size="large">New Game</Button>
        </Link>
      </div>
    </BaseScreen>
  );
}
