import { NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'escueladesabiduria26_magic');

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/portal?error=missing_token', req.url));
    }

    // 1. Validar el token del Magic Link
    const { payload } = await jwtVerify(token, secret);

    if (!payload || !payload.email) {
      return NextResponse.redirect(new URL('/portal?error=invalid_token', req.url));
    }

    // 2. Crear una sesión persistente (por ejemplo, válida por 30 días)
    const sessionToken = await new SignJWT({ 
      email: payload.email, 
      sub: payload.sub 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);

    // 3. Guardar el sessionToken en una cookie HTTP-only
    const cookieStore = await cookies();
    cookieStore.set('portal_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 días en segundos
    });

    // 4. Redirigir al Dashboard
    return NextResponse.redirect(new URL('/portal/dashboard', req.url));

  } catch (error) {
    console.error('Error in /api/auth/verify:', error);
    // Probablemente el token expiró
    return NextResponse.redirect(new URL('/portal?error=expired_token', req.url));
  }
}
