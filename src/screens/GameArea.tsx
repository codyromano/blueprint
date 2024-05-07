import React, { useEffect } from "react";
import BaseScreen from "../utils/BaseScreen";
import PopUpNoticeContainer from "./shared/PopUpNoticeContainer";
import PositionLayer from "./shared/PositionLayer";
import {Img as Image} from "react-image";
import BuyFurniture from "./BuyFurniture";
import GameContext from "../state/GameStateProvider";
import reduceGameState from "../state/reduceGameState";
import GameActions from "../state/GameActions";
import GameVitalStatsHeader from "./GameVitalStatsHeader";
import getObjectValues from "../utils/getObjectValues";
import Furniture from "./Furniture";
import Markers from "../models/Markers";
import GameState from "../models/GameState";
import AssembleFurniture from "./AssembleFurniture";
import useTenants from "../state/useTenants";
import Tenant from "./Tenant";
import DebugOverlay from "./shared/DebugOverlay";
import useFocalPoint from "../utils/useFocalPoint";
import "./GameArea.css";

enum ContextOverlayMenu {
  BuyFurniture = "BuyFurniture",
  AssembleFurniture = "AssembleFurniture",
}

const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

export default function GameArea() {
  const [selectedItem, setSelectedItem] = React.useState<
    GameState["furniture"][string] | null
  >();
  const [activeOverlayMenu, setActiveOverlayMenu] =
    React.useState<ContextOverlayMenu | null>(null);
  const [game, setGame] = React.useContext(GameContext);
  const {getClassNameWithFocalPoint, setFocalPoint} = useFocalPoint();

  const happiness =
    Object.keys(game.tenants).length > 0
      ? average(getObjectValues(game.tenants).map((t) => t.happiness))
      : null;
      

  const tenants = useTenants();

  const ownedItems: Array<NonNullable<GameState["furniture"][string]>> =
    getObjectValues(game.furniture);

  const addMarker = (marker: Markers) => {
    setGame((state) => {
      const newState = { ...state };
      newState.markers = {
        ...newState.markers,
        [marker]: true,
      };
      return newState;
    });
  };

  return (
    <BaseScreen>
      <DebugOverlay state={game} />
      {/*
      <div style={{ color: "#fff" }}>{JSON.stringify(game)}</div>
      */}
      <GameVitalStatsHeader cash={game.player.cash} happiness={happiness} />

      {selectedItem != null &&
        activeOverlayMenu === ContextOverlayMenu.AssembleFurniture && (
          <AssembleFurniture
            item={selectedItem}
            onClose={() => {
              setSelectedItem(null);
              setActiveOverlayMenu(null);
            }}
          />
        )}

      {activeOverlayMenu === ContextOverlayMenu.BuyFurniture && (
        <BuyFurniture
          playerCash={game.player.cash}
          onSelectBuy={(item) => {
            const newState = reduceGameState(game, {
              action: GameActions.BUY_FURNITURE_REQUEST,
              furnitureName: item.id,
              lastUpdatedTime: Date.now(),
              entropy: Math.random(),
            });

            setGame(newState);
            setActiveOverlayMenu(null);
          }}
          onSelectClose={() => setActiveOverlayMenu(null)}
        />
      )}
      <PopUpNoticeContainer />

      <div className="house">
        {ownedItems.length > 0 &&
          ownedItems.map((item) => (
            <Furniture
              key={item.id}
              onDragPositionChanged={(x, y) => {
                setGame((state) => {
                  const newState = { ...state };
                  const newItem = newState.furniture[item.id];

                  if (newItem?.position == null) {
                    throw new Error("expected position");
                  }

                  newItem.position[0] = `${x}px`;
                  newItem.position[1] = `${y}px`;

                  // newState.markers["IS_READY_FOR_FIRST_TENANT"] = true;

                  return newState;
                });
              }}
              isFocalPoint={true}
              onTouchEnd={() => {
                setSelectedItem(item);

                if (item.status === "blueprint") {
                  setActiveOverlayMenu(ContextOverlayMenu.AssembleFurniture);
                }
              }}
              ownedItem={item}
            />
          ))}

        {tenants.map((tenant, index) => {
          const currentTime = Date.now();
          const timeMoneyIsReady =
            tenant.moneyCollectedTime == null
              ? currentTime
              : // Three minutes per money collection
                tenant.moneyCollectedTime + 1000 * 60 * 2;
          const secondsUntilMoneyReady = Math.max(
            0,
            Math.round((timeMoneyIsReady - currentTime) / 1000)
          );

          return (
            <Tenant
              key={tenant.id}
              secondsUntilMoneyIsReady={secondsUntilMoneyReady}
              onCollectMoney={() => {
                setGame((state) => {
                  const newState = { ...state };
                  const reward = 1000 * (tenant.happiness / 100);

                  newState.player.cash += reward;
                  newState.tenants[tenant.id].moneyCollectedTime = Date.now();
                  return newState;
                });
              }}
              tenant={tenant}
              index={index}
            />
          );
        })}

        <button
          onClick={() => {
            setActiveOverlayMenu(ContextOverlayMenu.BuyFurniture);
            // addMarker(Markers.TUTORIAL_BUY_FURNITURE);
          }}
          className={getClassNameWithFocalPoint('OPEN_BUY_FURNITURE_MENU_BUTTON', 'buy-furniture-button')}
        >
          <i style={{fontSize: "75px"}} className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </BaseScreen>
  );
}
