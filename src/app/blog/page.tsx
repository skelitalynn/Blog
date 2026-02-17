import type { Metadata } from "next";

import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/sanity/lib/api";

export const metadata: Metadata = {
  title: "Posts",
  description: "Writing archive with tag-based filtering.",
};

export default function BlogPage() {
  const postsPromise = getAllPosts();

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
      <h1 className="mb-4 text-[32px] tracking-[-0.02em]">Posts</h1>
      <BlogList posts={posts} />
    </div>
  );
}
