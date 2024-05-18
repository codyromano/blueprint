import { FurnitureName } from "../models/Furniture";
import Furniture from "../models/Furniture";
import GameState from "../models/GameState";
import GameActions from "./GameActions";
import getObjectValues from "../utils/getObjectValues";
import MessageID from "../models/MessageID";
import reduceLayerZIndex from "./reduceLayerZIndex";
import nullThrows from "../utils/nullThrows";

type Payload = {
  action: GameActions;
  furnitureName?: FurnitureName;
  messageId?: string;
  lastUpdatedTime: number;
  entropy: number;
  collectCash?: number;
  selectedItemId?: string;
  changeZIndex?: 'up' | 'down';
  newCoords?: {x: number, y: number};
};

let i = 0;
const createUUID = () => {
  return `${Date.now()}${++i}`;
};

const TENANT_VW = 15;

type ExtraContent = {
  primaryButtonText: string;
  primaryButtonUrl: string;
};

export const addMessageOnce = (
  messageID: MessageID,
  messageContent: string,
  state: GameState,
  extraContent?: ExtraContent,
): GameState => {
  const newState = { ...state };
  if (!newState.messages.find(m => m.id === messageID)) {
    newState.messages.push({
      id: messageID,
      isDismissed: false,
      messageContent,
      messageType: "pop-up",
      ...(extraContent ?? {})
    });
  }
  return newState;
};

const hasDismissedMessage = (messageID: MessageID, state: GameState) => {
  return state.messages.find((m) => m.id === messageID)?.isDismissed;
};

const getTargetTotalTenants = (
  totalAssemblyQuality: number,
  totalItems: number,
  playerCash: number
): number => {
  if (totalItems >= 20) {
    return 6;
  }
  if (totalItems >= 16) {
    return 5;
  }
  if (totalItems >= 12) {
    return 4;
  }
  if (totalItems >= 8) {
    return 3;
  }
  if (totalItems >= 4) {
    return 2;
  }
  if (totalItems >= 2) {
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
          // coords: {x: 0.8819, y: 0.6390},
          coords: {x: 0.5, y: 0.5},
          // Spawn furniture in the center of the screen
          position: [`calc(50vw - ${furniture.size[0] / 2}px)`, `calc(50vh - ${furniture.size[1] / 2}px)`],
          status: "blueprint",
        };

        switch (furniture.category) {
          case 'plant': {
            newState.itemStages[id] = {
              id,
              currentStage: 1,
              stageLastChangedTime: Date.now()
            };
            break;
          }
        }

        newState.layerZIndex.push(id);

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
        const totalAssemblyQuality = getObjectValues(newState.furniture).reduce(
          (total, item) => total + (item?.assemblyQuality ?? 0),
          0
        );
        const targetTotalTenants = getTargetTotalTenants(
          totalAssemblyQuality,
          Object.keys(newState.furniture).length,
          newState.player.cash,
        );

        if (targetTotalTenants === 1) {
          newState = addMessageOnce(
            'LEARN_TO_MANAGE_TENANTS',
            `Your first tenant moved in! Buy furniture to keep them happy. Happy tenants will give you more money.`,
            newState,
          );
        }

        const newTenants = Math.max(
          0,
          targetTotalTenants - Object.keys(newState.tenants).length
        );

        for (let i = 0; i < newTenants; i++) {
          const id = createUUID();
          newState.tenants[id] = {
            id,
            happiness: 50,
            coords: {x: 0.5, y: 0.5},
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
        if (newState.lastUpdatedTime - tenant.lastUpdatedTime > 1000 * 30) {
          // TODO: Update this
          tenant.position[0] = 80 * payload.entropy;
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
    case GameActions.CHANGE_Z_INDEX: {
      const { selectedItemId, changeZIndex } = payload;
      const selectedItem = newState?.furniture[selectedItemId ?? ''];

      if (selectedItemId == null || changeZIndex == null) {
        throw new Error('Missing selected item or z index prop');
      }
      if (selectedItem == null) {
        throw new Error('No furniture item matches provided id');
      }

      newState.layerZIndex = reduceLayerZIndex(selectedItemId, changeZIndex, newState.layerZIndex);
      break;
    }
    case GameActions.UPDATE_ITEM_COORDS: {
      const newCoords = nullThrows(payload.newCoords);
      const selectedItemId = nullThrows(payload.selectedItemId);
      newState.initialLoadCoords[selectedItemId] = newCoords;
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
