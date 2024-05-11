import React, { useState } from "react";
import PositionLayer from "./shared/PositionLayer";
import "./BuyFurniture.css";
import GameState from "../models/GameState";
import Furniture, { FurnitureName, FurnitureItem } from "../models/Furniture";
import {Img as Image} from "react-image";
import PaidIcon from '@mui/icons-material/Paid';
import Modal from "./shared/Modal";
import { Box, Button, ButtonGroup, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import nullThrows from "../utils/nullThrows";


type Props = {
  onSelectClose: () => void;
  onSelectBuy: (item: FurnitureItem) => void;
  playerCash: number;
};

export default function BuyFurniture({ playerCash, onSelectClose, onSelectBuy }: Props) {
  const [selectedItem, setSelectedItem] = useState<FurnitureItem>();
  const furnitureItems: FurnitureItem[] = Object.values(Furniture).sort(
    (a, b) => a.cost - b.cost
  );

  return (
    <Modal
      title="Buy furniture"
      onSelectClose={onSelectClose}
      horizontalScroll={true}
    >
    <ImageList cols={3} rowHeight={164} style={{padding: '15px 0'}}>
      {furnitureItems.map((item) => {
        const isDisabled = playerCash < item.cost;

       return (
        <ImageListItem key={item.id} style={{
          border: selectedItem?.id === item.id ? 'solid #000 1px' : 'solid #ccc 1px',
          borderRadius: '5px',
          opacity: isDisabled ?  0.5 : 1
        }}>
          <Box onClick={() => {
            if (!isDisabled) {
              setSelectedItem(item);
            }
          }}>
            <>
            <div style={{
              height: 100,
              background: `url(/images/${item.id}.webp) no-repeat`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }} />

            <ImageListItemBar
              title={item.displayName}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`info about ${item.displayName}`}
                >
                  <PaidIcon />
                  <Typography>{item.cost}</Typography>
                </IconButton>
              }
            />
          </>
        </Box>
        </ImageListItem>);
      })}
    </ImageList>

    <ButtonGroup fullWidth>
      <Button variant="outlined" fullWidth>Cancel</Button>
      <Button variant="contained" onClick={() => {
        onSelectBuy(nullThrows(selectedItem, 'Expected selectedItem'));
      }} disabled={selectedItem == null} fullWidth color="primary">Buy</Button>
    </ButtonGroup>

    {/*
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
      */}
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
