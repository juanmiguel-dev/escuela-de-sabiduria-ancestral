import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getAlumnoByEmail } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'El correo electrónico es requerido.' }, { status: 400 });
    }

    const alumno = await getAlumnoByEmail(email);

    if (!alumno) {
      // Para evitar enumeración de usuarios, siempre devolvemos un éxito genérico.
      return NextResponse.json({ success: true, message: 'Si el correo existe, recibirás un enlace de recuperación.' });
    }

    // Generar un token seguro de 64 caracteres
    const resetToken = crypto.randomBytes(32).toString('hex');
    // Expiración en 1 hora
    const resetTokenExpiry = new Date(Date.now() + 3600000).toISOString();

    // Guardar el token en Sanity
    await writeClient
      .patch(alumno._id)
      .set({
        resetToken: resetToken,
        resetTokenExpiry: resetTokenExpiry,
      })
      .commit();

    // Crear la URL de recuperación (Forzamos la URL oficial en producción para evitar URLs de preview de Vercel)
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://escuela-de-sabiduria-ancestral.vercel.app';
    const resetLink = `${baseUrl}/portal/reset?code=${resetToken}&email=${encodeURIComponent(email)}`;

    // Configurar Nodemailer con Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar el correo electrónico
    await transporter.sendMail({
      from: `"Escuela de Sabiduría Ancestral" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Recuperación de Contraseña - Escuela de Sabiduría Ancestral',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdfbf7; padding: 40px; border-radius: 12px; border: 1px solid #eee;">
          <h2 style="color: #5b2c1d; text-align: center;">Hola ${alumno.name},</h2>
          <p style="color: #333; font-size: 16px; text-align: center;">Hemos recibido una solicitud para restablecer tu contraseña.</p>
          <p style="color: #333; font-size: 16px; text-align: center;">Haz clic en el siguiente botón para elegir una nueva contraseña. Este enlace es válido por 1 hora.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #d4af37; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Restablecer Contraseña</a>
          </div>
          <p style="color: #888; font-size: 12px; text-align: center;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, message: 'Si el correo existe, recibirás un enlace de recuperación.' });

  } catch (error) {
    console.error('Error in request-reset:', error);
    return NextResponse.json({ error: 'Error al enviar el correo. Verifica las credenciales de Gmail o intenta más tarde.' }, { status: 500 });
  }
}
