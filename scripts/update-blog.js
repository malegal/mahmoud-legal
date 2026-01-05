// نظام النشر الشبه تلقائي - ضغطة زر واحدة
class BlogPublisher {
    constructor() {
        this.articles = [];
        this.isOnline = navigator.onLine;
        this.init();
    }
    
    async init() {
        // التحقق من الاتصال
        window.addEventListener('online', () => this.isOnline = true);
        window.addEventListener('offline', () => this.isOnline = false);
        
        // محاولة مزامنة المسودات القديمة
        this.syncOldDrafts();
    }
    
    // الدالة الرئيسية للنشر - ضغطة زر واحدة!
    async publishArticle() {
        // 1. جمع بيانات المقال
        const article = this.collectArticleData();
        
        // 2. التحقق من الحقول المطلوبة
        if (!this.validateArticle(article)) return;
        
        // 3. إظهار مؤشر التحميل
        this.showLoading(true);
        
        try {
            // 4. حفظ محليًا كمسودة أولاً
            this.saveAsDraft(article);
            
            // 5. محاولة النشر إلى GitHub
            let published = false;
            
            if (this.isOnline) {
                published = await this.uploadToGitHub(article);
            }
            
            // 6. التعامل مع النتيجة
            if (published) {
                this.showSuccess('تم نشر المقال بنجاح! سيظهر في المدونة خلال ثوانٍ.');
                this.clearForm();
                this.removeDraft(article.id);
            } else if (this.isOnline) {
                this.showError('فشل النشر إلى GitHub. تم حفظ المقال كمشودة.');
            } else {
                this.showInfo('تم حفظ المقال كمشودة. سينشر تلقائيًا عند الاتصال بالإنترنت.');
            }
            
        } catch (error) {
            console.error('خطأ في النشر:', error);
            this.showError('حدث خطأ غير متوقع. تم حفظ المقال كمشودة.');
        } finally {
            // 7. إخفاء مؤشر التحميل
            this.showLoading(false);
        }
    }
    
    // جمع بيانات المقال من النموذج
    collectArticleData() {
        return {
            id: Date.now(),
            title: document.getElementById('articleTitle').value.trim(),
            author: document.getElementById('articleAuthor').value.trim() || "مكتب المحاماة",
            category: document.getElementById('articleCategory').value,
            content: document.getElementById('articleContent').value.trim(),
            image: document.getElementById('articleImage').value.trim() || this.getDefaultImage(),
            summary: document.getElementById('articleSummary').value.trim() || '',
            date: new Date().toLocaleDateString('ar-SA'),
            timestamp: new Date().toISOString(),
            published: true,
            views: 0,
            tags: this.extractTags(document.getElementById('articleContent').value)
        };
    }
    
    // التحقق من صحة المقال
    validateArticle(article) {
        if (!article.title) {
            this.showError('الرجاء إدخال عنوان المقال');
            return false;
        }
        
        if (!article.content) {
            this.showError('الرجاء إدخال محتوى المقال');
            return false;
        }
        
        if (article.content.length < 100) {
            if (!confirm('المحتوى قصير جدًا. هل تريد الاستمرار في النشر؟')) {
                return false;
            }
        }
        
        return true;
    }
    
    // رفع المقال إلى GitHub
    async uploadToGitHub(article) {
        const token = localStorage.getItem('github_token');
        
        if (!token) {
            this.showError('لم يتم العثور على توكن GitHub. الرجاء إدخاله أولاً.');
            return false;
        }
        
        try {
            // أ. الحصول على المقالات الحالية
            const currentArticles = await this.getCurrentArticles(token);
            
            // ب. إضافة المقال الجديد
            currentArticles.unshift(article); // في البداية
            
            // ج. تحديث ملف articles.json
            const updated = await this.updateArticlesFile(currentArticles, token, article.title);
            
            if (updated) {
                // د. إنشاء ملف HTML منفصل للمقال
                await this.createArticleFile(article, token);
                return true;
            }
            
            return false;
            
        } catch (error) {
            console.error('خطأ في رفع المقال:', error);
            return false;
        }
    }
    
    // الحصول على المقالات الحالية
    async getCurrentArticles(token) {
        try {
            const response = await fetch(
                `${BLOG_CONFIG.GITHUB_RAW_BASE}/${BLOG_CONFIG.ARTICLES_JSON_PATH}`
            );
            
            if (response.ok) {
                const data = await response.json();
                return data.articles || [];
            }
        } catch (error) {
            console.warn('لا يمكن تحميل المقالات الحالية، سيتم البدء بمصفوفة فارغة');
        }
        
        return [];
    }
    
