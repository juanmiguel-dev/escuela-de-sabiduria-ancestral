import { defineField, defineType } from 'sanity';

export const testimoniosBlock = defineType({
  name: 'testimoniosBlock',
  title: 'Bloque de Testimonios',
  type: 'object',
  fields: [
    defineField({
      name: 'testimonios',
      title: 'Testimonios de la Formación',
      type: 'array',
      of: [{ type: 'testimonialItem' }],
    }),
  ],
  preview: {
    select: {
      title: 'testimonios',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: `Bloque de Testimonios (${(title || []).length} testimonios)`,
      };
    },
  },
});
