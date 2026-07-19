import matter from 'gray-matter';

const REPO_OWNER = 'malegal';
const REPO_NAME = 'mahmoud-legal';
const BRANCH = 'main';

async function fetchFileContent(path) {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`فشل جلب الملف: ${path} (${res.status})`);
      return null;
    }
    return res.text();
  } catch (error) {
    console.warn(`خطأ في جلب الملف: ${path}`, error);
    return null;
  }
}

async function getFilesInFolder(folder) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${folder}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`فشل جلب المجلد: ${folder} (${res.status})`);
      return [];
    }
    const files = await res.json();
    if (!Array.isArray(files)) return [];
    return files.filter(f => f.name && f.name.endsWith('.md'));
  } catch (error) {
    console.warn(`خطأ في جلب المجلد: ${folder}`, error);
    return [];
  }
}

export async function getAllArticles() {
  try {
    const files = await getFilesInFolder('blog/articles');
    const articles = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await fetchFileContent(file.path);
          if (!content) return null;
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
        } catch {
          return null;
        }
      })
    );
    return articles.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug) {
  try {
    const content = await fetchFileContent(`blog/articles/${slug}.md`);
    if (!content) return null;
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
  } catch {
    return null;
  }
}

export async function getAllNews() {
  try {
    const files = await getFilesInFolder('blog/news');
    const newsItems = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await fetchFileContent(file.path);
          if (!content) return null;
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
        } catch {
          return null;
        }
      })
    );
    return newsItems.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug) {
  try {
    const content = await fetchFileContent(`blog/news/${slug}.md`);
    if (!content) return null;
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
  } catch {
    return null;
  }
}
