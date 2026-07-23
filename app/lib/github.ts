const OWNER = 'malegal';
const REPO = 'mahmoud-legal';
const BRANCH = 'main';

interface FileData {
  name: string;
  download_url: string;
  type: 'file' | 'dir';
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  image?: string;
  date?: string;
  author?: string;
  seoKeyword?: string;
  tags?: string[];
}

export interface NewsMeta extends ArticleMeta {
  category?: string;
  icon?: string;
}

function extractFrontMatter(content: string): { meta: any; body: string } {
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return { meta: {}, body: content };
  const front = match[1];
  const body = content.replace(/^---\s*[\s\S]*?\s*---/, '');
  const meta: any = {};
  front.split('\n').forEach((line) => {
    const [key, ...val] = line.split(':');
    if (key && val.length) meta[key.trim()] = val.join(':').replace(/['"]/g, '').trim();
  });
  return { meta, body };
}

// دالة آمنة: تعيد مصفوفة فارغة في أي خطأ (404 أو غيره)
async function fetchFilesSafe(path: string): Promise<FileData[]> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'OSTAZ-LAW' } });
    if (!res.ok) {
      // أي خطأ (404 أو غيره) نعتبره عدم وجود ملفات
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data;
  } catch {
    return [];
  }
}

async function fetchFileContentSafe(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) return '';
    return await res.text();
  } catch {
    return '';
  }
}

export async function getArticles(): Promise<ArticleMeta[]> {
  const files = await fetchFilesSafe('blog/articles');
  const mdFiles = files.filter((f) => f.type === 'file' && f.name.endsWith('.md'));
  const results: ArticleMeta[] = [];
  for (const file of mdFiles) {
    const content = await fetchFileContentSafe(file.download_url);
    if (!content) continue;
    const { meta } = extractFrontMatter(content);
    results.push({
      slug: file.name.replace('.md', ''),
      title: meta.title || file.name.replace('.md', '').replace(/-/g, ' '),
      description: meta.description || '',
      image: meta.image,
      date: meta.date,
      author: meta.author,
      seoKeyword: meta.seoKeyword,
      tags: meta.tags ? meta.tags.split(',').map((t: string) => t.trim()) : [],
    });
  }
  results.sort((a, b) => (b.date && a.date ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0));
  return results;
}

export async function getArticle(slug: string): Promise<{ meta: ArticleMeta; content: string } | null> {
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/blog/articles/${slug}.md`;
  const content = await fetchFileContentSafe(url);
  if (!content) return null;
  const { meta, body } = extractFrontMatter(content);
  return {
    meta: {
      slug,
      title: meta.title || slug.replace(/-/g, ' '),
      description: meta.description || '',
      image: meta.image,
      date: meta.date,
      author: meta.author,
      seoKeyword: meta.seoKeyword,
      tags: meta.tags ? meta.tags.split(',').map((t: string) => t.trim()) : [],
    },
    content: body,
  };
}

export async function getNews(): Promise<NewsMeta[]> {
  const files = await fetchFilesSafe('blog/news');
  const mdFiles = files.filter((f) => f.type === 'file' && f.name.endsWith('.md'));
  const results: NewsMeta[] = [];
  for (const file of mdFiles) {
    const content = await fetchFileContentSafe(file.download_url);
    if (!content) continue;
    const { meta } = extractFrontMatter(content);
    results.push({
      slug: file.name.replace('.md', ''),
      title: meta.title || file.name.replace('.md', '').replace(/-/g, ' '),
      description: meta.description || '',
      image: meta.image,
      date: meta.date,
      category: meta.category || 'خبر',
      icon: meta.icon || 'fa-newspaper',
    });
  }
  results.sort((a, b) => (b.date && a.date ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0));
  return results;
}

export async function getNewsItem(slug: string): Promise<{ meta: NewsMeta; content: string } | null> {
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/blog/news/${slug}.md`;
  const content = await fetchFileContentSafe(url);
  if (!content) return null;
  const { meta, body } = extractFrontMatter(content);
  return {
    meta: {
      slug,
      title: meta.title || slug.replace(/-/g, ' '),
      description: meta.description || '',
      image: meta.image,
      date: meta.date,
      category: meta.category || 'خبر',
      icon: meta.icon || 'fa-newspaper',
    },
    content: body,
  };
}
