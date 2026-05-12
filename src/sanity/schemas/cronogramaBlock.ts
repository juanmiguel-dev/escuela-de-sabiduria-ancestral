import { defineField, defineType } from 'sanity';

export const cronogramaBlock = defineType({
  name: 'cronogramaBlock',
  title: 'Bloque de Cronograma / Programa',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      initialValue: 'Programa de la Formación',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Módulos o Etapas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'cronogramaItem',
          title: 'Módulo / Etapa',
          fields: [
            defineField({
              name: 'indicator',
              title: 'Indicador (ej: Mes 1, Módulo 1, Octubre)',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Título del Módulo',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Contenido / Temario',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || 'Bloque de Cronograma',
      };
    },
  },
});
