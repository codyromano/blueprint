import { useEffect, useRef } from "react";
import GameState from "../models/GameState";
import { useAudioPlayer } from "react-use-audio-player";

function rand(sources: string[]): string {
  const i = Math.floor(Math.random() * sources.length);
  return sources[i];
}

export default function useSoundEffectOnGameStateChange(game: GameState) {
  const totalTenantsRef = useRef<number>(Object.keys(game.tenants).length);
  const totalCashRef = useRef<number>(game.player.cash);
  const {load} = useAudioPlayer();

  useEffect(() => {
    const newTotalTenants = Object.keys(game.tenants).length;
    if (newTotalTenants > totalTenantsRef.current) {
      load('/audio/doorbell.mp3', {autoplay: true});
      totalTenantsRef.current = newTotalTenants;
    }

    const newCash = game.player.cash;
    if (newCash > totalCashRef.current) {
      load(rand([
        '/audio/collect-money.mp3',
        '/audio/collect-money-2.mp3',
        '/audio/collect-money-3.mp3'
       ]), {autoplay: true});
      totalCashRef.current = newCash;
    }
  }, [game]);
}