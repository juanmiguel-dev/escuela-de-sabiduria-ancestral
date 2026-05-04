export const video = {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del Video',
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
      name: 'description',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'mainMedia',
      title: 'Imagen de Portada (Thumbnail)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoFile',
      title: 'Archivo de Video',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
    },
    {
      name: 'talleres',
      title: 'Talleres a los que pertenece',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taller' }] }],
    },
    {
      name: 'isHeroFeatured',
      title: 'Destacar en el Inicio',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainMedia',
    },
  },
};