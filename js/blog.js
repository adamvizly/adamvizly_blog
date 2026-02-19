const POSTS_INDEX = '/posts/index.json';

async function loadPosts() {
  try {
    const res = await fetch(POSTS_INDEX);
    if (!res.ok) throw new Error('Failed to load posts index');
    return await res.json();
  } catch {
    return [];
  }
}

/* ── Blog Listing ────────────────────────────────────────── */
async function renderBlogList() {
  const container = document.getElementById('blog-list');
  if (!container) return;

  const posts = await loadPosts();

  if (posts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">&gt;_</div>
        <p>No posts yet. Stay tuned — writing is in progress.</p>
      </div>`;
    return;
  }

  const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = sorted
    .map(
      (post) => `
    <a href="/post.html?slug=${post.slug}" class="blog-card">
      <div class="blog-card-date">${formatDate(post.date)}</div>
      <div class="blog-card-title">${escapeHtml(post.title)}</div>
      <div class="blog-card-desc">${escapeHtml(post.description)}</div>
      ${
        post.tags
          ? `<div class="blog-card-tags">${post.tags.map((t) => `<span class="blog-tag">${escapeHtml(t)}</span>`).join('')}</div>`
          : ''
      }
    </a>`
    )
    .join('');
}

/* ── Blog Post ───────────────────────────────────────────── */
async function renderBlogPost() {
  const titleEl = document.getElementById('post-title');
  const metaEl = document.getElementById('post-meta');
  const contentEl = document.getElementById('post-content');
  if (!titleEl || !contentEl) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    contentEl.innerHTML = '<p>Post not found.</p>';
    return;
  }

  const posts = await loadPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    contentEl.innerHTML = '<p>Post not found.</p>';
    return;
  }

  titleEl.textContent = post.title;
  metaEl.textContent = `${formatDate(post.date)} · ${post.readTime || '5 min read'}`;
  document.title = `${post.title} — Ali Asghari`;

  try {
    const res = await fetch(`/posts/${slug}.md`);
    if (!res.ok) throw new Error();
    const md = await res.text();

    if (typeof marked !== 'undefined') {
      contentEl.innerHTML = marked.parse(md);
    } else {
      contentEl.innerHTML = `<pre>${escapeHtml(md)}</pre>`;
    }
  } catch {
    contentEl.innerHTML = '<p>Failed to load post content.</p>';
  }
}

/* ── Helpers ─────────────────────────────────────────────── */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
