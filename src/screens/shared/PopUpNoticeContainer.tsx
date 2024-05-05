import React from "react";
import GameActions from "../../state/GameActions";
import Markers from "../../models/Markers";
import PopUpNotice from "./PopUpNotice";
import GameContext from "../../state/GameStateProvider";
import reduceGameState from "../../state/reduceGameState";

const DURATION = 8000;

export default function PopUpNoticeContainer() {
  const [game, setGame] = React.useContext(GameContext);
  const notice = game.messages.find((m) => !m.isDismissed);
  const messageDisplayTimeRef = React.useRef<Partial<Record<string, number>>>({});

  const onContinue = () => {
    setGame((state) => {
      const newState = { ...state };;
      const message = newState.messages.find((m) => m.id === notice?.id);
      if (message  == null) {
        throw new Error("message not found");
      }

      message.isDismissed = true;
      return newState;
    });
  };

  React.useEffect(() => {
    const updateMessageVisibility = window.setInterval(() => {
      if (notice != null) {
        messageDisplayTimeRef.current[notice.id] =
          messageDisplayTimeRef.current[notice.id] || Date.now();

        const initialRenderTime = messageDisplayTimeRef.current[notice.id];

        if (
          initialRenderTime != null &&
          Date.now() - initialRenderTime >= DURATION
        ) {
          onContinue();
        }
      }
    }, 1000);

    return () => window.clearInterval(updateMessageVisibility);
  }, [notice]);

  return notice == null ? null : (
    <PopUpNotice onContinue={onContinue} message={notice} />
  );
}
