"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;

  return (
    <header className="mx-auto w-full max-w-[760px] px-[22px] pt-[18px]">
      <div className="flex items-center justify-between text-sm">
        <Link href="/about" className="font-semibold tracking-[-0.01em]">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-4 text-muted">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/blog" && pathname.startsWith("/blog/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "text-text" : "transition-colors hover:text-text"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
