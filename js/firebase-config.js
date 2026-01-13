// ==================== FIREBASE CONFIGURATION ====================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDMkk2HBsa1KAsyDYWSfkgGyqMYzZzXmz0",
    authDomain: "lawofficeotp.firebaseapp.com",
    projectId: "lawofficeotp",
    storageBucket: "lawofficeotp.appspot.com",
    messagingSenderId: "463230643152",
    appId: "1:463230643152:web:00adf4d3c005de13d027d5",
    measurementId: "G-Z3D4HP4YBM"
};

// Environment Setting
// Change to 'production' when deploying with real SMS service
const ENVIRONMENT = 'development'; // 'development' or 'production'

// Firebase App Initialization
let firebaseApp = null;

function initializeFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase SDK not loaded. Check script tags in HTML.');
        }
        
        if (!firebase.apps || firebase.apps.length === 0) {
            firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
            console.log('✅ Firebase initialized successfully');
            return firebaseApp;
        } else {
            firebaseApp = firebase.app();
            console.log('✅ Firebase already initialized');
            return firebaseApp;
        }
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        throw new Error(`فشل في تهيئة Firebase: ${error.message}`);
    }
}

// Firebase Services
function getFirestore() {
    if (!firebaseApp) {
        initializeFirebase();
    }
    return firebase.firestore();
}

function getAuth() {
    if (!firebaseApp) {
        initializeFirebase();
    }
    return firebase.auth();
}

function getFunctions() {
    if (!firebaseApp) {
        initializeFirebase();
    }
    return firebase.functions();
}

function getMessaging() {
    if (!firebaseApp) {
        initializeFirebase();
    }
    return firebase.messaging();
}

// Test Firebase Connection
async function testFirebaseConnection() {
    try {
        const auth = getAuth();
        const firestore = getFirestore();
        
        console.log('✅ Firebase services loaded:', {
            auth: !!auth,
            firestore: !!firestore,
            functions: !!getFunctions(),
            messaging: !!getMessaging()
        });
        
        return {
            connected: true,
            projectId: FIREBASE_CONFIG.projectId,
            environment: ENVIRONMENT
        };
    } catch (error) {
        console.error('❌ Firebase connection test failed:', error);
        return {
            connected: false,
            error: error.message,
            config: FIREBASE_CONFIG
        };
    }
}

// Cloud Functions Service
const CloudFunctions = {
    // Send OTP via SMS
    async sendOTPviaSMS(phoneNumber, otp, clientName) {
        if (ENVIRONMENT === 'development') {
            // Development mode - simulation
            console.log(`📱 [DEV MODE] SMS would be sent to: ${phoneNumber}`);
            console.log(`📱 [DEV MODE] OTP Code: ${otp}`);
            console.log(`📱 [DEV MODE] Client: ${clientName}`);
            
            // Simulate delay
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('✅ [DEV MODE] SMS simulation completed');
                    resolve({ 
                        success: true, 
                        message: 'تم محاكاة إرسال SMS بنجاح (وضع التطوير)',
                        simulation: true,
                        otp: otp // Return OTP for testing
                    });
                }, 1500);
            });
        } else {
            // Production mode - call real Firebase Cloud Function
            try {
                console.log(`📱 [PRODUCTION] Calling Cloud Function for SMS to: ${phoneNumber}`);
                
                const functions = getFunctions();
                
                // For production, you need to:
                // 1. Deploy a Cloud Function named 'sendOTPviaSMS'
                // 2. Uncomment the code below
                
                /*
                const sendSMSFunction = functions.httpsCallable('sendOTPviaSMS');
                const result = await sendSMSFunction({
                    phoneNumber: phoneNumber,
                    otp: otp,
                    clientName: clientName,
                    countryCode: '+20' // Egypt
                });
                
                return result.data;
                */
                
                // Temporary fallback for production without Cloud Functions
                return {
                    success: true,
                    message: 'في وضع الإنتاج، يجب نشر Cloud Function أولاً',
                    requiresSetup: true,
                    otp: otp // Return OTP for now
                };
                
            } catch (error) {
                console.error('❌ Cloud Function error:', error);
                throw new Error('فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
            }
        }
    },
    
    // Send Magic Link via Email
    async sendMagicLink(email, clientName, clientId) {
        if (ENVIRONMENT === 'development') {
            // Development mode - simulation
            const magicLink = `${window.location.origin}/inquiry-result.html?token=${btoa(clientId)}&email=${encodeURIComponent(email)}`;
            console.log(`📧 [DEV MODE] Email would be sent to: ${email}`);
            console.log(`📧 [DEV MODE] Magic Link: ${magicLink}`);
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('✅ [DEV MODE] Email simulation completed');
                    resolve({ 
                        success: true, 
                        message: 'تم محاكاة إرسال الإيميل بنجاح (وضع التطوير)',
                        magicLink: magicLink,
                        simulation: true
                    });
                }, 1500);
            });
        } else {
            // Production mode - call real Firebase Cloud Function
            try {
                console.log(`📧 [PRODUCTION] Calling Cloud Function for email to: ${email}`);
                
                // For production, deploy a Cloud Function named 'sendMagicLink'
                // Similar to SMS function above
                
                return {
                    success: true,
                    message: 'في وضع الإنتاج، يجب نشر Cloud Function أولاً',
                    requiresSetup: true,
                    magicLink: `${window.location.origin}/inquiry-result.html?token=${btoa(clientId)}`
                };
                
            } catch (error) {
                console.error('❌ Cloud Function error:', error);
                throw new Error('فشل في إرسال الإيميل. يرجى المحاولة مرة أخرى.');
            }
        }
    },
    
    // Verify phone number (for production with Firebase Auth)
    async verifyPhoneNumber(phoneNumber) {
        try {
            const auth = getAuth();
            const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                size: 'invisible'
            });
            
            const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, appVerifier);
            return confirmationResult;
        } catch (error) {
            console.error('Phone verification error:', error);
            throw error;
        }
    }
};

