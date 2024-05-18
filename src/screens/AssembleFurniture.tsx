import React, { useState } from "react";
import Modal from "./shared/Modal";
import PuzzleAnagram from "./PuzzleAnagram/PuzzleAnagram";
import Puzzle from "../models/Puzzle";
import Markers from "../models/Markers";
import FurnitureModels from "../models/Furniture";
import GameState, { PuzzleID } from "../models/GameState";
import GameContext from "../state/GameStateProvider";
import getObjectValues from "../utils/getObjectValues";
import Furniture from "./Furniture";
import {Img as Image} from "react-image";
import PuzzleWordMerge from "./PuzzleWordMerge/PuzzleWordMerge";
import { Button, Typography, ImageList, ImageListItem, Box, ImageListItemBar, IconButton  } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import PaidIcon from '@mui/icons-material/Paid';
import { getImageUrlForUnownedItemPreview } from "../utils/itemStageUtils";

enum AssembleFurnitureResult {
  PENDING,
  SUCCESS,
}

type AssemblyQualityRating = NonNullable<NonNullable<GameState["furniture"][string]>['assemblyQuality']>;

const qualityDescriptor: Record<AssemblyQualityRating, string> = {
  0: 'Poor-quality',
  1: 'Low-quality',
  2: 'Medium-quality',
  3: 'High-quality',
};

const puzzleGameOptions: Array<{
  id: PuzzleID,
  title: string;
  instructions: string;
  cost: number;
}> = [
  {
    id: 'puzzleAnagram',
    title: 'Anagrams',
    instructions: "Rearrange a set of letters to find new words",
    cost: 0,
  },
  {
    id: 'puzzleWordMerge',
    title: 'Word Merge',
    instructions: "Tap two or more similar words to merge them. Merge all the words to win!",
    cost: 500,
  }
];

const getPuzzleDifficulty = (selectedPuzzle: typeof puzzleGameOptions[number], state: GameState): Puzzle['difficulty'] => {
  // TODO: Decide how to modify puzzle difficulty based on game progress
  return 'easy';
};

const mapPuzzleIdToComponent: Record<typeof puzzleGameOptions[number]['id'], React.FC<Puzzle>> = {
  'puzzleAnagram': PuzzleAnagram,
  'puzzleWordMerge': PuzzleWordMerge,
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
  const [selectedItem, setSelectedItem] = useState<null | typeof puzzleGameOptions[number]>(null);

  const onPuzzleSolved = (rating: AssemblyQualityRating, puzzleId: string) => {
    setRating(rating);

    setGame(state => {
      const newGame = {...state};
      newGame.actionsCompleted[puzzleId] = true;
      return newGame;
    });
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
          
          <Avatar variant="square" src={`${getImageUrlForUnownedItemPreview(game, furnitureModel.id)}`} style={{ height: "100px", width: "100px", margin: "16px"}} />

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

  const PuzzleComponent = selectedItem?.id == null ? null : mapPuzzleIdToComponent[selectedItem.id];

  return (
    <Modal
      horizontalScroll={true}
      title="Assemble furniture"
      onSelectClose={onClose}
    >
        {PuzzleComponent == null || selectedItem == null ? <div
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
           Assemble furniture by solving a word puzzle. Choose a puzzle:
            </Typography>


            <ImageList gap={15} cols={3} rowHeight={175} style={{padding: '15px 0'}}>
      {puzzleGameOptions.map((item) => {
        const isUnlocked = game.puzzlesUnlocked.hasOwnProperty(item.id);
        const isDisabled = game.player.cash < item.cost && !isUnlocked;

       return (
        <ImageListItem key={item.id} style={{
          border: selectedItem?.id === item.id ? 'solid #000 3px' : 'solid #ccc 3px',
          borderRadius: '5px',
          cursor: isDisabled ? 'default' : 'pointer',
          opacity: isDisabled ?  0.5 : 1
        }}>
          <Box onClick={() => {
            if (!isDisabled) {
              setSelectedItem(item);
              setGame(state => {
                return {
                  ...state,
                  puzzlesUnlocked: {
                    ...state.puzzlesUnlocked,
                    [item.id]: true,
                  }
                };
              });
            }
          }}>
            <>
            <div style={{
              height: 175,
              background: `url(/images/${item.id}.webp) no-repeat`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />

            <ImageListItemBar
              title={item.title}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`info about ${item.title}`}
                >
                  <PaidIcon />
                  <Typography>
                    {game.puzzlesUnlocked.hasOwnProperty(item.id) ? 'Unlocked' : (
                        item.cost > 0 ? item.cost : 'Free'
                    )}</Typography>
                </IconButton>
              }
            />
          </>
        </Box>
        </ImageListItem>);
      })}
    </ImageList>
        </div> : (
          <PuzzleComponent
            instructions={selectedItem.instructions}
            difficulty={getPuzzleDifficulty(selectedItem, game)}
            onPuzzleFailed={onPuzzleFailed}
            onPuzzleSolved={onPuzzleSolved}
            completedPuzzleIds={game.actionsCompleted}
          />
        )}
      </Modal>
  );

      /*
        <PuzzleAnagram
          instructions="Tap two or more similar words to merge them. Merge all the words to win!"
          difficulty="easy"
          onPuzzleFailed={onPuzzleFailed}
          onPuzzleSolved={onPuzzleSolved}
        />
        */
}

  /*
  <PuzzleAnagram
    instructions="Can you find all the anagrams?"
    difficulty="easy"
    onPuzzleSolved={onPuzzleSolved}
    onPuzzleFailed={onPuzzleFailed}
  />
  */