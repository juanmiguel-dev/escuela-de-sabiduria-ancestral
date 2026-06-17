import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAlumnoByEmail } from '@/sanity/lib/queries';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'escueladesabiduria26_magic');

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('portal_session')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);

    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const alumno = await getAlumnoByEmail(payload.email as string);

    if (!alumno || !alumno.isActive) {
      return NextResponse.json({ error: 'Cuenta inactiva o no encontrada' }, { status: 403 });
    }

    return NextResponse.json({ user: alumno });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno o token expirado' }, { status: 401 });
  }
}
