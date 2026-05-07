import { defineField, defineType } from 'sanity';

export const introduccionAperturaBlock = defineType({
  name: 'introduccionAperturaBlock',
  title: 'Bloque Introducción y Apertura del Camino',
  type: 'object',
  fields: [
    defineField({
      name: 'introduccionApertura',
      title: 'Introducción y Apertura del Camino',
      type: 'array',
      of: [{ type: 'accordionItem' }],
    }),
  ],
  preview: {
    select: {
      title: 'introduccionApertura',
    },
    prepare(selection) {
      const { title } = selection;
      const block = (title || []).find((block: any) => block._type === 'accordionItem');
      return {
        title: block
          ? block.title
          : 'Bloque Introducción y Apertura del Camino',
      };
    },
  },
});
