// ==================== FIREBASE CONFIGURATION ====================
console.log('📁 Loading firebase-config.js...');

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDMkk2HBsa1KAsyDYWSfkgGyqMYzZzXmz0",
    authDomain: "lawofficeotp.firebaseapp.com",
    projectId: "lawofficeotp",
    storageBucket: "lawofficeotp.appspot.com",
    messagingSenderId: "463230643152",
    appId: "1:463230643152:web:00adf4d3c005de13d027d5",
    measurementId: "G-Z3D4HP4YBM"
};

// ==================== IMPORTANT: CHANGE TO PRODUCTION ====================
const ENVIRONMENT = 'production'; // ⚠️ تغيير من 'development' إلى 'production'

// Firebase App Initialization
let firebaseApp = null;

function initializeFirebase() {
    try {
        console.log('🔄 Initializing Firebase for:', ENVIRONMENT);
        
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase SDK not loaded. Check if scripts are loaded in HTML.');
        }
        
        if (!firebase.apps.length) {
            firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
            console.log('✅ Firebase initialized successfully for production');
            
            // Configure language for SMS (Arabic)
            firebase.auth().languageCode = 'ar';
            console.log('🌍 Language set to Arabic for SMS');
            
            return firebaseApp;
        } else {
            firebaseApp = firebase.app();
            console.log('✅ Firebase already initialized');
            return firebaseApp;
        }
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        showGlobalAlert('فشل في تهيئة Firebase. تأكد من اتصال الإنترنت وحظر الإعلانات.');
        return null;
    }
}

// Global alert function
function showGlobalAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        left: 20px;
        padding: 15px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        border-radius: 10px;
        z-index: 9999;
        text-align: center;
        font-family: 'Tajawal', sans-serif;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// Firebase Services
function getFirestore() {
    if (!firebaseApp) initializeFirebase();
    return firebase.firestore();
}

function getAuth() {
    if (!firebaseApp) initializeFirebase();
    return firebase.auth();
}

function getFunctions() {
    if (!firebaseApp) initializeFirebase();
    return firebase.functions();
}

// SMS Service for Production
const SmsService = {
    async sendOTP(phoneNumber, clientName) {
        try {
            console.log(`📱 [PRODUCTION] Preparing to send SMS to: ${phoneNumber}`);
            
            const auth = getAuth();
            
            // Check if reCAPTCHA container exists
            let recaptchaContainer = document.getElementById('recaptcha-container');
            if (!recaptchaContainer) {
                recaptchaContainer = document.createElement('div');
                recaptchaContainer.id = 'recaptcha-container';
                recaptchaContainer.style.cssText = 'position: fixed; top: -100px;';
                document.body.appendChild(recaptchaContainer);
                console.log('✅ Created reCAPTCHA container');
            }
            
            // Setup invisible reCAPTCHA
            const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': function(response) {
                    console.log('✅ reCAPTCHA solved:', response);
                },
                'expired-callback': function() {
                    console.log('⚠️ reCAPTCHA expired');
                }
            });
            
            // Format phone number for Firebase (Egypt: +20XXXXXXXXX)
            const formattedPhone = phoneNumber.startsWith('+20') ? phoneNumber : `+20${phoneNumber.substring(1)}`;
            console.log(`📱 Formatted phone for Firebase: ${formattedPhone}`);
            
            // Send SMS via Firebase Authentication
            console.log('📤 Sending SMS via Firebase Authentication...');
            
            const confirmationResult = await auth.signInWithPhoneNumber(formattedPhone, appVerifier);
            
            console.log('✅ SMS sent successfully! Confirmation result:', confirmationResult.verificationId);
            
            return {
                success: true,
                verificationId: confirmationResult.verificationId,
                phoneNumber: formattedPhone,
                message: 'تم إرسال رمز التحقق بنجاح'
            };
            
        } catch (error) {
            console.error('❌ SMS sending error:', error);
            
            let errorMessage = 'خطأ في إرسال الرسالة';
            
            if (error.code) {
                switch(error.code) {
                    case 'auth/invalid-phone-number':
                        errorMessage = 'رقم الهاتف غير صحيح. تأكد من كتابة رقم مصري صحيح (11 رقم)';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'تم إرسال العديد من الطلبات. يرجى الانتظار دقيقة';
                        break;
                    case 'auth/quota-exceeded':
                        errorMessage = 'تم تجاوز الحد اليومي للإرسال. يرجى المحاولة غداً';
                        break;
                    case 'auth/captcha-check-failed':
                        errorMessage = 'فشل التحقق من reCAPTCHA. يرجى تحديث الصفحة';
                        break;
                    default:
                        errorMessage = `خطأ: ${error.code}`;
                }
            }
            
            throw new Error(errorMessage);
        }
    },
    
    async verifyOTP(verificationId, otpCode) {
        try {
            console.log(`🔐 Verifying OTP: ${otpCode} for verification ID: ${verificationId}`);
            
            const auth = getAuth();
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otpCode);
            
            const userCredential = await auth.signInWithCredential(credential);
            
            console.log('✅ OTP verified successfully! User:', userCredential.user.uid);
            
            // Sign out immediately after verification (we just needed to verify)
            await auth.signOut();
            
            return {
                success: true,
                verified: true,
                userId: userCredential.user.uid
            };
            
        } catch (error) {
            console.error('❌ OTP verification error:', error);
            
            let errorMessage = 'خطأ في التحقق';
            
            if (error.code) {
                switch(error.code) {
                    case 'auth/invalid-verification-code':
                        errorMessage = 'الرمز غير صحيح. يرجى المحاولة مرة أخرى';
                        break;
                    case 'auth/code-expired':
                        errorMessage = 'انتهت صلاحية الرمز. يرجى طلب رمز جديد';
                        break;
                    default:
                        errorMessage = `خطأ في التحقق: ${error.code}`;
                }
            }
            
            throw new Error(errorMessage);
        }
    }
};

// Export for use in other files
window.FirebaseConfig = {
    FIREBASE_CONFIG,
    ENVIRONMENT,
    initializeFirebase,
    getAuth,
    getFirestore,
    getFunctions,
    SmsService
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Initializing Firebase on DOM load...');
    initializeFirebase();
});

console.log('✅ firebase-config.js loaded for PRODUCTION');
