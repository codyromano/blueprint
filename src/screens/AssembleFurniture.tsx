import React, { useState } from "react";
import Modal from "./shared/Modal";
import PuzzleAnagram from "./PuzzleAnagram/PuzzleAnagram";
import Puzzle from "../models/Puzzle";
import Markers from "../models/Markers";
import GameState from "../models/GameState";
import GameContext from "../state/GameStateProvider";
import getObjectValues from "../utils/getObjectValues";

enum AssembleFurnitureResult {
  FAILURE,
  PENDING,
  SUCCESS,
}

const getIsFirstTimeAssembly = (state: GameState) => {
  return (
    getObjectValues(state.furniture).find((f) => f.status === "assembled") ==
    null
  );
};

export default function AssembleFurniture({
  item,
  onClose,
}: {
  item: NonNullable<GameState["furniture"][string]>;
  onClose: () => void;
}) {
  const [game, setGame] = React.useContext(GameContext);
  const [result, setResult] = useState<AssembleFurnitureResult>(
    AssembleFurnitureResult.PENDING
  );
  const [rating, setRating] = useState<number | null>(null);
  const [skipTutorialScreen, setSkipTutorialScreen] = useState<boolean>(false);

  const onPuzzleSolved = (rating: number) => {
    setRating(rating);
    setResult(AssembleFurnitureResult.SUCCESS);
  };
  const onPuzzleFailed = () => setResult(AssembleFurnitureResult.FAILURE);

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
        !newGame.messages.find((m) => m.id === Markers.TUTORIAL_MOVE_FURNITURE)
      ) {
        newGame.messages.push({
          id: Markers.TUTORIAL_MOVE_FURNITURE,
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

  return (
    <Modal
      horizontalScroll={true}
      title="Assemble furniture"
      onSelectClose={onClose}
    >
      {result === AssembleFurnitureResult.SUCCESS && (
        <>
          <div>Furniture assembled! Stars: {rating}</div>
          <button
            onClick={onAcceptPuzzleSuccess}
            style={{ color: "blue", fontSize: "1.25rem" }}
          >
            Continue
          </button>
        </>
      )}
      {result === AssembleFurnitureResult.FAILURE && <div>Failure</div>}
      {result === AssembleFurnitureResult.PENDING &&
      (getIsFirstTimeAssembly(game) && !skipTutorialScreen) ? (
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
          <p className="typography-normal" style={{ maxWidth: "400px" }}>
            Assemble a piece of furniture by solving a word puzzle. The quality
            of your furniture will depend on how well you solve the  puzzle.
          </p>

          <button onClick={() => {
          setSkipTutorialScreen(true);
          }}>Continue</button>
        </div>
      ) : (
        <PuzzleAnagram
          instructions="Can you find all the anagrams?"
          difficulty="easy"
          onPuzzleSolved={onPuzzleSolved}
          onPuzzleFailed={onPuzzleFailed}
        />
      )}
    </Modal>
  );
}
