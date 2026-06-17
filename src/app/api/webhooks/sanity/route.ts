import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Sanity envía el payload del documento recién creado
    // Configuraremos el Webhook en Sanity para que envíe solo cuando _type == "alumno" y en operación "create"
    const { _type, email, name, password, isActive } = body;

    if (_type !== 'alumno') {
      return NextResponse.json({ message: 'Ignorado. No es alumno.' }, { status: 200 });
    }

    if (!email || !isActive || !password) {
      return NextResponse.json({ message: 'Alumno sin email, inactivo o sin contraseña.' }, { status: 200 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const loginLink = `${baseUrl}/portal`;

    const { error: resendError } = await resend.emails.send({
      from: 'Escuela de Sabiduría Ancestral <onboarding@resend.dev>',
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

    if (resendError) {
      console.error('Error enviando email de bienvenida:', resendError);
      return NextResponse.json({ error: 'Fallo al enviar correo.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Correo de bienvenida enviado.' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 });
  }
}
