import React, { useCallback, useContext, useMemo, useState } from "react";
import GameContext from "../state/GameStateProvider";
import FocalPoint from "../models/FocalPoint";

export default function useFocalPoint(): {
  setFocalPoint: (focalPoint: null | FocalPoint) => void,
  // Return a classname to create the focal point animation if the provided focal point
  // equals the current focal point
  getClassNameWithFocalPoint: (focalPoint: FocalPoint, existingClassName?: string) => string
} {
  const [game, setGame] = useContext(GameContext);

  const getClassNameWithFocalPoint = (focalPoint: FocalPoint, existingClassName: string = '') => {
    const focalPointClassName = focalPoint === game.focalPoint ? 'focal-point' : '';
    return [existingClassName, focalPointClassName].join(' ');
  };

  const setFocalPointImpl = useCallback((focalPoint: null | FocalPoint) => {
    setGame(game => ({
      ...game,
      focalPoint,
    }))
  }, []);

  return useMemo(() => ({
    setFocalPoint: setFocalPointImpl, 
    getClassNameWithFocalPoint
  }), [setFocalPointImpl, getClassNameWithFocalPoint])
}