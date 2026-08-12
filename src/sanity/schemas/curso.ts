// Schema para gestionar documentos de tipo Curso en Sanity CMS
export const curso = {
  name: 'curso',
  title: 'Curso',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre del Curso',
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
    {
      name: 'htmlContent',
      title: 'Código HTML Personalizado (Opcional)',
      type: 'text',
      description: 'Permite insertar código HTML (iframes, widgets, incrustaciones, etc.) para renderizar en la vista del curso.',
    },
  ],
};
