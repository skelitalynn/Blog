"use client";

import { useMemo, useState } from "react";

type SearchItem = {
  title: string;
  href: string;
  summary: string;
};

type SearchPanelProps = {
  items: SearchItem[];
};

export function SearchPanel({ items }: SearchPanelProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q),
    );
  }, [items, query]);

  return (
    <>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search any article ..."
        autoComplete="off"
        className="w-full rounded-xl border border-line bg-transparent px-[14px] py-3 text-base"
      />

      <div className="mt-[14px]">
        {results.length ? (
          results.map((item) => (
            <article key={item.href} className="mb-[10px] rounded-xl border border-line p-3">
              <a href={item.href} className="font-semibold">
                {item.title}
              </a>
              <p className="mt-1.5 text-sm text-muted">{item.summary}</p>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted">No results found.</p>
        )}
      </div>
    </>
  );
}
