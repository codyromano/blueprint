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
        !newGame.messages.find((m) => 'LEARN_TO_BUY_FURNITURE')
      ) {
        newGame.messages.push({
          id: 'LEARN_TO_MOVE_FURNITURE',
          messageContent:
            "Tap and drag your furniture to make the room feel like home.",
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
          
        <div className="row">
          <Image src={`/images/${furnitureModel.id}.webp`} style={{maxHeight: "25rem"}} />
          </div>

          <div className="row">
            {new Array(rating).fill(null).map(() => '★').join('')}
            {new Array(3 - rating).fill(null).map(() => '☆').join('')}
          </div>



          <h2 className="row">
            {qualityDescriptor[rating]} {furnitureModel.displayName}</h2>

          <p className="typography-small row">Item quality is based on how well you solve the puzzle.
          As people move into your home, high-quality items will make them happier.</p>

          <button
            onClick={onAcceptPuzzleSuccess}
            style={{ color: "blue", fontSize: "1.25rem" }}
          >
            Continue
          </button>
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

          <p className="typography-normal" style={{ maxWidth: "400px" }}>
            To assemble a piece of furniture, you'll need to solve a random puzzle.
          </p>

          <button onClick={() => {
          setSkipTutorialScreen(true);
          }}>Generate Puzzle</button>
        </div>
      ) : (
        <PuzzleWordMerge
          instructions="Tap similar words to merge them. Merge all the words except one to get a perfect score."
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