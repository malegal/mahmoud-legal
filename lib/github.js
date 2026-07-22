import matter from 'gray-matter';

const REPO_OWNER = 'malegal';
const REPO_NAME = 'mahmoud-legal';
const BRANCH = 'main';

// ذاكرة مؤقتة بسيطة
const cache = new Map();

async function fetchFileContent(path) {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`فشل جلب الملف: ${path}`);
  return res.text();
}

async function getFilesInFolder(folder) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${folder}`;
  const res = await fetch(url);
  if (!res.ok) return []; // إذا لم يوجد المجلد، نعيد مصفوفة فارغة بدلاً من خطأ
  const files = await res.json();
  return files.filter(f => f.name.endsWith('.md'));
}

export async function getAllArticles() {
  const cacheKey = 'articles';
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const files = await getFilesInFolder('blog/articles');
  if (files.length === 0) {
    cache.set(cacheKey, []);
    return [];
  }

  const articles = await Promise.all(
    files.map(async (file) => {
      try {
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
      } catch (e) {
        console.error(`خطأ في تحميل المقال ${file.name}:`, e);
        return null;
      }
    })
  );

  const validArticles = articles.filter(Boolean);
  const sorted = validArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
  cache.set(cacheKey, sorted);
  return sorted;
}

export async function getArticleBySlug(slug) {
  try {
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
  } catch (e) {
    return null;
  }
}

export async function getAllNews() {
  const cacheKey = 'news';
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const files = await getFilesInFolder('blog/news');
  if (files.length === 0) {
    cache.set(cacheKey, []);
    return [];
  }

  const newsItems = await Promise.all(
    files.map(async (file) => {
      try {
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
      } catch (e) {
        console.error(`خطأ في تحميل الخبر ${file.name}:`, e);
        return null;
      }
    })
  );

  const validNews = newsItems.filter(Boolean);
  const sorted = validNews.sort((a, b) => new Date(b.date) - new Date(a.date));
  cache.set(cacheKey, sorted);
  return sorted;
}

export async function getNewsBySlug(slug) {
  try {
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
  } catch (e) {
    return null;
  }
}
