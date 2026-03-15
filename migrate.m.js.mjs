import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-03-14',
});

const sectionsData = [
  {
    title: "Cuando la tecnología",
    highlightText: "no puede fallar",
    order: 1,
    projects: [
      { title: "Atención emergencias 107", year: "2010", tags: "#Contact Center #Desarrollo #Center", src: "/tecnologia-no-puede-fallar/emergencias.mp4", mediaType: "video" },
      { title: "Tecnología en sector salud", year: "2008-Hoy", tags: "#Colaboración #Contact Center #Desarrollo #Networking #IA #Center", src: "/tecnologia-no-puede-fallar/salud.mp4", mediaType: "video" },
      { title: "Ciberseguridad pública con Cisco", year: "2012", tags: "#Ciberseguridad #Cisco", src: "/tecnologia-no-puede-fallar/ciberseguridad.mp4", mediaType: "video" },
      { title: "Videovigilancia fronteriza", year: "2011", tags: "#CCTV", src: "/tecnologia-no-puede-fallar/2011/Publicación 6A-100.jpg", mediaType: "image", isGallery: true, gallery: ["/tecnologia-no-puede-fallar/2011/Publicación 6A-100.jpg", "/tecnologia-no-puede-fallar/2011/Publicación 6B-100.jpg", "/tecnologia-no-puede-fallar/2011/Publicación 6C-100.jpg", "/tecnologia-no-puede-fallar/2011/Publicación 6D-100.jpg", "/tecnologia-no-puede-fallar/2011/Publicación 6E-100.jpg"] },
      { title: "Hospitales CABA", year: "2005", tags: "#Cableado #Switches #Networking", src: "/tecnologia-no-puede-fallar/hospitales.jpg", mediaType: "image" },
      { title: "Data center ARSAT", year: "2014", tags: "#Data center #Cisco", src: "/tecnologia-no-puede-fallar/arsat.jpg", mediaType: "image" },
    ]
  },
  {
    title: "Implementaciones de",
    highlightText: "escala nacional",
    order: 2,
    projects: [
      { title: "Conectividad masiva de aulas", year: "2017", tags: "#Aulas #Networking", src: "/implementaciones/conectividad-masiva-de-aulas/Publicación 4F-100.jpg", mediaType: "image", isGallery: true, gallery: ["/implementaciones/conectividad-masiva-de-aulas/Publicación 4A-100.jpg", "/implementaciones/conectividad-masiva-de-aulas/Publicación 4B-100.jpg", "/implementaciones/conectividad-masiva-de-aulas/Publicación 4C-100.jpg", "/implementaciones/conectividad-masiva-de-aulas/Publicación 4D-100.jpg", "/implementaciones/conectividad-masiva-de-aulas/Publicación 4E-100.jpg", "/implementaciones/conectividad-masiva-de-aulas/Publicación 4F-100.jpg"] },
      { title: "360 edificios públicos interconectados", year: "2015", tags: "#Gobierno #Networking", src: "/implementaciones/360-edificios-publicos-interconectados.mp4", mediaType: "video" },
      { title: "6000 puestos de trabajo conectados", year: "2018", tags: "#Infraestructura #Redes", src: "/implementaciones/6000-puestos-de-trabajo-conectados.mp4", mediaType: "video" },
      { title: "12000 escuelas conectadas", year: "2010", tags: "#Educación #Nacional", src: "/implementaciones/12000-escuelas-conectadas.jpg", mediaType: "image" },
      { title: "Ciudad de Buenos Aires interconectada", year: "2012", tags: "#CABA #SmartCity", src: "/implementaciones/Ciudad de Buenos Aires interconectada.jpg", mediaType: "image" },
    ]
  }
];

async function uploadFile(filePath: string) {
  const absolutePath = path.join(process.cwd(), 'public', filePath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`Archivo no encontrado: ${absolutePath}`);
    return null;
  }
  const fileStream = fs.createReadStream(absolutePath);
  return await client.assets.upload('file', fileStream, {
    filename: path.basename(absolutePath)
  });
}

async function uploadImage(filePath: string) {
  const absolutePath = path.join(process.cwd(), 'public', filePath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`Imagen no encontrada: ${absolutePath}`);
    return null;
  }
  const fileStream = fs.createReadStream(absolutePath);
  return await client.assets.upload('image', fileStream, {
    filename: path.basename(absolutePath)
  });
}

async function runMigration() {
  console.log("Iniciando migración...");

  for (const section of sectionsData) {
    console.log(`Creando sección: ${section.title}...`);
    const createdSection = await client.create({
      _type: 'section',
      title: section.title,
      highlightText: section.highlightText,
      order: section.order
    });

    for (const project of section.projects) {
      console.log(`  Procesando proyecto: ${project.title}...`);
      
      let mainMediaAsset = null;
      if (project.mediaType === 'video') {
        mainMediaAsset = await uploadFile(project.src);
      } else {
        mainMediaAsset = await uploadImage(project.src);
      }

      let galleryAssets = [];
      if (project.isGallery && project.gallery) {
        for (const imgPath of project.gallery) {
          const asset = await uploadImage(imgPath);
          if (asset) galleryAssets.push({ _type: 'image', asset: { _type: 'reference', _ref: asset._id }, _key: Math.random().toString(36).substring(2) });
        }
      }

      await client.create({
        _type: 'project',
        title: project.title,
        slug: { _type: 'slug', current: project.title.toLowerCase().replace(/\s+/g, '-') },
        year: project.year,
        tags: project.tags,
        mediaType: project.mediaType,
        mainMedia: mainMediaAsset ? { _type: 'file', asset: { _type: 'reference', _ref: mainMediaAsset._id } } : undefined,
        isGallery: project.isGallery || false,
        gallery: galleryAssets.length > 0 ? galleryAssets : undefined,
        section: { _type: 'reference', _ref: createdSection._id }
      });
    }
  }

  console.log("Migración completada con éxito.");
}

runMigration().catch(console.error);
