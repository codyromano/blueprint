import React from "react";
import PositionLayer from "./shared/PositionLayer";
import "./BuyFurniture.css";
import GameState from "../models/GameState";
import Furniture, { FurnitureName, FurnitureItem } from "../models/Furniture";
import {Img as Image} from "react-image";

import Modal from "./shared/Modal";

type Props = {
  onSelectClose: () => void;
  onSelectBuy: (item: FurnitureItem) => void;
  playerCash: number;
};

export default function BuyFurniture({ playerCash, onSelectClose, onSelectBuy }: Props) {
  const furnitureItems: FurnitureItem[] = Object.values(Furniture).sort(
    (a, b) => a.cost - b.cost
  );

  return (
    <Modal
      title="Buy furniture"
      onSelectClose={onSelectClose}
      horizontalScroll={true}
    >
      <ul
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          height: "100%",
          overflowX: "scroll",
        }}
      >
        {furnitureItems.map((furniture) => (
          <li key={furniture.id}>
            <button
              disabled={furniture.cost > playerCash}
              onClick={() => onSelectBuy(furniture)}
              className="buy-furniture-tile-button"
            >
              <h2 className="row">{
                furniture.displayName
              }</h2>
              <Image style={{width: '100%'}} src={`/images/${furniture.id}.webp`} />
              <div className="item-cost"><i className="fa-solid fa-sack-dollar" style={{color: "#000000"}}></i>{furniture.cost}</div>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
  /*
  return (
    <PositionLayer
      zIndex={10}
      position="fixed"
      justifyContent="center"
      alignItems="center"
    >
      <div className="hscroll-menu">
        <h1
          style={{
            fontSize: "1.75rem",
            marginBottom: "1.5rem",
          }}
        >
          Buy Furniture
        </h1>

        <ul
          style={{
            display: "flex",
            width: "100%",
            gap: "10px",
            overflowX: "scroll",
          }}
        >
          {furnitureItems.map((furniture) => (
            <li key={furniture.id}>
              <h2 className="row">{furniture.displayName}</h2>
              <Image src={`../public/images/${furniture.id}.png`} />

              <button
                onClick={() => onSelectBuy(furniture)}
                className="block-button"
              >
                Buy 🪙 {furniture.cost}
              </button>
            </li>
          ))}
        </ul>

        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
        >
          <button onClick={onSelectClose} className="block-button">
            Close
          </button>
        </div>
      </div>
    </PositionLayer>
  );
  */
}
