import matter from 'gray-matter';

const REPO_OWNER = 'malegal';
const REPO_NAME = 'mahmoud-legal';
const BRANCH = 'main';

async function fetchFileContent(path) {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`فشل جلب الملف: ${path}`);
  return res.text();
}

async function getFilesInFolder(folder) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${folder}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const files = await res.json();
  return files.filter(f => f.name.endsWith('.md'));
}

export async function getAllArticles() {
  const files = await getFilesInFolder('blog/articles');
  const articles = await Promise.all(
    files.map(async (file) => {
      const content = await fetchFileContent(file.path);
      const { data } = matter(content);
      return {
        slug: file.name.replace(/\.md$/, ''),
              title: data.title || 'بدون عنوان',
              date: data.date || '',
              author: data.author || '',
              description: data.description || '',
              seoKeyword: data.seoKeyword || '',
              tags: data.tags || '',
              image: data.image || '',
              content: content,
      };
    })
  );
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getArticleBySlug(slug) {
  const content = await fetchFileContent(`blog/articles/${slug}.md`);
  const { data, content: markdown } = matter(content);
  return {
    slug,
    title: data.title || 'بدون عنوان',
    date: data.date || '',
    author: data.author || '',
    description: data.description || '',
    seoKeyword: data.seoKeyword || '',
    tags: data.tags || '',
    image: data.image || '',
    content: markdown,
  };
}

export async function getAllNews() {
  const files = await getFilesInFolder('blog/news');
  const newsItems = await Promise.all(
    files.map(async (file) => {
      const content = await fetchFileContent(file.path);
      const { data } = matter(content);
      return {
        slug: file.name.replace(/\.md$/, ''),
              title: data.title || 'بدون عنوان',
              date: data.date || '',
              description: data.description || '',
              category: data.category || 'خبر',
              icon: data.icon || 'fa-newspaper',
              tags: data.tags || '',
              image: data.image || '',
              content: content,
      };
    })
  );
  return newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getNewsBySlug(slug) {
  const content = await fetchFileContent(`blog/news/${slug}.md`);
  const { data, content: markdown } = matter(content);
  return {
    slug,
    title: data.title || 'بدون عنوان',
    date: data.date || '',
    description: data.description || '',
    category: data.category || 'خبر',
    icon: data.icon || 'fa-newspaper',
    tags: data.tags || '',
    image: data.image || '',
    content: markdown,
  };
}
