import { defineField, defineType } from 'sanity';

export const landing = defineType({
  name: 'landing',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Slider del Hero',
      description: 'Gestiona las diapositivas del hero (100vh)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroSlide',
          title: 'Diapositiva',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Tipo de Media',
              type: 'string',
              options: {
                list: [
                  { title: 'Imagen', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
              },
              initialValue: 'image',
            }),
            defineField({
              name: 'image',
              title: 'Imagen de Fondo',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType !== 'image',
            }),
            defineField({
              name: 'videoUrl',
              title: 'URL de Video (YouTube/Vimeo/Direct Link)',
              type: 'url',
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            }),
            defineField({
              name: 'videoFile',
              title: 'Archivo de Video (Opcional - Directo)',
              type: 'file',
              options: { accept: 'video/*' },
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            }),
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtítulo',
              type: 'text',
            }),
            defineField({
              name: 'button1Text',
              title: 'Texto Botón 1',
              type: 'string',
            }),
            defineField({
              name: 'button1Link',
              title: 'Link Botón 1',
              type: 'string',
            }),
            defineField({
              name: 'button2Text',
              title: 'Texto Botón 2',
              type: 'string',
            }),
            defineField({
              name: 'button2Link',
              title: 'Link Botón 2',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerDescription',
      title: 'Pie de página: Descripción',
      description: 'Texto corto descriptivo debajo del logo en el Footer.',
      type: 'text',
      initialValue: 'Acompañamiento en tu proceso de crecimiento personal y espiritual a través de formaciones y sesiones individuales.',
    }),
    defineField({
      name: 'footerEmail',
      title: 'Pie de página: Email de Contacto',
      type: 'string',
      initialValue: 'hola@rominacastaneda.com',
    }),
    defineField({
      name: 'footerInstagram',
      title: 'Pie de página: Link de Instagram',
      type: 'string',
      initialValue: 'https://instagram.com',
    }),
    defineField({
      name: 'footerYoutube',
      title: 'Pie de página: Link de YouTube',
      type: 'string',
      initialValue: 'https://youtube.com',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Pie de página: Texto Copyright (Opcional)',
      description: 'Texto de derechos reservados al final del Footer. Dejar en blanco para usar el año actual automáticamente.',
      type: 'string',
    }),
  ],
});