import React from "react";
import "./IntroSplashScreen.css";
import BaseScreen from "../utils/BaseScreen";
import { Box, Button, Typography } from "@mui/material";
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
          <img src="/images/keroppi.webp" style={{
            height: '25vh',
            maxHeight: '200px',
          }}/>
        </Box>

        <h1 className="game-title">House Fashionista</h1>

        <Box display="flex" textAlign="center" flexDirection="column" padding="1.5rem"  width="100%" maxWidth="500px">
          <Typography fontSize={17}>Illustrations by Jacquie Yu</Typography>
          <Typography fontSize={17}>Code by Cody Yu Romano</Typography>
        </Box>

        <Link to="/play">
          <Button variant="contained" size="large">New Game</Button>
        </Link>
      </div>
    </BaseScreen>
  );
}
