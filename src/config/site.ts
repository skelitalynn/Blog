export const siteConfig = {
  name: "Apple's Blog",
  title: "Personal Blog",
  description:
    "A minimal personal website with writing-first posts and clean, readable design.",
  links: {
    github: "https://github.com/skelitalynn",
    x: "https://x.com/LynnSkelita",
    email: "mailto:skelitalynn@gmail.com",
    rss: "/rss.xml",

  },
  nav: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Posts" },
    { href: "/search", label: "Search" },
  ],
} as const;

export const blogPosts = [
  {
    slug: "building-a-writing-first-blog",
    title: "Building a Writing-First Blog",
    excerpt:
      "How I make a personal blog maintainable like an engineering project rather than a one-off landing page.",
    date: "2026-02-17",
    readTime: "6 min read",
    tags: ["Frontend", "Design System"],
    content: [
      "When I started rebuilding my personal site, I decided to optimize writing flow first instead of motion or visual effects.",
      "That means a disciplined layout: single-column reading width, stable spacing rhythm, and low-noise interfaces.",
      "A blog page should carry content, not compete with it.",
      "I treat title, summary, tags, and publish date as a strict content model so migrating to a CMS later remains straightforward.",
      "Small design tokens and clear constraints help me move faster while keeping quality consistent over time.",
    ],
  },
  {
    slug: "from-backend-to-frontend",
    title: "From Backend to Frontend",
    excerpt:
      "A project-based learning route where each day ships one visible frontend result.",
    date: "2026-02-15",
    readTime: "5 min read",
    tags: ["Learning Log", "Frontend"],
    content: [
      "I used to spend most of my time on APIs and services, and frontend felt like a final polish step.",
      "Building my own site changed that perspective because experience quality is the product itself.",
      "The most effective learning path is solving one real problem at a time: nav today, list cards tomorrow, search the day after.",
      "Short task loops create visible progress and keep motivation stable.",
      "Frontend is not just styling; it is structure, system decisions, and long-term maintainability.",
    ],
  },
  {
    slug: "minimal-ui-notes",
    title: "Minimal UI Notes",
    excerpt:
      "Practical notes on whitespace, text hierarchy, and low-saturation visual systems.",
    date: "2026-02-10",
    readTime: "4 min read",
    tags: ["UI/UX", "Design System"],
    content: [
      "Minimal UI is not deleting elements blindly. It is keeping only what has a clear purpose.",
      "I usually prototype in grayscale first to validate layout and hierarchy before visual decoration.",
      "Body text, headings, and metadata need a clear layer order; once stable, the entire interface becomes calmer.",
      "Reduce unnecessary shadows, borders, and color blocks so attention returns to content and reading rhythm.",
      "This principle works especially well for blogs and documentation surfaces.",
    ],
  },
] as const;

export const projects = [
  {
    name: "Arc Notes",
    year: "2025",
    summary: "A writing-first dashboard with markdown blocks and searchable archives.",
    stack: ["Next.js", "Sanity", "Vercel"],
  },
  {
    name: "Studio Ledger",
    year: "2024",
    summary: "A minimal ops panel for independent creators and small product teams.",
    stack: ["TypeScript", "Postgres", "Tailwind CSS"],
  },
] as const;
