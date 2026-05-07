import { defineField, defineType } from 'sanity';

export const accordionItem = defineType({
  name: 'accordionItem',
  title: 'Elemento de Acordeón',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Acordeón',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenido del Acordeón',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
