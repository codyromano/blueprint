import React, { useContext } from 'react';
import Modal from './shared/Modal';
import GameContext from '../state/GameStateProvider';
import getObjectValues from '../utils/getObjectValues';
import { Typography } from '@mui/material';

type Props = {
  onSelectClose: () => void;
};

export default function TenantMenu({
  onSelectClose
}: Props) {
  const [game, setGame] = useContext(GameContext);
  const tenants = getObjectValues(game.tenants);

  return (
    <Modal title="Tenants" onSelectClose={onSelectClose} horizontalScroll={false}>
      {tenants.length === 0 && (
        <Typography>
          You don't have any tenants yet. Attract tenants by decorating the room nicely!
        </Typography>
      )}
    </Modal>
  );
}