import { defineType, defineField } from 'sanity';

export const formacion = defineType({
  name: 'formacion',
  title: 'Formación (Memoria del Clan)',
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
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Formación Profesional e Iniciática de 9 meses',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Tambor o Sahumo)',
      type: 'image',
      options: {
        hotspot: true,
      },
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
  ],
});
