import { NextResponse } from 'next/server';
import { getAlumnoByEmail } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';

export async function POST(req: Request) {
  try {
    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json({ error: 'Faltan datos obligatorios.' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres.' }, { status: 400 });
    }

    const alumno = await getAlumnoByEmail(email);

    if (!alumno) {
      return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
    }

    // Validar token y expiración
    if (alumno.resetToken !== token) {
      return NextResponse.json({ error: 'El enlace de recuperación es inválido o incorrecto.' }, { status: 400 });
    }

    if (!alumno.resetTokenExpiry || new Date(alumno.resetTokenExpiry) < new Date()) {
      return NextResponse.json({ error: 'El enlace de recuperación ha expirado. Por favor, solicita uno nuevo.' }, { status: 400 });
    }

    // Actualizar contraseña y limpiar tokens
    await writeClient
      .patch(alumno._id)
      .set({
        password: newPassword,
        resetToken: null,
        resetTokenExpiry: null,
      })
      .commit();

    return NextResponse.json({ success: true, message: '¡Contraseña actualizada exitosamente!' });

  } catch (error) {
    console.error('Error in reset-password:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
