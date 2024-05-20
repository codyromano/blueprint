import Economy from "./Economy";

// Default image size expressed as a % of the gameplay area's width.
// By default, the image will be square (width = height), but the
// height may vary depending on the image's declared aspect ratio.
export const BASE_IMAGE_SIZE = 10;

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
  "discoBall" |
  "basicPlant" |
  "fancyPlant";

export type FurnitureItem = {
  id: FurnitureName;
  displayName: string;
  scale: number;
  // width / height. E.g. "1" is a square
  aspectRatio: number;
  size: [number, number];
  cost: number;
  category: 'furniture' | 'decorations' | 'plant' | 'animal';
};

// TODO: Name this something other than furniture. It grew
// to include stuff like decorations, plants, animals
const Furniture: Record<FurnitureName, FurnitureItem> = {
  basicBed: {
    id: "basicBed",
    displayName: "Basic Bed",
    scale: 2,
    aspectRatio: 600 / 566,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_1,
    category: 'furniture'
  },
  comfortableBed: {
    id: "comfortableBed",
    displayName: "Comfortable Bed",
    scale: 2.5,
    aspectRatio: 548 / 455,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_6,
    category: 'furniture'
  },
  fancyBed: {
    id: "fancyBed",
    displayName: "Fancy Bed",
    scale: 2.5,
    aspectRatio: 610 / 409,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_7,
    category: 'furniture'
  },
  cheapRug: {
    id: "cheapRug",
    displayName: "Cheap Rug",
    scale: 1,
    aspectRatio: 688 / 362,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_1,
    category: 'furniture'
  },
  antiqueRug: {
    id: "antiqueRug",
    displayName: "Antique Rug",
    scale: 5,
    aspectRatio: 500 / 64,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_6,
    category: 'furniture'
  },
  fancyRug: {
    id: "fancyRug",
    displayName: "Fancy Rug",
    scale: 3,
    aspectRatio: 500 / 133,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_5,
    category: 'furniture'
  },
  basicPlant: {
    id: "basicPlant",
    displayName: "Basic Plant",
    scale: 0.75,
    aspectRatio: 409 / 611,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_2,
    category: 'plant'
  },
  fancyPlant: {
    id: "fancyPlant",
    displayName: "Fancy Plant",
    scale: 1,
    aspectRatio: 501 / 498,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_4,
    category: 'plant'
  },
  floorLamp: {
    id: "floorLamp",
    displayName: "Floor Lamp",
    scale: 1,
    aspectRatio: 346 / 721,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_4,
    category: 'furniture'
  },
  lavaLamp: {
    id: "lavaLamp",
    displayName: "Lava Lamp",
    scale: 0.5,
    aspectRatio: 440 / 600,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_5,
    category: 'furniture'
  },
  tableLamp: {
    id: "tableLamp",
    displayName: "Table Lamp",
    scale: 1,
    aspectRatio: 551 / 453,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_2,
    category: 'furniture'
  },
  coffeeTable: {
    id: "coffeeTable",
    displayName: "Coffee Table",
    scale: 1,
    aspectRatio: 593 / 421,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_4,
    category: 'furniture'
  },
  nightstand: {
    id: "nightstand",
    displayName: "Nightstand",
    scale: 0.75,
    aspectRatio: 413 / 603,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_2,
    category: 'furniture'
  },
  momo: {
    id: "momo",
    displayName: "Momo",
    scale: 1,
    aspectRatio: 1,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_10,
    category: 'animal',
  },
  emmy: {
    id: "emmy",
    displayName: "Emmy",
    scale: 1,
    aspectRatio: 1,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_8,
    category: 'animal',
  },
  keroppi: {
    id: "keroppi",
    displayName: "Keroppi",
    scale: 0.5,
    aspectRatio: 500 / 549,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_8,
    category: 'animal',
  },
  dresser: {
    id: "dresser",
    displayName: "Dresser",
    scale: 2,
    aspectRatio: 628 / 398,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_3,
    category: 'furniture',
  },
  filingCabinet: {
    id: "filingCabinet",
    displayName: "Filing Cabinet",
    scale: 0.8,
    aspectRatio: 351 / 700,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_3,
    category: 'furniture',
  },
  officeDesk: {
    id: "officeDesk",
    displayName: "Office Desk",
    scale: 2,
    aspectRatio: 609 / 410,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_6,
    category: 'furniture',
  },
  basicWallArt: {
    id: "basicWallArt",
    displayName: "Basic Wall Art",
    scale: 1,
    aspectRatio: 500 / 648,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_5,
    category: 'decorations'
  },
  fancyWallArt: {
    id: "fancyWallArt",
    displayName: "Fancy Wall Art",
    scale: 2,
    aspectRatio: 500 / 332,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_7,
    category: 'decorations'
  },
  discoBall: {
    id: "discoBall",
    displayName: "Disco Ball",
    scale: 1,
    aspectRatio: 394 / 634,
    size: [100, 100],
    cost: Economy.PRICE_LEVEL_9,
    category: 'decorations'
  },
};


export default Furniture;
