import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/sanity/lib/api";

type BlogArticlePageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const index = allPosts.findIndex((item) => item.slug === params.slug);
  const prev = index > 0 ? allPosts[index - 1] : null;
  const next = index < allPosts.length - 1 ? allPosts[index + 1] : null;

  return (
    <article className="pb-10 pt-5">
      <header className="mb-6">
        <h1 className="mb-2 text-[42px] leading-[1.1] tracking-[-0.03em]">{post.title}</h1>
        <p className="text-sm text-muted">
          {post.date} · {post.readTime ?? "5 min read"}
        </p>
      </header>

      <div className="max-w-[680px] space-y-3 leading-[1.72]">
        {isStringArray(post.content) ? (
          post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
        ) : (
          <PortableText value={post.content as []} />
        )}
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-1 text-[13px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-line pt-3 text-muted">
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className="hover:text-text">
            ← Prev: {prev.title}
          </Link>
        ) : (
          <Link href="/blog" className="hover:text-text">
            ← Back to Posts
          </Link>
        )}

        {next ? (
          <Link href={`/blog/${next.slug}`} className="hover:text-text">
            Next: {next.title} →
          </Link>
        ) : (
          <Link href="/blog" className="hover:text-text">
            Back to Posts →
          </Link>
        )}
      </div>
    </article>
  );
}
