import React, { useContext } from 'react';
import Modal from './shared/Modal';
import GameContext from '../state/GameStateProvider';
import getObjectValues from '../utils/getObjectValues';
import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import TenantsModal from '../models/Tenants';
import Furniture from '../models/Furniture';

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
      {tenants.length > 0 && (
        <Table sx={{maxWidth: 400}}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{fontWeight: 'bold'}}>Tenant</TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>Happiness</TableCell>
              <TableCell align="right"  sx={{fontWeight: 'bold'}}>Wants</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {tenants.map((tenant) => (
            <TableRow
              key={tenant.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="tenant">
                <Box display="flex" justifyContent={"center"} gap="0.5rem" alignItems="center">
                <Avatar src={`/images/${tenant.id}.webp`} />
                {TenantsModal[tenant.id].displayName}
                </Box>
              </TableCell>
              <TableCell align="right">{tenant.happiness}</TableCell>
              <TableCell align="right">{Furniture[TenantsModal[tenant.id].preferredItem].displayName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      )}
    </Modal>
  );
}