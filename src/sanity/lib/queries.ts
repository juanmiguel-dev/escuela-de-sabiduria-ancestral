import { client } from './client';

export async function getLandingData() {
  return await client.fetch(`*[_type == "landing"][0] {
    preTitle,
    title,
    subtitle,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    "backgroundImages": coalesce(backgroundImages[].asset->url, [])
  }`);
}

export async function getFormaciones() {
  return await client.fetch(`*[_type == "formacion"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    duration,
    price,
    priceArs,
    paymentLink,
    paymentLinkArs,
    "imageUrl": mainImage.asset->url
  }`);
}

export async function getFormacionBySlug(slug: string) {
  return await client.fetch(`*[_type == "formacion" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    shortDescription,
    duration,
    price,
    priceArs,
    paymentLink,
    paymentLinkArs,
    "imageUrl": mainImage.asset->url,
    "heroImageUrl": heroImage.asset->url,
    contentBlocks[] {
      _type,
      _key,
      defined(intro) => {
        intro
      },
      defined(cuerpoPorQue) => {
        cuerpoPorQue
      },
      defined(cuerpoDirigidoA) => {
        cuerpoDirigidoA
      },
      defined(detailedDescription) => {
        detailedDescription
      },
      defined(introduccionApertura) => {
        introduccionApertura[] {
          _key,
          title,
          content
        }
      },
      defined(testimonios) => {
        testimonios[] {
          _key,
          nombre,
          mensaje,
          "avatarUrl": avatar.asset->url
        }
      },
      _type == "imageGalleryBlock" => {
        title,
        layoutType,
        masonryColumns,
        masonryRows,
        images[] {
          _key,
          "imageUrl": coalesce(asset->url, image.asset->url),
          "alt": coalesce(alt, image.alt)
        }
      }
    }
  }`, { slug });
}

export async function getProjects() {
  return await client.fetch(`*[_type == "video"] {
    _id,
    title,
    "slug": slug.current,
    description,
    "mediaUrl": mainMedia.asset->url,
    "videoUrl": videoFile.asset->url,
    "sections": talleres[]->title,
    isHeroFeatured
  }`);
}

export async function getFeaturedProjects() {
  return await client.fetch(`*[_type == "video" && isHeroFeatured == true] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "mediaUrl": mainMedia.asset->url,
    "videoUrl": videoFile.asset->url,
    "sections": talleres[]->title,
    isHeroFeatured
  }`);
}

export async function getSections() {
  return await client.fetch(`*[_type == "taller"] | order(order asc) {
    _id,
    title,
    highlightText,
    "projects": *[_type == "video" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      description,
      "mediaUrl": mainMedia.asset->url,
      "videoUrl": videoFile.asset->url,
      "sections": talleres[]->title
    }
  }`);
}
export async function getTallerCount() {
  return await client.fetch(`count(*[_type == "taller"])`);
}

export async function getTalleres() {
  return await client.fetch(`*[_type == "taller"] | order(order asc) {
    _id,
    title,
    highlightText,
    "projects": *[_type == "video" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      description,
      "mediaUrl": mainMedia.asset->url,
      "videoUrl": videoFile.asset->url
    }
  }`);
}


export async function getAlumnoByEmail(email: string) {
  return await client.fetch(*[_type == " alumno\ && email == ][0] {
 _id,
 name,
 email,
 isActive,
 \formaciones\: formaciones[]-> {
 _id,
 title,
 \slug\: slug.current,
 \imageUrl\: mainImage.asset->url,
 shortDescription
 }
 }, { email });
}
