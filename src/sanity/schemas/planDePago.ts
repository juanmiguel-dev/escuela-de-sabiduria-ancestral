import { defineType, defineField } from 'sanity';

export const planDePago = defineType({
  name: 'planDePago',
  title: 'Plan de Pago',
  type: 'object',
  fields: [
    defineField({
      name: 'monedaPais',
      title: 'Moneda / País',
      type: 'string',
      description: 'Ej. AR, MX, Internacional',
      options: {
        list: [
          { title: 'Argentina (ARS)', value: 'AR' },
          { title: 'México (MXN)', value: 'MX' },
          { title: 'Internacional (USD)', value: 'INT' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modalidad',
      title: 'Modalidad',
      type: 'string',
      options: {
        list: [
          { title: 'Plan Mensual', value: 'mensual' },
          { title: 'Pago Único Anticipado', value: 'unico' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'valores',
      title: 'Valores',
      type: 'string',
      description: 'Ej. 9 cuotas de $88.000 ARS o $788.000 ARS total',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
