export const landing = {
  name: 'landing',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    {
      name: 'preTitle',
      title: 'Pre-Título (ej: INICIACIÓN PROFUNDA)',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
    },
    {
      name: 'primaryButtonText',
      title: 'Texto Botón Principal',
      type: 'string',
      initialValue: 'EXPLORAR FORMACIONES'
    },
    {
      name: 'primaryButtonLink',
      title: 'Link Botón Principal',
      type: 'string',
      initialValue: '#formaciones'
    },
    {
      name: 'secondaryButtonText',
      title: 'Texto Botón Secundario',
      type: 'string',
      initialValue: 'RESERVAR UNA SESIÓN'
    },
    {
      name: 'secondaryButtonLink',
      title: 'Link Botón Secundario',
      type: 'string',
      initialValue: '/sesiones'
    },
    {
      name: 'backgroundImages',
      title: 'Imágenes de Fondo (Animación Ken Burns)',
      description: 'Sube 2 imágenes para el efecto de transición.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: any) => Rule.max(2)
    }
  ]
};