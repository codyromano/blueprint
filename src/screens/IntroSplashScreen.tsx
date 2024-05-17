import React from "react";
import "./IntroSplashScreen.css";
import BaseScreen from "../utils/BaseScreen";
import { Box, Button, Grid, Typography } from "@mui/material";
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

        <Grid container margin="0 0 1.5rem 0" justifyContent={"center"} justifyItems={"center"}>
          <Grid xs={6} textAlign="right" paddingRight={3}>
            <Typography fontSize={15}>Illustrations</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography fontSize={15}>Jacquie Yu</Typography>
          </Grid>

          <Grid xs={6} textAlign="right" paddingRight={3}>
            <Typography fontSize={15}>Writing</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography fontSize={15}>Tiffany Chen</Typography>
          </Grid>

          <Grid xs={6} textAlign="right" paddingRight={3}>
            <Typography fontSize={15}>Code</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography fontSize={15}>Cody Yu Romano</Typography>
          </Grid>
        </Grid>

        <Link to="/play" style={{textDecoration: 'none'}}>
          <Button variant="contained" size="large">New Game</Button>
        </Link>
      </div>
    </BaseScreen>
  );
}
