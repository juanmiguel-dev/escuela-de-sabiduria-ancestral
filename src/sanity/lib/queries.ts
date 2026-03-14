import { client } from './client';

export async function getProjects() {
  return await client.fetch(`*[_type == "project"] {
    _id,
    title,
    "slug": slug.current,
    year,
    description,
    tags,
    "mediaUrl": mainMedia.asset->url,
    mediaType,
    "pdfUrl": pdfFile.asset->url,
    isGallery,
    "gallery": gallery[].asset->url,
    "section": section->title,
    isHeroFeatured
  }`);
}

export async function getSections() {
  return await client.fetch(`*[_type == "section"] | order(order asc) {
    _id,
    title,
    highlightText,
    "projects": *[_type == "project" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      year,
      description,
      tags,
      "mediaUrl": mainMedia.asset->url,
      mediaType,
      "pdfUrl": pdfFile.asset->url,
      isGallery,
      "gallery": gallery[].asset->url
    }
  }`);
}
