import { INITIAL_CASH } from "../state/GameStateProvider";

// Default image size expressed as a % of the gameplay area's width.
// By default, the image will be square (width = height), but the
// height may vary depending on the image's declared aspect ratio.
export const BASE_IMAGE_SIZE = 10;

/*
Topo-sort terms 
A term is visible if all preceding terms are selected
*/

export type FurnitureName = 
  "basicBed" |
  "comfortableBed" |
  "fancyBed" |
  "cheapRug" |
  "antiqueRug" |
  "fancyRug" |
  "floorLamp" |
  "lavaLamp" |
  "tableLamp" |
  "coffeeTable" |
  "nightstand" |
  "momo" |
  "emmy" |
  "keroppi" |
  "dresser" |
  "filingCabinet" |
  "officeDesk" |
  "basicWallArt" |
  "fancyWallArt" |
  "discoBall";

export type FurnitureItem = {
  id: FurnitureName;
  displayName: string;
  scale: number;
  // width / height. E.g. "1" is a square
  aspectRatio: number;
  size: [number, number];
  cost: number;
};

const Furniture: Record<FurnitureName, FurnitureItem> = {
  basicBed: {
    id: "basicBed",
    displayName: "Basic Bed",
    scale: 2,
    aspectRatio: 600 / 566,
    size: [100, 100],
    cost: INITIAL_CASH * 0.25,
  },
  comfortableBed: {
    id: "comfortableBed",
    displayName: "Comfortable Bed",
    scale: 2.5,
    aspectRatio: 548 / 455,
    size: [100, 100],
    cost: INITIAL_CASH * 1.5,
  },
  fancyBed: {
    id: "fancyBed",
    displayName: "Fancy Bed",
    scale: 2.5,
    aspectRatio: 548 / 455,
    size: [100, 100],
    cost: INITIAL_CASH * 5,
  },
  cheapRug: {
    id: "cheapRug",
    displayName: "Cheap Rug",
    scale: 1,
    aspectRatio: 688 / 362,
    size: [100, 100],
    cost: INITIAL_CASH * 0.25,
  },
  antiqueRug: {
    id: "antiqueRug",
    displayName: "Antique Rug",
    scale: 3,
    aspectRatio: 500 / 64,
    size: [100, 100],
    cost: INITIAL_CASH * 1.5,
  },
  fancyRug: {
    id: "fancyRug",
    displayName: "Fancy Rug",
    scale: 3,
    aspectRatio: 500 / 133,
    size: [100, 100],
    cost: INITIAL_CASH * 3.5,
  },
  floorLamp: {
    id: "floorLamp",
    displayName: "Floor Lamp",
    scale: 1,
    aspectRatio: 346 / 721,
    size: [100, 100],
    cost: INITIAL_CASH * 0.15,
  },
  lavaLamp: {
    id: "lavaLamp",
    displayName: "Lava Lamp",
    scale: 0.5,
    aspectRatio: 440 / 600,
    size: [100, 100],
    cost: INITIAL_CASH * 1.75,
  },
  tableLamp: {
    id: "tableLamp",
    displayName: "Table Lamp",
    scale: 1,
    aspectRatio: 1,
    size: [100, 100],
    cost: INITIAL_CASH * 1,
  },
  coffeeTable: {
    id: "coffeeTable",
    displayName: "Coffee Table",
    scale: 1,
    aspectRatio: 593 / 421,
    size: [100, 100],
    cost: INITIAL_CASH * 1.25,
  },
  nightstand: {
    id: "nightstand",
    displayName: "Nightstand",
    scale: 0.75,
    aspectRatio: 413 / 603,
    size: [100, 100],
    cost: INITIAL_CASH * 3,
  },
  momo: {
    id: "momo",
    displayName: "Momo",
    scale: 1,
    aspectRatio: 1,
    size: [100, 100],
    cost: INITIAL_CASH * 8,
  },
  emmy: {
    id: "emmy",
    displayName: "Emmy",
    scale: 1,
    aspectRatio: 1,
    size: [100, 100],
    cost: INITIAL_CASH * 8,
  },
  keroppi: {
    id: "keroppi",
    displayName: "Keroppi",
    scale: 0.5,
    aspectRatio: 500 / 549,
    size: [100, 100],
    cost: INITIAL_CASH * 7.5,
  },
  dresser: {
    id: "dresser",
    displayName: "Dresser",
    scale: 2,
    aspectRatio: 628 / 398,
    size: [100, 100],
    cost: INITIAL_CASH * 2,
  },
  filingCabinet: {
    id: "filingCabinet",
    displayName: "Filing Cabinet",
    scale: 0.8,
    aspectRatio: 351 / 700,
    size: [100, 100],
    cost: INITIAL_CASH * 6,
  },
  officeDesk: {
    id: "officeDesk",
    displayName: "Office Desk",
    scale: 2,
    aspectRatio: 609 / 410,
    size: [100, 100],
    cost: INITIAL_CASH * 4,
  },
  basicWallArt: {
    id: "basicWallArt",
    displayName: "Basic Wall Art",
    scale: 1,
    aspectRatio: 500 / 648,
    size: [100, 100],
    cost: INITIAL_CASH * 2.25,
  },
  fancyWallArt: {
    id: "fancyWallArt",
    displayName: "Fancy Wall Art",
    scale: 2,
    aspectRatio: 500 / 332,
    size: [100, 100],
    cost: INITIAL_CASH * 5.5,
  },
  discoBall: {
    id: "discoBall",
    displayName: "Disco Ball",
    scale: 1,
    aspectRatio: 394 / 634,
    size: [100, 100],
    cost: INITIAL_CASH * 10,
  },
};


export default Furniture;
