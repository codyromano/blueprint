import React, { useEffect } from "react";
import BaseScreen from "../utils/BaseScreen";
import PopUpNoticeContainer from "./shared/PopUpNoticeContainer";
import PositionLayer from "./shared/PositionLayer";
import {Img as Image} from "react-image";
import BuyFurniture from "./BuyFurniture";
import GameContext from "../state/GameStateProvider";
import reduceGameState, { addMessageOnce } from "../state/reduceGameState";
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
import useDebugCommand from "../state/useDebugCommand";
import Position from "../models/Position";
import { Box, Button, IconButton } from "@mui/material";
import FurnitureModels from "../models/Furniture";
import { getImageUrlForItem } from "../utils/itemStageUtils";
import PlantMenu from "./PlantMenu";
import { useNavigate } from "react-router-dom";
import { People, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import Economy, { getRentAmount } from "../models/Economy";
import TenantMenu from "./TenantMenu";


enum ContextOverlayMenu {
  BuyFurniture = "BuyFurniture",
  AssembleFurniture = "AssembleFurniture",
  ManageTenants = "ManageTenants"
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

  const {setCommandCallback} = useDebugCommand();
  const navigate = useNavigate();

  useEffect(() => {
    setCommandCallback('COLLECT_MONEY_CHEAT', () => {
      setGame(reduceGameState(game, {
        action: GameActions.COLLECT_CASH,
        entropy: Math.random(),
        lastUpdatedTime: Date.now(),
        collectCash: Economy.PRICE_LEVEL_10
      }))
    });

    setCommandCallback('CHANGE_CHARACTER_TRAIT', () => {
      navigate('/mode');
    });

    setCommandCallback('FULL_HOUSE', () => {
      setGame(state => {
        let newState = {...state};

        const items = getObjectValues({...FurnitureModels});
        newState.player.cash = Economy.PRICE_LEVEL_10 * items.length;
        console.log('total items', items);

        for (const item of items) {
          newState = reduceGameState(game, {
            action: GameActions.BUY_FURNITURE_REQUEST,
            furnitureName: item.id,
            lastUpdatedTime: Date.now(),
            entropy: Math.random(),
          });
        }
        for (const item of getObjectValues({...newState.furniture})) {
          item.status = 'assembled';
        }
        console.log(newState);
        return newState;
      });
    });
  }, [setCommandCallback]);

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

  const itemZIndexMap: Record<string, number> = {};
  game.layerZIndex.forEach((itemId, i) => {
    itemZIndexMap[itemId] = i;
  });

  return (
    <BaseScreen>
      <DebugOverlay state={game} />
      {/*
      <div style={{ color: "#fff" }}>{JSON.stringify(game)}</div>
      */}
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

      {activeOverlayMenu === ContextOverlayMenu.ManageTenants && <TenantMenu
        onSelectClose={() => {
          setActiveOverlayMenu(null);
        }}
      />}

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

      <Box display="flex" height="100%" alignContent="center" alignItems="center">
      <div className="house">
      <GameVitalStatsHeader cash={game.player.cash} happiness={happiness} />
      
        {ownedItems.length > 0 &&
          ownedItems.map((item) => {
            const imageUrl = getImageUrlForItem(game, item.id);

            return (
              <Furniture
                overheadContent={
                  FurnitureModels[item.furnitureName].category === 'plant' ?
                  <PlantMenu ownedItem={item} /> : null
                }
                zIndex={1 + (itemZIndexMap[item.id] ?? 0)}
                key={item.id}
                onDragPositionChanged={(position: Position | null) => {
                  if (position == null) {
                    return;
                  }
                  setGame((state) => {
                    const newState = { ...state };
                    const newItem = newState.furniture[item.id];

                    if (newItem?.position == null) {
                      throw new Error("expected position");
                    }

                    newItem.position[0] = `${position.vw}vw`;
                    newItem.position[1] = `${position.vh}vh`;

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
                imageUrl={imageUrl}
              />
            );
        })}

        {tenants.map((tenant, index) => {
          const currentTime = Date.now();
          const timeMoneyIsReady =
            tenant.moneyCollectedTime == null
              ? currentTime
              : 
                tenant.moneyCollectedTime + 1000 * 60 * 5;
          const secondsUntilMoneyReady = Math.max(
            0,
            Math.round((timeMoneyIsReady - currentTime) / 1000)
          );

          const rent = getRentAmount(tenant.happiness);

          return (
            <Tenant
              rentAmount={rent}
              key={tenant.id}
              secondsUntilMoneyIsReady={secondsUntilMoneyReady}
              onCollectMoney={() => {
                setGame((state) => {
                  let newState = { ...state };
                  

                  newState = addMessageOnce('CHOOSE_A_PERK', 'Now that you\'ve learned the basics, it\'s time to choose a character trait!', state, {
                    primaryButtonText: 'Choose trait',
                    primaryButtonUrl: '/mode'
                  });

                  newState.player.cash += rent;
                  newState.tenants[tenant.id].moneyCollectedTime = Date.now();
                  return newState;
                });
              }}
              tenant={tenant}
              index={index}
            />
          );
        })}

        <Box zIndex={499} display="flex" width="100%" justifyContent="space-between" position="absolute" bottom="2.5rem" right="0">
          <Button
            aria-label="Tenants"
            variant="outlined"
            style={{backgroundColor: "#fff"}}
            onClick={() => {
              setActiveOverlayMenu(ContextOverlayMenu.ManageTenants);
            }}
            endIcon={<People />}
          >Tenants</Button>
          
          <Button
            aria-label="Shop"
            variant="contained"
            color="primary"
            onClick={() => {
              setActiveOverlayMenu(ContextOverlayMenu.BuyFurniture);
              // addMarker(Markers.TUTORIAL_BUY_FURNITURE);
            }}
            endIcon={<ShoppingBag />}
            className={getClassNameWithFocalPoint('OPEN_BUY_FURNITURE_MENU_BUTTON', 'buy-furniture-button')}
          >Shop</Button>
        </Box>
      </div>
      </Box>
    </BaseScreen>
  );
}
