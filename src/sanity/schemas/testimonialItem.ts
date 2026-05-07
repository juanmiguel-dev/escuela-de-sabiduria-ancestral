import { defineType, defineField } from 'sanity';

export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Testimonio',
  type: 'object',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del alumno',
      type: 'string',
      description: 'Ej. Tami H., Belu L. (Opcional)',
    }),
    defineField({
      name: 'mensaje',
      title: 'Mensaje',
      type: 'text',
      description: 'Texto del agradecimiento (extraído de los chats de WhatsApp) (Opcional)',
    }),
    defineField({
      name: 'avatar',
      title: 'Imagen del Testimonio',
      type: 'image',
      description: 'Imagen de ancho completo para el testimonio (Opcional)',
      options: {
        hotspot: true,
      },
    }),
  ],
});
