export const alumno = {
  name: 'alumno',
  title: 'Alumno',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre Completo',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Correo Electrónico',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'password',
      title: 'Contraseña Provisional (Opcional)',
      description: 'Para que el alumno inicie sesión por primera vez.',
      type: 'string',
    },
    {
      name: 'isActive',
      title: 'Alumno Activo',
      description: 'Si está desactivado, no podrá ingresar a la plataforma.',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'formaciones',
      title: 'Formaciones Inscritas',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'formacion' }],
        },
      ],
    },
    {
      name: 'joinDate',
      title: 'Fecha de Ingreso',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      isActive: 'isActive'
    },
    prepare(selection: any) {
      const { title, subtitle, isActive } = selection;
      return {
        title: title,
        subtitle: `${isActive ? '🟢 Activo' : '🔴 Inactivo'} | ${subtitle}`
      };
    }
  },
};