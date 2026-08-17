import { defineType, defineField } from 'sanity';

// Schema para gestionar documentos de tipo Taller en Sanity CMS
export const taller = defineType({
  name: 'taller',
  title: 'Taller',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Taller',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'customLandingUrl',
      title: 'Ruta o Landing Personalizada (Opcional)',
      description: 'Si este taller tiene una página pública a medida (ej: /divina-matriz), colócala aquí para redirigir la presentación pública directamente a esa landing.',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'highlightText',
      title: 'Texto Resaltado (Opcional)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Portada Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duración (ej: 1 Encuentro, 3 Horas)',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Precio en Dólares (Solo el número, ej: 50)',
      type: 'number',
    }),
    defineField({
      name: 'priceArs',
      title: 'Precio en Pesos Argentinos (Solo el número, ej: 50000)',
      type: 'number',
    }),
    defineField({
      name: 'paymentLink',
      title: 'Link de Pago / Reserva (USD)',
      type: 'url',
    }),
    defineField({
      name: 'paymentLinkArs',
      title: 'Link de Pago / Reserva (ARS)',
      type: 'url',
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Bloques de Contenido',
      type: 'array',
      of: [
        { type: 'introBlock' },
        { type: 'cuerpoPorQueBlock' },
        { type: 'cuerpoDirigidoABlock' },
        { type: 'detailedDescriptionBlock' },
        { type: 'introduccionAperturaBlock' },
        { type: 'testimoniosBlock' },
        { type: 'imageGalleryBlock' },
        { type: 'faqBlock' },
        { type: 'cronogramaBlock' },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del Video de Contenido Liberado',
      type: 'url',
      description: 'URL del video de YouTube (usar URL de embed para videos ocultos)',
    }),
    defineField({
      name: 'modulos',
      title: 'Módulos / Pestañas',
      description: 'Si agregas módulos, el alumno verá pestañas para navegar entre ellos. Cada pestaña tiene su propio video y recursos.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Nombre de la Pestaña',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'videos',
              title: 'Videos de la Pestaña',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'titulo',
                      title: 'Título del Video',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'videoUrl',
                      title: 'URL del Video',
                      type: 'url',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'recursos',
              title: 'Recursos del Módulo',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'titulo',
                      title: 'Título del Recurso',
                      type: 'string',
                    }),
                    defineField({
                      name: 'archivo',
                      title: 'Archivo PDF',
                      type: 'file',
                      options: {
                        accept: '.pdf',
                      },
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'contentBlocks',
              title: 'Bloques de Contenido del Módulo (Opcional)',
              description: 'Texto, FAQs, Galerías de imágenes que se mostrarán debajo del video de este módulo.',
              type: 'array',
              of: [
                { type: 'introBlock' },
                { type: 'cuerpoPorQueBlock' },
                { type: 'cuerpoDirigidoABlock' },
                { type: 'detailedDescriptionBlock' },
                { type: 'introduccionAperturaBlock' },
                { type: 'testimoniosBlock' },
                { type: 'imageGalleryBlock' },
                { type: 'faqBlock' },
                { type: 'cronogramaBlock' },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'price',
    },
  },
});