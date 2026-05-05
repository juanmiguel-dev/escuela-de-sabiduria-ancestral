import { defineType, defineField } from 'sanity';

export const encuentro = defineType({
  name: 'encuentro',
  title: 'Encuentro',
  type: 'document',
  fields: [
    defineField({
      name: 'numero',
      title: 'Número del Encuentro',
      type: 'number',
      description: 'Ej. 1 al 9',
      validation: (Rule) => Rule.required().min(1).max(9),
    }),
    defineField({
      name: 'ejeTematico',
      title: 'Eje Temático',
      type: 'string',
      description: 'Ej. El Sol - Identidad - Linaje paterno',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'elementoPuntoCardinal',
      title: 'Elemento y Punto Cardinal',
      type: 'string',
      description: 'Ej. Fuego - Este',
    }),
    defineField({
      name: 'fechasHorarios',
      title: 'Fechas y Horarios',
      type: 'string',
      description: 'Ej. Sábado 6 y Domingo 7 de Junio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contenido',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detalle de lo que se aprende (Método, Lectura del Campo, etc.)',
    }),
  ],
  preview: {
    select: {
      title: 'ejeTematico',
      subtitle: 'fechasHorarios',
      numero: 'numero',
    },
    prepare({ title, subtitle, numero }) {
      return {
        title: `Encuentro ${numero}: ${title}`,
        subtitle: subtitle,
      };
    },
  },
});
