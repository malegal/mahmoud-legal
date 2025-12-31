// ==================== إعداد Supabase ====================
const SUPABASE_URL = 'https://iyhfafodhptcdwrjywek.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aGZhZm9kaHB0Y2R3cmp5d2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMzUzODYsImV4cCI6MjA4MjcxMTM4Nn0.YmeMSDkQ3Z_vpyMTyZ-3jbKLFzVZzwcLeDsdczrErHQ';

// تحميل مكتبة Supabase أولاً
async function loadSupabase() {
    if (!window.supabase) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.38.0/dist/umd/supabase.min.js';
        script.onload = initializeSupabase;
        document.head.appendChild(script);
    } else {
        initializeSupabase();
    }
}

// تهيئة Supabase بعد تحميل المكتبة
function initializeSupabase() {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ تم تهيئة Supabase بنجاح');
}

// ==================== دوال للاستعلام عن القضايا ====================
async function searchCaseByPhoneAndCode(phone, caseCode) {
    try {
        if (!window.supabaseClient) {
            await loadSupabase();
            // انتظر قليلاً للتأكد من التهيئة
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const { data, error } = await window.supabaseClient
            .from('cases')
            .select('*')
            .eq('client_phone', phone)
            .eq('case_code', caseCode)
            .single();

        if (error) throw error;
        
        // إرسال إشعار للمحامي عند الاستعلام
        sendLawyerNotification(caseCode, phone);
        
        return data;
    } catch (error) {
        console.error('خطأ في البحث عن القضية:', error);
        return null;
    }
}

// ==================== دوال للإدارة ====================

// إضافة قضية جديدة
async function addNewCase(caseData) {
    try {
        if (!window.supabaseClient) {
            await loadSupabase();
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const { data, error } = await window.supabaseClient
            .from('cases')
            .insert([{
                client_name: caseData.clientName,
                client_phone: caseData.clientPhone,
                case_number: caseData.caseNumber,
                case_year: caseData.caseYear,
                opponent_name: caseData.opponentName,
                case_type: caseData.caseType,
                description: caseData.description,
                status: 'قيد النظر',
                case_code: generateCaseCode()
            }])
            .select();
        
        if (error) throw error;
        
        sendLawyerNotification('قضية جديدة', `تم إضافة قضية ${caseData.caseNumber}`);
        return data;
    } catch (error) {
        console.error('خطأ في إضافة القضية:', error);
        return null;
    }
}

// البحث عن القضايا
async function searchCases(searchCriteria) {
    try {
        if (!window.supabaseClient) {
            await loadSupabase();
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        let query = window.supabaseClient.from('cases').select('*');
        
        if (searchCriteria.caseNumber) {
            query = query.ilike('case_number', `%${searchCriteria.caseNumber}%`);
        }
        
        if (searchCriteria.clientName) {
            query = query.ilike('client_name', `%${searchCriteria.clientName}%`);
        }
        
        if (searchCriteria.clientPhone) {
            query = query.eq('client_phone', searchCriteria.clientPhone);
        }
        
        if (searchCriteria.caseYear) {
            query = query.eq('case_year', searchCriteria.caseYear);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('خطأ في البحث عن القضايا:', error);
        return [];
    }
}

// إضافة جلسة جديدة
async function addSession(sessionData) {
    try {
        if (!window.supabaseClient) {
            await loadSupabase();
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const { data, error } = await window.supabaseClient
            .from('sessions')
            .insert([{
                case_id: sessionData.caseId,
                session_date: sessionData.date,
                session_time: sessionData.time,
                court: sessionData.court,
                decision: sessionData.decision,
                notes: sessionData.notes,
                added_to_calendar: false
            }])
            .select();
        
        if (error) throw error;
        
        sendLawyerNotification('جلسة جديدة', `تمت إضافة جلسة جديدة`);
        return data;
    } catch (error) {
        console.error('خطأ في إضافة الجلسة:', error);
        return null;
    }
}

// الحصول على الجلسات القادمة
async function getUpcomingSessions(days = 7) {
    try {
        if (!window.supabaseClient) {
            await loadSupabase();
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const today = new Date().toISOString().split('T')[0];
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        const futureDateStr = futureDate.toISOString().split('T')[0];
        
        const { data, error } = await window.supabaseClient
            .from('sessions')
            .select(`
                *,
                cases (case_number, client_name)
            `)
            .gte('session_date', today)
            .lte('session_date', futureDateStr)
            .order('session_date', { ascending: true });
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('خطأ في جلب الجلسات:', error);
        return [];
    }
}

// توليد كود قضية تلقائي
function generateCaseCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// إرسال إشعار للمحامي
async function sendLawyerNotification(title, message) {
    console.log(`📧 إشعار للمحامي: ${title} - ${message}`);
    
    // هنا يمكنك إضافة كود إرسال الإيميل
    // باستخدام EmailJS أو أي خدمة أخرى
    // مثال:
    // if (window.emailjs) {
    //     emailjs.send("service_id", "template_id", {...});
    // }
    
    return true;
}

// ==================== التصدير والتهيئة التلقائية ====================
// تحميل Supabase تلقائياً عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadSupabase();
});

// جعل الدوال متاحة عالمياً
window.supabaseFunctions = {
    searchCaseByPhoneAndCode,
    addNewCase,
    searchCases,
    addSession,
    getUpcomingSessions,
    generateCaseCode,
    sendLawyerNotification
};