    // تحديث ملف articles.json
    async updateArticlesFile(articles, token, articleTitle) {
        const content = {
            articles: articles,
            lastUpdated: new Date().toISOString(),
            totalArticles: articles.length,
            categories: BLOG_CONFIG.CATEGORIES
        };
        
        const url = `${BLOG_CONFIG.GITHUB_API_BASE}/${BLOG_CONFIG.ARTICLES_JSON_PATH}`;
        
        // الحصول على SHA للملف الحالي إذا كان موجودًا
        let sha = null;
        try {
            const fileInfo = await fetch(url, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (fileInfo.ok) {
                const data = await fileInfo.json();
                sha = data.sha;
            }
        } catch (error) {
            // الملف غير موجود، سننشئه جديدًا
        }
        
        // إعداد الطلب
        const requestBody = {
            message: `إضافة مقال جديد: ${articleTitle}`,
            content: btoa(JSON.stringify(content, null, 2)),
            branch: BLOG_CONFIG.BRANCH
        };
        
        if (sha) {
            requestBody.sha = sha;
        }
        
        // إرسال الطلب
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        return response.ok;
    }
    
    // إنشاء ملف HTML منفصل للمقال
    async createArticleFile(article, token) {
        const htmlContent = this.generateArticleHTML(article);
        const fileName = `article-${article.id}.html`;
        const filePath = `${BLOG_CONFIG.ARTICLES_DIR}${fileName}`;
        
        const url = `${BLOG_CONFIG.GITHUB_API_BASE}/${filePath}`;
        
        const requestBody = {
            message: `إنشاء ملف للمقال: ${article.title}`,
            content: btoa(htmlContent),
            branch: BLOG_CONFIG.BRANCH
        };
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        return response.ok;
    }
    
    // توليد HTML للمقال
    generateArticleHTML(article) {
        return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} - ${BLOG_CONFIG.BLOG_NAME}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.8; padding: 20px; max-width: 800px; margin: 0 auto; }
        .article-header { text-align: center; margin-bottom: 40px; }
        .article-title { color: #283593; font-size: 2rem; margin-bottom: 10px; }
        .article-meta { color: #666; font-size: 0.9rem; }
        .article-content { font-size: 1.1rem; }
        .article-image { max-width: 100%; height: auto; border-radius: 10px; margin: 20px 0; }
        .back-link { display: inline-block; margin-top: 30px; color: #283593; text-decoration: none; }
    </style>
</head>
<body>
    <article>
        <header class="article-header">
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                <span>نشر في: ${article.date}</span> | 
                <span>بواسطة: ${article.author}</span> | 
                <span>التصنيف: ${article.category}</span>
            </div>
        </header>
        
        ${article.image ? `<img src="${article.image}" alt="${article.title}" class="article-image">` : ''}
        
        <div class="article-content">
            ${article.content.replace(/\n/g, '<br>')}
        </div>
        
        <a href="/" class="back-link">← العودة إلى المدونة</a>
    </article>
</body>
</html>`;
    }
    
    // إدارة المسودات المحلية
    saveAsDraft(article) {
        try {
            let drafts = JSON.parse(localStorage.getItem('blog_drafts')) || [];
            
            // تجنب التكرار
            drafts = drafts.filter(d => d.id !== article.id);
            drafts.push({...article, isDraft: true, savedAt: new Date().toISOString()});
            
            localStorage.setItem('blog_drafts', JSON.stringify(drafts));
            
            // تحديث العرض
            this.loadDrafts();
            
            return true;
        } catch (error) {
            console.error('خطأ في حفظ المسودة:', error);
            return false;
        }
    }
    
    removeDraft(articleId) {
        let drafts = JSON.parse(localStorage.getItem('blog_drafts')) || [];
        drafts = drafts.filter(d => d.id !== articleId);
        localStorage.setItem('blog_drafts', JSON.stringify(drafts));
        this.loadDrafts();
    }
    
    // تحميل وعرض المسودات
    loadDrafts() {
        const draftsList = document.getElementById('draftsList');
        if (!draftsList) return;
        
        try {
            const drafts = JSON.parse(localStorage.getItem('blog_drafts')) || [];
            
            if (drafts.length === 0) {
                draftsList.innerHTML = '<p style="text-align: center; color: #666;">لا توجد مسودات محفوظة.</p>';
                return;
            }
            
            draftsList.innerHTML = drafts.map(draft => `
                <div class="draft-item">
                    <h4>${draft.title || 'بدون عنوان'}</h4>
                    <p><strong>التصنيف:</strong> ${draft.category || 'غير محدد'}</p>
                    <p><strong>الحفظ:</strong> ${new Date(draft.savedAt).toLocaleDateString('ar-SA')}</p>
                    <p>${(draft.summary || draft.content || '').substring(0, 100)}...</p>
                    <div class="draft-actions">
                        <button class="btn-edit" onclick="editDraft(${draft.id})">
                            <i class="fas fa-edit"></i> تعديل
                        </button>
                        <button class="btn-delete" onclick="deleteDraft(${draft.id})">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            draftsList.innerHTML = '<p style="color: #dc3545;">خطأ في تحميل المسودات</p>';
        }
    }
    
    // مزامنة المسودات القديمة عند الاتصال
    async syncOldDrafts() {
        if (!this.isOnline) return;
        
        const drafts = JSON.parse(localStorage.getItem('blog_drafts')) || [];
        const unsyncedDrafts = drafts.filter(d => d.isDraft);
        
        if (unsyncedDrafts.length === 0) return;
        
        for (const draft of unsyncedDrafts) {
            try {
                const published = await this.uploadToGitHub(draft);
                if (published) {
                    this.removeDraft(draft.id);
                }
            } catch (error) {
                console.error('خطأ في مزامنة المسودة:', error);
            }
        }
    }
    
    // وظائف المساعدة
    extractTags(content) {
        const commonTags = ['قانون', 'محكمة', 'عقد', 'تجاري', 'عائلي', 'جنائي', 'عقاري'];
        const foundTags = commonTags.filter(tag => 
            content.toLowerCase().includes(tag.toLowerCase())
        );
        return foundTags.slice(0, 5);
    }
    
    getDefaultImage() {
        const defaultImages = [
            'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
            'https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?w-800',
            'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800'
        ];
        return defaultImages[Math.floor(Math.random() * defaultImages.length)];
    }
    
    clearForm() {
        document.getElementById('articleTitle').value = '';
        document.getElementById('articleAuthor').value = '';
        document.getElementById('articleContent').value = '';
        document.getElementById('articleImage').value = '';
        document.getElementById('articleSummary').value = '';
    }
    
    showLoading(show) {
        const loader = document.getElementById('loadingIndicator');
        const button = document.getElementById('publishButton');
        
        if (loader) loader.style.display = show ? 'block' : 'none';
        if (button) {
            button.disabled = show;
            button.innerHTML = show ? 
                '<i class="fas fa-spinner fa-spin"></i> جاري النشر...' : 
                '<i class="fas fa-paper-plane"></i> نشر المقال الآن';
        }
    }
    
    showSuccess(message) {
        const alert = document.getElementById('successAlert');
        if (alert) {
            alert.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
            alert.style.display = 'block';
            setTimeout(() => alert.style.display = 'none', 5000);
        }
    }
    
    showError(message) {
        const alert = document.getElementById('errorAlert');
        if (alert) {
            alert.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            alert.style.display = 'block';
            setTimeout(() => alert.style.display = 'none', 5000);
        }
    }
    
    showInfo(message) {
        alert(`ℹ️ ${message}`);
    }
}

// وظائف للمسودات (تعرض عالميًا)
function editDraft(draftId) {
    const drafts = JSON.parse(localStorage.getItem('blog_drafts')) || [];
    const draft = drafts.find(d => d.id === draftId);
    
    if (draft) {
        document.getElementById('articleTitle').value = draft.title || '';
        document.getElementById('articleAuthor').value = draft.author || '';
        document.getElementById('articleCategory').value = draft.category || 'قانون تجاري';
        document.getElementById('articleContent').value = draft.content || '';
        document.getElementById('articleImage').value = draft.image || '';
        document.getElementById('articleSummary').value = draft.summary || '';
        
        // حذف المسودة بعد تحميلها
        blogPublisher.removeDraft(draftId);
    }
}

function deleteDraft(draftId) {
    if (confirm('هل أنت متأكد من حذف هذه المسودة؟')) {
        blogPublisher.removeDraft(draftId);
    }
}

// تهيئة النظام
const blogPublisher = new BlogPublisher();

// جعل الدوال متاحة عالميًا
window.publishArticle = () => blogPublisher.publishArticle();
window.loadDrafts = () => blogPublisher.loadDrafts();
window.editDraft = editDraft;
window.deleteDraft = deleteDraft;
