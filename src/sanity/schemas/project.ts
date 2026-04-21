export const project = {
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del Proyecto',
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
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'videoFile',
      title: 'Archivo de Video (Opcional)',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
    },
    {
      name: 'mediaType',
      title: '¿Qué mostrar primero?',
      type: 'string',
      options: {
        list: [
          { title: 'Imagen', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
      initialValue: 'image',
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
      name: 'implementacionesDe',
      title: 'Implementaciones de',
      description: 'Seleccioná una o más secciones para este proyecto',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'section' }] }],
    },
    {
      name: 'isHeroFeatured',
      title: 'Destacar en Hero',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'heroOrder',
      title: 'Orden en Hero',
      description: 'El número 1 será el primero en aparecer',
      type: 'number',
      hidden: ({ document }: any) => !document?.isHeroFeatured,
      initialValue: 1,
    },
    {
      name: 'mobileHeroImage',
      title: '⚠️ Imagen Mobile (TEST)',
      description: 'Imagen específica para el fondo en dispositivos móviles. Si se deja vacío, se usará la Imagen Principal.',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'mainMedia',
    },
  },
};
