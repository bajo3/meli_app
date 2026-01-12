export type VehicleCurrency = 'ARS' | 'USD';

export function vehicleCurrencyFromPrice(price: number | null | undefined): VehicleCurrency {
  const n = Number(price ?? 0);
  // Heurística del proyecto: precios menores a 1.000.000 se interpretan como USD
  return n > 0 && n < 1_000_000 ? 'USD' : 'ARS';
}

export function formatVehicleMoney(amount: number | null | undefined, currency: VehicleCurrency) {
  const n = Number(amount ?? 0);
  const formatted = n.toLocaleString('es-AR', { maximumFractionDigits: 0 });
  return currency === 'USD' ? `USD ${formatted}` : `$ ${formatted}`;
}

export function formatVehiclePrice(price: number | null | undefined) {
  const currency = vehicleCurrencyFromPrice(price);
  if (price == null) return { currency, text: 'Consultar' as const };
  return { currency, text: formatVehicleMoney(price, currency) };
}
