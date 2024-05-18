enum Economy {
  FREE = 0,
  PRICE_LEVEL_1 = 10,
  PRICE_LEVEL_2 = 20,
  PRICE_LEVEL_3 = 30,
  PRICE_LEVEL_4 = 40,
  PRICE_LEVEL_5 = 50,
  PRICE_LEVEL_6 = 60,
  PRICE_LEVEL_7 = 70,
  PRICE_LEVEL_8 = 80,
  PRICE_LEVEL_9 = 90,
  PRICE_LEVEL_10 = 100,
}

export function getRentAmount(tenantHappiness: number): number {
  if (tenantHappiness === 100) {
    return Economy.PRICE_LEVEL_3;
  }
  if (tenantHappiness > 75) {
    return Economy.PRICE_LEVEL_2;
  }
  return Economy.PRICE_LEVEL_1;
}

export default Economy;