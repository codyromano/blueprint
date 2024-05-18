import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import "./GameMode.css";

export default function GameMode() {
  return(
    <Box
      display="flex"
      alignItems="center"
      justifyItems="center"
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bgcolor={"white"}
    >
      <Grid container>
        <Grid xs={12} textAlign={"center"} marginBottom="0.5rem">
          <Typography variant="h4">Choose a perk</Typography>
          </Grid>
        <Grid xs={4} display={"flex"} className="game-mode-item" flexDirection={"column"}>
          <Typography variant="h5" textAlign={"center"}>Botanist</Typography>
          <div className="game-mode-icon"  style={{backgroundImage: 'url(/images/basicPlant_stage1.webp'}} />
          <Typography variant="body1">Your plants grow twice as fast, but plants are expensive; you start the game with less money.</Typography>
       </Grid>
        <Grid xs={4}  display={"flex"} className="game-mode-item" flexDirection={"column"}>
          <Typography variant="h5" textAlign={"center"}>Hostess</Typography>
          <div className="game-mode-icon"  style={{backgroundImage: 'url(/images/keroppi.webp'}}  />
          <Typography variant="body1">Your house guests are easier to please, but you have high standards; art and furniture cost more.</Typography>
        </Grid>
        <Grid xs={4}  display={"flex"} className="game-mode-item" flexDirection={"column"}>
         <Typography variant="h5" textAlign={"center"}>Diva</Typography>
          <div className="game-mode-icon"  style={{backgroundImage: 'url(/images/discoBall.webp'}} />
          <Typography variant="body1">
            You start the game with more money and disco balls are free, but puzzles are significantly harder.</Typography>
        </Grid>

        <Grid xs={4} padding="0 1rem">
          <Button variant="outlined" fullWidth className="perk-button">Choose Perk</Button>
        </Grid>

        <Grid xs={4} padding="0 1rem">
          <Button variant="outlined" fullWidth className="perk-button">Choose Perk</Button>
        </Grid>

        <Grid xs={4} padding="0 1rem">
          <Button variant="outlined" fullWidth className="perk-button">Choose Perk</Button>
        </Grid>
      </Grid>
    </Box>
  );
}