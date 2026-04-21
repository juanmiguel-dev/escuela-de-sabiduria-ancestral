import { defineConfig } from 'sanity';
import { deskTool, StructureBuilder } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schema } from './schemas';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Trans Advanced Technologies CMS',
  schema,
  plugins: [
    deskTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Casos Destacados')
              .id('featured')
              .schemaType('project')
              .child(
                S.documentList()
                  .schemaType('project')
                  .title('Casos Destacados')
                  .filter('_type == "project" && isHeroFeatured == true')
                  .defaultOrdering([{ field: 'heroOrder', direction: 'asc' }])
              ),
            S.divider(),
            ...S.documentTypeListItems(),
          ]),
    }),
    visionTool(),
  ],
});
