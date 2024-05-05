import { FurnitureName } from "./Furniture";
import Markers from "./Markers";

type GameState = {
  lastUpdatedTime: number;
  player: {
    id: string;
    cash: number;
    authToken?: string;
  };
  messages: Array<{
    id: string;
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
