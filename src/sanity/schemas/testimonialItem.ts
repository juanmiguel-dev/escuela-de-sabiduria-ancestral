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
      description: 'Ej. Tami H., Belu L.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mensaje',
      title: 'Mensaje',
      type: 'text',
      description: 'Texto del agradecimiento (extraído de los chats de WhatsApp)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Imagen circular del alumno',
      options: {
        hotspot: true,
      },
    }),
  ],
});
