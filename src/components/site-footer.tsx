import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80 py-10">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 text-sm text-muted">
        <p>{new Date().getFullYear()} {siteConfig.name}</p>
        <div className="flex gap-4">
          <Link href={siteConfig.links.github} target="_blank">
            GitHub
          </Link>
          <Link href={siteConfig.links.x} target="_blank">
            X
          </Link>
        </div>
      </div>
    </footer>
  );
}
