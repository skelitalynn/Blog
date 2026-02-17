import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { projects } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected digital products and experiments.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-10 pb-16">
      <PageIntro
        eyebrow="Work"
        title="Selected Projects"
        description="A compact view of products and systems shipped recently."
      />
      <div className="grid gap-5">
        {projects.map((project) => (
          <article key={project.name} className="rounded-2xl border border-line/80 bg-panel p-6">
            <p className="text-sm text-muted">{project.year}</p>
            <h2 className="pt-2 font-serif text-3xl">{project.name}</h2>
            <p className="pt-3 leading-relaxed text-muted">{project.summary}</p>
            <p className="pt-4 text-sm text-muted">{project.stack.join(" / ")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
