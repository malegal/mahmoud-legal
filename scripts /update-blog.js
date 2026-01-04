#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// إعدادات المسارات الصحيحة
const BLOG_DIR = path.join(__dirname, '../blog/articles'); // تم التصحيح هنا
const DATA_DIR = path.join(__dirname, '../blog/data'); // تم التصحيح هنا
const INDEX_FILE = path.join(DATA_DIR, 'articles.json'); // تم التصحيح هنا
const IMAGES_DIR = path.join(__dirname, '../blog/images');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

console.log('🚀 بدء تحديث فهرس المدونة...');
console.log('📁 المسارات:');
console.log('   مقالات:', BLOG_DIR);
console.log('   بيانات:', DATA_DIR);
console.log('   صور:', IMAGES_DIR);

// دالة لاستخراج البيانات من ملف .md بالشكل المتوافق مع المدونة
function extractMetadata(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const filename = path.basename(filePath, '.md');
        const slug = filename;
        
        console.log(`   📄 معالجة: ${filename}`);
        
        // البيانات الأساسية
        const metadata = {
            id: slug,
            title: filename.replace(/-/g, ' '),
            date: new Date().toISOString().split('T')[0],
            description: 'مقال قانوني متخصص',
            image: 'images/blog-bg.jpg',
            content: `blog/articles/${filename}.md`,
            type: 'markdown',
            tags: ['مقالات قانونية'],
            category: 'مقالات قانونية',
            status: 'published',
            slug: slug,
            keywords: '',
            // الحقول الإضافية التي تتوقعها المدونة
            shortContent: 'مقال قانوني متخصص',
            published: true,
            draft: false,
            archived: false,
            readTime: 5,
            formattedDate: formatDate(new Date().toISOString().split('T')[0])
        };
        
        // البحث عن الـ frontmatter (بين ---)
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        
        if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            
            // استخراج الحقول الأساسية
            const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
            const dateMatch = frontmatter.match(/date:\s*["'](.+?)["']/);
            const descMatch = frontmatter.match(/description:\s*["'](.+?)["']/);
            const imageMatch = frontmatter.match(/image:\s*["'](.+?)["']/);
            const keywordsMatch = frontmatter.match(/keywords:\s*["'](.+?)["']/);
            const categoryMatch = frontmatter.match(/category:\s*["'](.+?)["']/);
            const statusMatch = frontmatter.match(/status:\s*["'](.+?)["']/);
            const slugMatch = frontmatter.match(/slug:\s*["'](.+?)["']/);
            
            if (titleMatch) metadata.title = titleMatch[1];
            if (dateMatch) {
                metadata.date = dateMatch[1];
                metadata.formattedDate = formatDate(dateMatch[1]);
            }
            if (descMatch) {
                metadata.description = descMatch[1];
                metadata.shortContent = descMatch[1].substring(0, 150) + (descMatch[1].length > 150 ? '...' : '');
            }
            if (imageMatch) metadata.image = imageMatch[1];
            if (keywordsMatch) metadata.keywords = keywordsMatch[1];
            if (categoryMatch) metadata.category = categoryMatch[1];
            if (statusMatch) {
                metadata.status = statusMatch[1];
                metadata.published = statusMatch[1] === 'published';
                metadata.draft = statusMatch[1] === 'draft';
                metadata.archived = statusMatch[1] === 'archived';
            }
            if (slugMatch) {
                metadata.slug = slugMatch[1];
                metadata.id = slugMatch[1];
            }
            
            // استخراج tags
            const tagsMatch = frontmatter.match(/tags:\s*\[(.+?)\]/);
            if (tagsMatch) {
                try {
                    const tagsString = tagsMatch[1];
                    metadata.tags = tagsString
                        .split(',')
                        .map(tag => tag.trim().replace(/['"]/g, ''))
                        .filter(tag => tag.length > 0);
                } catch (e) {
                    console.warn(`      ⚠️  خطأ في تحليل tags`);
                }
            }
            
            // حساب وقت القراءة من المحتوى
            const contentWithoutFrontmatter = content.replace(frontmatterMatch[0], '').trim();
            const wordCount = contentWithoutFrontmatter.split(/\s+/).length;
            metadata.readTime = Math.max(3, Math.floor(wordCount / 200));
        } else {
            console.log(`      ℹ️  لا يوجد frontmatter، استخدام القيم الافتراضية`);
        }
        
        // البحث عن صورة للمقال
        const articleImage = findArticleImage(slug);
        if (articleImage) {
            metadata.image = articleImage;
            console.log(`      🖼️  تم العثور على صورة: ${articleImage}`);
        }
        
        return metadata;
    } catch (error) {
        console.error(`      ❌ خطأ في معالجة الملف: ${error.message}`);
        return null;
    }
}

// دالة لتنسيق التاريخ
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('ar-EG', options);
    } catch (e) {
        return dateString;
    }
}

// دالة للبحث عن صورة المقال
function findArticleImage(articleId) {
    try {
        if (!fs.existsSync(IMAGES_DIR)) {
            return null;
        }
        
        // البحث عن صورة بنفس اسم المقال
        for (const ext of IMAGE_EXTENSIONS) {
            const imagePath = path.join(IMAGES_DIR, `${articleId}${ext}`);
            if (fs.existsSync(imagePath)) {
                return `blog/images/${articleId}${ext}`;
            }
        }
        
        // البحث عن صورة بأي تنسيق
        const files = fs.readdirSync(IMAGES_DIR);
        for (const file of files) {
            const fileWithoutExt = path.basename(file, path.extname(file));
            if (fileWithoutExt === articleId || fileWithoutExt.includes(articleId)) {
                return `blog/images/${file}`;
            }
        }
        
        return null;
    } catch (error) {
        return null;
    }
}

// الدالة الرئيسية لتحديث الفهرس
function updateBlogIndex() {
    try {
        // التحقق من وجود مجلد المقالات
        if (!fs.existsSync(BLOG_DIR)) {
            console.error(`❌ مجلد المقالات غير موجود: ${BLOG_DIR}`);
            console.log('ℹ️  جاري إنشاء المجلدات...');
            fs.mkdirSync(BLOG_DIR, { recursive: true });
            fs.mkdirSync(DATA_DIR, { recursive: true });
            console.log('✅ تم إنشاء المجلدات');
        }
        
        // التحقق من وجود مجلد البيانات
        if (!fs.existsSync(DATA_DIR)) {
            console.log('ℹ️  جاري إنشاء مجلد البيانات...');
            fs.mkdirSync(DATA_DIR, { recursive: true });
            console.log('✅ تم إنشاء مجلد البيانات');
        }
        
        // قراءة جميع ملفات .md
        let files = [];
        try {
            files = fs.readdirSync(BLOG_DIR)
                .filter(file => file.endsWith('.md'))
                .sort();
        } catch (error) {
            console.error(`❌ خطأ في قراءة مجلد المقالات:`, error.message);
            files = [];
        }
        
        if (files.length === 0) {
            console.log('ℹ️  لا توجد مقالات في المدونة');
            
            // إنشاء فهرس فارغ
            const emptyIndex = {
                lastUpdate: new Date().toISOString(),
                articles: []
            };
            
            fs.writeFileSync(INDEX_FILE, JSON.stringify(emptyIndex, null, 2));
            console.log(`✅ تم إنشاء فهرس فارغ في ${INDEX_FILE}`);
            return;
        }
        
        console.log(`📁 وجدت ${files.length} مقالة:`);
        
        // استخراج بيانات كل مقال
        const articles = [];
        
        files.forEach((filename) => {
            const filePath = path.join(BLOG_DIR, filename);
            const metadata = extractMetadata(filePath);
            
            if (metadata) {
                articles.push(metadata);
            }
        });
        
        // ترتيب المقالات من الأحدث إلى الأقدم
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // إنشاء كائن الفهرس
        const indexData = {
            lastUpdate: new Date().toISOString(),
            articles: articles
        };
        
        // حفظ في ملف الفهرس
        fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
        
        console.log(`\n🎉 تم تحديث الفهرس بنجاح!`);
        console.log(`📊 الإحصاءات:`);
        console.log(`   • عدد المقالات: ${articles.length}`);
        console.log(`   • الملف المحفوظ: ${INDEX_FILE}`);
        console.log(`   • آخر تحديث: ${indexData.lastUpdate}`);
        
        if (articles.length > 0) {
            console.log(`\n📋 قائمة المقالات:`);
            articles.forEach((article, index) => {
                console.log(`   ${index + 1}. ${article.title} (${article.date})`);
            });
        }
        
    } catch (error) {
        console.error('❌ خطأ في تحديث الفهرس:', error);
        console.error('Stack:', error.stack);
    }
}

// تشغيل التحديث
updateBlogIndex();
