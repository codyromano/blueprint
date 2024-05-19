import React, { useContext, useState } from "react";
import "./BuyFurniture.css";
import Furniture, { FurnitureName, FurnitureItem } from "../models/Furniture";
import PaidIcon from '@mui/icons-material/Paid';
import Modal from "./shared/Modal";
import { Box, Button, ButtonGroup, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import nullThrows from "../utils/nullThrows";
import { getImageUrlForItem, getImageUrlForUnownedItemPreview } from "../utils/itemStageUtils";
import GameContext from "../state/GameStateProvider";
import { useAudioPlayer } from "react-use-audio-player";

type Props = {
  onSelectClose: () => void;
  onSelectBuy: (item: FurnitureItem) => void;
  playerCash: number;
};

const getColumns = () => {
  const width = window?.visualViewport?.width;

  if (width == null || width > 900) {
    return 3;
  }

  if (width >= 670) {
    return 2;
  }

  return 1;
};

export default function BuyFurniture({ playerCash, onSelectClose, onSelectBuy }: Props) {
  const {load} = useAudioPlayer();
  const [selectedItem, setSelectedItem] = useState<FurnitureItem>();
  const furnitureItems: FurnitureItem[] = Object.values(Furniture).sort(
    (a, b) => a.cost - b.cost
  );
  const [game] = useContext(GameContext);

  return (
    <Modal
      title="Buy furniture"
      onSelectClose={onSelectClose}
      horizontalScroll={true}
    >
    <ImageList gap={15} cols={getColumns()} rowHeight={164} style={{padding: '15px 0'}}>
      {furnitureItems.map((item) => {
        const isDisabled = playerCash < item.cost;

       return (
        <ImageListItem key={item.id} style={{
          border: selectedItem?.id === item.id ? 'solid #000 3px' : 'solid #ccc 3px',
          borderRadius: '5px',
          cursor: isDisabled ? 'default' : 'pointer',
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
              background: `url(${getImageUrlForUnownedItemPreview(game, item.id)}) no-repeat`,
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
      <Button variant="outlined" fullWidth onClick={onSelectClose}>Cancel</Button>
      <Button variant="contained" onClick={() => {
        load('/audio/tap.mp3', {autoplay: true});
        onSelectBuy(nullThrows(selectedItem, 'Expected selectedItem'));
      }} disabled={selectedItem == null} fullWidth color="primary">Buy</Button>
    </ButtonGroup>
    </Modal>
  );
}
