import { defineField, defineType } from 'sanity';

export const introBlock = defineType({
  name: 'introBlock',
  title: 'Bloque de Introducción',
  type: 'object',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro (¿Sientes que cargas con silencios...?)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'intro',
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
          : 'Bloque de Introducción',
      };
    },
  },
});
