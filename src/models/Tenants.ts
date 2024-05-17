type TenantModel = {
  id: string;
  scale: number;
  aspectRatio: number;
};

export default ({
  jacquie: {
    id: 'jacquie',
    scale: 2,
    aspectRatio: 433 / 577
  },
  kendra: {
    id: 'kendra',
    scale: 1.75,
    aspectRatio: 295 / 305
  },
  nikki: {
    id: 'nikki',
    scale: 2,
    aspectRatio: 447 / 559
  },
  ria: {
    id: 'ria',
    scale: 1.25,
    aspectRatio: 291 / 410
  },
  robyn: {
    id: 'robyn',
    scale: 1.5,
    aspectRatio: 393 / 548
  },
  shelby: {
    id: 'shelby',
    scale: 1.75,
    aspectRatio: 421 / 479
  },
  tiff: {
    id: 'tiff',
    scale: 1.25,
    aspectRatio: 281 / 468
  },
} as Record<string, TenantModel>)