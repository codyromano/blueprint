import { Box, Button, ButtonGroup, Grid, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import "./GameMode.css";
import CharacterTrait from '../models/CharacterTrait';
import GameContext from "../state/GameStateProvider";
import nullThrows from "../utils/nullThrows";
import { useNavigate } from "react-router-dom";
import traitObserverOnTraitSelection from "../state/traitObserverOnTraitSelection";
import reduceUpdateItemPositionsOnInitialLoad from "../state/reduceUpdateItemPositionsOnInitialLoad";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GameMode() {
  const [game, setGame] = useContext(GameContext);
  const [selectedTrait, setSelectedTrait] = useState<null | CharacterTrait>();
  const navigate = useNavigate();
  
  const onClickContinue = () => {
    setGame(state => {
      const newState = {
        ...state,
        player: {
          ...state.player,
          trait: nullThrows(selectedTrait),
        }
      };
      
      return reduceUpdateItemPositionsOnInitialLoad(
        traitObserverOnTraitSelection(newState)
      );
    });

    navigate('/play');
  };

  return(
    <>
      <Modal open={selectedTrait != null}>
        <Box  sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1, mb: 2 }}>
              Once you choose a trait, you can't change it.
            </Typography>

            <ButtonGroup fullWidth>
              <Button fullWidth variant="outlined" onClick={() => setSelectedTrait(null)}>Cancel</Button>
              <Button fullWidth variant="contained" onClick={onClickContinue}>Be a {selectedTrait}</Button>
            </ButtonGroup>
          </Box>
      </Modal>
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
        <Grid container margin="0 auto" maxWidth={700}>
          <Grid xs={12} textAlign={"center"} marginBottom="0.5rem">
            <Typography variant="h4" fontFamily={"Japandi"}>Choose a character trait</Typography>
            </Grid>
          <Grid xs={4} display={"flex"} className="game-mode-item" flexDirection={"column"}>
            <Typography variant="h5" textAlign={"center"} fontFamily={"Japandi"}>Botanist</Typography>
            <div className="game-mode-icon"  style={{backgroundImage: 'url(/images/basicPlant_stage1.webp'}} />
            <Typography variant="body2">Your plants grow twice as fast, but you start the game with less money.</Typography>
        </Grid>
          <Grid xs={4}  display={"flex"} className="game-mode-item" flexDirection={"column"}>
            <Typography variant="h5" textAlign={"center"} fontFamily={"Japandi"}>Hostess</Typography>
            <div className="game-mode-icon"  style={{backgroundImage: 'url(/images/keroppi.webp'}}  />
            <Typography variant="body2">Your house guests are easier to please, but art and furniture are more expensive.</Typography>
          </Grid>
          <Grid xs={4}  display={"flex"} className="game-mode-item" flexDirection={"column"}>
          <Typography variant="h5" textAlign={"center"} fontFamily={"Japandi"}>Diva</Typography>
            <div className="game-mode-icon"  style={{backgroundImage: 'url(/images/discoBall.webp'}} />
            <Typography variant="body2">
              You get a cash bonus – and disco balls are free, but puzzles are extremely hard.</Typography>
          </Grid>

          <Grid xs={4} padding="0 1rem">
            <Button variant="outlined" fullWidth onClick={() => setSelectedTrait(CharacterTrait.BOTANIST)} className="perk-button">Choose trait</Button>
          </Grid>

          <Grid xs={4} padding="0 1rem">
            <Button variant="outlined" fullWidth onClick={() => setSelectedTrait(CharacterTrait.HOSTESS)} className="perk-button">Choose trait</Button>
          </Grid>

          <Grid xs={4} padding="0 1rem">
            <Button variant="outlined" fullWidth onClick={() => setSelectedTrait(CharacterTrait.DIVA)} className="perk-button">Choose trait</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}