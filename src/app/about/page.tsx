import type { Metadata } from "next";
import { isDraftModeEnabled } from "@/lib/safe-draft-mode";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/sanity/lib/api";

export const metadata: Metadata = {
  title: "Apple",
  description: "About the author and design philosophy.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings(isDraftModeEnabled());
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "octocat";

  const aboutIntro =
    settings.aboutIntro ?? "CS | AI | Web3 | Full-Stack Dev | INTJ | Metaphysics Enthusiast";

  const aboutParagraphs = settings.aboutParagraphs ?? [
    "Computer Science student building AI agent systems and Web3 applications.",
    "Focused on architecture, AI Agent, and scalable full-stack products. ",
    "Aspiring to design reliable AI systems with clarity, depth, and disciplined execution.",
  ];

  return (
    <div className="pb-10 pt-5">
      <h1 className="mb-4 text-[32px] tracking-[-0.02em]">Apple</h1>

      <section className="mb-4 flex items-center gap-4">
        <Image
          src="/avatar.png"
          alt="头像"
          width={150}
          height={150}
          className="h-[150px] w-[150px] rounded-full border border-line object-cover"
        />
        <p className="text-[15px] text-muted">{aboutIntro}</p>
      </section>

      <section className="space-y-3">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="mt-7">
        <h2 className="mb-3 text-[22px] tracking-[-0.015em]">GitHub Activity</h2>
        <div className="mb-3 rounded-[14px] border border-line p-3">
          <img
            src={`https://ghchart.rshah.org/${githubUsername}`}
            alt="GitHub Contribution Graph"
            width={1200}
            height={260}
            loading="lazy"
            className="w-full rounded-[10px] border border-line"
          />
        </div>
      </section>

      <footer className="mt-7 border-t border-line pt-3 text-sm text-muted">
        <div className="flex flex-wrap gap-3">
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={siteConfig.links.x} target="_blank" rel="noreferrer">X</a>
          <a href={siteConfig.links.email}>Email</a>
        </div>
      </footer>
    </div>
  );
}


