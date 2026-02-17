import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "date": coalesce(publishedAt, _createdAt),
    readTime,
    "tags": tags[]->title,
    content
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "date": coalesce(publishedAt, _createdAt),
    readTime,
    "tags": tags[]->title,
    content
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    description,
    aboutIntro,
    aboutParagraphs
  }
`;
