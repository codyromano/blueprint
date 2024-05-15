import FocalPoint from "./FocalPoint";
import { FurnitureName } from "./Furniture";
import Markers from "./Markers";
import MessageID from "./MessageID";

export type PuzzleID = 'puzzleAnagram' | 'puzzleWordMerge';

type GameState = {
  lastUpdatedTime: number;
  focalPoint: null | FocalPoint;
  layerZIndex: Array<string>,
  player: {
    id: string;
    cash: number;
    authToken?: string;
  };
  puzzlesUnlocked: Partial<Record<PuzzleID, true>>,
  messages: Array<{
    id: MessageID;
    isDismissed: boolean;
    messageContent: string;
    messageType: "pop-up";
  }>;
  tenants: Record<
    string,
    {
      id: string;
      happiness: number;
      coords: {
        x: number;
        y: number;
      };
      // Deprecated
      position: [number, number];
      lastUpdatedTime: number;
      moneyCollectedTime: number | null;
    }
  >;
  furniture: Partial<
    Record<
      string,
      {
        id: string;
        furnitureName: FurnitureName;
        coords: {
          x: number;
          y: number;
        };
        // Deprecated
        position: [string, string];
        status: "blueprint" | "assembled";
        assemblyQuality?: number;
      }
    >
  >;
  markers: Partial<Record<Markers, boolean>>;
};

export default GameState;
