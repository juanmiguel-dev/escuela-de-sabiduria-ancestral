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
    title: "Pioneros en",
    highlightText: "tecnología",
    order: 3,
    projects: [
      { title: "Primeros pasos de Trans", year: "1985", tags: "#Historia #Fundación", src: "/pioneros/primeros-pasos.mp4", mediaType: "video" },
      { title: "Primera red de switching en Argentina", year: "1993", tags: "#Pioneros #Switching", src: "/pioneros/primera-red-switching.jpg", mediaType: "image", pdfSrc: "/pioneros/primera-red-switching.pdf" },
      { title: "Primera red WAN - Frame Relay en Argentina", year: "1998", tags: "#WAN #FrameRelay", src: "/pioneros/primera-red-wan.jpg", mediaType: "image", pdfSrc: "/pioneros/primera-red-wan.pdf" },
      { title: "Primer red MPLS del país", year: "2005", tags: "#MPLS #Networking", src: "/pioneros/primer-red-mpls/Publicación 9A-100.jpg", mediaType: "image", isGallery: true, gallery: ["/pioneros/primer-red-mpls/Publicación 9A-100.jpg", "/pioneros/primer-red-mpls/Publicación 9b-100.jpg", "/pioneros/primer-red-mpls/Publicación 9c-100.jpg", "/pioneros/primer-red-mpls/Publicación 9d-100.jpg", "/pioneros/primer-red-mpls/Publicación 9e-100.jpg", "/pioneros/primer-red-mpls/Publicación 9f-100.jpg"] },
      { title: "Primer softSwitch corporativo a gran escala", year: "2002", tags: "#SoftSwitch #VozIP", src: "/pioneros/primer-softswitch.jpg", mediaType: "image" },
      { title: "Primera red de gobierno provincial en Argentina", year: "2007", tags: "#Gobierno #Digitalización", src: "/pioneros/primera-red-provincial/Publicación 11a-100.jpg", mediaType: "image", isGallery: true, gallery: ["/pioneros/primera-red-provincial/Publicación 11a-100.jpg", "/pioneros/primera-red-provincial/Publicación 11b-100.jpg", "/pioneros/primera-red-provincial/Publicación 11c-100.jpg", "/pioneros/primera-red-provincial/Publicación 11d-100.jpg"] },
    ]
  },
  {
    title: "Integraciones que",
    highlightText: "parecían imposibles",
    order: 4,
    projects: [
      { title: "Call centers", year: "2015", tags: "#CallCenter #Integración", src: "/integraciones/call-centers/Publicación 18A-100.jpg", mediaType: "image", isGallery: true, gallery: ["/integraciones/call-centers/Publicación 18A-100.jpg", "/integraciones/call-centers/Publicación 18B-100.jpg", "/integraciones/call-centers/Publicación 18C-100.jpg", "/integraciones/call-centers/Publicación 18D-100.jpg"] },
      { title: "Contact center", year: "2016", tags: "#ContactCenter #CX", src: "/integraciones/contact-center/Publicación 8A.jpg", mediaType: "image", isGallery: true, gallery: ["/integraciones/contact-center/Publicación 8A.jpg", "/integraciones/contact-center/Publicación 8b.jpg", "/integraciones/contact-center/Publicación 8c.jpg", "/integraciones/contact-center/Publicación 8d.jpg"] },
      { title: "Integraciones multidisciplinarias", year: "2017", tags: "#Multiservicio #Networking", src: "/integraciones/integraciones-multidisciplinaria/Publicación 10A-100.jpg", mediaType: "image", isGallery: true, gallery: ["/integraciones/integraciones-multidisciplinaria/Publicación 10A-100.jpg", "/integraciones/integraciones-multidisciplinaria/Publicación 10b-100.jpg", "/integraciones/integraciones-multidisciplinaria/Publicación 10c-100.jpg", "/integraciones/integraciones-multidisciplinaria/Publicación 10d-100.jpg"] },
      { title: "Red única multiservicio", year: "2018", tags: "#Multiservicio #Video", src: "/integraciones/red-unica-multiservicio.mp4", mediaType: "video" },
      { title: "Triple play", year: "2014", tags: "#TriplePlay #Servicios", src: "/integraciones/triple-play.png", mediaType: "image" },
    ]
  },
  {
    title: "Infraestructura que",
    highlightText: "conecta",
    order: 5,
    projects: [
      { title: "1300km de fibra - 92 localidades", year: "2018", tags: "#Fibra #Nacional", src: "/infraestructura/1300km de fibra - 92 localidades/Publicación 7A-100.jpg", mediaType: "image", isGallery: true, gallery: ["/infraestructura/1300km de fibra - 92 localidades/Publicación 7A-100.jpg", "/infraestructura/1300km de fibra - 92 localidades/Publicación 7B-100.jpg", "/infraestructura/1300km de fibra - 92 localidades/Publicación 7C-100.jpg", "/infraestructura/1300km de fibra - 92 localidades/Publicación 7D-100.jpg", "/infraestructura/1300km de fibra - 92 localidades/Publicación 7E-100.jpg"] },
      { title: "Telefonía pública - Morteros", year: "2010", tags: "#Voz #Morteros", src: "/infraestructura/telefonia-publica-morteros/Publicación 12a-100.jpg", mediaType: "image", isGallery: true, gallery: ["/infraestructura/telefonia-publica-morteros/Publicación 12a-100.jpg", "/infraestructura/telefonia-publica-morteros/Publicación 12b-100.jpg"] },
      { title: "Educación y Starlink", year: "2024", tags: "#Starlink #Conectividad", src: "/infraestructura/Educación y Starlink.mp4", mediaType: "video" },
      { title: "Redes de gobierno", year: "2015", tags: "#Gobierno #Infraestructura", src: "/infraestructura/Redes de Gobierno.mp4", mediaType: "video" },
      { title: "Innovación en atención al cliente", year: "2020", tags: "#CX #Innovación", src: "/infraestructura/Innovación en Atención al cliente.mp4", mediaType: "video" },
      { title: "Plantas industriales automotrices", year: "2018", tags: "#Industria #Redes", src: "/infraestructura/Plantas industriales automotrices.mp4", mediaType: "video" },
      { title: "Call centers en Chile", year: "2012", tags: "#Chile #Internacional", src: "/infraestructura/Call centers en Chile.jpg", mediaType: "image" },
    ]
  },
  {
    title: "Salud, educación",
    highlightText: "y ciudadanía",
    order: 6,
    projects: [
      { title: "Metrovias - gestión de pasajeros", year: "2016", tags: "#Transporte #Ciudadanía", src: "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5A-100.jpg", mediaType: "image", isGallery: true, gallery: ["/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5A-100.jpg", "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5B-100.jpg", "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5C-100.jpg", "/salud-educacion-ciudadania/Metrovias - Gestion de pasajeros/Publicación 5D-100.jpg"] },
      { title: "Tecnología en sector salud", year: "2022", tags: "#Salud #Digitalización", src: "/salud-educacion-ciudadania/Tecnología en Sector Salud.mp4", mediaType: "video" },
      { title: "Automatización para organismos públicos", year: "2021", tags: "#Ciudadanía #Automatización", src: "/salud-educacion-ciudadania/Automatización para organismos públicos.mp4", mediaType: "video" },
      { title: "Aulas inteligentes - Fundación Rocca", year: "2019", tags: "#Educación #Innovación", src: "/salud-educacion-ciudadania/Aulas Inteligentes (Fundación Rocca)/Portada Aulas inteligentes-100.jpg", mediaType: "image", pdfSrc: "/salud-educacion-ciudadania/Aulas Inteligentes (Fundación Rocca)/Nota de blog 7 - Transformar el aula para transformar el futuro.pdf", isGallery: true, gallery: ["/salud-educacion-ciudadania/Aulas Inteligentes (Fundación Rocca)/Portada Aulas inteligentes-100.jpg"] },
      { title: "Palacio de Justicia", year: "2018", tags: "#Justicia #Infraestructura", src: "/salud-educacion-ciudadania/Palacio de Justicia/Nota de blog 4/Portada palacio de justicia 1-100.jpg", mediaType: "image", pdfSrc: "/salud-educacion-ciudadania/Palacio de Justicia/Nota de blog 4/Nota de blog 4.pdf", isGallery: true, gallery: ["/salud-educacion-ciudadania/Palacio de Justicia/Nota de blog 4/Portada palacio de justicia 1-100.jpg"] },
      { title: "Hospital Viña del Mar", year: "2017", tags: "#Salud #Chile", src: "/salud-educacion-ciudadania/Hospital Viña del Mar.jpg", mediaType: "image" },
      { title: "Juegos Olímpicos", year: "2018", tags: "#Eventos #Ciudadanía", src: "/salud-educacion-ciudadania/Juegos Olímpicos.jpg", mediaType: "image" },
      { title: "Acondicionamiento oficinas Edenor", year: "2020", tags: "#Infraestructura #Oficinas", src: "/salud-educacion-ciudadania/Acondicionamiento oficinas Edenor.jpg", mediaType: "image" },
    ]
  }
];

async function uploadFile(filePath) {
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

async function uploadImage(filePath) {
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
  console.log("Iniciando migración de las secciones restantes...");

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

      let pdfAsset = null;
      if (project.pdfSrc) {
        pdfAsset = await uploadFile(project.pdfSrc);
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
        pdfFile: pdfAsset ? { _type: 'file', asset: { _type: 'reference', _ref: pdfAsset._id } } : undefined,
        isGallery: project.isGallery || false,
        gallery: galleryAssets.length > 0 ? galleryAssets : undefined,
        section: { _type: 'reference', _ref: createdSection._id }
      });
    }
  }

  console.log("Migración completada con éxito.");
}

runMigration().catch(console.error);
