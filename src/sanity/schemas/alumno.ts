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
      title: 'Formaciones / Cursos / Talleres Inscritos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'formacion' }, { type: 'curso' }, { type: 'taller' }],
        },
      ],
    },
    {
      name: 'joinDate',
      title: 'Fecha de Ingreso',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'resetToken',
      title: 'Token de Recuperación',
      type: 'string',
      hidden: true,
    },
    {
      name: 'resetTokenExpiry',
      title: 'Expiración del Token',
      type: 'datetime',
      hidden: true,
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