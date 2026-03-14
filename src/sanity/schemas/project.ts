export const project = {
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Año',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'tags',
      title: 'Tags (ej: #Networking #Cloud)',
      type: 'string',
    },
    {
      name: 'mainMedia',
      title: 'Media Principal (Imagen o Video)',
      type: 'file',
      options: {
        accept: 'image/*,video/mp4',
      },
    },
    {
      name: 'mediaType',
      title: 'Tipo de Media',
      type: 'string',
      options: {
        list: [
          { title: 'Imagen', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
    },
    {
      name: 'pdfFile',
      title: 'Archivo PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'isGallery',
      title: '¿Es una Galería?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image' }],
      hidden: ({ document }: any) => !document?.isGallery,
    },
    {
      name: 'section',
      title: 'Sección',
      type: 'reference',
      to: [{ type: 'section' }],
    },
    {
      name: 'isHeroFeatured',
      title: 'Destacar en Hero',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
