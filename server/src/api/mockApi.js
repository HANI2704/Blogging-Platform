// Simple client-side mock API using localStorage and BroadcastChannel for cross-tab updates
import { v4 as uuidv4 } from "uuid";
import Fuse from "fuse.js";

const STORAGE_KEY = "zidio_posts_v1";
const CHANNEL_NAME = "zidio_posts_channel_v1";

function now() {
  return new Date().toISOString();
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const sample = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
    return sample;
  }
  try {
    return JSON.parse(raw);
  } catch {
    console.error("Failed to parse posts");
    return [];
  }
}

// Seed sample post for initial testing if none exist
(function seedIfEmpty() {
  try {
    const all = load();
    if (!all || all.length === 0) {
      // Seed a larger set of dummy posts for development (mirrors server/db.json)
      const sample = [
        {
          id: "a1b2c3d4-e001-0000-0000-000000000001",
          title: "Getting started with Zidio",
          excerpt:
            "A quick tour to help you get started with the Zidio blog platform.",
          content:
            "<h2>Welcome</h2><p>This is a starter post that introduces Zidio and how to use it.</p>",
          category: "General",
          author: "Admin",
          createdAt: "2024-01-01T08:00:00.000Z",
          updatedAt: "2024-01-01T08:00:00.000Z",
          likes: 12,
          comments: [],
        },
        {
          id: "a1b2c3d4-e002-0000-0000-000000000002",
          title: "Designing with Tailwind: Tips & Tricks",
          excerpt: "How to make beautiful UIs quickly using Tailwind CSS.",
          content:
            "<h2>Tailwind Tips</h2><p>Practical tips for creating responsive layouts and components.</p>",
          category: "Design",
          author: "Rajat",
          createdAt: "2024-02-10T09:10:00.000Z",
          updatedAt: "2024-02-10T09:10:00.000Z",
          likes: 34,
          comments: [],
        },
        {
          id: "a1b2c3d4-e003-0000-0000-000000000003",
          title: "Understanding React Hooks",
          excerpt: "A friendly guide to using hooks effectively in React apps.",
          content:
            "<h2>Hooks</h2><p>useState, useEffect, custom hooks and patterns.</p>",
          category: "Development",
          author: "Sam",
          createdAt: "2024-03-05T12:30:00.000Z",
          updatedAt: "2024-03-05T12:30:00.000Z",
          likes: 27,
          comments: [],
        },
        {
          id: "a1b2c3d4-e004-0000-0000-000000000004",
          title: "Writing accessible components",
          excerpt: "Accessibility considerations when building UI components.",
          content:
            "<h2>Accessibility</h2><p>Make your components usable by more people.</p>",
          category: "Accessibility",
          author: "Alex",
          createdAt: "2024-03-22T07:45:00.000Z",
          updatedAt: "2024-03-22T07:45:00.000Z",
          likes: 8,
          comments: [],
        },
        {
          id: "a1b2c3d4-e005-0000-0000-000000000005",
          title: "Deploying Vite apps",
          excerpt: "A step-by-step guide to deploying Vite-built applications.",
          content:
            "<h2>Deploy</h2><p>Build and deploy strategies for Vite apps.</p>",
          category: "DevOps",
          author: "Maya",
          createdAt: "2024-04-02T14:00:00.000Z",
          updatedAt: "2024-04-02T14:00:00.000Z",
          likes: 19,
          comments: [],
        },
        {
          id: "a1b2c3d4-e006-0000-0000-000000000006",
          title: "Writing great documentation",
          excerpt: "How to write clear docs that your team will read.",
          content:
            "<h2>Docs</h2><p>Organizing docs, examples and keeping them up to date.</p>",
          category: "Writing",
          author: "Dana",
          createdAt: "2024-04-20T09:00:00.000Z",
          updatedAt: "2024-04-20T09:00:00.000Z",
          likes: 5,
          comments: [],
        },
        {
          id: "a1b2c3d4-e007-0000-0000-000000000007",
          title: "State management patterns",
          excerpt: "Comparing popular state management approaches for React.",
          content:
            "<h2>State</h2><p>Context, Redux, Zustand, and when to use them.</p>",
          category: "Development",
          author: "Sam",
          createdAt: "2024-05-01T11:20:00.000Z",
          updatedAt: "2024-05-01T11:20:00.000Z",
          likes: 21,
          comments: [],
        },
        {
          id: "a1b2c3d4-e008-0000-0000-000000000008",
          title: "SEO basics for blogs",
          excerpt: "Quick wins to make your posts more discoverable.",
          content:
            "<h2>SEO</h2><p>Title tags, meta, headings, and semantic HTML.</p>",
          category: "Marketing",
          author: "Lina",
          createdAt: "2024-05-12T08:00:00.000Z",
          updatedAt: "2024-05-12T08:00:00.000Z",
          likes: 11,
          comments: [],
        },
        {
          id: "a1b2c3d4-e009-0000-0000-000000000009",
          title: "Using TinyMCE in React",
          excerpt: "Integrating the TinyMCE editor into your React forms.",
          content: "<h2>TinyMCE</h2><p>Configuration and helpful plugins.</p>",
          category: "Tools",
          author: "Rajat",
          createdAt: "2024-06-01T10:00:00.000Z",
          updatedAt: "2024-06-01T10:00:00.000Z",
          likes: 14,
          comments: [],
        },
        {
          id: "a1b2c3d4-e010-0000-0000-000000000010",
          title: "Design tokens: a practical guide",
          excerpt: "A short introduction to using design tokens in projects.",
          content:
            "<h2>Design tokens</h2><p>Benefits and how to structure them.</p>",
          category: "Design",
          author: "Rajat",
          createdAt: "2024-06-20T13:30:00.000Z",
          updatedAt: "2024-06-20T13:30:00.000Z",
          likes: 6,
          comments: [],
        },
        {
          id: "a1b2c3d4-e011-0000-0000-000000000011",
          title: "Testing React components",
          excerpt: "Write tests that give confidence, not just coverage.",
          content:
            "<h2>Testing</h2><p>Jest, React Testing Library, and practical tips.</p>",
          category: "Testing",
          author: "Dana",
          createdAt: "2024-07-01T09:00:00.000Z",
          updatedAt: "2024-07-01T09:00:00.000Z",
          likes: 9,
          comments: [],
        },
        {
          id: "a1b2c3d4-e012-0000-0000-000000000012",
          title: "Performance tuning for React",
          excerpt: "Small changes that yield big performance wins.",
          content:
            "<h2>Performance</h2><p>Memoization, virtualization and code-splitting.</p>",
          category: "Performance",
          author: "Alex",
          createdAt: "2024-07-15T12:00:00.000Z",
          updatedAt: "2024-07-15T12:00:00.000Z",
          likes: 16,
          comments: [],
        },
        {
          id: "a1b2c3d4-e013-0000-0000-000000000013",
          title: "CSS Grid in practice",
          excerpt: "Layout recipes using CSS Grid for responsive UIs.",
          content: "<h2>Grid</h2><p>Patterns for common layout problems.</p>",
          category: "Design",
          author: "Lina",
          createdAt: "2024-08-01T14:30:00.000Z",
          updatedAt: "2024-08-01T14:30:00.000Z",
          likes: 7,
          comments: [],
        },
        {
          id: "a1b2c3d4-e014-0000-0000-000000000014",
          title: "GraphQL vs REST: choosing an API",
          excerpt: "Pros and cons when picking between GraphQL and REST.",
          content:
            "<h2>APIs</h2><p>When GraphQL helps and when REST is simpler.</p>",
          category: "API",
          author: "Maya",
          createdAt: "2024-09-01T10:00:00.000Z",
          updatedAt: "2024-09-01T10:00:00.000Z",
          likes: 10,
          comments: [],
        },
        {
          id: "a1b2c3d4-e015-0000-0000-000000000015",
          title: "Serverless functions for blogs",
          excerpt: "Using serverless endpoints to power blog features.",
          content:
            "<h2>Serverless</h2><p>Examples with Netlify, Vercel and AWS Lambda.</p>",
          category: "DevOps",
          author: "Rajat",
          createdAt: "2024-09-20T09:15:00.000Z",
          updatedAt: "2024-09-20T09:15:00.000Z",
          likes: 4,
          comments: [],
        },
        {
          id: "a1b2c3d4-e016-0000-0000-000000000016",
          title: "Microinteractions that delight",
          excerpt: "Small animations and microinteractions that improve UX.",
          content:
            "<h2>Microinteractions</h2><p>When and how to add subtle motion.</p>",
          category: "Design",
          author: "Sam",
          createdAt: "2024-10-01T08:00:00.000Z",
          updatedAt: "2024-10-01T08:00:00.000Z",
          likes: 13,
          comments: [],
        },
        {
          id: "a1b2c3d4-e017-0000-0000-000000000017",
          title: "Content planning for bloggers",
          excerpt: "How to plan and schedule content that readers love.",
          content:
            "<h2>Planning</h2><p>Editorial calendars and content batching techniques.</p>",
          category: "Writing",
          author: "Dana",
          createdAt: "2024-10-12T11:00:00.000Z",
          updatedAt: "2024-10-12T11:00:00.000Z",
          likes: 3,
          comments: [],
        },
        {
          id: "a1b2c3d4-e018-0000-0000-000000000018",
          title: "Monitoring your production site",
          excerpt: "Tools and metrics to keep an eye on site health.",
          content:
            "<h2>Monitoring</h2><p>Setting up alerts, SLOs and basic observability.</p>",
          category: "DevOps",
          author: "Maya",
          createdAt: "2024-11-01T07:30:00.000Z",
          updatedAt: "2024-11-01T07:30:00.000Z",
          likes: 2,
          comments: [],
        },
        {
          id: "a1b2c3d4-e019-0000-0000-000000000019",
          title: "Optimizing images for the web",
          excerpt:
            "Practical steps to reduce image weight without losing quality.",
          content:
            "<h2>Images</h2><p>Responsive images, formats and lazy-loading.</p>",
          category: "Performance",
          author: "Alex",
          createdAt: "2024-11-12T09:00:00.000Z",
          updatedAt: "2024-11-12T09:00:00.000Z",
          likes: 1,
          comments: [],
        },
        {
          id: "a1b2c3d4-e020-0000-0000-000000000020",
          title: "Community building for creators",
          excerpt:
            "Strategies to grow and retain an audience around your content.",
          content:
            "<h2>Community</h2><p>Newsletters, socials and engagement tactics.</p>",
          category: "Marketing",
          author: "Lina",
          createdAt: "2024-12-01T10:00:00.000Z",
          updatedAt: "2024-12-01T10:00:00.000Z",
          likes: 0,
          comments: [],
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
    }
  } catch {
    // ignore
  }
})();

function save(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  try {
    bc.postMessage({ type: "update", posts });
  } catch {
    // ignore
  }
}

const bc =
  typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel(CHANNEL_NAME)
    : { postMessage: () => {}, onmessage: null };

const subscribers = new Set();
if (bc && bc.addEventListener) {
  bc.addEventListener("message", (ev) => {
    if (ev.data && ev.data.type === "update") {
      subscribers.forEach((fn) => fn(ev.data.posts));
    }
  });
}

export const api = {
  subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },
  list({ page = 1, perPage = 5, search = "", category = "" } = {}) {
    const all = load();
    let filtered = all.slice().reverse(); // newest first
    if (search) {
      // Use Fuse.js for fuzzy full-text search and relevance ranking
      const fuse = new Fuse(filtered, {
        keys: [
          { name: "title", weight: 0.6 },
          { name: "excerpt", weight: 0.2 },
          { name: "content", weight: 0.1 },
          { name: "category", weight: 0.05 },
          { name: "author", weight: 0.05 },
        ],
        includeScore: true,
        threshold: 0.4,
        ignoreLocation: true,
      });
      const results = fuse.search(search);
      filtered = results.map((r) => r.item);
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    const total = filtered.length;
    const start = (page - 1) * perPage;
    const items = filtered.slice(start, start + perPage);
    return Promise.resolve({ items, total });
  },
  get(id) {
    const all = load();
    const found = all.find((p) => p.id === id);
    return Promise.resolve(found || null);
  },
  create({
    title,
    content,
    excerpt = "",
    category = "General",
    author = "Anonymous",
  }) {
    const all = load();
    const post = {
      id: uuidv4(),
      title,
      content,
      excerpt,
      category,
      author,
      createdAt: now(),
      updatedAt: now(),
      likes: 0,
      comments: [],
    };
    all.push(post);
    save(all);
    return Promise.resolve(post);
  },
  update(id, patch) {
    const all = load();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve(null);
    all[idx] = { ...all[idx], ...patch, updatedAt: now() };
    save(all);
    return Promise.resolve(all[idx]);
  },
  remove(id) {
    let all = load();
    all = all.filter((p) => p.id !== id);
    save(all);
    return Promise.resolve(true);
  },
  like(id) {
    const all = load();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve(null);
    all[idx].likes = (all[idx].likes || 0) + 1;
    save(all);
    return Promise.resolve(all[idx].likes);
  },
  addComment(id, { author = "Anon", text }) {
    const all = load();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve(null);
    const comment = { id: uuidv4(), author, text, createdAt: now() };
    all[idx].comments = all[idx].comments || [];
    all[idx].comments.push(comment);
    save(all);
    return Promise.resolve(comment);
  },
};
