import React, { useEffect } from "react";
import "./IntroSplashScreen.css";
import BaseScreen from "../utils/BaseScreen";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAudioPlayer } from "react-use-audio-player";
import { MusicNote } from "@mui/icons-material";

export default function IntroSplashScreen() {
  const { load} = useAudioPlayer();

  
  return (
    <BaseScreen className="intro-splash-screen">
      <Box style={{zIndex: 500}} position={"absolute"} top="0" right="0">
        <Button onClick={() => {
          load('/audio/theme.mp3', {autoplay: true});
        }} endIcon={<MusicNote />}><Typography variant="caption">Tap for jingle</Typography></Button>
      </Box>

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
          <img src="/images/discoBall.webp" style={{
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
