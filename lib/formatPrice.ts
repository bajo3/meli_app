export function formatVehiclePrice(price: number) {
  const n = Number(price || 0);

  const isUSD = n > 0 && n < 1_000_000;

  if (isUSD) {
    // USD sin decimales, con separador de miles
    return { text: `USD ${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, currency: 'USD' as const };
  }

  // ARS (pesos)
  return { text: `$ ${n.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`, currency: 'ARS' as const };
}
