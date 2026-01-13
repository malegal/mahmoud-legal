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
        this.supabase = null;
        this.firebaseInitialized = false;
        this.confirmationResult = null;
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Starting Client Inquiry App initialization...');
            
            await this.initializeServices();
            this.setupEventListeners();
            this.handleUrlParameters();
            
            console.log('✅ Client Inquiry App initialized successfully');
            
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logEvent('app_initialized', {
                    page: 'client_inquiry',
                    timestamp: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('❌ App initialization error:', error);
            this.showAlert('حدث خطأ في تهيئة النظام. يرجى تحديث الصفحة.', 'error', 'authAlert');
        }
    }

    async initializeServices() {
        try {
            if (window.FirebaseConfig) {
                await window.FirebaseConfig.initializeFirebase();
                this.firebaseInitialized = true;
                console.log('✅ Firebase service initialized');
            }
            
            if (window.SupabaseConfig) {
                this.supabase = window.SupabaseConfig.initializeSupabase();
                console.log('✅ Supabase service initialized');
            }
        } catch (error) {
            console.error('Service initialization error:', error);
            throw error;
        }
    }

    // ==================== FORMAT PHONE NUMBER ====================
    formatEgyptianPhoneNumber(phoneNumber) {
        try {
            // إزالة جميع الأحرف غير رقمية
            let cleaned = phoneNumber.replace(/\D/g, '');
            
            // التحقق من الطول (11 رقم مصري)
            if (cleaned.length !== 11) {
                throw new Error('رقم الهاتف يجب أن يكون 11 رقماً (مثال: 01101076000)');
            }
            
            // التحقق من البداية (01)
            if (!cleaned.startsWith('01')) {
                throw new Error('رقم الهاتف المصري يجب أن يبدأ بـ 01');
            }
            
            // التحقق من الرقم الثاني (1, 2, 0, 5)
            const secondDigit = cleaned.charAt(1);
            const validSecondDigits = ['0', '1', '2', '5'];
            if (!validSecondDigits.includes(secondDigit)) {
                throw new Error('رقم الهاتف غير صحيح. يجب أن يكون الرقم الثاني 0, 1, 2, أو 5');
            }
            
            // التحقق من أن جميع الأرقام صحيحة
            if (!/^\d+$/.test(cleaned)) {
                throw new Error('يجب أن يحتوي رقم الهاتف على أرقام فقط');
            }
            
            // إزالة الصفر الأول وإضافة +20
            const internationalNumber = `+20${cleaned.substring(1)}`;
            console.log(`📱 Converted: ${phoneNumber} → ${internationalNumber}`);
            
            return internationalNumber;
        } catch (error) {
            console.error('Phone number formatting error:', error);
            throw error;
        }
    }

    validateEgyptianPhoneNumber(phoneNumber) {
        // الصيغة: 01 + (0,1,2,5) + 8 أرقام = 11 رقم
        const pattern = /^01[0-2|5]{1}[0-9]{8}$/;
        return pattern.test(phoneNumber.replace(/\D/g, ''));
    }

    // ==================== FIREBASE SMS WITH INTERNATIONAL FORMAT ====================
    async sendOTPviaFirebase(phoneNumber) {
        try {
            if (!window.FirebaseConfig || !window.FirebaseConfig.getAuth) {
                throw new Error('خدمة Firebase غير متاحة');
            }

            // تحويل الرقم إلى التنسيق الدولي
            const formattedPhoneNumber = this.formatEgyptianPhoneNumber(phoneNumber);
            console.log(`📱 Firebase SMS to: ${formattedPhoneNumber}`);

            const auth = window.FirebaseConfig.getAuth();
            
            // For development/testing
            if (window.FirebaseConfig && window.FirebaseConfig.ENVIRONMENT === 'development') {
                console.log(`🔐 [DEV MODE] Would send SMS to: ${formattedPhoneNumber}`);
                console.log(`🔐 [DEV MODE] OTP: ${this.generatedOTP}`);
                
                // Simulate Firebase response for development
                this.confirmationResult = {
                    verificationId: 'dev-verification-id-' + Date.now(),
                    confirm: async (otp) => {
                        console.log(`🔐 [DEV MODE] Verifying OTP: ${otp}`);
                        if (otp === this.generatedOTP) {
                            return {
                                user: {
                                    uid: 'dev-user-id-' + Date.now(),
                                    phoneNumber: formattedPhoneNumber
                                }
                            };
                        } else {
                            throw new Error('Invalid OTP');
                        }
                    }
                };
                
                // Simulate delay
                return new Promise(resolve => {
                    setTimeout(() => {
                        console.log('✅ [DEV MODE] Firebase SMS simulation completed');
                        
                        // Show the OTP for testing in development mode
                        this.showAlert(
                            `<strong>[وضع التطوير]</strong><br>` +
                            `📱 الرقم: ${formattedPhoneNumber}<br>` +
                            `🔐 رمز التحقق: <strong style="font-size: 1.2em; color: #f1d18a;">${this.generatedOTP}</strong><br><br>` +
                            `<small>في وضع الإنتاج سيتم إرسال الرمز تلقائياً إلى الهاتف</small>`,
                            'info',
                            'authAlert'
                        );
                        
                        resolve();
                    }, 1500);
                });
            } else {
                // Production: Use Firebase Authentication
                console.log(`📱 [PRODUCTION] Sending SMS via Firebase to: ${formattedPhoneNumber}`);
                
                // Create invisible reCAPTCHA verifier
                let appVerifier;
                
                // Check if recaptcha container exists
                let recaptchaContainer = document.getElementById('recaptcha-container');
                if (!recaptchaContainer) {
                    recaptchaContainer = document.createElement('div');
                    recaptchaContainer.id = 'recaptcha-container';
                    recaptchaContainer.style.display = 'none';
                    document.body.appendChild(recaptchaContainer);
                }
                
                // Initialize reCAPTCHA verifier
                appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                        console.log('reCAPTCHA solved successfully');
                    },
                    'expired-callback': () => {
                        console.log('reCAPTCHA expired');
                    }
                });

                // Send SMS verification code
                this.confirmationResult = await auth.signInWithPhoneNumber(
                    formattedPhoneNumber, 
                    appVerifier
                );
                
                console.log('✅ Firebase SMS sent successfully');
                this.showAlert(`✅ تم إرسال رمز التحقق إلى ${phoneNumber}`, 'success');
                return this.confirmationResult;
            }
        } catch (error) {
            console.error('Firebase SMS error:', error);
            
            // Translate Firebase error messages to Arabic
            let errorMessage;
            switch(error.code) {
                case 'auth/invalid-phone-number':
                    errorMessage = 'رقم الهاتف غير صحيح. تأكد من إدخال رقم مصري صحيح (11 رقم)';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'تم إرسال العديد من الطلبات. يرجى المحاولة لاحقاً';
                    break;
                case 'auth/quota-exceeded':
                    errorMessage = 'تم تجاوز الحد المسموح للإرسال. يرجى المحاولة لاحقاً';
                    break;
                case 'auth/captcha-check-failed':
                    errorMessage = 'فشل التحقق من reCAPTCHA. يرجى المحاولة مرة أخرى';
                    break;
                default:
                    errorMessage = `خطأ في إرسال الرسالة: ${error.message}`;
            }
            
            throw new Error(errorMessage);
        }
    }

    async verifyFirebaseOTP(otp) {
        try {
            if (!this.confirmationResult) {
                throw new Error('لا توجد نتيجة تأكيد متاحة');
            }

            if (window.FirebaseConfig && window.FirebaseConfig.ENVIRONMENT === 'development') {
                console.log(`🔐 [DEV MODE] Verifying OTP: ${otp}`);
                
                const result = await this.confirmationResult.confirm(otp);
                console.log('✅ [DEV MODE] OTP verified successfully');
                return result;
            } else {
                // Production: Verify with Firebase
                console.log(`🔐 [PRODUCTION] Verifying Firebase OTP: ${otp}`);
                
                const result = await this.confirmationResult.confirm(otp);
                console.log('✅ Firebase OTP verified successfully');
                return result;
            }
        } catch (error) {
            console.error('Firebase OTP verification error:', error);
            
            if (error.code) {
                switch(error.code) {
                    case 'auth/invalid-verification-code':
                        throw new Error('الرمز غير صحيح. يرجى المحاولة مرة أخرى');
                    case 'auth/code-expired':
                        throw new Error('انتهت صلاحية الرمز. يرجى طلب رمز جديد');
                    case 'auth/missing-verification-id':
                        throw new Error('انتهت الجلسة. يرجى البدء من جديد');
                    default:
                        throw new Error(`خطأ في التحقق: ${error.message}`);
                }
            }
            throw error;
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
        const isPhone = this.validateEgyptianPhoneNumber(this.userIdentifier);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userIdentifier);
        
        if (!isPhone && !isEmail) {
            this.showAlert(
                'يرجى إدخال:<br>' +
                '1. رقم هاتف مصري صحيح (11 رقم يبدأ بـ 01)<br>' +
                'مثال: <strong>01101076000</strong><br>' +
                '2. أو بريد إلكتروني صحيح<br>' +
                'مثال: <strong>email@example.com</strong>',
                'error'
            );
            return;
        }

        if (this.verificationMethod === 'email' && !isEmail) {
            this.showAlert('للاستخدام البريد الإلكتروني، يرجى إدخال بريد إلكتروني صحيح');
            return;
        }

        // تحسين رسالة للمستخدم عند استخدام SMS
        if (this.verificationMethod === 'sms' && isPhone) {
            const formattedNumber = this.formatEgyptianPhoneNumber(this.userIdentifier);
            this.showAlert(
                `📱 سيتم إرسال رمز التحقق إلى:<br>` +
                `<strong>${this.userIdentifier}</strong><br>` +
                `🌍 التنسيق الدولي: ${formattedNumber}`,
                'info'
            );
        }

        this.showLoading('auth');
        this.hideAlert();
        this.disableForm('authForm', true);

        try {
            // Analytics
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logInquiryStart(this.userIdentifier);
            }

            // Search for client
            const clientResult = await this.searchClient(this.userIdentifier);
            
            if (!clientResult.found) {
                throw new Error('لم يتم العثور على عميل بهذه البيانات<br>تأكد من رقم الهاتف أو البريد الإلكتروني');
            }

            this.clientData = clientResult.data;

            // Generate OTP
            this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Analytics
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logOTPSent(this.verificationMethod, this.userIdentifier);
            }

            if (this.verificationMethod === 'sms') {
                // Send SMS via Firebase Authentication
                await this.sendOTPviaFirebase(this.userIdentifier);
                
            } else {
                // Send Email via Firebase Cloud Function
                await this.sendMagicLink(this.userIdentifier, this.clientData.client_name, this.clientData.id);
                this.showAlert(`✅ تم إرسال رابط التحقق إلى ${this.userIdentifier}`, 'success');
            }

            // Store verification data
            localStorage.setItem('verificationData', JSON.stringify({
                identifier: this.userIdentifier,
                method: this.verificationMethod,
                otp: this.generatedOTP,
                clientId: this.clientData.id,
                clientName: this.clientData.client_name,
                timestamp: Date.now(),
                expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes
            }));

            // Update UI and move to next step
            const otpMessage = document.getElementById('otpMessage');
            if (otpMessage) {
                if (this.verificationMethod === 'sms') {
                    otpMessage.innerHTML = `
                        أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى<br>
                        <strong>${this.userIdentifier}</strong>
                        ${window.FirebaseConfig && window.FirebaseConfig.ENVIRONMENT === 'development' 
                            ? `<br><small style="color: #f1d18a;">[وضع التطوير] الرمز: ${this.generatedOTP}</small>` 
                            : ''}
                    `;
                } else {
                    otpMessage.textContent = `تحقق من بريدك الإلكتروني ${this.userIdentifier} وافتح الرابط المرسل`;
                }
            }
            
            if (this.verificationMethod === 'sms') {
                this.startResendTimer();
            }
            
            // Clear OTP inputs
            document.querySelectorAll('.otp-input').forEach(input => {
                input.value = '';
            });
            document.getElementById('fullOtp').value = '';
            
            this.showStep(2);

        } catch (error) {
            console.error('Authentication error:', error);
            
            let errorMessage;
            if (error.code) {
                switch(error.code) {
                    case 'auth/invalid-phone-number':
                        errorMessage = 'رقم الهاتف غير صحيح. تأكد من:<br>1. الرقم يبدأ بـ 01<br>2. الرقم 11 رقم<br>3. مثال: 01101076000';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'تم إرسال العديد من الطلبات. يرجى الانتظار دقيقة والمحاولة لاحقاً';
                        break;
                    default:
                        errorMessage = error.message;
                }
            } else {
                errorMessage = error.message.includes('Network') 
                    ? 'فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت'
                    : error.message;
            }
            
            this.showAlert(errorMessage);
            
            // Analytics: log error
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logEvent('auth_error', {
                    error: error.message,
                    identifier: this.userIdentifier.substring(0, 3) + '...'
                });
            }
        } finally {
            this.hideLoading('auth');
            this.disableForm('authForm', false);
        }
    }

    async searchClient(identifier) {
        try {
            if (window.SupabaseConfig && window.SupabaseConfig.DatabaseService) {
                return await window.SupabaseConfig.DatabaseService.searchClient(identifier);
            } else {
                // Fallback simulation for development
                console.log('🔍 [DEV] Simulating client search for:', identifier);
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                return {
                    found: true,
                    data: {
                        id: 'dev-client-' + Date.now(),
                        client_name: 'عميل تجريبي',
                        client_phone: identifier.includes('@') ? '01101076000' : identifier,
                        client_email: identifier.includes('@') ? identifier : 'dev@example.com',
                        client_role: 'مدعي'
                    },
                    identifierType: identifier.includes('@') ? 'email' : 'phone'
                };
            }
        } catch (error) {
            console.error('Search error:', error);
            throw new Error('فشل في البحث عن العميل. يرجى المحاولة مرة أخرى.');
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

        // Check if OTP is expired
        if (Date.now() > storedData.expiresAt) {
            this.showAlert('انتهت صلاحية الرمز. يرجى طلب رمز جديد', 'error', 'otpAlert');
            localStorage.removeItem('verificationData');
            this.showStep(1);
            return;
        }

        this.showLoading('otp');
        this.hideAlert('otpAlert');
        this.disableForm('otpForm', true);

        try {
            if (this.verificationMethod === 'sms') {
                // Verify OTP with Firebase
                await this.verifyFirebaseOTP(enteredOTP);
            } else {
                // For email verification, use the stored OTP
                if (enteredOTP !== storedData.otp) {
                    throw new Error('الرمز غير صحيح. يرجى المحاولة مرة أخرى');
                }
            }

            // Generate secure access token
            this.accessToken = this.generateAccessToken(storedData.clientId);
            
            // Store access token with expiration
            localStorage.setItem('clientAccess', JSON.stringify({
                token: this.accessToken,
                clientId: storedData.clientId,
                clientName: storedData.clientName || this.clientData?.client_name,
                identifier: this.userIdentifier,
                timestamp: Date.now(),
                expiresAt: Date.now() + (12 * 60 * 60 * 1000)
            }));

            // Clear verification data
            localStorage.removeItem('verificationData');

            // Stop resend timer
            if (this.resendTimer) {
                clearInterval(this.resendTimer);
                this.resendTimer = null;
            }

            // Update welcome message
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) {
                welcomeMessage.textContent = 
                    `مرحباً ${storedData.clientName || 'عزيزي العميل'}، أدخل كود القضية للاستعلام عن حالتها`;
            }
            
            // Clear any existing case code
            const caseCodeInput = document.getElementById('caseCode');
            if (caseCodeInput) {
                caseCodeInput.value = '';
            }
            
            // Analytics: log successful verification
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logEvent('otp_verified', {
                    method: this.verificationMethod,
                    clientId: storedData.clientId.substring(0, 8) + '...'
                });
            }
            
            // Move to case code step
            this.showStep(3);
            
        } catch (error) {
            console.error('OTP verification error:', error);
            
            // Shake OTP inputs for visual feedback
            document.querySelectorAll('.otp-input').forEach(input => {
                input.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            });
            
            this.showAlert(error.message || 'حدث خطأ أثناء التحقق', 'error', 'otpAlert');
            
            // Clear OTP inputs on error
            document.querySelectorAll('.otp-input').forEach(input => {
                input.value = '';
            });
            document.getElementById('fullOtp').value = '';
            document.getElementById('verifyOtpBtn').disabled = true;
            
        } finally {
            this.hideLoading('otp');
            this.disableForm('otpForm', false);
        }
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
            timerSpan.style.color = '#f1d18a';
        }
        
        this.resendTimer = setInterval(() => {
            this.resendSeconds--;
            
            if (timerSpan) {
                timerSpan.textContent = `(${this.resendSeconds})`;
                
                if (this.resendSeconds <= 10) {
                    timerSpan.style.color = '#EF4444';
                }
            }
            
            if (this.resendSeconds <= 0) {
                clearInterval(this.resendTimer);
                this.resendTimer = null;
                
                if (resendBtn) {
                    resendBtn.disabled = false;
                    resendBtn.style.opacity = '1';
                    timerSpan.textContent = '';
                    timerSpan.style.color = '';
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
                // Resend SMS via Firebase
                await this.sendOTPviaFirebase(this.userIdentifier);
                
                // Update stored OTP
                const storedData = JSON.parse(localStorage.getItem('verificationData'));
                if (storedData) {
                    storedData.otp = this.generatedOTP;
                    storedData.timestamp = Date.now();
                    storedData.expiresAt = Date.now() + (10 * 60 * 1000);
                    localStorage.setItem('verificationData', JSON.stringify(storedData));
                }
                
                this.showAlert('✅ تم إعادة إرسال رمز التحقق', 'success', 'otpAlert');
                
            } else {
                // Resend email
                await this.sendMagicLink(this.userIdentifier, this.clientData.client_name, this.clientData.id);
                this.showAlert('✅ تم إعادة إرسال رابط التحقق', 'success', 'otpAlert');
            }
            
            // Clear OTP inputs
            document.querySelectorAll('.otp-input').forEach(input => {
                input.value = '';
            });
            document.getElementById('fullOtp').value = '';
            document.getElementById('verifyOtpBtn').disabled = true;
            
            // Start timer
            this.startResendTimer();
            
            // Analytics: log resend
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logEvent('otp_resent', {
                    method: this.verificationMethod
                });
            }
            
        } catch (error) {
            console.error('Resend error:', error);
            this.showAlert('فشل في إعادة الإرسال. يرجى المحاولة مرة أخرى', 'error', 'otpAlert');
        } finally {
            this.hideLoading('otp');
        }
    }

    // ==================== UI MANAGEMENT FUNCTIONS ====================
    showStep(stepNumber) {
        this.currentStep = stepNumber;
        
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        
        for (let i = 1; i < stepNumber; i++) {
            const step = document.getElementById(`step${i}`);
            if (step) step.classList.add('completed');
        }
        
        const activeStep = document.getElementById(`step${stepNumber}`);
        if (activeStep) activeStep.classList.add('active');
        
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        const sectionId = stepNumber === 1 ? 'authSection' :
                         stepNumber === 2 ? 'otpSection' : 'caseCodeSection';
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');
            section.style.animation = 'fadeIn 0.5s ease';
            
            setTimeout(() => {
                const firstInput = section.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log(`📊 Changed to step ${stepNumber}`);
        
        if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
            window.FirebaseConfig.AnalyticsService.logEvent('step_changed', {
                step: stepNumber,
                method: this.verificationMethod
            });
        }
    }

    showAlert(message, type = 'error', elementId = 'authAlert') {
        const alert = document.getElementById(elementId);
        if (!alert) return;
        
        if (message.includes('<')) {
            alert.innerHTML = message;
        } else {
            alert.textContent = message;
        }
        
        alert.className = `alert alert-${type}`;
        alert.style.display = 'block';
        alert.style.animation = 'slideIn 0.3s ease';
        
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                this.hideAlert(elementId);
            }, 5000);
        }
        
        console.log(`📢 Alert (${type}): ${message.replace(/<[^>]*>/g, '')}`);
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
            loading.style.animation = 'fadeIn 0.3s ease';
        }
    }

    hideLoading(section) {
        const loading = document.getElementById(`${section}Loading`);
        if (loading) {
            loading.style.display = 'none';
        }
    }

    disableForm(formId, disabled = true) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, button, select, textarea');
        inputs.forEach(input => {
            input.disabled = disabled;
        });
    }

    // ==================== REMAINING FUNCTIONS ====================
    // [بقية الدوال تبقى كما هي بدون تغيير]
    // setupEventListeners, setupOTPInput, updateOTPValue,
    // validateCaseCode, handleCaseCodeSubmit, searchCase,
    // generateAccessToken, sendMagicLink, checkSessionValidity,
    // handleUrlParameters, cleanup
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('#shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    window.clientInquiryApp = new ClientInquiryApp();
    
    window.addEventListener('beforeunload', () => {
        if (window.clientInquiryApp) {
            window.clientInquiryApp.cleanup();
        }
    });
});
