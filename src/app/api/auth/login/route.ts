import { NextResponse } from 'next/server';
import { getAlumnoByEmail } from '@/sanity/lib/queries';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Correo y contraseña son requeridos' }, { status: 400 });
    }

    // 1. Validar que el alumno exista en Sanity
    const alumno = await getAlumnoByEmail(email);

    if (!alumno) {
      return NextResponse.json({ error: 'No se encontró una cuenta con este correo electrónico.' }, { status: 404 });
    }

    if (!alumno.isActive) {
      return NextResponse.json({ error: 'Tu cuenta está inactiva. Por favor, contacta con soporte.' }, { status: 403 });
    }

    // 2. Verificar contraseña
    if (alumno.password !== password) {
      return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
    }

    // 3. Login exitoso
    return NextResponse.json({ 
      success: true, 
      message: 'Inicio de sesión exitoso.',
      alumno: {
        name: alumno.name,
        email: alumno.email
      }
    });

  } catch (error) {
    console.error('Error in /api/auth/login:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
