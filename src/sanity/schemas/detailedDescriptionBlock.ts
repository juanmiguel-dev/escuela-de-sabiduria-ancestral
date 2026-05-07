import { defineField, defineType } from 'sanity';

export const detailedDescriptionBlock = defineType({
  name: 'detailedDescriptionBlock',
  title: 'Bloque de Descripción Detallada',
  type: 'object',
  fields: [
    defineField({
      name: 'detailedDescription',
      title: 'Descripción Detallada (Genérica)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'detailedDescription',
    },
    prepare(selection) {
      const { title } = selection;
      const block = (title || []).find((block: any) => block._type === 'block');
      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'Bloque de Descripción Detallada',
      };
    },
  },
});
