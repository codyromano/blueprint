import React from "react";
import GameActions from "../../state/GameActions";
import Markers from "../../models/Markers";
import PopUpNoticeV2 from "./PopUpNoticeV2";
import GameContext from "../../state/GameStateProvider";
import reduceGameState from "../../state/reduceGameState";
import useFocalPoint from "../../utils/useFocalPoint";

const DURATION = 8000;

export default function PopUpNoticeContainer() {
  const [game, setGame] = React.useContext(GameContext);
  const notice = game.messages.find((m) => !m.isDismissed);
  const { setFocalPoint } = useFocalPoint();

  const onContinue = () => {
    setGame((state) => {
      const newState = { ...state };
      const message = newState.messages.find((m) => m.id === notice?.id);
      if (message == null) {
        throw new Error("message not found");
      }

      message.isDismissed = true;

      if (message.id === "LEARN_TO_BUY_FURNITURE") {
        setFocalPoint("OPEN_BUY_FURNITURE_MENU_BUTTON");
      }

      return newState;
    });
  };

  return notice == null ? null : (
    <PopUpNoticeV2
      onContinue={onContinue}
      open={notice != null}
      onClose={() => {}}
      title=""
      description={notice.messageContent}
      buttonText="Continue"
    />
  );
}

/*
interface PopUpNoticeProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  title: string;
  description: string;
  buttonText: string;
}
*/
