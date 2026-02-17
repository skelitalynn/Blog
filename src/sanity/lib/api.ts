import "server-only";

import { blogPosts, siteConfig } from "@/config/site";
import { hasSanityEnv } from "@/sanity/env";

import { getSanityClient } from "./client";
import {
  postBySlugQuery,
  postsQuery,
  postSlugsQuery,
  siteSettingsQuery,
} from "./queries";
import type { SanityPost, SiteSettings } from "./types";

const fallbackPosts: SanityPost[] = blogPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  readTime: post.readTime,
  tags: [...post.tags],
  content: post.content,
}));

const fallbackSettings: SiteSettings = {
  title: siteConfig.title,
  description: siteConfig.description,
  aboutIntro: "CS | AI | Web3 | Full-Stack Dev | INTJ | Affirm",
  aboutParagraphs: [
    "Computer Science student building AI agent systems and Web3 applications.",
    "Focused on architecture, AI Agent, and scalable full-stack products.",
    "Aspiring to design reliable AI systems with clarity, depth, and disciplined execution.",
  ],
};

function getQueryOptions(isPreview: boolean) {
  return {
    perspective: isPreview ? ("previewDrafts" as const) : ("published" as const),
    useCdn: !isPreview,
    token: isPreview ? process.env.SANITY_API_READ_TOKEN : undefined,
    next: { revalidate: 60 },
  };
}

export async function getAllPosts(isPreview = false): Promise<SanityPost[]> {
  if (!hasSanityEnv) return fallbackPosts;
  const sanityClient = getSanityClient();
  const posts = await sanityClient.fetch<SanityPost[]>(postsQuery, {}, getQueryOptions(isPreview));
  return posts ?? [];
}

export async function getPostBySlug(slug: string, isPreview = false): Promise<SanityPost | null> {
  if (!hasSanityEnv) {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }
  const sanityClient = getSanityClient();
  const post = await sanityClient.fetch<SanityPost | null>(
    postBySlugQuery,
    { slug },
    getQueryOptions(isPreview),
  );
  return post;
}

export async function getAllPostSlugs(isPreview = false): Promise<string[]> {
  if (!hasSanityEnv) return fallbackPosts.map((post) => post.slug);
  const sanityClient = getSanityClient();
  return sanityClient.fetch<string[]>(postSlugsQuery, {}, getQueryOptions(isPreview));
}

export async function getSiteSettings(isPreview = false): Promise<SiteSettings> {
  if (!hasSanityEnv) return fallbackSettings;
  const sanityClient = getSanityClient();
  const settings = await sanityClient.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    getQueryOptions(isPreview),
  );
  return settings ?? fallbackSettings;
}
