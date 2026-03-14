export const section = {
  name: 'section',
  title: 'Sección',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'highlightText',
      title: 'Texto Resaltado (Verde Menta)',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
    },
  ],
};
