export const taller = {
  name: 'taller',
  title: 'Taller',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre del Taller',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'highlightText',
      title: 'Texto Resaltado (Opcional)',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
    },
  ],
};