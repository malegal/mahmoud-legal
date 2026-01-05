// ملف الإعدادات - قم بتعديله ليناسب مستودعك
const BLOG_CONFIG = {
    // معلومات المستودع
    REPO_OWNER: 'اسم المستخدم الخاص بك', // ← غيّر هذا
    REPO_NAME: 'اسم المستودع', // ← غيّر هذا
    BRANCH: 'main',
    
    // مسارات الملفات
    ARTICLES_JSON_PATH: 'blog/data/articles.json',
    ARTICLES_DIR: 'blog/articles/',
    IMAGES_DIR: 'blog/images/',
    
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
        'قانون عائلي', 
        'قانون جنائي',
        'قانون عقاري',
        'نصائح قانونية',
        'أخبار قانونية'
    ]
};

// جعل الإعدادات متاحة عالميًا
window.BLOG_CONFIG = BLOG_CONFIG;
