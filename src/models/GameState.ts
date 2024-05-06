import FocalPoint from "./FocalPoint";
import { FurnitureName } from "./Furniture";
import Markers from "./Markers";
import MessageID from "./MessageID";

type GameState = {
  lastUpdatedTime: number;
  focalPoint: null | FocalPoint;
  player: {
    id: string;
    cash: number;
    authToken?: string;
  };
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
        position: null | [string, string];
        status: "blueprint" | "assembled";
        assemblyQuality?: number;
      }
    >
  >;
  markers: Partial<Record<Markers, boolean>>;
};

export default GameState;
