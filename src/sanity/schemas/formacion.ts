export const formacion = {
  name: 'formacion',
  title: 'Formación',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de la Formación',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Descripción Corta (Para la tarjeta en el Inicio)',
      type: 'text',
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: 'mainImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'duration',
      title: 'Duración (ej: 4 Semanas, 3 Meses)',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Precio (ej: $150 USD)',
      type: 'string',
    },
    {
      name: 'paymentLink',
      title: 'Link de Pago / Reserva',
      type: 'url',
    },
    {
      name: 'detailedDescription',
      title: 'Descripción Detallada (Landing de la Formación)',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'price'
    },
  },
};