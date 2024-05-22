import { Box, Button, Grid, Typography } from "@mui/material";
import "./FinishGame.css";
import { useContext } from "react";
import GameContext from "../state/GameStateProvider";
import getObjectValues from "../utils/getObjectValues";
import { average } from "./GameArea";
import GameState from "../models/GameState";
import { Star, StarBorderTwoTone, StarTwoTone } from "@mui/icons-material";

function getEndGameStarRating(state: GameState) {
  const happiness = Math.round(average(getObjectValues(state.tenants).map((t) => t.happiness)));

  if (happiness === 100) {
    return 3;
  }
  if (happiness >= 75) {
    return 2;
  }
  if (happiness >= 50) {
    return 1;
  }
  return 0;
}

export default function FinishGame() {
  const [game] = useContext(GameContext);
  const rating = getEndGameStarRating(game);
  const happiness = Math.round(average(getObjectValues(game.tenants).map((t) => t.happiness)));


  return (
    <div className="finish-game">
      <Box display="flex" style={{height: "100%", maxWidth: 400, margin: '0 auto'}} alignContent={"center"} alignItems={"center"}>
        <Grid container width="100%">
          <Grid xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h6">Final Rating</Typography>
            </Box>
          </Grid>

          <Grid xs={12}>
            <Box display="flex" justifyContent="center">
            <div style={{ fontSize: '4rem'}}>
              {new Array(rating).fill(null).map((_, i) => <div key={i} style={{display: 'inline', color: 'gold'}}>★</div>)}
              {new Array(3 - rating).fill(null).map((_, i) => <div key={i} style={{display: 'inline', color: 'gold'}}>☆</div>)}
            </div>
            </Box>
          </Grid>

          <Grid xs={12} sx={{mb: 3}}>
            <Box display="flex" justifyContent="center">
            <Typography style={{fontWeight: 'bold'}}>Based on an avg. tenant happiness of {happiness}</Typography>
            </Box>
          </Grid>

          <Grid xs={12} textAlign="center" sx={{mb: 3}}>
              <Typography variant="body2">Joycie, your wedding guests have recorded short videos to celebrate you winning the game! A new video is unlocked at random with each play-through. :)</Typography>
          </Grid>

          <Grid xs={12} textAlign="center">
            <Button variant="contained">Unlock random video</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}