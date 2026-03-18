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
    "videoUrl": videoFile.asset->url,
    mediaType,
    "pdfUrl": pdfFile.asset->url,
    isGallery,
    "gallery": gallery[].asset->url,
    "sections": sections[]->title,
    isHeroFeatured
  }`);
}

export async function getFeaturedProjects() {
  return await client.fetch(`*[_type == "project" && isHeroFeatured == true] | order(heroOrder asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    year,
    description,
    tags,
    "mediaUrl": mainMedia.asset->url,
    "videoUrl": videoFile.asset->url,
    mediaType,
    "pdfUrl": pdfFile.asset->url,
    isGallery,
    "gallery": gallery[].asset->url,
    "sections": sections[]->title,
    isHeroFeatured,
    heroOrder
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
      "videoUrl": videoFile.asset->url,
      mediaType,
      "pdfUrl": pdfFile.asset->url,
      isGallery,
      "gallery": gallery[].asset->url,
      "sections": sections[]->title
    }
  }`);
}
