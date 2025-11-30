// Lightweight in-memory/serialized schema helpers for the demo app.
// Defines data shapes and helper functions for relations and queries.

// Note: This file doesn't enforce types at runtime. It's a central place to
// document the model fields and provide safe helpers for querying/updating
// when using the mock API (localStorage) or a future backend.

export const Models = {
  User: {
    // id: string (uuid)
    // username: string
    // email: string
    // passwordHash: string (store hashed password in real apps)
    // profile: { displayName?, bio?, avatarUrl? }
    name: "User",
    fields: ["id", "username", "email", "passwordHash", "profile"],
  },

  BlogPost: {
    // id: string
    // title: string
    // slug: string (url-friendly)
    // authorId: string -> User.id
    // content: string (HTML or markdown)
    // excerpt: string
    // categoryIds: string[] -> Category.id
    // tagIds: string[] -> Tag.id (optional)
    // likeCount: number
    // commentCount: number
    // createdAt, updatedAt: ISO strings
    name: "BlogPost",
    fields: [
      "id",
      "title",
      "slug",
      "authorId",
      "content",
      "excerpt",
      "categoryIds",
      "tagIds",
      "likeCount",
      "commentCount",
      "createdAt",
      "updatedAt",
    ],
  },

  Comment: {
    // id: string
    // postId: string -> BlogPost.id
    // authorId: string -> User.id
    // content: string
    // createdAt, updatedAt: ISO strings
    name: "Comment",
    fields: ["id", "postId", "authorId", "content", "createdAt", "updatedAt"],
  },

  Category: {
    // id: string
    // name: string
    // slug?: string
    name: "Category",
    fields: ["id", "name", "slug"],
  },

  Like: {
    // userId: string
    // postId: string
    // createdAt: ISO string
    name: "Like",
    fields: ["userId", "postId", "createdAt"],
  },
};

// Helper functions to navigate relations in a plain JS dataset (arrays of objects)
export const helpers = {
  // Find posts by author id
  postsByAuthor(posts = [], authorId) {
    if (!authorId) return [];
    return posts.filter((p) => p.authorId === authorId);
  },

  // Find posts by category id
  postsByCategory(posts = [], categoryId) {
    if (!categoryId) return [];
    return posts.filter(
      (p) => Array.isArray(p.categoryIds) && p.categoryIds.includes(categoryId)
    );
  },

  // Attach related data to a post (author object, categories array, comments array)
  async hydratePost(post, { users = [], categories = [], comments = [] } = {}) {
    if (!post) return null;
    const author = users.find((u) => u.id === post.authorId) || null;
    const postCategories = (post.categoryIds || [])
      .map((cid) => categories.find((c) => c.id === cid))
      .filter(Boolean);
    const postComments = comments.filter((c) => c.postId === post.id);
    return {
      ...post,
      author,
      categories: postCategories,
      comments: postComments,
    };
  },

  // Return counts for a post (likes/comments) from datasets
  countsForPost(postId, { likes = [], comments = [] } = {}) {
    const likeCount = likes.filter((l) => l.postId === postId).length;
    const commentCount = comments.filter((c) => c.postId === postId).length;
    return { likeCount, commentCount };
  },

  // Build a slug from a title
  slugify(title = "") {
    return String(title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },
};

// Simple relational update helpers for counts
export function incrementPostLikeCount(posts, postId) {
  const idx = posts.findIndex((p) => p.id === postId);
  if (idx === -1) return posts;
  const copy = posts.slice();
  copy[idx] = {
    ...copy[idx],
    likeCount: (copy[idx].likeCount || 0) + 1,
    updatedAt: new Date().toISOString(),
  };
  return copy;
}

export function incrementPostCommentCount(posts, postId) {
  const idx = posts.findIndex((p) => p.id === postId);
  if (idx === -1) return posts;
  const copy = posts.slice();
  copy[idx] = {
    ...copy[idx],
    commentCount: (copy[idx].commentCount || 0) + 1,
    updatedAt: new Date().toISOString(),
  };
  return copy;
}

export default Models;
