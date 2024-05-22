import { TenantName, getTenantOrder } from "../models/Tenants";

export function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes > 0 ? `${minutes}m` : '';
  const formattedSeconds = `${remainingSeconds}s`;

  return [formattedMinutes, formattedSeconds].join(' ');
}

const tenants = getTenantOrder();

export function getSecondsUntilTenantRent(moneyCollectedTime: number | null, tenantName: TenantName): number {
  // Find the order in which this tenant was added to the game
  const tenantIndex = tenants.findIndex(name => name === tenantName);
  if (tenantIndex === -1) {
    throw new Error(`Cannot find tenant name ${tenantName} in tenant order.`);
  }

  // Increase the delay as more tenants are added
  const extraDelayPerTenantAdded = 1000 * 60 * Math.pow(tenantIndex, 1.5);

  const currentTime = Date.now();
  const timeMoneyIsReady =
    moneyCollectedTime == null
      ? currentTime
      : 
        moneyCollectedTime + 1000 * 30 + extraDelayPerTenantAdded;
  const secondsUntilMoneyReady = Math.max(
    0,
    Math.round((timeMoneyIsReady - currentTime) / 1000)
  );



  return secondsUntilMoneyReady;
}