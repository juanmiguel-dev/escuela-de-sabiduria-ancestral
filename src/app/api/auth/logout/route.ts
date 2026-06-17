import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('portal_session');

  return NextResponse.json({ success: true });
}
