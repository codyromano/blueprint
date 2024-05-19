import CharacterTrait from "./CharacterTrait";
import FocalPoint from "./FocalPoint";
import { FurnitureName } from "./Furniture";
import Markers from "./Markers";
import MessageID from "./MessageID";
import { TenantName } from "./Tenants";

export type PuzzleID = 'puzzleAnagram' | 'puzzleWordMerge';

type GameState = {
  session: {
    cacheKey: number;
  },
  lastUpdatedTime: number;
  focalPoint: null | FocalPoint;
  layerZIndex: Array<string>,
  player: {
    id: string;
    cash: number;
    authToken?: string;
    trait: CharacterTrait;
  };
  puzzlesUnlocked: Partial<Record<PuzzleID, true>>,

  itemStages: Record<string, {
    id: string;
    currentStage: number;
    stageLastChangedTime: number;
  }>;

  // An "action" is a generic term that refers to any activity by the player
  // such as solving a puzzle or collecting an item. An "action" has a unique
  // ID and a simple flag representing completion.
  actionsCompleted: Record<string, true>,
  messages: Array<{
    id: MessageID;
    isDismissed: boolean;
    messageContent: string;
    messageType: "pop-up";
    primaryButtonText?: string;
    primaryButtonUrl?: string;
  }>;
  tenants: Partial<Record<
    TenantName,
    {
      id: TenantName;
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
  >>;
  initialLoadCoords: Record<string, {
    x: number;
    y: number
  }>;
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
