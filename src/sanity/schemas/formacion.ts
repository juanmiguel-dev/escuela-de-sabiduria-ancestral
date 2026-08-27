import { defineType, defineField } from 'sanity';

export const formacion = defineType({
  name: 'formacion',
  title: 'Formación',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      initialValue: 'Memoria del Clan™',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Formación Profesional e Iniciática de 9 meses',
    }),
    defineField({
      name: 'customLandingUrl',
      title: 'Ruta o Landing Personalizada (Opcional)',
      description: 'Si esta formación tiene una página pública a medida (ej: /divina-matriz), colócala aquí para redirigir la presentación pública directamente a esa landing.',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta (Para la tarjeta en el Inicio)',
      type: 'text',
      validation: (Rule) => Rule.max(200),
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
      title: 'Hero Image (Tambor o Sahumo - Opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duración (ej: 7 Semanas, 9 Meses)',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Precio en Dólares (Solo el número, ej: 788)',
      type: 'number',
    }),
    defineField({
      name: 'priceArs',
      title: 'Precio en Pesos Argentinos (Solo el número, ej: 880000)',
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
      name: 'audioFile',
      title: 'Archivo de Audio Principal (Opcional)',
      description: 'Sube un archivo de audio (.mp3, .m4a, .wav) para reproducirlo en estilo Apple Podcast.',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'audioUrl',
      title: 'URL de Audio Principal Externa (Opcional)',
      description: 'Enlace directo a un archivo de audio externo si no se sube archivo.',
      type: 'url',
    }),
    defineField({
      name: 'modulos',
      title: 'Módulos / Pestañas',
      description: 'Si agregas módulos, el alumno verá pestañas para navegar entre ellos. Cada pestaña tiene sus propias clases (video, audio o ambos) y recursos.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Nombre de la Pestaña / Módulo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'videos',
              title: 'Clases / Lecciones del Módulo',
              description: 'Agrega las clases de este módulo. Cada clase puede tener video (URL de YouTube), archivo de audio (MP3/M4A/WAV estilo Apple Podcast), o ambos.',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'claseItem',
                  title: 'Clase / Lección',
                  fields: [
                    defineField({
                      name: 'titulo',
                      title: 'Título de la Clase',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'videoUrl',
                      title: 'URL del Video (YouTube)',
                      type: 'url',
                      description: 'URL del video de YouTube (ej: https://www.youtube.com/watch?v=... o embed)',
                    }),
                    defineField({
                      name: 'audioFile',
                      title: 'Archivo de Audio (Subir MP3, M4A, WAV)',
                      type: 'file',
                      options: {
                        accept: 'audio/*',
                      },
                      description: 'Sube el archivo de audio para reproducirlo en el mini reproductor estilo Apple Podcast.',
                    }),
                    defineField({
                      name: 'audioUrl',
                      title: 'URL de Audio Externa (Opcional si no se sube archivo)',
                      type: 'url',
                      description: 'Enlace directo a archivo de audio externo si no se sube directamente a Sanity.',
                    }),
                    defineField({
                      name: 'duration',
                      title: 'Duración Estimada (Opcional, ej: 15 min, 45 min)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Descripción o Notas de la Clase (Opcional)',
                      type: 'text',
                      rows: 2,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'titulo',
                      videoUrl: 'videoUrl',
                      audioFile: 'audioFile',
                      audioUrl: 'audioUrl',
                      duration: 'duration',
                    },
                    prepare(selection) {
                      const { title, videoUrl, audioFile, audioUrl, duration } = selection;
                      const hasVideo = !!videoUrl;
                      const hasAudio = !!(audioFile || audioUrl);
                      let mediaType = 'Sin multimedia';
                      if (hasVideo && hasAudio) mediaType = '🎬 Video + 🎙️ Audio';
                      else if (hasVideo) mediaType = '🎬 Solo Video';
                      else if (hasAudio) mediaType = '🎙️ Audio Podcast';
                      return {
                        title: title || 'Clase sin título',
                        subtitle: `${mediaType}${duration ? ` • ${duration}` : ''}`,
                      };
                    },
                  },
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
      subtitle: 'price'
    },
  },
});
