import type { Metadata } from "next";
import Link from "next/link";

import { SearchPanel } from "@/components/search-panel";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/sanity/lib/api";

export const metadata: Metadata = {
  title: "Search",
  description: "Search all published posts.",
};

export default function SearchPage() {
  const postsPromise = getAllPosts();
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
          <Link href={siteConfig.links.github}>GitHub</Link>
          <Link href={siteConfig.links.x}>X</Link>
          <Link href={siteConfig.links.email}>Email</Link>
          <Link href={siteConfig.links.rss}>RSS</Link>
        </div>
      </div>
    </div>
  );
}