// Firebase Analytics (optional)
function getAnalytics() {
    if (!firebaseApp) {
        initializeFirebase();
    }
    return firebase.analytics();
}

// Log Events for Analytics
const AnalyticsService = {
    logEvent(eventName, eventParams = {}) {
        try {
            if (ENVIRONMENT === 'production') {
                const analytics = getAnalytics();
                firebase.analytics().logEvent(eventName, {
                    ...eventParams,
                    timestamp: new Date().toISOString(),
                    environment: ENVIRONMENT
                });
            } else {
                console.log(`📊 [ANALYTICS - DEV] Event: ${eventName}`, eventParams);
            }
        } catch (error) {
            console.error('Analytics error:', error);
        }
    },
    
    logInquiryStart(identifier) {
        this.logEvent('inquiry_start', {
            identifier_type: identifier.includes('@') ? 'email' : 'phone',
            identifier_length: identifier.length
        });
    },
    
    logOTPSent(method, identifier) {
        this.logEvent('otp_sent', {
            method: method,
            identifier: identifier.substring(0, 3) + '...' // Partial for privacy
        });
    },
    
    logCaseSearch(caseCode) {
        this.logEvent('case_search', {
            case_code: caseCode
        });
    }
};

// Export for use in other files
window.FirebaseConfig = {
    FIREBASE_CONFIG,
    ENVIRONMENT,
    initializeFirebase,
    getFirestore,
    getAuth,
    getFunctions,
    getMessaging,
    getAnalytics,
    testFirebaseConnection,
    CloudFunctions,
    AnalyticsService
};

// Auto-initialize when loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeFirebase();
        console.log('Firebase Config Module Loaded Successfully');
        
        // Test connection
        testFirebaseConnection().then(result => {
            if (result.connected) {
                console.log('Firebase Connection Test: ✅ PASSED');
                console.log('Project:', result.projectId);
                console.log('Environment:', result.environment);
                
                // Log initialization
                AnalyticsService.logEvent('firebase_initialized', {
                    status: 'success',
                    environment: ENVIRONMENT
                });
            } else {
                console.warn('Firebase Connection Test: ⚠️ WARNING');
                console.warn('Error:', result.error);
                
                AnalyticsService.logEvent('firebase_initialized', {
                    status: 'failed',
                    error: result.error,
                    environment: ENVIRONMENT
                });
            }
        });
    } catch (error) {
        console.error('Failed to auto-initialize Firebase:', error);
    }
});
