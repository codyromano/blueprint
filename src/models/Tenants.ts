import getObjectValues from "../utils/getObjectValues";
import Furniture, { FurnitureName } from "./Furniture";

export type TenantName = 'jacquie' |
  'kendra' |
  'nikki' |
  'robyn' |
  'shelby' |
  'ria' | 
  'tiff';

type TenantModel = {
  id: TenantName;
  displayName: string;
  preferredItem: FurnitureName;
  scale: number;
  aspectRatio: number;
};

const tenantMap = ({
  jacquie: {
    id: 'jacquie',
    displayName: 'Jacquie',
    preferredItem: 'basicWallArt',
    scale: 2,
    aspectRatio: 433 / 577
  },
  kendra: {
    id: 'kendra',
    displayName: 'Kendra',
    preferredItem: 'momo',
    scale: 1.75,
    aspectRatio: 295 / 305
  },
  nikki: {
    id: 'nikki',
    displayName: 'Nikki',
    preferredItem: 'fancyBed',
    scale: 2,
    aspectRatio: 447 / 559
  },
  ria: {
    id: 'ria',
    displayName: 'Ria',
    preferredItem: 'keroppi',
    scale: 1.25,
    aspectRatio: 291 / 410
  },
  robyn: {
    id: 'robyn',
    displayName: 'Robyn',
    preferredItem: 'lavaLamp',
    scale: 1.5,
    aspectRatio: 393 / 548
  },
  shelby: {
    id: 'shelby',
    displayName: 'Shelby',
    preferredItem: 'fancyWallArt',
    scale: 1.75,
    aspectRatio: 421 / 479
  },
  tiff: {
    id: 'tiff',
    displayName: 'Tiff',
    preferredItem: 'discoBall',
    scale: 1.25,
    aspectRatio: 281 / 468
  },
} as Record<TenantName, TenantModel>);

export const getTenantOrder = () => getObjectValues(tenantMap)
  .sort((a, b) => {
    const costA = Furniture[a.preferredItem].cost;
    const costB = Furniture[b.preferredItem].cost;

    return costA > costB ? 1 : -1;
  }).map(tenant => tenant.id);

export default tenantMap;