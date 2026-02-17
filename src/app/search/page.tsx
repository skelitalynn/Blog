import type { Metadata } from "next";
import { isDraftModeEnabled } from "@/lib/safe-draft-mode";

import { SearchPanel } from "@/components/search-panel";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/sanity/lib/api";

export const metadata: Metadata = {
  title: "Search",
  description: "Search all published posts.",
};

export default function SearchPage() {
  const postsPromise = getAllPosts(isDraftModeEnabled());
  return <SearchPageContent postsPromise={postsPromise} />;
}

async function SearchPageContent({
  postsPromise,
}: {
  postsPromise: ReturnType<typeof getAllPosts>;
}) {
  const posts = await postsPromise;
  const items = posts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    summary: post.excerpt,
  }));

  return (
    <div className="pb-10 pt-5">
      <h1 className="mb-[14px] text-[32px] tracking-[-0.02em]">Search</h1>
      <SearchPanel items={items} />

      <div className="mt-[22px] border-t border-line pt-3 text-sm text-muted">
        <div className="flex flex-wrap gap-3">
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={siteConfig.links.x} target="_blank" rel="noreferrer">X</a>
          <a href={siteConfig.links.email}>Email</a>
          <a href={siteConfig.links.rss}>RSS</a>
        </div>
      </div>
    </div>
  );
}



