// ==================== CLIENT INQUIRY APPLICATION ====================
class ClientInquiryApp {
    constructor() {
        this.currentStep = 1;
        this.verificationMethod = 'sms';
        this.userIdentifier = '';
        this.clientData = null;
        this.accessToken = '';
        this.resendTimer = null;
        this.resendSeconds = 60;
        this.generatedOTP = '';
        
        this.init();
    }

    async init() {
        try {
            // Initialize services
            this.initializeServices();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Handle URL parameters for magic links
            this.handleUrlParameters();
            
            console.log('✅ Client Inquiry App initialized');
        } catch (error) {
            console.error('❌ App initialization error:', error);
            this.showAlert('حدث خطأ في تهيئة النظام. يرجى تحديث الصفحة.', 'error', 'authAlert');
        }
    }

    initializeServices() {
        // Initialize Firebase
        if (window.FirebaseConfig) {
            window.FirebaseConfig.initializeFirebase();
        } else {
            console.warn('FirebaseConfig not available');
        }
        
        // Initialize Supabase
        if (window.SupabaseConfig) {
            this.supabase = window.SupabaseConfig.initializeSupabase();
        } else {
            console.warn('SupabaseConfig not available');
        }
    }

    // ==================== UI MANAGEMENT ====================
    showStep(stepNumber) {
        this.currentStep = stepNumber;
        
        // Update progress steps
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        
        // Mark completed steps
        for (let i = 1; i < stepNumber; i++) {
            const step = document.getElementById(`step${i}`);
            if (step) step.classList.add('completed');
        }
        
        // Mark active step
        const activeStep = document.getElementById(`step${stepNumber}`);
        if (activeStep) activeStep.classList.add('active');
        
        // Show/hide sections
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        const sectionId = stepNumber === 1 ? 'authSection' :
                         stepNumber === 2 ? 'otpSection' : 'caseCodeSection';
        document.getElementById(sectionId).classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    showAlert(message, type = 'error', elementId = 'authAlert') {
        const alert = document.getElementById(elementId);
        if (!alert) return;
        
        alert.textContent = message;
        alert.className = `alert alert-${type}`;
        alert.style.display = 'block';
        
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                alert.style.display = 'none';
            }, 5000);
        }
    }

    hideAlert(elementId = 'authAlert') {
        const alert = document.getElementById(elementId);
        if (alert) {
            alert.style.display = 'none';
        }
    }

    showLoading(section) {
        const loading = document.getElementById(`${section}Loading`);
        if (loading) {
            loading.style.display = 'block';
        }
    }

    hideLoading(section) {
        const loading = document.getElementById(`${section}Loading`);
        if (loading) {
            loading.style.display = 'none';
        }
    }

    // ==================== EVENT HANDLERS ====================
    setupEventListeners() {
        // Method selection buttons
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.method-btn').forEach(b => {
                    b.classList.remove('selected');
                });
                e.currentTarget.classList.add('selected');
                this.verificationMethod = e.currentTarget.dataset.method;
            });
        });

        // Authentication form submission
        document.getElementById('authForm')?.addEventListener('submit', (e) => this.handleAuthSubmit(e));

        // OTP input handling
        this.setupOTPInput();

        // OTP form submission
        document.getElementById('otpForm')?.addEventListener('submit', (e) => this.handleOTPSubmit(e));

        // Case code form submission
        document.getElementById('caseCodeForm')?.addEventListener('submit', (e) => this.handleCaseCodeSubmit(e));

        // Navigation buttons
        document.getElementById('backToAuthBtn')?.addEventListener('click', () => this.showStep(1));
        document.getElementById('resendOtpBtn')?.addEventListener('click', () => this.handleResendOTP());
        document.getElementById('newSearchBtn')?.addEventListener('click', () => {
            document.getElementById('caseCode').value = '';
            this.hideAlert('caseCodeAlert');
        });
    }

    setupOTPInput() {
        const inputs = document.querySelectorAll('.otp-input');
        
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                
                // Only allow numbers
                if (!/^\d*$/.test(value)) {
                    e.target.value = '';
                    return;
                }
                
                // Move to next input
                if (value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                
                this.updateOTPValue();
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    inputs[index - 1].focus();
                }
            });
            
            // Paste event for OTP
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text').replace(/\D/g, '');
                if (pasteData.length === 6) {
                    inputs.forEach((input, i) => {
                        input.value = pasteData[i] || '';
                    });
                    this.updateOTPValue();
                    document.getElementById('verifyOtpBtn').focus();
                }
            });
        });
    }

    updateOTPValue() {
        const inputs = document.querySelectorAll('.otp-input');
        const otp = Array.from(inputs).map(input => input.value).join('');
        document.getElementById('fullOtp').value = otp;
        
        // Enable verify button if all inputs are filled
        const verifyBtn = document.getElementById('verifyOtpBtn');
        if (verifyBtn) {
            verifyBtn.disabled = otp.length !== 6;
        }
    }

    // ==================== AUTHENTICATION FLOW ====================
    async handleAuthSubmit(e) {
        e.preventDefault();
        
        this.userIdentifier = document.getElementById('userIdentifier').value.trim();
        
        if (!this.userIdentifier) {
            this.showAlert('يرجى إدخال الهاتف أو البريد الإلكتروني');
            return;
        }

        // Validate identifier
        const isPhone = /^01[0-2|5]{1}[0-9]{8}$/.test(this.userIdentifier);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userIdentifier);
        
        if (!isPhone && !isEmail) {
            this.showAlert('يرجى إدخال رقم هاتف أو بريد إلكتروني صحيح');
            return;
        }

        if (this.verificationMethod === 'email' && !isEmail) {
            this.showAlert('يرجى إدخال بريد إلكتروني صحيح لاستخدام هذه الطريقة');
            return;
        }

        this.showLoading('auth');
        this.hideAlert();

        try {
            // Search for client
            const clientResult = await this.searchClient(this.userIdentifier);
            
            if (!clientResult.found) {
                throw new Error('لم يتم العثور على عميل بهذه البيانات');
            }

            this.clientData = clientResult.data;

            // Generate OTP
            this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            
            if (this.verificationMethod === 'sms') {
                // Send SMS via Firebase Cloud Function
                await this.sendOTPviaSMS(this.userIdentifier, this.generatedOTP, this.clientData.client_name);
                this.showAlert(`تم إرسال رمز التحقق إلى ${this.userIdentifier}`, 'success');
                
            } else {
                // Send Email via Firebase Cloud Function
                await this.sendMagicLink(this.userIdentifier, this.clientData.client_name, this.clientData.id);
                this.showAlert(`تم إرسال رابط التحقق إلى ${this.userIdentifier}`, 'success');
            }

            // Store verification data
            localStorage.setItem('verificationData', JSON.stringify({
                identifier: this.userIdentifier,
                method: this.verificationMethod,
                otp: this.generatedOTP,
                clientId: this.clientData.id,
                timestamp: Date.now()
            }));

            // Update UI and move to next step
            const otpMessage = document.getElementById('otpMessage');
            if (otpMessage) {
                otpMessage.textContent = 
                    this.verificationMethod === 'sms' 
                        ? `أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى ${this.userIdentifier}`
                        : `تحقق من بريدك الإلكتروني ${this.userIdentifier} وافتح الرابط المرسل`;
            }
            
            if (this.verificationMethod === 'sms') {
                this.startResendTimer();
            }
            
            this.showStep(2);

        } catch (error) {
            console.error('Authentication error:', error);
            this.showAlert(error.message || 'حدث خطأ أثناء التحقق');
        } finally {
            this.hideLoading('auth');
        }
    }

    async searchClient(identifier) {
        try {
            if (window.SupabaseConfig && window.SupabaseConfig.DatabaseService) {
                return await window.SupabaseConfig.DatabaseService.searchClient(identifier);
            } else {
                // Fallback if Supabase is not available
                throw new Error('خدمة قاعدة البيانات غير متاحة');
            }
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }

    // ==================== OTP VERIFICATION ====================
    async handleOTPSubmit(e) {
        e.preventDefault();
        
        const enteredOTP = document.getElementById('fullOtp').value;
        const storedData = JSON.parse(localStorage.getItem('verificationData'));
        
        if (!storedData) {
            this.showAlert('انتهت صلاحية الجلسة. يرجى البدء من جديد', 'error', 'otpAlert');
            this.showStep(1);
            return;
        }

        // Check if OTP is expired (10 minutes)
        if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
            this.showAlert('انتهت صلاحية الرمز. يرجى طلب رمز جديد', 'error', 'otpAlert');
            localStorage.removeItem('verificationData');
            this.showStep(1);
            return;
        }

        this.showLoading('otp');
        this.hideAlert('otpAlert');

        try {
            if (this.verificationMethod === 'sms') {
                // Verify OTP
                if (enteredOTP !== storedData.otp) {
                    throw new Error('الرمز غير صحيح');
                }
            }

            // Generate access token (valid for 12 hours)
            this.accessToken = this.generateAccessToken(storedData.clientId);
            
            // Store access token
            localStorage.setItem('clientAccess', JSON.stringify({
                token: this.accessToken,
                clientId: storedData.clientId,
                clientName: this.clientData.client_name,
                expiresAt: Date.now() + (12 * 60 * 60 * 1000) // 12 hours
            }));

            // Clear verification data
            localStorage.removeItem('verificationData');

            // Update welcome message
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) {
                welcomeMessage.textContent = 
                    `مرحباً ${this.clientData.client_name}، أدخل كود القضية للاستعلام عن حالتها`;
            }
            
            // Move to case code step
            this.showStep(3);
            
        } catch (error) {
            console.error('OTP verification error:', error);
            this.showAlert(error.message || 'حدث خطأ أثناء التحقق', 'error', 'otpAlert');
        } finally {
            this.hideLoading('otp');
        }
    }

    startResendTimer() {
        clearInterval(this.resendTimer);
        this.resendSeconds = 60;
        
        const resendBtn = document.getElementById('resendOtpBtn');
        const timerSpan = document.getElementById('resendTimer');
        
        if (resendBtn) resendBtn.disabled = true;
        if (timerSpan) timerSpan.textContent = `(${this.resendSeconds})`;
        
        this.resendTimer = setInterval(() => {
            this.resendSeconds--;
            if (timerSpan) timerSpan.textContent = `(${this.resendSeconds})`;
            
            if (this.resendSeconds <= 0) {
                clearInterval(this.resendTimer);
                if (resendBtn) {
                    resendBtn.disabled = false;
                    timerSpan.textContent = '';
                }
            }
        }, 1000);
    }

    async handleResendOTP() {
        if (this.resendTimer) return;
        
        try {
            this.showLoading('otp');
            
            // Generate new OTP
            this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            
            if (this.verificationMethod === 'sms') {
                await this.sendOTPviaSMS(this.userIdentifier, this.generatedOTP, this.clientData.client_name);
            } else {
                await this.sendMagicLink(this.userIdentifier, this.clientData.client_name, this.clientData.id);
            }
            
            // Update stored OTP
            const storedData = JSON.parse(localStorage.getItem('verificationData'));
            if (storedData) {
                storedData.otp = this.generatedOTP;
                storedData.timestamp = Date.now();
                localStorage.setItem('verificationData', JSON.stringify(storedData));
            }
            
            this.showAlert('تم إعادة إرسال رمز التحقق', 'success', 'otpAlert');
            
            // Clear OTP inputs
            document.querySelectorAll('.otp-input').forEach(input => {
                input.value = '';
            });
            document.getElementById('fullOtp').value = '';
            document.getElementById('verifyOtpBtn').disabled = true;
            
            // Start timer
            this.startResendTimer();
            
        } catch (error) {
            console.error('Resend error:', error);
            this.showAlert('فشل في إعادة الإرسال', 'error', 'otpAlert');
        } finally {
            this.hideLoading('otp');
        }
    }

    // ==================== CASE SEARCH ====================
    async handleCaseCodeSubmit(e) {
        e.preventDefault();
        
        const caseCode = document.getElementById('caseCode').value.trim();
        const accessData = JSON.parse(localStorage.getItem('clientAccess'));
        
        if (!caseCode) {
            this.showAlert('يرجى إدخال كود القضية', 'error', 'caseCodeAlert');
            return;
        }

        if (!accessData) {
            this.showAlert('انتهت صلاحية الجلسة. يرجى البدء من جديد', 'error', 'caseCodeAlert');
            this.showStep(1);
            return;
        }

        // Check if access token is expired
        if (Date.now() > accessData.expiresAt) {
            this.showAlert('انتهت صلاحية الجلسة. يرجى البدء من جديد', 'error', 'caseCodeAlert');
            localStorage.removeItem('clientAccess');
            this.showStep(1);
            return;
        }

        this.showLoading('caseCode');
        this.hideAlert('caseCodeAlert');

        try {
            // Search for case
            const caseResult = await this.searchCase(caseCode, this.userIdentifier);
            
            if (!caseResult.found) {
                throw new Error('كود القضية غير صحيح أو غير مرتبط بهذا العميل');
            }

            // Store case data for result page
            localStorage.setItem('currentCase', JSON.stringify({
                case: caseResult.data,
                sessions: caseResult.sessions || [],
                accessToken: accessData.token
            }));

            // Redirect to inquiry result page
            window.location.href = 'inquiry-result.html';

        } catch (error) {
            console.error('Case search error:', error);
            this.showAlert(error.message || 'حدث خطأ أثناء البحث', 'error', 'caseCodeAlert');
        } finally {
            this.hideLoading('caseCode');
        }
    }

    async searchCase(caseCode, clientIdentifier) {
        try {
            if (window.SupabaseConfig && window.SupabaseConfig.DatabaseService) {
                return await window.SupabaseConfig.DatabaseService.searchCase(caseCode, clientIdentifier);
            } else {
                throw new Error('خدمة قاعدة البيانات غير متاحة');
            }
        } catch (error) {
            console.error('Search case error:', error);
            throw error;
        }
    }

    // ==================== UTILITY FUNCTIONS ====================
    generateAccessToken(clientId) {
        return btoa(`${clientId}:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`);
    }

    async sendOTPviaSMS(phoneNumber, otp, clientName) {
        if (window.FirebaseConfig && window.FirebaseConfig.CloudFunctions) {
            return await window.FirebaseConfig.CloudFunctions.sendOTPviaSMS(phoneNumber, otp, clientName);
        } else {
            // Fallback simulation
            console.log(`📱 SMS to ${phoneNumber}: رمز التحقق: ${otp}`);
            return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
        }
    }

    async sendMagicLink(email, clientName, clientId) {
        if (window.FirebaseConfig && window.FirebaseConfig.CloudFunctions) {
            return await window.FirebaseConfig.CloudFunctions.sendMagicLink(email, clientName, clientId);
        } else {
            // Fallback simulation
            console.log(`📧 Email to ${email}: Magic link generated`);
            return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
        }
    }

    // ==================== URL PARAMETER HANDLING ====================
    handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const expired = urlParams.get('expired');
        
        if (expired) {
            this.showAlert('انتهت صلاحية الجلسة. يرجى إعادة المحاولة', 'error', 'authAlert');
        }
        
        if (token) {
            // Handle magic link
            try {
                const clientId = atob(token);
                // Store token for result page
                localStorage.setItem('magicLinkToken', token);
                // Skip to case code step
                this.showStep(3);
            } catch (error) {
                console.error('Token error:', error);
                this.showAlert('رابط التحقق غير صالح', 'error', 'authAlert');
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.clientInquiryApp = new ClientInquiryApp();
});
