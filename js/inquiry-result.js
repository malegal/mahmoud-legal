// ==================== INQUIRY RESULT APPLICATION ====================
class InquiryResultApp {
    constructor() {
        this.caseData = null;
        this.sessions = [];
        this.supabase = null;
        
        this.init();
    }

    async init() {
        try {
            // Initialize Supabase
            if (window.SupabaseConfig) {
                this.supabase = window.SupabaseConfig.initializeSupabase();
            }
            
            // Load case data
            await this.loadCaseData();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Check session expiry periodically
            this.setupSessionCheck();
            
            console.log('✅ Inquiry Result App initialized');
        } catch (error) {
            console.error('❌ App initialization error:', error);
            this.showError('حدث خطأ', 'فشل في تحميل بيانات القضية');
        }
    }

    // ==================== DATA LOADING ====================
    async loadCaseData() {
        try {
            // Get data from localStorage or URL parameters
            const storedData = localStorage.getItem('currentCase');
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token') || localStorage.getItem('magicLinkToken');
            const expired = urlParams.get('expired');

            if (expired) {
                localStorage.clear();
                throw new Error('انتهت صلاحية الجلسة');
            }

            if (!storedData && !token) {
                throw new Error('لا توجد بيانات للعرض');
            }

            if (storedData) {
                // Load from localStorage
                const data = JSON.parse(storedData);
                
                // Validate access token
                const accessData = localStorage.getItem('clientAccess');
                if (!accessData) {
                    throw new Error('انتهت صلاحية الجلسة');
                }

                const access = JSON.parse(accessData);
                if (Date.now() > access.expiresAt) {
                    throw new Error('انتهت صلاحية الجلسة');
                }

                this.caseData = data.case;
                this.sessions = data.sessions || [];

                // Display data
                this.displayCaseData();
                
            } else if (token) {
                // Load from magic link token
                await this.loadFromMagicLink(token);
                
                // Clear token after use
                localStorage.removeItem('magicLinkToken');
            }

        } catch (error) {
            console.error('Load error:', error);
            this.showError('حدث خطأ', error.message || 'فشل في تحميل بيانات القضية');
        }
    }

    async loadFromMagicLink(token) {
        try {
            // Decode token and fetch case data
            const clientId = atob(token);
            
            if (window.SupabaseConfig && window.SupabaseConfig.DatabaseService) {
                // Get client's latest case
                const clientResult = await window.SupabaseConfig.DatabaseService.searchClient(clientId);
                
                if (!clientResult.found) {
                    throw new Error('لا توجد قضايا مسجلة');
                }
                
                // Get all cases for this client
                const { data: cases } = await this.supabase
                    .from('cases')
                    .select('*')
                    .or(`client_phone.ilike.%${clientId}%,client_email.ilike.%${clientId}%`)
                    .order('created_at', { ascending: false })
                    .limit(5);
                
                if (!cases || cases.length === 0) {
                    throw new Error('لا توجد قضايا مسجلة');
                }
                
                // For now, show the first case
                this.caseData = cases[0];
                this.sessions = await window.SupabaseConfig.DatabaseService.getCaseSessions(this.caseData.id);
                
                // Display data
                this.displayCaseData();
                
            } else {
                throw new Error('خدمة قاعدة البيانات غير متاحة');
            }

        } catch (error) {
            throw error;
        }
    }

    // ==================== UI RENDERING ====================
    displayCaseData() {
        // Hide loading, show content
        document.getElementById('loading').style.display = 'none';
        document.getElementById('caseContent').classList.remove('hidden');

        // Display case info
        document.getElementById('caseCodeDisplay').textContent = this.caseData.case_code || 'بدون كود';
        document.getElementById('caseTitle').textContent = this.caseData.client_name;
        document.getElementById('caseSubtitle').textContent = 
            `${this.caseData.case_number || 'غير محدد'}/${this.caseData.case_year || 'غير محدد'} - ${this.caseData.court_name || 'غير محدد'}`;

        // Display info grid
        this.renderInfoGrid();
        
        // Display sessions
        this.renderSessions();
    }

