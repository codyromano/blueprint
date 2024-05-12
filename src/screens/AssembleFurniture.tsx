import React, { useState } from "react";
import Modal from "./shared/Modal";
import PuzzleAnagram from "./PuzzleAnagram/PuzzleAnagram";
import Puzzle from "../models/Puzzle";
import Markers from "../models/Markers";
import FurnitureModels from "../models/Furniture";
import GameState from "../models/GameState";
import GameContext from "../state/GameStateProvider";
import getObjectValues from "../utils/getObjectValues";
import Furniture from "./Furniture";
import {Img as Image} from "react-image";
import PuzzleWordMerge from "./PuzzleWordMerge/PuzzleWordMerge";
import { Button, Typography, ImageList, ImageListItem  } from "@mui/material";
import Avatar from '@mui/material/Avatar';


enum AssembleFurnitureResult {
  PENDING,
  SUCCESS,
}

const getIsFirstTimeAssembly = (state: GameState) => {
  return (
    getObjectValues(state.furniture).find((f) => f.status === "assembled") ==
    null
  );
};

type AssemblyQualityRating = NonNullable<NonNullable<GameState["furniture"][string]>['assemblyQuality']>;

const qualityDescriptor: Record<AssemblyQualityRating, string> = {
  0: 'Poor-quality',
  1: 'Low-quality',
  2: 'Medium-quality',
  3: 'High-quality',
};

export default function AssembleFurniture({
  item,
  onClose,
}: {
  item: NonNullable<GameState["furniture"][string]>;
  onClose: () => void;
}) {
  const [game, setGame] = React.useContext(GameContext);
  const [rating, setRating] = useState<number | null>(null);
  const [skipTutorialScreen, setSkipTutorialScreen] = useState<boolean>(false);

  const onPuzzleSolved = (rating: AssemblyQualityRating) => {
    setRating(rating);
  };
  const onPuzzleFailed = () => setRating(0);

  const onAcceptPuzzleSuccess = () => {
    setGame((game) => {
      const newGame = { ...game };
      const itemRecord = newGame.furniture[item.id];

      if (itemRecord == null) {
        throw new Error(`Item ${item.id} was not found in furniture`);
      }
      if (rating == null) {
        throw new Error(`Rating was not set`);
      }
      itemRecord.assemblyQuality = rating;
      itemRecord.status = "assembled";

      if (
        !newGame.messages.find((m) => m.id === 'LEARN_TO_MOVE_FURNITURE')
      ) {
        newGame.messages.push({
          id: 'LEARN_TO_MOVE_FURNITURE',
          messageContent:
            "Tap and drag furniture to make the room look nice.",
          isDismissed: false,
          messageType: "pop-up",
        });
      }

      return newGame;
    });

    onClose();
  };


  const furnitureModel = FurnitureModels[item.furnitureName];

  if (rating != null) {
    return (
      <Modal
        horizontalScroll={false}
        title="Item Crafted!"
        onSelectClose={onClose}
      >
        <div style={{display: "flex",  alignItems: "center", justifyItems: "center", height: "100%", justifyContent: "center", flexDirection: "column"}}>
          
          <Avatar variant="square" src={`/images/${furnitureModel.id}.webp`} style={{ height: "100px", width: "100px", margin: "16px"}} />

          <div className="row">
            {new Array(rating).fill(null).map(() => '★').join('')}
            {new Array(3 - rating).fill(null).map(() => '☆').join('')}
          </div>



          <h2 className="row">
            {qualityDescriptor[rating]} {furnitureModel.displayName}</h2>

          <p className="typography-small row">Item quality is based on how well you solve the puzzle.
          As people move into your home, high-quality items will make them happier.</p>

          <Button
            variant="contained"
            color="primary"
            onClick={onAcceptPuzzleSuccess}
          >
            Continue
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      horizontalScroll={true}
      title="Assemble furniture"
      onSelectClose={onClose}
    >
      {getIsFirstTimeAssembly(game) && !skipTutorialScreen ? (
        <div
          style={{
            padding: "2rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src="/images/box.png" width="100px" />

          <Typography style={{marginBottom: '16px'}}>
            To assemble a piece of furniture, you'll need to solve a random puzzle.
            </Typography>

          <Button variant="contained" color="primary" onClick={() => {
            setSkipTutorialScreen(true);
          }}>Generate Puzzle</Button>
        </div>
      ) : (
        <PuzzleAnagram
          instructions="Tap two or more similar words to merge them. Merge all the words to win!"
          difficulty="easy"
          onPuzzleFailed={onPuzzleFailed}
          onPuzzleSolved={onPuzzleSolved}
        />
      )}
    </Modal>
  );
}

  /*
  <PuzzleAnagram
    instructions="Can you find all the anagrams?"
    difficulty="easy"
    onPuzzleSolved={onPuzzleSolved}
    onPuzzleFailed={onPuzzleFailed}
  />
  */