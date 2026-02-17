import type { Metadata } from "next";
import { isDraftModeEnabled } from "@/lib/safe-draft-mode";

import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/sanity/lib/api";

export const metadata: Metadata = {
  title: "Posts",
  description: "Writing archive with tag-based filtering.",
};

export default function BlogPage() {
  const postsPromise = getAllPosts(isDraftModeEnabled());

  return <BlogPageContent postsPromise={postsPromise} />;
}

async function BlogPageContent({
  postsPromise,
}: {
  postsPromise: ReturnType<typeof getAllPosts>;
}) {
  const posts = await postsPromise;

  return (
    <div className="pb-10 pt-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-[32px] tracking-[-0.02em]">Posts</h1>
        <a
          href="/studio/desk/post;create"
          className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:text-text"
        >
          Add
        </a>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}