    renderInfoGrid() {
        const caseInfoGrid = document.getElementById('caseInfoGrid');
        
        const clientInfo = `
            <div class="info-card">
                <h3><i class="fas fa-user"></i> معلومات العميل</h3>
                <div class="info-item">
                    <div class="info-label">اسم العميل</div>
                    <div class="info-value">${this.caseData.client_name || 'غير محدد'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">صفة العميل</div>
                    <div class="info-value">${this.caseData.client_role || 'غير محدد'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">هاتف العميل</div>
                    <div class="info-value">${this.caseData.client_phone || 'غير محدد'}</div>
                </div>
                ${this.caseData.client_email ? `
                <div class="info-item">
                    <div class="info-label">البريد الإلكتروني</div>
                    <div class="info-value">${this.caseData.client_email}</div>
                </div>
                ` : ''}
            </div>
        `;
        
        const caseInfo = `
            <div class="info-card">
                <h3><i class="fas fa-gavel"></i> معلومات القضية</h3>
                <div class="info-item">
                    <div class="info-label">رقم القضية</div>
                    <div class="info-value">${this.caseData.case_number || 'غير محدد'}/${this.caseData.case_year || 'غير محدد'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">المحكمة</div>
                    <div class="info-value">${this.caseData.court_name || 'غير محدد'}</div>
                </div>
                ${this.caseData.circle ? `
                <div class="info-item">
                    <div class="info-label">الدائرة</div>
                    <div class="info-value">${this.caseData.circle}</div>
                </div>
                ` : ''}
                ${this.caseData.case_type ? `
                <div class="info-item">
                    <div class="info-label">نوع القضية</div>
                    <div class="info-value">${this.caseData.case_type}</div>
                </div>
                ` : ''}
            </div>
        `;
        
        const opponentInfo = `
            <div class="info-card">
                <h3><i class="fas fa-user-tie"></i> معلومات الخصم</h3>
                ${this.caseData.opponent_name ? `
                <div class="info-item">
                    <div class="info-label">اسم الخصم</div>
                    <div class="info-value">${this.caseData.opponent_name}</div>
                </div>
                ` : '<div class="info-value">غير محدد</div>'}
                ${this.caseData.opponent_phone ? `
                <div class="info-item">
                    <div class="info-label">هاتف الخصم</div>
                    <div class="info-value">${this.caseData.opponent_phone}</div>
                </div>
                ` : ''}
            </div>
        `;
        
        const additionalInfo = `
            <div class="info-card">
                <h3><i class="fas fa-info-circle"></i> معلومات إضافية</h3>
                ${this.caseData.case_subject ? `
                <div class="info-item">
                    <div class="info-label">موضوع القضية</div>
                    <div class="info-value">${this.caseData.case_subject}</div>
                </div>
                ` : ''}
                ${this.caseData.notes ? `
                <div class="info-item">
                    <div class="info-label">ملاحظات</div>
                    <div class="info-value">${this.caseData.notes}</div>
                </div>
                ` : ''}
                <div class="info-item">
                    <div class="info-label">تاريخ التسجيل</div>
                    <div class="info-value">${this.caseData.created_at ? new Date(this.caseData.created_at).toLocaleDateString('ar-EG') : 'غير محدد'}</div>
                </div>
            </div>
        `;
        
        caseInfoGrid.innerHTML = clientInfo + caseInfo + opponentInfo + additionalInfo;
    }

    renderSessions() {
        const sessionsList = document.getElementById('sessionsList');
        
        if (this.sessions && this.sessions.length > 0) {
            sessionsList.innerHTML = '';
            
            this.sessions.forEach((session, index) => {
                const sessionDate = new Date(session.session_date);
                const formattedDate = sessionDate.toLocaleDateString('ar-EG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                const sessionCard = document.createElement('div');
                sessionCard.className = 'session-card';
                sessionCard.innerHTML = `
                    <div class="session-header">
                        <div class="session-date">
                            <i class="fas fa-calendar-day"></i>
                            ${formattedDate}
                        </div>
                        ${session.case_status ? `
                            <div class="session-status">${session.case_status}</div>
                        ` : ''}
                    </div>
                    ${session.decision ? `
                        <div class="session-decision">
                            <strong>القرار:</strong><br>
                            ${session.decision}
                        </div>
                    ` : '<div style="color: rgba(255, 255, 255, 0.6); text-align: center;">لا يوجد قرار مسجل</div>'}
                `;
                
                sessionsList.appendChild(sessionCard);
            });
        } else {
            sessionsList.innerHTML = `
                <div class="no-sessions">
                    <i class="fas fa-calendar-times"></i>
                    <h3>لا توجد جلسات مسجلة</h3>
                    <p>لم يتم تسجيل أي جلسات لهذه القضية حتى الآن</p>
                </div>
            `;
        }
    }

    // ==================== EVENT HANDLERS ====================
    setupEventListeners() {
        // Print button
        document.getElementById('printBtn')?.addEventListener('click', () => this.generatePDF());
        
        // New search button
        document.getElementById('newSearchBtn')?.addEventListener('click', () => {
            localStorage.removeItem('currentCase');
            window.location.href = 'client-inquiry.html';
        });
    }

    // ==================== ERROR HANDLING ====================
    showError(title, message) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('errorContainer').classList.remove('hidden');
        document.getElementById('errorTitle').textContent = title;
        document.getElementById('errorMessage').textContent = message;
    }

