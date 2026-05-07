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
      title: 'Duración (ej: 4 Semanas, 9 Meses)',
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
      title: 'Link de Pago / Reserva',
      type: 'url',
    }),
    defineField({
      name: 'intro',
      title: 'Intro (¿Sientes que cargas con silencios...?)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'cuerpoPorQue',
      title: 'Cuerpo: ¿Por qué elegir este camino?',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'cuerpoDirigidoA',
      title: 'Cuerpo: ¿A quiénes está dirigida?',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Descripción Detallada (Genérica)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'introduccionApertura',
      title: 'Introducción y Apertura del Camino',
      type: 'array',
      of: [{ type: 'accordionItem' }],
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
