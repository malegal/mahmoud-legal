import matter from 'gray-matter';

const GITHUB_OWNER = 'malegal';
const GITHUB_REPO = 'mahmoud-legal';
const BRANCH = 'main';

// دالة مساعدة لتنظيف الأسماء وتجنب مشاكل اللغات غير اللاتينية
function safeSlug(fileName) {
  return fileName.replace('.md', '');
}

/**
 * جلب جميع الملفات بصيغة Markdown من مسار محدد في المستودع
 */
export async function getFilesFromGitHub(path) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${BRANCH}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'NextJS-Static-Exporter',
      },
    });
    if (!res.ok) {
      console.warn(`⚠️ لم يتمكن من جلب الملفات من مسار: ${path} (الحالة: ${res.status})`);
      return [];
    }
    const files = await res.json();
    return Array.isArray(files) ? files.filter(f => f.name.endsWith('.md')) : [];
  } catch (error) {
    console.error(`❌ خطأ في الاتصال بمستودع GitHub للمسار ${path}:`, error);
    return [];
  }
}

/**
 * جلب محتوى ملف واحد وتحليله
 */
export async function getFileData(path, fileName) {
  const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${BRANCH}/${path}/${fileName}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();

    // تحليل Front Matter والمحتوى
    const { data, content } = matter(text);

    // تهيئة البيانات الافتراضية
    const slug = safeSlug(fileName);
    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date ? String(data.date) : '2026-07-20',
      author: data.author || 'الأستاذ / محمود عبد الحميد',
      description: data.description || '',
      seoKeyword: data.seoKeyword || '',
      tags: data.tags ? String(data.tags).split(',').map(t => t.trim()) : [],
      image: data.image || '',
      content: content || '',
    };
  } catch (error) {
    console.error(`❌ خطأ في جلب بيانات الملف ${fileName}:`, error);
    return null;
  }
}

/**
 * جلب وتجهيز كافة المقالات مرتبة تنازلياً حسب التاريخ
 */
export async function getAllArticles() {
  const files = await getFilesFromGitHub('blog/articles');
  const articles = [];
  for (const file of files) {
    const data = await getFileData('blog/articles', file.name);
    if (data) articles.push(data);
  }
  // الترتيب: الأحدث أولاً
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * جلب وتجهيز كافة الأخبار مرتبة تنازلياً حسب التاريخ
 */
export async function getAllNews() {
  const files = await getFilesFromGitHub('blog/news');
  const newsList = [];
  for (const file of files) {
    const data = await getFileData('blog/news', file.name);
    if (data) newsList.push(data);
  }
  return newsList.sort((a, b) => new Date(b.date) - new Date(a.date));
}
