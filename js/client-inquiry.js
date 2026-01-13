// ==================== CLIENT INQUIRY APP - PRODUCTION VERSION ====================
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
        this.verificationId = null; // لحفظ verificationId من Firebase
        this.supabase = null;
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Starting Client Inquiry App in PRODUCTION mode...');
            
            // Initialize Firebase first
            await this.initializeFirebase();
            
            // Initialize Supabase
            await this.initializeSupabase();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Handle URL parameters
            this.handleUrlParameters();
            
            console.log('✅ App initialized successfully in PRODUCTION mode');
            
            // Show welcome message
            this.showAlert('✅ النظام جاهز للإرسال الفعلي عبر Firebase', 'success');
            
        } catch (error) {
            console.error('❌ Initialization error:', error);
            this.showAlert(
                `❌ خطأ في التهيئة:<br>${error.message}<br><br>` +
                `تأكد من:<br>` +
                `1. اتصال الإنترنت<br>` +
                `2. تفعيل Phone Authentication في Firebase<br>` +
                `3. عدم حظر reCAPTCHA بواسطة الإضافات`,
                'error'
            );
        }
    }

    async initializeFirebase() {
        if (window.FirebaseConfig) {
            const firebaseApp = window.FirebaseConfig.initializeFirebase();
            if (!firebaseApp) {
                throw new Error('فشل في تهيئة Firebase');
            }
            console.log('✅ Firebase initialized for SMS sending');
        } else {
            throw new Error('ملف FirebaseConfig غير محمل');
        }
    }

    async initializeSupabase() {
        if (window.SupabaseConfig && window.SupabaseConfig.initializeSupabase) {
            this.supabase = window.SupabaseConfig.initializeSupabase();
            console.log('✅ Supabase initialized');
        } else {
            console.warn('⚠️ Supabase not available, using demo mode');
        }
    }

    // ==================== FIREBASE SMS - REAL SENDING ====================
    async sendRealSMS(phoneNumber) {
        try {
            console.log(`📱 Starting REAL SMS sending to: ${phoneNumber}`);
            
            if (!window.FirebaseConfig || !window.FirebaseConfig.SmsService) {
                throw new Error('خدمة SMS غير متاحة');
            }
            
            // Format phone number
            const formattedPhone = this.formatEgyptianPhoneNumber(phoneNumber);
            console.log(`📱 Formatted: ${phoneNumber} → ${formattedPhone}`);
            
            // Show sending status
            this.showAlert(`📤 جاري إرسال الرسالة إلى ${phoneNumber}...`, 'info');
            
            // Call Firebase SMS service
            const result = await window.FirebaseConfig.SmsService.sendOTP(formattedPhone, this.clientData?.client_name || 'العميل');
            
            // Save verification ID for later verification
            this.verificationId = result.verificationId;
            
            console.log('✅ SMS sent successfully via Firebase. Verification ID:', this.verificationId);
            
            return {
                success: true,
                message: '✅ تم إرسال رمز التحقق إلى هاتفك بنجاح',
                phoneNumber: phoneNumber,
                verificationId: this.verificationId
            };
            
        } catch (error) {
            console.error('❌ Real SMS sending failed:', error);
            throw error;
        }
    }

    async verifyRealOTP(otpCode) {
        try {
            if (!this.verificationId) {
                throw new Error('لم يتم إرسال رمز التحقق بعد');
            }
            
            console.log(`🔐 Verifying REAL OTP: ${otpCode}`);
            
            const result = await window.FirebaseConfig.SmsService.verifyOTP(this.verificationId, otpCode);
            
            console.log('✅ OTP verified successfully via Firebase');
            
            return {
                success: true,
                verified: true,
                message: '✅ تم التحقق من الرمز بنجاح'
            };
            
        } catch (error) {
            console.error('❌ Real OTP verification failed:', error);
            throw error;
        }
    }

    // ==================== AUTHENTICATION FLOW - PRODUCTION ====================
    async handleAuthSubmit(e) {
        e.preventDefault();
        
        this.userIdentifier = document.getElementById('userIdentifier').value.trim();
        
        if (!this.userIdentifier) {
            this.showAlert('يرجى إدخال رقم الهاتف');
            return;
        }

        // Validate Egyptian phone number
        if (!this.validateEgyptianPhoneNumber(this.userIdentifier)) {
            this.showAlert(
                'رقم الهاتف غير صحيح<br>' +
                'يجب أن يكون:<br>' +
                '• 11 رقم (مثال: 01101076000)<br>' +
                '• يبدأ بـ 01<br>' +
                '• الرقم الثاني: 0, 1, 2, أو 5',
                'error'
            );
            return;
        }

        // Show loading
        const sendBtn = document.getElementById('sendCodeBtn');
        const originalText = sendBtn.innerHTML;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري إرسال الرسالة...';
        sendBtn.disabled = true;
        
        this.showLoading('auth');
        this.hideAlert();

        try {
            console.log('🔍 Searching for client in database...');
            
            // Search for client (real or simulated)
            const clientResult = await this.searchClient(this.userIdentifier);
            
            if (!clientResult.found) {
                throw new Error('رقم الهاتف غير مسجل في النظام. تأكد من التسجيل أولاً');
            }
            
            this.clientData = clientResult.data;
            console.log('✅ Client found:', this.clientData.client_name);
            
            // Send REAL SMS via Firebase
            console.log('📤 Sending REAL SMS via Firebase...');
            
            const smsResult = await this.sendRealSMS(this.userIdentifier);
            
            // Store verification data
            localStorage.setItem('verificationData', JSON.stringify({
                identifier: this.userIdentifier,
                method: 'sms',
                clientId: this.clientData.id,
                clientName: this.clientData.client_name,
                verificationId: this.verificationId,
                timestamp: Date.now(),
                expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes
            }));
            
            // Update UI
            const otpMessage = document.getElementById('otpMessage');
            if (otpMessage) {
                otpMessage.innerHTML = `
                    أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى<br>
                    <strong>${this.userIdentifier}</strong><br>
                    <small>📱 تم الإرسال فعلياً عبر Firebase</small>
                `;
            }
            
            // Show success message
            this.showAlert(
                `✅ تم إرسال رمز التحقق إلى ${this.userIdentifier}<br>` +
                `<small>قد تستغرق الرسالة دقيقة للوصول</small>`,
                'success'
            );
            
            // Start resend timer
            this.startResendTimer();
            
            // Move to OTP step
            this.showStep(2);
            
        } catch (error) {
            console.error('Authentication error:', error);
            
            // Show detailed error
            let errorMsg = error.message;
            
            if (error.message.includes('quota')) {
                errorMsg += '<br><br>✅ الحل: استخدم رقم الاختبار في Firebase Console';
            } else if (error.message.includes('captcha')) {
                errorMsg += '<br><br>✅ الحل: عطّل إضافات حظر الإعلانات مؤقتاً';
            }
            
            this.showAlert(errorMsg, 'error');
            
        } finally {
            sendBtn.innerHTML = originalText;
            sendBtn.disabled = false;
            this.hideLoading('auth');
        }
    }

    async handleOTPSubmit(e) {
        e.preventDefault();
        
        const enteredOTP = document.getElementById('fullOtp').value;
        
        if (enteredOTP.length !== 6) {
            this.showAlert('الرمز يجب أن يكون 6 أرقام', 'error', 'otpAlert');
            return;
        }

        const storedData = JSON.parse(localStorage.getItem('verificationData'));
        
        if (!storedData) {
            this.showAlert('انتهت الجلسة. ابدأ من جديد', 'error', 'otpAlert');
            this.showStep(1);
            return;
        }

        // Check if OTP is expired
        if (Date.now() > storedData.expiresAt) {
            this.showAlert('انتهت صلاحية الرمز. اطلب رمز جديد', 'error', 'otpAlert');
            localStorage.removeItem('verificationData');
            this.showStep(1);
            return;
        }

        // Show loading
        const verifyBtn = document.getElementById('verifyOtpBtn');
        const originalText = verifyBtn.innerHTML;
        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحقق...';
        verifyBtn.disabled = true;
        
        this.showLoading('otp');
        this.hideAlert('otpAlert');

        try {
            // Verify REAL OTP with Firebase
            console.log('🔐 Verifying OTP with Firebase...');
            
            const verificationResult = await this.verifyRealOTP(enteredOTP);
            
            if (!verificationResult.verified) {
                throw new Error('فشل التحقق من الرمز');
            }
            
            // Generate access token
            this.accessToken = this.generateAccessToken(storedData.clientId);
            
            // Store access token
            localStorage.setItem('clientAccess', JSON.stringify({
                token: this.accessToken,
                clientId: storedData.clientId,
                clientName: storedData.clientName,
                identifier: this.userIdentifier,
                timestamp: Date.now(),
                expiresAt: Date.now() + (12 * 60 * 60 * 1000) // 12 hours
            }));

            // Clear verification data
            localStorage.removeItem('verificationData');

            // Stop resend timer
            if (this.resendTimer) {
                clearInterval(this.resendTimer);
                this.resendTimer = null;
            }

            // Show success
            this.showAlert('✅ تم التحقق بنجاح! يمكنك الآن البحث عن قضيتك', 'success', 'otpAlert');
            
            // Update welcome message
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) {
                welcomeMessage.textContent = `مرحباً ${storedData.clientName}، أدخل كود القضية`;
            }
            
            // Move to case code step
            setTimeout(() => {
                this.showStep(3);
            }, 1500);
            
        } catch (error) {
            console.error('OTP verification error:', error);
            
            // Shake OTP inputs
            document.querySelectorAll('.otp-input').forEach(input => {
                input.style.animation = 'shake 0.5s ease';
                setTimeout(() => input.style.animation = '', 500);
            });
            
            this.showAlert(error.message || 'الرمز غير صحيح', 'error', 'otpAlert');
            
            // Clear inputs
            document.querySelectorAll('.otp-input').forEach(input => input.value = '');
            document.getElementById('fullOtp').value = '';
            
        } finally {
            verifyBtn.innerHTML = originalText;
            verifyBtn.disabled = false;
            this.hideLoading('otp');
        }
    }

    // ==================== UTILITY FUNCTIONS ====================
    formatEgyptianPhoneNumber(phoneNumber) {
        // Remove all non-digits
        let cleaned = phoneNumber.replace(/\D/g, '');
        
        // Check length
        if (cleaned.length !== 11) {
            throw new Error('يجب أن يكون الرقم 11 رقم');
        }
        
        // Check if starts with 01
        if (!cleaned.startsWith('01')) {
            throw new Error('يجب أن يبدأ الرقم بـ 01');
        }
        
        // Remove leading 0 and add +20
        return `+20${cleaned.substring(1)}`;
    }

    validateEgyptianPhoneNumber(phoneNumber) {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const pattern = /^01[0-2|5]{1}[0-9]{8}$/;
        return pattern.test(cleaned);
    }

    async searchClient(identifier) {
        try {
            if (window.SupabaseConfig && window.SupabaseConfig.DatabaseService) {
                return await window.SupabaseConfig.DatabaseService.searchClient(identifier);
            } else {
                // For testing, simulate finding client
                console.log('🔍 [TEST] Simulating client search for:', identifier);
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                return {
                    found: true,
                    data: {
                        id: 'test-client-' + Date.now(),
                        client_name: 'محمود عبد الحميد',
                        client_phone: identifier,
                        client_email: 'test@example.com',
                        client_role: 'عميل'
                    }
                };
            }
        } catch (error) {
            console.error('Search error:', error);
            throw new Error('خطأ في البحث. حاول مرة أخرى');
        }
    }

    generateAccessToken(clientId) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return btoa(`${clientId}:${timestamp}:${random}`);
    }

    startResendTimer() {
        clearInterval(this.resendTimer);
        this.resendSeconds = 60;
        
        const resendBtn = document.getElementById('resendOtpBtn');
        const timerSpan = document.getElementById('resendTimer');
        
        if (resendBtn) {
            resendBtn.disabled = true;
            resendBtn.style.opacity = '0.5';
        }
        
        if (timerSpan) {
            timerSpan.textContent = `(${this.resendSeconds})`;
        }
        
        this.resendTimer = setInterval(() => {
            this.resendSeconds--;
            
            if (timerSpan) {
                timerSpan.textContent = `(${this.resendSeconds})`;
            }
            
            if (this.resendSeconds <= 0) {
                clearInterval(this.resendTimer);
                if (resendBtn) {
                    resendBtn.disabled = false;
                    resendBtn.style.opacity = '1';
                    timerSpan.textContent = '';
                }
            }
        }, 1000);
    }

    async handleResendOTP() {
        if (this.resendTimer) return;
        
        try {
            this.showLoading('otp');
            
            // Resend REAL SMS
            await this.sendRealSMS(this.userIdentifier);
            
            this.showAlert('✅ تم إعادة إرسال رمز التحقق', 'success', 'otpAlert');
            
            // Clear OTP inputs
            document.querySelectorAll('.otp-input').forEach(input => input.value = '');
            document.getElementById('fullOtp').value = '';
            
            // Start timer
            this.startResendTimer();
            
        } catch (error) {
            console.error('Resend error:', error);
            this.showAlert('فشل في إعادة الإرسال', 'error', 'otpAlert');
        } finally {
            this.hideLoading('otp');
        }
    }

    showStep(stepNumber) {
        this.currentStep = stepNumber;
        
        // Update UI (same as before)
        // ... [ابقى نفس كود showStep]
    }

    showAlert(message, type = 'error', elementId = 'authAlert') {
        // ... [ابقى نفس كود showAlert]
    }

    showLoading(section) {
        // ... [ابقى نفس كود showLoading]
    }

    hideLoading(section) {
        // ... [ابقى نفس كود hideLoading]
    }

    setupEventListeners() {
        // ... [ابقى نفس كود setupEventListeners]
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Launching PRODUCTION Client Inquiry System');
    window.clientInquiryApp = new ClientInquiryApp();
});
