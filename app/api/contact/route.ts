import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { siteConfig } from '@/content/site';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('RESEND_API_KEY no está configurada en las variables de entorno');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Función para escapar HTML y prevenir XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: Request) {
  try {
    // Verificar que Resend esté configurado
    if (!resend || !resendApiKey) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Error de configuración: RESEND_API_KEY no está configurada' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Validación de campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El email no es válido' },
        { status: 400 }
      );
    }

    // Sanitizar los datos antes de incluirlos en el HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    // Enviar correo usando Resend
    // IMPORTANTE: Asegúrate de haber verificado el dominio code4ce.com en resend.com/domains
    const { data, error } = await resend.emails.send({
      from: 'Code4CE Contact <contacto@code4ce.com>',
      to: 'info@code4ce.com',
      subject: `Nuevo contacto desde ${siteConfig.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #39005E;">Nuevo contacto desde ${siteConfig.name}</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Nombre:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">${safeMessage}</p>
          </div>
        </div>
      `,
      replyTo: safeEmail,
    });

    if (error) {
      console.error('Error al enviar correo con Resend:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: 'Error al enviar el correo',
          details: error.message || 'Error desconocido de Resend'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Correo enviado exitosamente', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

