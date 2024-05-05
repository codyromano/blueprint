import React, { useEffect } from "react";
import getObjectValues from "../utils/getObjectValues";
import GameActions from "./GameActions";
import GameContext from "./GameStateProvider";
import reduceGameState from "./reduceGameState";

// Provides info about tenants while updating their state periodically
export default function useTenants() {
  const [game, setGame] = React.useContext(GameContext);
  const updateLoopRef = React.useRef<number>();

  useEffect(() => {
    updateLoopRef.current = window.setInterval(() => {
      setGame((state) => {
        let newState = reduceGameState(state, {
          action: GameActions.CREATE_TENANTS,
          lastUpdatedTime: Date.now(),
          entropy: Math.random(),
        });

        newState = reduceGameState(state, {
          action: GameActions.UPDATE_TENANTS,
          lastUpdatedTime: Date.now(),
          entropy: Math.random(),
        });
        return newState;
      });
    }, 1000);

    return () => {
      window.clearInterval(updateLoopRef.current);
    };
  }, []);

  return getObjectValues(game.tenants);
}
