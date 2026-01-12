import { NextResponse } from "next/server";

function asNumber(x: any): number | null {
  if (x == null) return null;

  if (typeof x === "number") return Number.isFinite(x) ? x : null;

  const s = String(x).trim();
  if (!s) return null;

  // Keep digits, dot, comma, minus. Convert comma decimal to dot.
  const n = Number(s.replace(/[^0-9.,-]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const price = asNumber(body.price);
    const amountToFinance = asNumber(body.amountToFinance);
    const modeloRaw = asNumber(body.modelo);

    if (price == null || price <= 0) {
      return NextResponse.json({ ok: false, error: "Precio inválido." }, { status: 400 });
    }
    if (amountToFinance == null || amountToFinance < 0) {
      return NextResponse.json({ ok: false, error: "Monto a financiar inválido." }, { status: 400 });
    }
    if (modeloRaw == null) {
      return NextResponse.json({ ok: false, error: "Modelo/año inválido." }, { status: 400 });
    }

    // Regla: si es menor a 2013, para Creditcar mandamos 2013.
    const modelo = Math.max(2013, Math.round(modeloRaw));

    // Regla comercial: máximo 40% financiado => entrega mínima 60%
    const maxFinance = price * 0.4;
    if (amountToFinance > maxFinance + 0.01) {
      return NextResponse.json(
        {
          ok: false,
          error: "Entrega mínima 60% (financiación máxima 40% del valor del vehículo).",
          limits: {
            maxFinance,
            minDownPayment: price - maxFinance,
          },
        },
        { status: 400 }
      );
    }

    const base = process.env.CREDITCAR_API_URL;
    if (!base) {
      return NextResponse.json(
        { ok: false, error: "Falta configurar CREDITCAR_API_URL en el entorno." },
        { status: 500 }
      );
    }

    // Creditcar real: GET {base}?monto=...&modelo=...
    const url = new URL(base);
    url.searchParams.set("monto", String(Math.round(amountToFinance)));
    url.searchParams.set("modelo", String(modelo));

    const resp = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });

    const text = await resp.text();

    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = { rawText: text?.slice(0, 500) };
    }

    if (!resp.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Error en Creditcar.",
          creditcar: {
            status: resp.status,
            url: url.toString(),
            data,
          },
        },
        { status: 502 }
      );
    }

    // Normalización: tu API devuelve un array directo. Soportamos también { quote: { raw: [...] } } por si cambia.
    const raw: any[] = Array.isArray(data) ? data : Array.isArray(data?.quote?.raw) ? data.quote.raw : [];

    // Solo 6/12/18/24
    const allowed = new Set([6, 12, 18, 24]);

    const options = raw
      .map((it: any) => ({
        plazo: asNumber(it?.plazo),
        cuota: it?.cuota != null ? String(it.cuota) : null,
        inclusion: asNumber(it?.inclusion ?? 0) ?? 0,
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
    console.error("Creditcar quote ERROR:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
