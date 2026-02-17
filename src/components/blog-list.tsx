"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: readonly string[];
};

type BlogListProps = {
  posts: readonly BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
  const [activeTag, setActiveTag] = useState("全部");

  const tags = useMemo(() => {
    const map = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        map.set(tag, (map.get(tag) ?? 0) + 1);
      }
    }
    const sorted = [...map.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
    return [{ name: "全部", count: posts.length }, ...sorted];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTag === "全部") return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, posts]);

  return (
    <>
      <div className="mb-4 mt-[-4px] flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.name}
            type="button"
            onClick={() => setActiveTag(tag.name)}
            className={`rounded-full border px-2.5 py-1 text-[13px] ${
              activeTag === tag.name
                ? "border-text bg-text text-canvas"
                : "border-line bg-transparent text-muted"
            }`}
          >
            {tag.name} ({tag.count})
          </button>
        ))}
      </div>

      <section>
        {filteredPosts.map((post) => (
          <article key={post.slug} className="mb-3 rounded-[14px] border border-line p-[14px]">
            <h2 className="mb-1 text-[22px] tracking-[-0.015em]">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <div className="mb-2 text-[13px] text-muted">
              {post.date} · {post.tags.join(" · ")}
            </div>
            <p className="m-0 text-muted">{post.excerpt}</p>
          </article>
        ))}
      </section>
    </>
  );
}
