// ملف الإعدادات - قم بتعديله ليناسب مستودعك
const BLOG_CONFIG = {// scripts/config.js - تأكد من هذه المعلومات
    REPO_OWNER: 'malegal',  // ← اسم المستخدم الصحيح
    REPO_NAME: 'mahmoud-legal',  // ← اسم المستودع الصحيح
    BRANCH: 'main',
    
    // مسارات الملفات (لا تغير هذه إلا إذا غيرت الهيكل)
    ARTICLES_JSON_PATH: 'blog/data/articles.json',
    ARTICLES_DIR: 'blog/articles/',
    IMAGES_DIR: 'blog/images/',
    
    // ... باقي الكود كما هو
};
window.BLOG_CONFIG = BLOG_CONFIG;
    
    // روابط GitHub
    get GITHUB_API_BASE() {
        return `https://api.github.com/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents`;
    },
    
    get GITHUB_RAW_BASE() {
        return `https://raw.githubusercontent.com/${this.REPO_OWNER}/${this.REPO_NAME}/${this.BRANCH}`;
    },
    
    // إعدادات المدونة
    BLOG_NAME: 'مدونة مكتب المحاماة',
    POSTS_PER_PAGE: 10,
    
    // التصنيفات الافتراضية
    CATEGORIES: [
        'قانون تجاري',
        'قانون مدني', 
        'قانون جنائي',
        'قانون الأسرة',
        'نصائح قانونية',
        'أخبار قانونية'
    ]
};

// جعل الإعدادات متاحة عالميًا
window.BLOG_CONFIG = BLOG_CONFIG;
