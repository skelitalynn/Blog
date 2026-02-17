export type SanityPost = {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  tags: string[];
  content?: unknown;
};

export type SiteSettings = {
  title?: string;
  description?: string;
  aboutIntro?: string;
  aboutParagraphs?: string[];
};
