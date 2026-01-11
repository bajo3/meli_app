import { NextResponse } from 'next/server';

function asNumber(x: any): number | null {
  if (x == null) return null;
  const n = typeof x === 'number' ? x : Number(String(x).replace(/[^0-9.,-]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const price = asNumber(body.price);
    const amountToFinance = asNumber(body.amountToFinance);

    if (price == null || price <= 0) {
      return NextResponse.json({ ok: false, error: 'Precio inválido.' }, { status: 400 });
    }
    if (amountToFinance == null || amountToFinance < 0) {
      return NextResponse.json({ ok: false, error: 'Monto a financiar inválido.' }, { status: 400 });
    }

    // Regla comercial: máximo 40% financiado => entrega mínima 60%
    const maxFinance = price * 0.40;
    if (amountToFinance > maxFinance + 0.01) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Entrega mínima 60% (financiación máxima 40% del valor del vehículo).',
          limits: { maxFinance, minDownPayment: price - maxFinance },
        },
        { status: 400 },
      );
    }

    const url = process.env.CREDITCAR_API_URL;
    if (!url) {
      return NextResponse.json(
        { ok: false, error: 'Falta configurar CREDITCAR_API_URL en el entorno.' },
        { status: 500 },
      );
    }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const apiKey = process.env.CREDITCAR_API_KEY;
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    // Payload base (ajustalo si tu API pide otros campos)
    const payload = {
      price,
      amountToFinance,
      // opcional: si tu API requiere “inclusion” o “plazos”, agregalos desde el cliente:
      ...((body.extra && typeof body.extra === 'object') ? { extra: body.extra } : {}),
    };

    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      // Evita cache accidental en Vercel
      cache: 'no-store',
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error ?? 'Error en Creditcar.', status: resp.status, data },
        { status: 502 },
      );
    }

    // Normalización (soporta varias formas comunes)
    const raw = Array.isArray(data?.quote?.raw)
      ? data.quote.raw
      : Array.isArray(data?.raw)
        ? data.raw
        : Array.isArray(data?.options)
          ? data.options
          : null;

    const options = Array.isArray(raw)
      ? raw
          .map((it: any) => ({
            plazo: asNumber(it?.plazo ?? it?.term ?? it?.months),
            cuota: asNumber(it?.cuota ?? it?.payment ?? it?.installment),
          }))
          .filter((x: any) => x.plazo != null && x.cuota != null)
      : [];

    return NextResponse.json({
      ok: true,
      price,
      amountToFinance,
      options,
      summaryText: data?.quote?.summaryText ?? data?.summaryText ?? null,
      // data: data, // descomentá si querés debug
    });
  } catch (error: any) {
    console.error('Creditcar quote ERROR:', error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
