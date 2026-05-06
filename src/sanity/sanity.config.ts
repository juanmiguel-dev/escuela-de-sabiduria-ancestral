import { defineConfig } from 'sanity';
import { deskTool, StructureBuilder } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schema } from './schemas';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bksr8znm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'ROMINA CASTAÑEDA CMS',
  schema,
  plugins: [
    deskTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Formaciones')
              .id('formaciones')
              .schemaType('formacion')
              .child(
                S.documentList()
                  .schemaType('formacion')
                  .title('Formaciones')
                  .filter('_type == "formacion"')
              ),
            S.divider(),
            S.listItem()
              .title('Configuración de Inicio')
              .id('landingConfig')
              .child(
                S.document()
                  .schemaType('landing')
                  .documentId('landingConfig')
                  .title('Página de Inicio')
              ),
            S.divider(),
            S.listItem()
              .title('Gestión de Alumnos')
              .id('alumnos')
              .schemaType('alumno')
              .child(
                S.documentList()
                  .schemaType('alumno')
                  .title('Alumnos')
                  .filter('_type == "alumno"')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['landing', 'video', 'formacion'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],
});
