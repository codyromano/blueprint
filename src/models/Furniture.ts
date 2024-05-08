import { INITIAL_CASH } from "../state/GameStateProvider";

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
  "diningTable" |
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
  size: [string, string];
  cost: number;
};

const Furniture: Record<FurnitureName, FurnitureItem> = {
  basicBed: {
    id: "basicBed",
    displayName: "Basic Bed",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 0.25,
  },
  comfortableBed: {
    id: "comfortableBed",
    displayName: "Comfortable Bed",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 1.5,
  },
  fancyBed: {
    id: "fancyBed",
    displayName: "Fancy Bed",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 5,
  },
  cheapRug: {
    id: "cheapRug",
    displayName: "Cheap Rug",
    size: ["25vw", "50px"],
    cost: INITIAL_CASH * 0.25,
  },
  antiqueRug: {
    id: "antiqueRug",
    displayName: "Antique Rug",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 1.5,
  },
  fancyRug: {
    id: "fancyRug",
    displayName: "Fancy Rug",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 3.5,
  },
  floorLamp: {
    id: "floorLamp",
    displayName: "Floor Lamp",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 0.15,
  },
  lavaLamp: {
    id: "lavaLamp",
    displayName: "Lava Lamp",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 1.75,
  },
  tableLamp: {
    id: "tableLamp",
    displayName: "Table Lamp",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 1,
  },
  coffeeTable: {
    id: "coffeeTable",
    displayName: "Coffee Table",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 1.25,
  },
  diningTable: {
    id: "diningTable",
    displayName: "Dining Table",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 1.5,
  },
  nightstand: {
    id: "nightstand",
    displayName: "Nightstand",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 3,
  },
  momo: {
    id: "momo",
    displayName: "Momo",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 8,
  },
  emmy: {
    id: "emmy",
    displayName: "Emmy",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 8,
  },
  keroppi: {
    id: "keroppi",
    displayName: "Keroppi",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 7.5,
  },
  dresser: {
    id: "dresser",
    displayName: "Dresser",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 2,
  },
  filingCabinet: {
    id: "filingCabinet",
    displayName: "Filing Cabinet",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 6,
  },
  officeDesk: {
    id: "officeDesk",
    displayName: "Office Desk",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 4,
  },
  basicWallArt: {
    id: "basicWallArt",
    displayName: "Basic Wall Art",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 2.25,
  },
  fancyWallArt: {
    id: "fancyWallArt",
    displayName: "Fancy Wall Art",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 5.5,
  },
  discoBall: {
    id: "discoBall",
    displayName: "Disco Ball",
    size: ["50px", "50px"],
    cost: INITIAL_CASH * 10,
  },
};


export default Furniture;
