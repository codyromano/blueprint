import { FurnitureName } from "../models/Furniture";
import Furniture from "../models/Furniture";
import GameState from "../models/GameState";
import GameActions from "./GameActions";
import getObjectValues from "../utils/getObjectValues";
import MessageID from "../models/MessageID";

type Payload = {
  action: GameActions;
  furnitureName?: FurnitureName;
  messageId?: string;
  lastUpdatedTime: number;
  entropy: number;
  collectCash?: number;
};

let i = 0;
const createUUID = () => {
  return `${Date.now()}${++i}`;
};

const TENANT_VW = 15;

const addMessageOnce = (
  messageID: MessageID,
  messageContent: string,
  state: GameState
): GameState => {
  const newState = { ...state };
  if (!newState.messages.find(m => m.id)) {
    newState.messages.push({
      id: messageID,
      isDismissed: false,
      messageContent,
      messageType: "pop-up",
    });
  }
  return newState;
};

const hasDismissedMessage = (messageID: MessageID, state: GameState) => {
  return state.messages.find((m) => m.id === messageID)?.isDismissed;
};

const getTargetTotalTenants = (totalAssemblyQuality: number): number => {
  if (totalAssemblyQuality >= 30) {
    return 3;
  }

  if (totalAssemblyQuality >= 20) {
    return 2;
  }

  if (totalAssemblyQuality >= 5) {
    return 1;
  }

  return 0;
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
          position: [`calc(50vw - ${furniture.size[0]}px)`, `calc(50vh - ${furniture.size[1]}px)`],
          status: "blueprint",
        };

        newState = addMessageOnce(
          'LEARN_TO_ASSEMBLE_FURNITURE',
          `Tap the box to assemble your new furniture`,
          newState
        );
        if (Object.keys(newState.furniture).length === 1) {
          newState.focalPoint = 'FURNITURE_ITEM';
        }
      }

      break;
    }
    case GameActions.CREATE_TENANTS: {
     // if (newState.markers["IS_READY_FOR_FIRST_TENANT"]) {
        const totalAssemblyQuality = getObjectValues(newState.furniture).reduce(
          (total, item) => total + (item?.assemblyQuality ?? 0),
          0
        );
        // TODO: Adjust this function
        const targetTotalTenants = getTargetTotalTenants(totalAssemblyQuality);
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
      // }
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
    case GameActions.COLLECT_CASH: {
      if (payload?.collectCash == null) {
        throw new Error('You must set a collectCash param in the payload.');
      }
      newState.player.cash += payload.collectCash;
      break;
    }
    default:
      throw new Error(`Unknown action: ${payload.action}`);
      break;
  }

  if (Object.keys(newState.furniture).length === 1 && newState.furniture[0]?.status === 'assembled') {
    newState.focalPoint = 'FURNITURE_ITEM';
  }

  return newState;
}
