import { FurnitureName } from "../models/Furniture";
import Furniture from "../models/Furniture";
import GameState from "../models/GameState";
import GameActions from "./GameActions";
import getObjectValues from "../utils/getObjectValues";
import Markers from "../models/Markers";

type Payload = {
  action: GameActions;
  furnitureName?: FurnitureName;
  messageId?: string;
  lastUpdatedTime: number;
  entropy: number;
};

let i = 0;
const createUUID = () => {
  return `${Date.now()}${++i}`;
};

const TENANT_VW = 15;

const addMessageOnce = (
  marker: Markers,
  messageContent: string,
  state: GameState
): GameState => {
  const newState = { ...state };
  if (!newState.markers.hasOwnProperty(marker)) {
    newState.messages.push({
      id: marker,
      isDismissed: false,
      messageContent,
      messageType: "pop-up",
    });
    newState.markers[marker] = true;
  }
  return newState;
};

const hasDismissedMessage = (marker: Markers, state: GameState) => {
  return state.messages.find((m) => m.id === marker)?.isDismissed;
};

export default function reduceGameState(
  state: GameState,
  payload: Payload
): GameState {
  let newState = { ...state };
  newState.lastUpdatedTime = payload.lastUpdatedTime;

  switch (payload.action) {
    case GameActions.DISMISS_MESSAGE: {
      const { messageId } = payload;

      if (messageId == null) {
        throw new Error("Missing messageId");
      }
      const message = newState.messages.find((m) => m.id === messageId);

      if (message == null) {
        throw new Error("Message not found");
      }

      message.isDismissed = true;
      break;
    }
    case GameActions.BUY_FURNITURE_REQUEST: {
      const { furnitureName } = payload;

      if (furnitureName == null) {
        throw new Error("Missing furnitureName");
      }

      const furniture = Furniture[furnitureName];

      if (state.player.cash >= furniture.cost) {
        newState.player.cash -= furniture.cost;

        const id = createUUID();
        newState.furniture[id] = {
          id,
          furnitureName,
          position: ["50vw", "50vh"],
          status: "blueprint",
        };

        newState = addMessageOnce(
          Markers.BUY_FIRST_FURNITURE_ITEM,
          `Tap the box to assemble your new furniture`,
          newState
        );
      }

      break;
    }
    case GameActions.CREATE_TENANTS: {
      if (newState.markers["IS_READY_FOR_FIRST_TENANT"]) {
        const totalAssemblyQuality = getObjectValues(newState.furniture).reduce(
          (total, item) => total + (item?.assemblyQuality ?? 0),
          0
        );
        // TODO: Adjust this function
        const targetTotalTenants = totalAssemblyQuality;
        const newTenants = Math.max(
          0,
          targetTotalTenants - Object.keys(newState.tenants).length
        );

        for (let i = 0; i < newTenants; i++) {
          const id = createUUID();
          newState.tenants[id] = {
            id,
            happiness: 100,
            // Note: Y position is from the bottom
            // 0 = "bottom: 0px"
            position: [50 - TENANT_VW / 2, 0],
            lastUpdatedTime: newState.lastUpdatedTime,
            moneyCollectedTime: null,
          };
        }
      }
      break;
    }
    case GameActions.UPDATE_TENANTS: {
      for (const tenant of getObjectValues(newState.tenants)) {
        if (newState.lastUpdatedTime - tenant.lastUpdatedTime > 1000 * 15) {
          tenant.position[0] = 100 * payload.entropy;
          tenant.lastUpdatedTime = newState.lastUpdatedTime;
        }
      }
      break;
    }
    default:
      throw new Error(`Unknown action: ${payload.action}`);
      break;
  }

  return newState;
}
