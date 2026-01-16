import { NextRequest, NextResponse } from 'next/server';
import { fetchAndStoreVehicles } from '@/lib/fetchVehicles';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Protect endpoint if CRON_SECRET is configured.
    // Vercel Cron Jobs send: Authorization: Bearer <CRON_SECRET>
    const secret = process.env.CRON_SECRET;
    if (secret) {
      const auth = req.headers.get('authorization') ?? '';
      if (auth !== `Bearer ${secret}`) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }

    const result = await fetchAndStoreVehicles();
    console.log('Sync MELI OK:', result);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error('Sync MELI ERROR:', error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 },
    );
  }
}
