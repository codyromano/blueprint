import React, { useContext } from 'react';
import Modal from './shared/Modal';
import GameContext from '../state/GameStateProvider';
import getObjectValues from '../utils/getObjectValues';
import { Alert, Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import TenantsModal from '../models/Tenants';
import Furniture from '../models/Furniture';
import { TenantMoodIcon } from './Tenant';
import { formatCountdown, getSecondsUntilTenantRent } from '../utils/timeUtils';
import { CheckCircle } from '@mui/icons-material';

type Props = {
  onSelectClose: () => void;
};

const TABLE_MAX_WIDTH = 600;

export default function TenantMenu({
  onSelectClose
}: Props) {
  const [game, setGame] = useContext(GameContext);
  const tenants = getObjectValues(game.tenants);
  const ownedFurnitureNames = new Set(getObjectValues(game.furniture).map(item => item.furnitureName));

  return (
    <Modal title="Tenants" onSelectClose={onSelectClose} horizontalScroll={false}>
      {tenants.length === 0 && (
        <Typography>
          You don't have any tenants yet. Attract tenants by decorating the room nicely!
        </Typography>
      )}
      {tenants.length > 0 && (
        <>
          <Alert style={{maxWidth: TABLE_MAX_WIDTH}} variant="standard" color="info">
            <Typography>Make tenants happy by crafting high-quality furniture. Craft a tenant's favorite item for a major happiness boost!</Typography>
          </Alert>
          <Box sx={{height: '100%', width: '100%', maxWidth: TABLE_MAX_WIDTH, overflowY: 'auto'}}>
          <Table sx={{maxWidth: TABLE_MAX_WIDTH,}}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{fontWeight: 'bold'}}>Tenant</TableCell>
                <TableCell align="center" sx={{fontWeight: 'bold'}}>Rent Due</TableCell>
                <TableCell align="center" sx={{fontWeight: 'bold'}}>Happiness</TableCell>
                <TableCell align="center"  sx={{fontWeight: 'bold'}}>Favorite</TableCell>
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

                <TableCell align="center">
                  {formatCountdown(
                    getSecondsUntilTenantRent(tenant.moneyCollectedTime, tenant.id)
                  )}
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent={"center"} gap="0.5rem" alignItems="center">
                    <TenantMoodIcon happiness={tenant.happiness} />
                    {tenant.happiness}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent={"center"} gap="0.5rem" alignItems="center">
                    {ownedFurnitureNames.has(TenantsModal[tenant.id].preferredItem) && (
                      <CheckCircle color="success" fontSize="small" />
                    )}
                    {Furniture[TenantsModal[tenant.id].preferredItem].displayName}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </Box>
        </>
      )}
    </Modal>
  );
}