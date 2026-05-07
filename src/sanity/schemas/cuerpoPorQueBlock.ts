import { defineField, defineType } from 'sanity';

export const cuerpoPorQueBlock = defineType({
  name: 'cuerpoPorQueBlock',
  title: 'Bloque ¿Por qué elegir este camino?',
  type: 'object',
  fields: [
    defineField({
      name: 'cuerpoPorQue',
      title: 'Cuerpo: ¿Por qué elegir este camino?',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'cuerpoPorQue',
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
          : 'Bloque ¿Por qué elegir este camino?',
      };
    },
  },
});