    // ==================== PDF GENERATION ====================
    async generatePDF() {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Set RTL direction
            doc.setR2L(true);
            
            // Add logo and header
            doc.setFontSize(20);
            doc.setTextColor(212, 175, 55);
            doc.text('مؤسسة محمود عبد الحميد للمحاماة', 105, 15, { align: 'center' });
            
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            doc.text('تفاصيل القضية', 105, 25, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setTextColor(148, 163, 184);
            doc.text(`تاريخ الطباعة: ${new Date().toLocaleDateString('ar-EG')}`, 20, 35);
            
            // Case information
            let y = 50;
            doc.setFontSize(14);
            doc.setTextColor(212, 175, 55);
            doc.text('معلومات العميل:', 20, y);
            
            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255);
            y += 10;
            doc.text(`الاسم: ${this.caseData.client_name || 'غير محدد'}`, 30, y);
            y += 8;
            doc.text(`الصفة: ${this.caseData.client_role || 'غير محدد'}`, 30, y);
            y += 8;
            doc.text(`الهاتف: ${this.caseData.client_phone || 'غير محدد'}`, 30, y);
            y += 8;
            if (this.caseData.client_email) {
                doc.text(`الإيميل: ${this.caseData.client_email}`, 30, y);
                y += 8;
            }
            
            y += 5;
            doc.setFontSize(14);
            doc.setTextColor(212, 175, 55);
            doc.text('معلومات القضية:', 20, y);
            
            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255);
            y += 10;
            doc.text(`رقم القضية: ${this.caseData.case_number || 'غير محدد'}/${this.caseData.case_year || 'غير محدد'}`, 30, y);
            y += 8;
            doc.text(`المحكمة: ${this.caseData.court_name || 'غير محدد'}`, 30, y);
            y += 8;
            if (this.caseData.circle) {
                doc.text(`الدائرة: ${this.caseData.circle}`, 30, y);
                y += 8;
            }
            if (this.caseData.case_type) {
                doc.text(`نوع القضية: ${this.caseData.case_type}`, 30, y);
                y += 8;
            }
            
            // Sessions
            if (this.sessions && this.sessions.length > 0) {
                y += 10;
                doc.setFontSize(14);
                doc.setTextColor(212, 175, 55);
                doc.text('سجل الجلسات:', 20, y);
                
                this.sessions.forEach((session, index) => {
                    if (y > 250) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    y += 10;
                    doc.setFontSize(12);
                    doc.setTextColor(255, 255, 255);
                    const sessionDate = new Date(session.session_date);
                    const dateStr = sessionDate.toLocaleDateString('ar-EG');
                    doc.text(`جلسة ${index + 1}: ${dateStr}`, 30, y);
                    
                    if (session.case_status) {
                        y += 8;
                        doc.setTextColor(148, 163, 184);
                        doc.text(`الحالة: ${session.case_status}`, 35, y);
                    }
                    
                    if (session.decision) {
                        y += 8;
                        doc.setTextColor(255, 255, 255);
                        const decisionLines = doc.splitTextToSize(`القرار: ${session.decision}`, 150);
                        doc.text(decisionLines, 35, y);
                        y += decisionLines.length * 6;
                    }
                    
                    y += 5;
                });
            }
            
            // Save PDF
            const fileName = `قضية_${this.caseData.case_number || 'غير_معروف'}_${this.caseData.client_name || 'غير_معروف'}.pdf`;
            doc.save(fileName);
            
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('حدث خطأ أثناء إنشاء ملف PDF');
        }
    }

    // ==================== SESSION MANAGEMENT ====================
    setupSessionCheck() {
        // Check session expiry every minute
        setInterval(() => this.checkSessionExpiry(), 60000);
        this.checkSessionExpiry();
    }

    checkSessionExpiry() {
        const accessData = localStorage.getItem('clientAccess');
        if (accessData) {
            const access = JSON.parse(accessData);
            if (Date.now() > access.expiresAt) {
                localStorage.clear();
                window.location.href = 'client-inquiry.html?expired=true';
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.inquiryResultApp = new InquiryResultApp();
});
