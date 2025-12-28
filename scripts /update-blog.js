#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// إعدادات المسارات
const BLOG_DIR = path.join(__dirname, '../blog');
const CONFIG_FILE = path.join(__dirname, '../blog-config.json');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

console.log('🔄 بدء تحديث قائمة المقالات...');

// دالة لاستخراج البيانات من ملف .md
function extractMetadata(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // البحث عن الـ frontmatter (بين ---)
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        
        if (!frontmatterMatch) {
            console.warn(`⚠️  ملف ${path.basename(filePath)} لا يحتوي على frontmatter`);
            return null;
        }
        
        const frontmatter = frontmatterMatch[1];
        const metadata = {};
        
        // تحليل البيانات الأساسية
        const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
        const dateMatch = frontmatter.match(/date:\s*["'](.+?)["']/);
        const descMatch = frontmatter.match(/description:\s*["'](.+?)["']/);
        const imageMatch = frontmatter.match(/image:\s*["'](.+?)["']/);
        const tagsMatch = frontmatter.match(/tags:\s*\[(.+?)\]/);
        
        metadata.id = path.basename(filePath, '.md');
        metadata.title = titleMatch ? titleMatch[1] : 'بدون عنوان';
        metadata.date = dateMatch ? dateMatch[1] : '2024-01-01';
        metadata.description = descMatch ? descMatch[1] : 'مقال قانوني متخصص';
        metadata.image = imageMatch ? imageMatch[1] : getDefaultImage(metadata.id);
        metadata.file = `blog/${path.basename(filePath)}`;
        
        if (tagsMatch) {
            metadata.tags = tagsMatch[1]
                .split(',')
                .map(tag => tag.trim().replace(/['"]/g, ''));
        } else {
            metadata.tags = ['مقالات قانونية'];
        }
        
        return metadata;
    } catch (error) {
        console.error(`❌ خطأ في قراءة ملف ${filePath}:`, error.message);
        return null;
    }
}

// دالة للحصول على صورة افتراضية
function getDefaultImage(articleId) {
    const blogImagesDir = path.join(BLOG_DIR, 'images');
    
    // البحث عن صورة بنفس اسم المقال
    for (const ext of IMAGE_EXTENSIONS) {
        const imagePath = path.join(blogImagesDir, `${articleId}${ext}`);
        if (fs.existsSync(imagePath)) {
            return `/blog/images/${articleId}${ext}`;
        }
    }
    
    // صورة افتراضية
    return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070';
}

// الدالة الرئيسية
function updateBlogConfig() {
    try {
        // التحقق من وجود مجلد المدونة
        if (!fs.existsSync(BLOG_DIR)) {
            console.error(`❌ مجلد المدونة غير موجود: ${BLOG_DIR}`);
            return;
        }
        
        // قراءة جميع ملفات .md
        const files = fs.readdirSync(BLOG_DIR)
            .filter(file => file.endsWith('.md'))
            .sort(); // ترتيب أبجدي
        
        if (files.length === 0) {
            console.log('ℹ️  لا توجد مقالات في المدونة');
            return;
        }
        
        console.log(`📁 وجدت ${files.length} مقالة:`);
        
        // استخراج بيانات كل مقال
        const articles = [];
        
        files.forEach(filename => {
            const filePath = path.join(BLOG_DIR, filename);
            const metadata = extractMetadata(filePath);
            
            if (metadata) {
                articles.push(metadata);
                console.log(`✅ ${filename}: ${metadata.title}`);
            }
        });
        
        // ترتيب المقالات من الأحدث إلى الأقدم
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // حفظ في ملف التكوين
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(articles, null, 2));
        
        console.log(`🎉 تم تحديث ${articles.length} مقالة في ${CONFIG_FILE}`);
        
    } catch (error) {
        console.error('❌ خطأ في تحديث المدونة:', error);
    }
}

// تشغيل التحديث
updateBlogConfig();
