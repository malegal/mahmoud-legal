const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// ============================================================
// ✅ البيانات الحقيقية لمشروعك (تم تعبئتها بالفعل)
// ============================================================
const GITHUB_OWNER = 'malegal';
const GITHUB_REPO = 'mahmoud-legal';
const BRANCH = 'main';
const BLOG_PATH = 'blog/articles';   // مسار المقالات
const NEWS_PATH = 'blog/news';       // 🆕 مسار الأخبار
// ============================================================

/**
 * جلب قائمة الملفات من مسار معين في GitHub
 */
async function fetchFilesFromPath(path) {
    const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${BRANCH}`;
    const response = await fetch(apiUrl, {
        headers: { 'User-Agent': 'Vercel-Build-Script' }
    });
    if (!response.ok) {
        throw new Error(`فشل الاتصال بـ GitHub API (الحالة: ${response.status}) للمسار: ${path}`);
    }
    return await response.json();
}

/**
 * قراءة محتوى ملف Markdown واستخراج البيانات
 */
async function parseMarkdownFile(file) {
    const slug = file.name.replace('.md', '');
    let title = slug.replace(/-/g, ' ');
    let imageUrl = '';
    let description = '';
    let category = 'خبر';
    let categoryType = 'gold';
    let icon = 'fa-newspaper';
    let link = '#';
    let date = '';

    try {
        const contentRes = await fetch(file.download_url);
        const content = await contentRes.text();

        // استخراج Front Matter
        const yamlMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
        if (yamlMatch) {
            const frontMatter = yamlMatch[1];
            const titleMatch = frontMatter.match(/title:\s*(.*)/i);
            if (titleMatch) title = titleMatch[1].replace(/['"]/g, '').trim();

            const imageMatch = frontMatter.match(/image:\s*(.*)/i);
            if (imageMatch) imageUrl = imageMatch[1].replace(/['"]/g, '').trim();

            const descMatch = frontMatter.match(/description:\s*(.*)/i);
            if (descMatch) description = descMatch[1].replace(/['"]/g, '').trim();

            const categoryMatch = frontMatter.match(/category:\s*(.*)/i);
            if (categoryMatch) category = categoryMatch[1].replace(/['"]/g, '').trim();

            const typeMatch = frontMatter.match(/categoryType:\s*(.*)/i);
            if (typeMatch) categoryType = typeMatch[1].replace(/['"]/g, '').trim();

            const iconMatch = frontMatter.match(/icon:\s*(.*)/i);
            if (iconMatch) icon = iconMatch[1].replace(/['"]/g, '').trim();

            const linkMatch = frontMatter.match(/link:\s*(.*)/i);
            if (linkMatch) link = linkMatch[1].replace(/['"]/g, '').trim();

            const dateMatch = frontMatter.match(/date:\s*(.*)/i);
            if (dateMatch) date = dateMatch[1].replace(/['"]/g, '').trim();
        }
    } catch (e) {
        console.warn(`⚠️ تعذر قراءة البيانات من ${file.name}`);
    }

    return { slug, title, imageUrl, description, category, categoryType, icon, link, date };
}

/**
 * توليد كارت HTML لعنصر (مقال أو خبر)
 */
function generateCard(item, type = 'article') {
    const isNews = (type === 'news');
    const imageStyle = item.imageUrl
        ? `background-image: url('${item.imageUrl}'); background-size: cover; background-position: center;`
        : 'background: var(--light-gray); display: flex; align-items: center; justify-content: center; color: rgba(34,34,34,0.15); font-size: 1.5rem;';

    if (isNews) {
        // 🆕 كارت الخبر مع شارة الفئة والأيقونة
        const badgeColors = {
            gold: 'background:var(--matte-gold); color:#000;',
            navy: 'background:var(--deep-navy); color:#fff;',
            dark: 'background:var(--very-dark-navy); color:#fff;'
        };
        const badgeStyle = badgeColors[item.categoryType] || badgeColors.gold;

        return `
            <div class="sector-link" onclick="location.href='${item.link}'">
                <div class="experience-card reveal" style="text-align:right; position:relative;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                        <span style="${badgeStyle} padding:0.1rem 0.8rem; border-radius:20px; font-size:0.6rem; font-weight:800;">${item.category}</span>
                        <span style="font-size:0.7rem; color:var(--text-secondary);">${item.date}</span>
                    </div>
                    <span class="icon"><i class="fas ${item.icon}" style="font-size:1.5rem;"></i></span>
                    <h4>${item.title}</h4>
                    <p>${item.description || ''}</p>
                    <span style="color:var(--matte-gold); font-weight:700; font-size:0.8rem; margin-top:0.5rem; display:inline-block; border-bottom:1px solid transparent; transition:0.3s;">اقرأ التفاصيل →</span>
                </div>
            </div>
        `;
    } else {
        // المقالات (نفس الكود الموجود)
        return `
            <div class="blog-card reveal">
                <div class="image" style="${imageStyle}">
                    ${!item.imageUrl ? '⚖️' : ''}
                </div>
                <div class="content">
                    <div class="meta">
                        <span>${Math.ceil(item.title.length / 50) || 1} دقائق قراءة</span>
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.description || 'تحليل قانوني متخصص في مجال القانون المصري.'}</p>
                    <a href="article.html?slug=${encodeURIComponent(item.slug)}" class="read-more">اقرأ المقال ←</a>
                </div>
            </div>
        `;
    }
}

async function buildSite() {
    try {
        console.log('🚀 جاري بناء الموقع وجلب أحدث المحتويات من GitHub...');

        // ---------- 1. جلب المقالات ----------
        const articlesFiles = await fetchFilesFromPath(BLOG_PATH);
        const articlesMd = articlesFiles
            .filter(file => file.type === 'file' && file.name.endsWith('.md'))
            .reverse()          // الأحدث أولاً
            .slice(0, 3);       // آخر 3 مقالات

        let articlesHtml = '';
        if (articlesMd.length === 0) {
            articlesHtml = `<div class="col-span-full text-center text-charcoal/50 py-10">لا توجد مقالات حالياً.</div>`;
        } else {
            for (const file of articlesMd) {
                const data = await parseMarkdownFile(file);
                articlesHtml += generateCard(data, 'article');
            }
        }

        // ---------- 2. جلب الأخبار ----------
        const newsFiles = await fetchFilesFromPath(NEWS_PATH);
        const newsMd = newsFiles
            .filter(file => file.type === 'file' && file.name.endsWith('.md'))
            .reverse()          // الأحدث أولاً
            .slice(0, 3);       // آخر 3 أخبار

        let newsHtml = '';
        if (newsMd.length === 0) {
            newsHtml = `<div class="col-span-full text-center text-charcoal/50 py-10">لا توجد أخبار حالياً.</div>`;
        } else {
            for (const file of newsMd) {
                const data = await parseMarkdownFile(file);
                newsHtml += generateCard(data, 'news');
            }
        }

        // ---------- 3. قراءة قالب الصفحة ----------
        const templatePath = path.join(__dirname, 'template.html');
        if (!fs.existsSync(templatePath)) {
            throw new Error('الملف template.html غير موجود في المجلد!');
        }
        let template = fs.readFileSync(templatePath, 'utf8');

        // ---------- 4. استبدال العناصر النائبة ----------
        const finalHtml = template
            .replace('<!-- ARTICLES_PLACEHOLDER -->', articlesHtml)
            .replace('<!-- NEWS_PLACEHOLDER -->', newsHtml);

        // ---------- 5. كتابة الملف النهائي ----------
        fs.writeFileSync(path.join(__dirname, 'index.html'), finalHtml);
        console.log(`✅ تم إنشاء index.html بنجاح مع ${articlesMd.length} مقالة و ${newsMd.length} خبر!`);

    } catch (error) {
        console.error('❌ فشلت عملية البناء:', error.message);
        process.exit(1);
    }
}

buildSite();
