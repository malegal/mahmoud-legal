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
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const files = await res.json();
    // التأكد من أن الملفات موجودة وهي من نوع Markdown
    if (!Array.isArray(files)) return [];
    return files.filter(f => f.name && f.name.endsWith('.md'));
  } catch (error) {
    console.error(`خطأ في جلب الملفات من ${folder}:`, error);
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
        } catch (err) {
          console.error(`خطأ في قراءة المقال ${file.name}:`, err);
          return null;
        }
      })
    );
    return articles
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('خطأ في جلب المقالات:', error);
    return [];
  }
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
  } catch (error) {
    console.error(`خطأ في جلب المقال ${slug}:`, error);
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
        } catch (err) {
          console.error(`خطأ في قراءة الخبر ${file.name}:`, err);
          return null;
        }
      })
    );
    return newsItems
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('خطأ في جلب الأخبار:', error);
    return [];
  }
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
  } catch (error) {
    console.error(`خطأ في جلب الخبر ${slug}:`, error);
    return null;
  }
}
