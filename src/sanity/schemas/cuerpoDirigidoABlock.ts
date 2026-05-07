import { defineField, defineType } from 'sanity';

export const cuerpoDirigidoABlock = defineType({
  name: 'cuerpoDirigidoABlock',
  title: 'Bloque ¿A quiénes está dirigida?',
  type: 'object',
  fields: [
    defineField({
      name: 'cuerpoDirigidoA',
      title: 'Cuerpo: ¿A quiénes está dirigida?',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'cuerpoDirigidoA',
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
          : 'Bloque ¿A quiénes está dirigida?',
      };
    },
  },
});
