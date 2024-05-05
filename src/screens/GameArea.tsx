import React, { useEffect } from "react";
import BaseScreen from "../utils/BaseScreen";
import PopUpNoticeContainer from "./shared/PopUpNoticeContainer";
import PositionLayer from "./shared/PositionLayer";
import Image from "./shared/Image";
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

      <div
        className="house"
        style={{
          position: "relative",
          background: "url(/images/house.jpg) no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {ownedItems.length > 0 &&
          ownedItems.map((item) => (
            <Furniture
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
              key={item.id}
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
            addMarker(Markers.TUTORIAL_BUY_FURNITURE);
          }}
          style={{ position: "absolute", right: "0", bottom: "0" }}
          className={
            !game.markers[Markers.TUTORIAL_BUY_FURNITURE]
              ? "focal-point"
              : undefined
          }
        >
          <Image
            maxWidth="100px"
            width="10vw"
            src="/images/buy_blueprint_icon.png"
          />{" "}
        </button>
      </div>
    </BaseScreen>
  );
}
