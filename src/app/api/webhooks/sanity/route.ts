import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Sanity envía el payload del documento recién creado
    const { _type, email, name, password, isActive } = body;

    if (_type !== 'alumno') {
      return NextResponse.json({ message: 'Ignorado. No es alumno.' }, { status: 200 });
    }

    if (!email || !isActive || !password) {
      return NextResponse.json({ message: 'Alumno sin email, inactivo o sin contraseña.' }, { status: 200 });
    }

    // Forzamos la URL oficial en producción para evitar URLs de preview de Vercel
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://escuela-de-sabiduria-ancestral.vercel.app';
    const loginLink = `${baseUrl}/portal`;

    // Configurar Nodemailer con Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Escuela de Sabiduría Ancestral" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Bienvenido a la Escuela de Sabiduría Ancestral!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdfbf7; padding: 40px; border-radius: 12px; border: 1px solid #eee;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #5b2c1d; margin: 0;">¡Bienvenido/a, ${name || 'Estudiante'}!</h1>
          </div>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Es un honor recibirte en la Escuela de Sabiduría Ancestral. Tu cuenta ha sido creada exitosamente.
          </p>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #d4af37;">
            <p style="margin-top: 0; font-weight: bold; color: #5b2c1d;">Tus credenciales de acceso:</p>
            <p style="margin: 5px 0;"><strong>Usuario (Email):</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Contraseña:</strong> ${password}</p>
          </div>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Puedes acceder a tus formaciones desde el Portal de Alumnos usando tus credenciales.
          </p>
          <div style="text-align: center; margin: 40px 0;">
            <a href="${loginLink}" style="background-color: #d4af37; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Ingresar al Portal</a>
          </div>
          <p style="color: #888; font-size: 14px; text-align: center;">
            Te recomendamos cambiar tu contraseña una vez que ingreses por primera vez.
          </p>
        </div>
      `
    });

    return NextResponse.json({ success: true, message: 'Correo de bienvenida enviado.' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Error interno o credenciales de Gmail inválidas.' }, { status: 500 });
  }
}
