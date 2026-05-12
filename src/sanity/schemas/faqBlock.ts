import { defineField, defineType } from 'sanity';

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'Bloque de FAQ (Preguntas Frecuentes)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      initialValue: 'Preguntas Frecuentes',
    }),
    defineField({
      name: 'faqs',
      title: 'Preguntas y Respuestas',
      type: 'array',
      of: [{ type: 'accordionItem' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || 'Bloque de FAQ',
      };
    },
  },
});
