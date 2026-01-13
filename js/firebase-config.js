// ==================== FIREBASE CONFIGURATION ====================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDMkk2HBsalKAsyDYWSfkqG9",
    authDomain: "lawofficeotp.firebaseapp.com",
    projectId: "lawofficeotp",
    storageBucket: "lawofficeotp.firebaseio.com",
    messagingSenderId: "463230643152",
    appId: "1:463230643152:web:00adf4d3c005de13d027d5",
    measurementId: "G-Z3D4HP4YBM"
};

// Firebase App Initialization
let firebaseApp = null;

function initializeFirebase() {
    try {
        if (firebase.apps.length === 0) {
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
        throw error;
    }
}

// Firebase Services
function getFirestore() {
    if (!firebaseApp) {
        throw new Error('Firebase not initialized');
    }
    return firebase.firestore();
}

function getAuth() {
    if (!firebaseApp) {
        throw new Error('Firebase not initialized');
    }
    return firebase.auth();
}

function getFunctions() {
    if (!firebaseApp) {
        throw new Error('Firebase not initialized');
    }
    return firebase.functions();
}

// Cloud Functions (Simulated for Development)
const CloudFunctions = {
    // Send OTP via SMS
    async sendOTPviaSMS(phoneNumber, otp, clientName) {
        // In production, this would call a real Firebase Cloud Function
        console.log(`📱 [Cloud Function] SMS to ${phoneNumber}: رمز التحقق: ${otp} للعميل ${clientName}`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('✅ SMS sent successfully');
                resolve({ success: true, message: 'تم إرسال SMS بنجاح' });
            }, 1500);
        });
    },
    
    // Send Magic Link via Email
    async sendMagicLink(email, clientName, clientId) {
        // In production, this would call a real Firebase Cloud Function
        const magicLink = `${window.location.origin}/inquiry-result.html?token=${btoa(clientId)}`;
        console.log(`📧 [Cloud Function] Email to ${email}: رابط التحقق: ${magicLink}`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('✅ Email sent successfully');
                resolve({ success: true, message: 'تم إرسال الإيميل بنجاح', magicLink });
            }, 1500);
        });
    },
    
    // Verify OTP
    async verifyOTP(phoneNumber, otp) {
        // In production, this would call a real Firebase Cloud Function
        console.log(`🔐 [Cloud Function] Verify OTP: ${phoneNumber} - ${otp}`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('✅ OTP verified successfully');
                resolve({ success: true, verified: true });
            }, 1000);
        });
    }
};

// Test Firebase Connection
async function testFirebaseConnection() {
    try {
        const auth = getAuth();
        const firestore = getFirestore();
        
        // Simple test to check if Firebase is working
        const testDoc = await firestore.collection('test').doc('connection').get();
        
        console.log('✅ Firebase connection test passed');
        return {
            auth: !!auth,
            firestore: !!firestore,
            connected: true
        };
    } catch (error) {
        console.error('❌ Firebase connection test failed:', error);
        return {
            connected: false,
            error: error.message
        };
    }
}

// Export for use in other files
window.FirebaseConfig = {
    initializeFirebase,
    getFirestore,
    getAuth,
    getFunctions,
    CloudFunctions,
    testFirebaseConnection
};
