// نظام النشر الشبه تلقائي - ضغطة زر واحدة
class BlogPublisher {
    constructor() {
        this.articles = [];
        this.isOnline = navigator.onLine;
        this.init();
    }
    
    async init() {
        // التحقق من الاتصال
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncOldDrafts();
        });
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
            // 4. استخدم الدالة المبسطة للنشر
            const published = await this.simplePublish(article);
            
            // 5. التعامل مع النتيجة
            if (published) {
                this.showSuccess('تم نشر المقال بنجاح! سيظهر في المدونة خلال ثوانٍ.');
                this.clearForm();
                this.removeDraft(article.id);
            } else {
                // إذا فشل النشر، احفظ كمشودة
                this.saveAsDraft(article);
                this.showInfo('تم حفظ المقال كمشودة. سينشر تلقائيًا عند الاتصال بالإنترنت.');
            }
            
        } catch (error) {
            console.error('خطأ في النشر:', error);
            this.showError('حدث خطأ غير متوقع. تم حفظ المقال كمشودة.');
            this.saveAsDraft(article);
        } finally {
            // 6. إخفاء مؤشر التحميل
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
    
    // دالة نشر مبسطة للمقالات
    async simplePublish(article) {
        try {
            const token = localStorage.getItem('github_token');
            if (!token) {
                this.showError('❌ لم يتم إدخال توكن GitHub. الرجاء إدخاله أولاً.');
                return false;
            }
            
            // 1. جلب المقالات الحالية
            let data = { articles: [] };
            try {
                const response = await fetch(
                    'https://raw.githubusercontent.com/malegal/mahmoud-legal/main/blog/data/articles.json'
                );
                
                if (response.ok) {
                    data = await response.json();
                    // التأكد من وجود مصفوفة articles
                    if (!data.articles) {
                        data.articles = [];
                    }
                }
            } catch (fetchError) {
                console.log('بدء بمصفوفة مقالات جديدة');
                data.articles = [];
            }
            
            // 2. إضافة المقال الجديد
            // التأكد من أن للمقال معرف فريد
            article.id = article.id || Date.now();
            article.date = article.date || new Date().toLocaleDateString('ar-SA');
            
            // إضافة المقال في بداية المصفوفة
            data.articles.unshift(article);
            
            // 3. تحديث ملف articles.json مباشرة
            const updateUrl = 'https://api.github.com/repos/malegal/mahmoud-legal/contents/blog/data/articles.json';
            
            // الحصول على SHA للملف الحالي
            let sha = '';
            try {
                const fileInfo = await fetch(updateUrl, {
                    headers: { 
                        'Authorization': `token ${token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (fileInfo.ok) {
                    const info = await fileInfo.json();
                    sha = info.sha;
                }
            } catch (shaError) {
                console.log('الملف غير موجود، سيتم إنشاؤه جديداً');
            }
            
            // رفع التحديث
            const updateResponse = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `إضافة مقال جديد: ${article.title}`,
                    content: btoa(JSON.stringify(data, null, 2)),
                    sha: sha || undefined,
                    branch: 'main'
                })
            });
            
            if (updateResponse.ok) {
                console.log('✅ تم تحديث articles.json بنجاح');
                
                // محاولة تحديث index.html لتفعيل Vercel rebuild
                try {
                    await this.triggerVercelRebuild(token);
                } catch (rebuildError) {
                    console.log('ملاحظة: يمكن تحديث Vercel يدويًا');
                }
                
                return true;
            } else {
                const errorData = await updateResponse.json();
                console.error('❌ خطأ في تحديث GitHub:', errorData);
                
                let errorMsg = 'فشل النشر إلى GitHub';
                if (errorData.message) {
                    errorMsg += ': ' + errorData.message;
                    
                    // رسائل خطأ شائعة
                    if (errorData.message.includes('bad credentials')) {
                        errorMsg = 'التوكن غير صالح أو منتهي الصلاحية';
                    } else if (errorData.message.includes('not found')) {
                        errorMsg = 'المستودع غير موجود أو لا يوجد صلاحية للوصول';
                    }
                }
                
                this.showError(errorMsg);
                return false;
            }
            
        } catch (error) {
            console.error('خطأ في النشر المبسط:', error);
            this.showError('حدث خطأ غير متوقع: ' + error.message);
            return false;
        }
    }
    
    // محاولة تفعيل إعادة بناء Vercel
    async triggerVercelRebuild(token) {
        try {
            // تحديث ملف بسيط لتشغيل rebuild
            const vercelUrl = 'https://api.github.com/repos/malegal/mahmoud-legal/contents/vercel.json';
            
            // جلب SHA الحالي
            let sha = '';
            try {
                const fileRes = await fetch(vercelUrl, {
                    headers: { 'Authorization': `token ${token}` }
                });
                if (fileRes.ok) {
                    const fileData = await fileRes.json();
                    sha = fileData.sha;
                }
            } catch (e) {
                // تجاهل الخطأ إذا لم يوجد الملف
            }
            
            // تحديث طفيف
            const vercelConfig = {
                "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
                "buildCommand": null,
                "outputDirectory": ".",
                "github": {
                    "silent": true
                },
                "lastUpdated": new Date().toISOString()
            };
            
            await fetch(vercelUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'تحديث للإشارة إلى مقال جديد',
                    content: btoa(JSON.stringify(vercelConfig, null, 2)),
                    sha: sha || undefined,
                    branch: 'main'
                })
            });
            
            console.log('✅ تم تشغيل إعادة بناء Vercel');
        } catch (error) {
            console.log('⚠️ يمكن تحديث Vercel يدويًا من لوحة التحكم');
        }
    }
    
    // إدارة المسودات المحلية
    saveAsDraft(article) {
        try {
            let drafts = JSON.parse(localStorage.getItem('blog_drafts')) || [];
            
            // تجنب التكرار
            drafts = drafts.filter(d => d.id !== article.id);
            drafts.push({
                ...article, 
                isDraft: true, 
                savedAt: new Date().toISOString(),
                // إضافة معلومات إضافية للمسودة
                title: article.title || 'مقال بدون عنوان',
                content: article.content || ''
            });
            
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
            
            // ترتيب المسودات من الأحدث إلى الأقدم
            drafts.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
            
            draftsList.innerHTML = drafts.map(draft => `
                <div class="draft-item">
                    <h4>${draft.title || 'بدون عنوان'}</h4>
                    <p><strong>التصنيف:</strong> ${draft.category || 'غير محدد'}</p>
                    <p><strong>الحفظ:</strong> ${new Date(draft.savedAt).toLocaleDateString('ar-SA')}</p>
                    <p style="color: #666; font-size: 0.9rem;">
                        ${(draft.summary || draft.content || '').substring(0, 80)}${(draft.summary || draft.content || '').length > 80 ? '...' : ''}
                    </p>
                    <div class="draft-actions">
                        <button class="btn-edit" onclick="editDraft(${draft.id})">
                            <i class="fas fa-edit"></i> تعديل
                        </button>
                        <button class="btn-delete" onclick="deleteDraft(${draft.id})">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                        <button class="btn-publish" onclick="publishDraft(${draft.id})" style="background: #28a745; color: white;">
                            <i class="fas fa-paper-plane"></i> نشر
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            draftsList.innerHTML = '<p style="color: #dc3545;">خطأ في تحميل المسودات</p>';
        }
    }
    
    // مزامنة المسود
