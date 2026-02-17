import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/sanity/lib/api";

export const metadata: Metadata = {
  title: "About",
  description: "About the author and design philosophy.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const aboutIntro =
    settings.aboutIntro ?? "深度专注产品与前端体验，喜欢把复杂问题做成简单页面。";
  const aboutParagraphs = settings.aboutParagraphs ?? [
    "我目前在做一个写作优先的个人博客系统，目标是极简、耐看、可长期维护。",
    "过去更多是后端视角，现在正在系统补齐前端能力，从视觉到工程都亲手打磨。",
    "平时在北京和线上协作空间之间切换，也欢迎交流设计系统与个人产品。",
  ];

  return (
    <div className="pb-10 pt-5">
      <h1 className="mb-4 text-[32px] tracking-[-0.02em]">About</h1>

      <section className="mb-4 flex items-center gap-4">
        <Image
          src="https://i.pravatar.cc/160?img=12"
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
          <Image
            src="https://ghchart.rshah.org/409ba5/torvalds"
            alt="GitHub Contribution Graph"
            width={1200}
            height={260}
            className="w-full rounded-[10px] border border-line"
          />
        </div>
        <p className="text-muted">我偏好把可复用的东西开源出来，边做边记录，保持持续迭代。</p>
      </section>

      <footer className="mt-7 border-t border-line pt-3 text-sm text-muted">
        <div className="flex flex-wrap gap-3">
          <Link href={siteConfig.links.github}>GitHub</Link>
          <Link href={siteConfig.links.x}>X</Link>
          <Link href={siteConfig.links.email}>Email</Link>
        </div>
      </footer>
    </div>
  );
}
