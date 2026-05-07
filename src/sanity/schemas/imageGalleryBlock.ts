import { defineField, defineType, defineArrayMember } from 'sanity';

export const imageGalleryBlock = defineType({
  name: 'imageGalleryBlock',
  title: 'Bloque de Galería de Imágenes',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Galería (Opcional)',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Se requiere al menos una imagen para la galería.'),
    }),
    defineField({
      name: 'layoutType',
      title: 'Tipo de Diseño',
      type: 'string',
      options: {
        list: [
          { title: 'Masonry', value: 'masonry' },
          { title: 'Slider', value: 'slider' },
        ],
        layout: 'radio',
      },
      initialValue: 'masonry',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'masonryColumns',
      title: 'Columnas (Solo para Masonry)',
      type: 'number',
      description: 'Número de columnas para el diseño Masonry (ej. 2, 3, 4).',
      initialValue: 3,
      validation: (Rule) =>
        Rule.min(1).max(6).error('El número de columnas debe estar entre 1 y 6.'),
      hidden: ({ parent }) => parent?.layoutType !== 'masonry',
    }),
    defineField({
      name: 'masonryRows',
      title: 'Filas (Solo para Masonry)',
      type: 'number',
      description: 'Número de filas para el diseño Masonry (ej. 2, 3, 4).',
      initialValue: 3,
      validation: (Rule) =>
        Rule.min(1).max(6).error('El número de filas debe estar entre 1 y 6.'),
      hidden: ({ parent }) => parent?.layoutType !== 'masonry',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layoutType',
      imageCount: 'images.length',
    },
    prepare(selection) {
      const { title, layout, imageCount } = selection;
      return {
        title: title || 'Galería de Imágenes',
        subtitle: `${layout} (${imageCount || 0} imágenes)`,
      };
    },
  },
});
