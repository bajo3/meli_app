import { NextResponse } from 'next/server';

// Prefer running in South America region on Vercel (São Paulo) to avoid geo/IP issues.
// Also force Node runtime.
export const runtime = 'nodejs';
export const preferredRegion = ['gru1'];
export const dynamic = 'force-dynamic';

function asNumber(x: any): number | null {
  if (x == null) return null;
  if (typeof x === 'number') return Number.isFinite(x) ? x : null;
  const s = String(x).trim();
  if (!s) return null;
  const n = Number(s.replace(/[^0-9.,-]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function pickYear(body: any): number {
  // Accept multiple names from the frontend (so it never breaks silently)
  const raw =
    asNumber(body?.modelo) ??
    asNumber(body?.year) ??
    asNumber(body?.anio) ??
    asNumber(body?.vehicleYear) ??
    asNumber(body?.autoYear) ??
    asNumber(body?.vehicle?.year);

  // If nothing came, apply your business rule fallback.
  const y = raw == null ? 2013 : Math.round(raw);

  // Your rule: anything below 2013 => send 2013 to Creditcar.
  return Math.max(2013, y);
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

    const modelo = pickYear(body);

    // Regla comercial: máximo 40% financiado => entrega mínima 60%
    const maxFinance = price * 0.4;
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

    const base = process.env.CREDITCAR_API_URL;
    if (!base) {
      return NextResponse.json(
        { ok: false, error: 'Falta configurar CREDITCAR_API_URL en el entorno.' },
        { status: 500 },
      );
    }

    // Creditcar real: GET {base}?monto=...&modelo=...
    const url = new URL(base);
    url.searchParams.set('monto', String(Math.round(amountToFinance)));
    url.searchParams.set('modelo', String(modelo));

    // Robust fetch: timeout + extra headers
    const controller = new AbortController();
    const timeoutMs = 12000;
    const t = setTimeout(() => controller.abort(), timeoutMs);

    const headers: Record<string, string> = {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0',
      // Some providers behave differently without a referer.
      Referer: 'https://jesusdiaz-automotores.vercel.app/',
    };

    const apiKey = process.env.CREDITCAR_API_KEY;
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const resp = await fetch(url.toString(), {
      method: 'GET',
      headers,
      cache: 'no-store',
      redirect: 'follow',
      signal: controller.signal,
    }).finally(() => clearTimeout(t));

    const text = await resp.text();
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = { rawText: text?.slice(0, 800) };
    }

    if (!resp.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Error en Creditcar.',
          creditcar: {
            status: resp.status,
            url: url.toString(),
            data,
          },
        },
        { status: 502 },
      );
    }

    // Your API returns an array directly
    const raw = Array.isArray(data) ? data : [];

    // Only these terms
    const allowed = new Set([6, 12, 18, 24]);

    const options = raw
      .map((it: any) => ({
        plazo: asNumber(it?.plazo),
        cuota: asNumber(it?.cuota),
        inclusion: asNumber(it?.inclusion) ?? 0,
      }))
      .filter((x) => x.plazo != null && x.cuota != null && allowed.has(Number(x.plazo)))
      .sort((a, b) => Number(a.plazo) - Number(b.plazo))
      .map((x) => ({
        plazo: Number(x.plazo),
        cuota: String(x.cuota),
        inclusion: Number(x.inclusion ?? 0),
      }));

    return NextResponse.json({
      ok: true,
      price,
      amountToFinance,
      modelo,
      options,
    });
  } catch (error: any) {
    // If AbortController triggers, you'll see it here.
    console.error('Creditcar quote ERROR:', error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
