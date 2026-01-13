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
        this.confirmationResult = null; // لحفظ نتيجة تأكيد رقم الهاتف
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Starting Client Inquiry App initialization...');
            
            // Initialize services
            await this.initializeServices();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Handle URL parameters for magic links
            this.handleUrlParameters();
            
            // Test connections
            await this.testConnections();
            
            console.log('✅ Client Inquiry App initialized successfully');
            
            // Log analytics event
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
            // Initialize Firebase
            if (window.FirebaseConfig) {
                await window.FirebaseConfig.initializeFirebase();
                this.firebaseInitialized = true;
                console.log('✅ Firebase service initialized');
            } else {
                console.warn('⚠️ FirebaseConfig not available');
            }
            
            // Initialize Supabase
            if (window.SupabaseConfig) {
                this.supabase = window.SupabaseConfig.initializeSupabase();
                console.log('✅ Supabase service initialized');
            } else {
                console.warn('⚠️ SupabaseConfig not available');
            }
        } catch (error) {
            console.error('Service initialization error:', error);
            throw error;
        }
    }

    async testConnections() {
        try {
            // Test Firebase connection
            if (window.FirebaseConfig) {
                const firebaseTest = await window.FirebaseConfig.testFirebaseConnection();
                console.log('Firebase test result:', firebaseTest);
            }
            
            // Test Supabase connection
            if (window.SupabaseConfig && window.SupabaseConfig.DatabaseService) {
                const supabaseTest = await window.SupabaseConfig.DatabaseService.testConnection();
                console.log('Supabase test result:', supabaseTest);
            }
            
            return true;
        } catch (error) {
            console.warn('Connection tests incomplete:', error);
            return false;
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
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');
            
            // Add animation
            section.style.animation = 'fadeIn 0.5s ease';
            
            // Focus on first input
            setTimeout(() => {
                const firstInput = section.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Log step change
        console.log(`📊 Changed to step ${stepNumber}`);
        
        // Analytics
        if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
            window.FirebaseConfig.AnalyticsService.logEvent('step_changed', {
                step: stepNumber,
                method: this.verificationMethod
            });
        }
    }

    showAlert(message, type = 'error', elementId = 'authAlert') {
        const alert = document.getElementById(elementId);
        if (!alert) {
            console.warn(`Alert element not found: ${elementId}`);
            return;
        }
        
        // Create HTML if message contains HTML
        if (message.includes('<')) {
            alert.innerHTML = message;
        } else {
            alert.textContent = message;
        }
        
        alert.className = `alert alert-${type}`;
        alert.style.display = 'block';
        alert.style.animation = 'slideIn 0.3s ease';
        
        // Auto-hide success/info messages
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                this.hideAlert(elementId);
            }, 5000);
        }
        
        // Log alert
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
                
                console.log(`📱 Selected verification method: ${this.verificationMethod}`);
                
                // Analytics
                if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                    window.FirebaseConfig.AnalyticsService.logEvent('verification_method_selected', {
                        method: this.verificationMethod
                    });
                }
            });
        });

        // Authentication form submission
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', (e) => this.handleAuthSubmit(e));
        }

        // OTP input handling
        this.setupOTPInput();

        // OTP form submission
        const otpForm = document.getElementById('otpForm');
        if (otpForm) {
            otpForm.addEventListener('submit', (e) => this.handleOTPSubmit(e));
        }

        // Case code form submission
        const caseCodeForm = document.getElementById('caseCodeForm');
        if (caseCodeForm) {
            caseCodeForm.addEventListener('submit', (e) => this.handleCaseCodeSubmit(e));
        }

        // Navigation buttons
        const backToAuthBtn = document.getElementById('backToAuthBtn');
        if (backToAuthBtn) {
            backToAuthBtn.addEventListener('click', () => this.showStep(1));
        }

        const resendOtpBtn = document.getElementById('resendOtpBtn');
        if (resendOtpBtn) {
            resendOtpBtn.addEventListener('click', () => this.handleResendOTP());
        }

        const newSearchBtn = document.getElementById('newSearchBtn');
        if (newSearchBtn) {
            newSearchBtn.addEventListener('click', () => {
                document.getElementById('caseCode').value = '';
                this.hideAlert('caseCodeAlert');
                this.showAlert('أدخل كود قضية جديدة', 'info', 'caseCodeAlert');
            });
        }

        // Real-time validation for phone/email
        const userIdentifierInput = document.getElementById('userIdentifier');
        if (userIdentifierInput) {
            userIdentifierInput.addEventListener('blur', (e) => {
                this.validateIdentifier(e.target.value);
            });
        }

        // Real-time validation for case code
        const caseCodeInput = document.getElementById('caseCode');
        if (caseCodeInput) {
            caseCodeInput.addEventListener('input', (e) => {
                this.validateCaseCode(e.target.value);
            });
        }

        // Handle browser back button
        window.addEventListener('popstate', () => {
            if (this.currentStep > 1) {
                this.showStep(this.currentStep - 1);
            }
        });

        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('📄 Page hidden');
            } else {
                console.log('📄 Page visible');
                this.checkSessionValidity();
            }
        });
    }

    setupOTPInput() {
        const inputs = document.querySelectorAll('.otp-input');
        
        inputs.forEach((input, index) => {
            // Input event
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                
                // Only allow numbers
                if (!/^\d*$/.test(value)) {
                    e.target.value = '';
                    return;
                }
                
                // Auto-focus next input
                if (value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                
                // If all inputs filled, focus verify button
                if (value.length === 1 && index === inputs.length - 1) {
                    const allFilled = Array.from(inputs).every(input => input.value.length === 1);
                    if (allFilled) {
                        document.getElementById('verifyOtpBtn')?.focus();
                    }
                }
                
                this.updateOTPValue();
            });
            
            // Keydown event for navigation
            input.addEventListener('keydown', (e) => {
                // Backspace: move to previous input
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    e.preventDefault();
                    inputs[index - 1].focus();
                    inputs[index - 1].value = '';
                    this.updateOTPValue();
                }
                
                // Arrow keys navigation
                if (e.key === 'ArrowLeft' && index > 0) {
                    e.preventDefault();
                    inputs[index - 1].focus();
                }
                if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    e.preventDefault();
                    inputs[index + 1].focus();
                }
            });
            
            // Paste event for OTP
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').substring(0, 6);
                if (pasteData.length === 6) {
                    inputs.forEach((input, i) => {
                        input.value = pasteData[i] || '';
                    });
                    this.updateOTPValue();
                    document.getElementById('verifyOtpBtn')?.focus();
                }
            });
            
            // Focus event for styling
            input.addEventListener('focus', (e) => {
                e.target.style.borderColor = '#D4AF37';
                e.target.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.1)';
            });
            
            input.addEventListener('blur', (e) => {
                e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                e.target.style.boxShadow = 'none';
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
            
            // Add visual feedback
            if (otp.length === 6) {
                verifyBtn.style.opacity = '1';
            } else {
                verifyBtn.style.opacity = '0.7';
            }
        }
    }

    // ==================== VALIDATION FUNCTIONS ====================
    validateIdentifier(identifier) {
        if (!identifier) return false;
        
        const isPhone = /^01[0-2|5]{1}[0-9]{8}$/.test(identifier);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        
        const identifierInput = document.getElementById('userIdentifier');
        if (identifierInput) {
            if (isPhone || isEmail) {
                identifierInput.style.borderColor = '#10B981';
                identifierInput.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.1)';
            } else {
                identifierInput.style.borderColor = '#EF4444';
                identifierInput.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.1)';
            }
        }
        
        return isPhone || isEmail;
    }

    validateCaseCode(caseCode) {
        const pattern = /^MA-\d{5}-[A-Za-z0-9]{6}$/;
        const isValid = pattern.test(caseCode);
        
        const caseCodeInput = document.getElementById('caseCode');
        if (caseCodeInput) {
            if (isValid || caseCode === '') {
                caseCodeInput.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                caseCodeInput.style.boxShadow = 'none';
            } else {
                caseCodeInput.style.borderColor = '#EF4444';
                caseCodeInput.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.1)';
            }
        }
        
        return isValid;
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
            this.showAlert('يرجى إدخال رقم هاتف أو بريد إلكتروني صحيح<br>مثال: 01101076000 أو email@example.com');
            return;
        }

        if (this.verificationMethod === 'email' && !isEmail) {
            this.showAlert('يرجى إدخال بريد إلكتروني صحيح لاستخدام هذه الطريقة');
            return;
        }

        this.showLoading('auth');
        this.hideAlert();
        this.disableForm('authForm', true);

        try {
            // Analytics: log inquiry start
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
            
            // Analytics: log OTP generation
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logOTPSent(this.verificationMethod, this.userIdentifier);
            }

            if (this.verificationMethod === 'sms') {
                // Send SMS via Firebase Authentication
                await this.sendOTPviaFirebase(this.userIdentifier);
                
                this.showAlert(`✅ تم إرسال رمز التحقق إلى ${this.userIdentifier}`, 'success');
                
            } else {
                // Send Email via Firebase Cloud Function
                await this.sendMagicLink(this.userIdentifier, this.clientData.client_name, this.clientData.id);
                this.showAlert(`✅ تم إرسال رابط التحقق إلى ${this.userIdentifier}`, 'success');
            }

            // Store verification data (with expiration)
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
                    otpMessage.textContent = `أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى ${this.userIdentifier}`;
                    
                    // In development mode, show OTP for testing
                    if (window.FirebaseConfig && window.FirebaseConfig.ENVIRONMENT === 'development') {
                        otpMessage.innerHTML += `<br><small style="color: #f1d18a;">[وضع التطوير] الرمز: ${this.generatedOTP}</small>`;
                    }
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
            
            // Show user-friendly error message
            let errorMessage;
            if (error.code) {
                // Firebase Authentication error codes
                switch(error.code) {
                    case 'auth/invalid-phone-number':
                        errorMessage = 'رقم الهاتف غير صحيح';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'تم إرسال العديد من الطلبات. يرجى المحاولة لاحقاً';
                        break;
                    case 'auth/quota-exceeded':
                        errorMessage = 'تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً';
                        break;
                    default:
                        errorMessage = `خطأ في الإرسال: ${error.message}`;
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

    // ==================== FIREBASE SMS VERIFICATION ====================
    async sendOTPviaFirebase(phoneNumber) {
        try {
            if (!window.FirebaseConfig || !window.FirebaseConfig.getAuth) {
                throw new Error('خدمة Firebase غير متاحة');
            }

            const auth = window.FirebaseConfig.getAuth();
            
            // Format phone number for Firebase (Egypt +20)
            const formattedPhoneNumber = `+20${phoneNumber}`;
            console.log(`📱 Formatting phone number for Firebase: ${formattedPhoneNumber}`);

            // Set up reCAPTCHA verifier
            // Note: You need to add a div with id="recaptcha-container" in your HTML
            let appVerifier;
            
            // Check if recaptcha container exists
            let recaptchaContainer = document.getElementById('recaptcha-container');
            if (!recaptchaContainer) {
                // Create recaptcha container if it doesn't exist
                recaptchaContainer = document.createElement('div');
                recaptchaContainer.id = 'recaptcha-container';
                recaptchaContainer.style.display = 'none';
                document.body.appendChild(recaptchaContainer);
            }

            // For development/testing, we'll use a mock
            if (window.FirebaseConfig && window.FirebaseConfig.ENVIRONMENT === 'development') {
                console.log(`🔐 [DEV MODE] Would send SMS to: ${formattedPhoneNumber}`);
                console.log(`🔐 [DEV MODE] OTP: ${this.generatedOTP}`);
                
                // Simulate Firebase response
                this.confirmationResult = {
                    verificationId: 'dev-verification-id',
                    confirm: async (otp) => {
                        if (otp === this.generatedOTP) {
                            return {
                                user: {
                                    uid: 'dev-user-id',
                                    phoneNumber: formattedPhoneNumber
                                }
                            };
                        } else {
                            throw new Error('Invalid OTP');
                        }
                    }
                };
                
                return new Promise(resolve => {
                    setTimeout(() => {
                        console.log('✅ [DEV MODE] Firebase SMS simulation completed');
                        resolve();
                    }, 1500);
                });
            } else {
                // Production: Use Firebase Authentication
                console.log(`📱 [PRODUCTION] Sending SMS via Firebase to: ${formattedPhoneNumber}`);
                
                // Initialize recaptcha
                appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible',
                    'callback': function(response) {
                        console.log('reCAPTCHA solved');
                    }
                });

                // Send SMS verification code
                this.confirmationResult = await auth.signInWithPhoneNumber(
                    formattedPhoneNumber, 
                    appVerifier
                );
                
                console.log('✅ Firebase SMS sent successfully');
                return this.confirmationResult;
            }
        } catch (error) {
            console.error('Firebase SMS error:', error);
            throw error;
        }
    }

    async verifyFirebaseOTP(otp) {
        try {
            if (!this.confirmationResult) {
                throw new Error('No confirmation result available');
            }

            // For development mode
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
            
            // Handle specific Firebase errors
            if (error.code) {
                switch(error.code) {
                    case 'auth/invalid-verification-code':
                        throw new Error('الرمز غير صحيح');
                    case 'auth/code-expired':
                        throw new Error('انتهت صلاحية الرمز');
                    default:
                        throw new Error(`خطأ في التحقق: ${error.message}`);
                }
            }
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

            // Generate secure access token (valid for 12 hours)
            this.accessToken = this.generateAccessToken(storedData.clientId);
            
            // Store access token with expiration
            localStorage.setItem('clientAccess', JSON.stringify({
                token: this.accessToken,
                clientId: storedData.clientId,
                clientName: storedData.clientName || this.clientData?.client_name,
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

    // ==================== CASE SEARCH ====================
    async handleCaseCodeSubmit(e) {
        e.preventDefault();
        
        const caseCode = document.getElementById('caseCode').value.trim().toUpperCase();
        const accessData = JSON.parse(localStorage.getItem('clientAccess'));
        
        if (!caseCode) {
            this.showAlert('يرجى إدخال كود القضية', 'error', 'caseCodeAlert');
            return;
        }

        // Validate case code format
        if (!this.validateCaseCode(caseCode)) {
            this.showAlert(
                'صيغة كود القضية غير صحيحة<br>' +
                'التنسيق الصحيح: MA-سنةرقمإداري-كودعشوائي<br>' +
                'مثال: MA-26101-8X9J3B',
                'error',
                'caseCodeAlert'
            );
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
        this.disableForm('caseCodeForm', true);

        try {
            // Analytics: log case search
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logCaseSearch(caseCode);
            }

            // Search for case
            const caseResult = await this.searchCase(caseCode, this.userIdentifier);
            
            if (!caseResult.found) {
                throw new Error('كود القضية غير صحيح أو غير مرتبط بهذا العميل<br>تأكد من إدخال الكود الصحيح');
            }

            // Store case data for result page
            localStorage.setItem('currentCase', JSON.stringify({
                case: caseResult.data,
                sessions: caseResult.sessions || [],
                accessToken: accessData.token,
                clientName: accessData.clientName,
                searchTimestamp: Date.now()
            }));

            // Analytics: log successful case search
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logEvent('case_found', {
                    caseCode: caseCode,
                    caseNumber: caseResult.data.case_number,
                    court: caseResult.data.court_name
                });
            }

            // Show success message before redirect
            this.showAlert('✅ تم العثور على القضية. جاري التوجيه...', 'success', 'caseCodeAlert');
            
            // Delay redirect to show success message
            setTimeout(() => {
                window.location.href = 'inquiry-result.html';
            }, 1000);

        } catch (error) {
            console.error('Case search error:', error);
            this.showAlert(error.message || 'حدث خطأ أثناء البحث', 'error', 'caseCodeAlert');
            
            // Shake the case code input
            const caseCodeInput = document.getElementById('caseCode');
            if (caseCodeInput) {
                caseCodeInput.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    caseCodeInput.style.animation = '';
                }, 500);
            }
            
            // Analytics: log case search error
            if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                window.FirebaseConfig.AnalyticsService.logEvent('case_not_found', {
                    caseCode: caseCode,
                    error: error.message
                });
            }
        } finally {
            this.hideLoading('caseCode');
            this.disableForm('caseCodeForm', false);
        }
    }

    async searchCase(caseCode, clientIdentifier) {
        try {
            if (window.SupabaseConfig && window.SupabaseConfig.DatabaseService) {
                return await window.SupabaseConfig.DatabaseService.searchCase(caseCode, clientIdentifier);
            } else {
                // Fallback simulation for development
                console.log('🔍 [DEV] Simulating case search:', caseCode);
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const mockCase = {
                    id: 'dev-case-' + Date.now(),
                    case_code: caseCode,
                    client_name: this.clientData?.client_name || 'عميل تجريبي',
                    client_phone: this.userIdentifier.includes('@') ? '01101076000' : this.userIdentifier,
                    client_email: this.userIdentifier.includes('@') ? this.userIdentifier : 'dev@example.com',
                    client_role: 'مدعي',
                    case_number: '1234',
                    case_year: '2024',
                    court_name: 'محكمة أسوان الابتدائية',
                    circle: 'الدائرة الأولى',
                    case_type: 'مدنية',
                    case_subject: 'دعوى تعويض',
                    opponent_name: 'الخصم التجريبي',
                    opponent_phone: '01234567890',
                    notes: 'هذه بيانات تجريبية للاختبار',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                const mockSessions = [
                    {
                        id: 'session-1',
                        case_id: mockCase.id,
                        session_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                        case_status: 'مؤجلة',
                        decision: 'تم تأجيل الجلسة للبت في المذكرات'
                    },
                    {
                        id: 'session-2',
                        case_id: mockCase.id,
                        session_date: new Date().toISOString(),
                        case_status: 'قيد النظر',
                        decision: 'مطالبة الخصم بالإدلاء بالمستندات'
                    }
                ];
                
                return {
                    found: true,
                    data: mockCase,
                    sessions: mockSessions
                };
            }
        } catch (error) {
            console.error('Search case error:', error);
            throw new Error('فشل في البحث عن القضية. يرجى المحاولة مرة أخرى.');
        }
    }

    // ==================== UTILITY FUNCTIONS ====================
    generateAccessToken(clientId) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 16);
        const tokenData = `${clientId}:${timestamp}:${random}`;
        return btoa(tokenData);
    }

    async sendMagicLink(email, clientName, clientId) {
        if (window.FirebaseConfig && window.FirebaseConfig.CloudFunctions) {
            try {
                const result = await window.FirebaseConfig.CloudFunctions.sendMagicLink(email, clientName, clientId);
                
                console.log('📧 Magic link sending result:', result);
                
                return result;
            } catch (error) {
                console.error('Magic link sending failed:', error);
                
                if (window.FirebaseConfig && window.FirebaseConfig.ENVIRONMENT === 'development') {
                    const magicLink = `${window.location.origin}/inquiry-result.html?token=${btoa(clientId)}`;
                    return {
                        success: true,
                        simulation: true,
                        magicLink: magicLink,
                        message: 'تم محاكاة إرسال الإيميل بنجاح'
                    };
                } else {
                    throw new Error('فشل في إرسال رابط التحقق. يرجى المحاولة مرة أخرى.');
                }
            }
        } else {
            // Fallback simulation
            const magicLink = `${window.location.origin}/inquiry-result.html?token=${btoa(clientId)}`;
            console.log(`📧 Email simulation to ${email}: Link: ${magicLink}`);
            return new Promise(resolve => setTimeout(() => resolve({ 
                success: true, 
                simulation: true,
                magicLink: magicLink 
            }), 1000));
        }
    }

    // ==================== SESSION MANAGEMENT ====================
    checkSessionValidity() {
        const verificationData = localStorage.getItem('verificationData');
        if (verificationData) {
            const data = JSON.parse(verificationData);
            if (Date.now() > data.expiresAt) {
                localStorage.removeItem('verificationData');
                if (this.currentStep === 2) {
                    this.showStep(1);
                    this.showAlert('انتهت صلاحية رمز التحقق. يرجى البدء من جديد', 'error', 'authAlert');
                }
            }
        }
        
        const accessData = localStorage.getItem('clientAccess');
        if (accessData) {
            const data = JSON.parse(accessData);
            if (Date.now() > data.expiresAt) {
                localStorage.removeItem('clientAccess');
                if (this.currentStep === 3) {
                    this.showStep(1);
                    this.showAlert('انتهت صلاحية الجلسة. يرجى إعادة التحقق', 'error', 'authAlert');
                }
            }
        }
    }

    // ==================== URL PARAMETER HANDLING ====================
    handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const expired = urlParams.get('expired');
        const error = urlParams.get('error');
        
        if (expired) {
            this.showAlert('انتهت صلاحية الجلسة. يرجى إعادة المحاولة', 'error', 'authAlert');
            localStorage.clear();
        }
        
        if (error) {
            this.showAlert(decodeURIComponent(error), 'error', 'authAlert');
        }
        
        if (token) {
            try {
                const clientId = atob(token);
                console.log('🔗 Magic link received for client:', clientId);
                
                localStorage.setItem('magicLinkToken', token);
                
                const email = urlParams.get('email');
                if (email) {
                    document.getElementById('userIdentifier').value = decodeURIComponent(email);
                    this.userIdentifier = decodeURIComponent(email);
                }
                
                this.showAlert('✅ تم التحقق بنجاح عبر الرابط السحري. يمكنك الآن إدخال كود القضية', 'success', 'authAlert');
                
                this.showStep(3);
                
                if (window.FirebaseConfig && window.FirebaseConfig.AnalyticsService) {
                    window.FirebaseConfig.AnalyticsService.logEvent('magic_link_used', {
                        clientId: clientId.substring(0, 8) + '...'
                    });
                }
            } catch (error) {
                console.error('Token error:', error);
                this.showAlert('رابط التحقق غير صالح أو منتهي الصلاحية', 'error', 'authAlert');
            }
        }
    }

    // ==================== CLEANUP ====================
    cleanup() {
        if (this.resendTimer) {
            clearInterval(this.resendTimer);
            this.resendTimer = null;
        }
    }
}

// Initialize the application when DOM is loaded
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
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            .pulse {
                animation: pulse 2s infinite;
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
