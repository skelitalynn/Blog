import "server-only";

import { draftMode } from "next/headers";

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
  aboutIntro: "深度专注产品与前端体验，喜欢把复杂问题做成简单页面。",
  aboutParagraphs: [
    "我目前在做一个写作优先的个人博客系统，目标是极简、耐看、可长期维护。",
    "过去更多是后端视角，现在正在系统补齐前端能力，从视觉到工程都亲手打磨。",
    "平时在北京和线上协作空间之间切换，也欢迎交流设计系统与个人产品。",
  ],
};

function getQueryOptions() {
  const isPreview = draftMode().isEnabled;
  return {
    perspective: isPreview ? ("previewDrafts" as const) : ("published" as const),
    useCdn: !isPreview,
    token: isPreview ? process.env.SANITY_API_READ_TOKEN : undefined,
    next: { revalidate: 60 },
  };
}

export async function getAllPosts(): Promise<SanityPost[]> {
  if (!hasSanityEnv) return fallbackPosts;
  const sanityClient = getSanityClient();
  const posts = await sanityClient.fetch<SanityPost[]>(postsQuery, {}, getQueryOptions());
  return posts?.length ? posts : fallbackPosts;
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!hasSanityEnv) {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }
  const sanityClient = getSanityClient();
  const post = await sanityClient.fetch<SanityPost | null>(
    postBySlugQuery,
    { slug },
    getQueryOptions(),
  );
  return post;
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!hasSanityEnv) return fallbackPosts.map((post) => post.slug);
  const sanityClient = getSanityClient();
  return sanityClient.fetch<string[]>(postSlugsQuery, {}, getQueryOptions());
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSanityEnv) return fallbackSettings;
  const sanityClient = getSanityClient();
  const settings = await sanityClient.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    getQueryOptions(),
  );
  return settings ?? fallbackSettings;
}
