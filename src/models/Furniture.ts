export type FurnitureName = "sleepingBag" | "grayCarpet";

export type FurnitureItem = {
  id: FurnitureName;
  displayName: string;
  size: [string, string];
  cost: number;
};

const Furniture: Record<FurnitureName, FurnitureItem> = {
  sleepingBag: {
    id: "sleepingBag",
    displayName: "Sleeping Bag",
    size: ["50px", "50px"],
    cost: 0,
  },
  grayCarpet: {
    id: "grayCarpet",
    displayName: "Gray Carpet",
    size: ["50px", "50px"],
    cost: 25,
  },
};

export default Furniture;
