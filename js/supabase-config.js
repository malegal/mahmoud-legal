// ==================== SUPABASE CONFIGURATION ====================
const SUPABASE_CONFIG = {
    url: 'https://iyhfafodhptcdwrjywek.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aGZhZm9kaHB0Y2R3cmp5d2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMzUzODYsImV4cCI6MjA4MjcxMTM4Nn0.YmeMSDkQ3Z_vpyMTyZ-3jbKLFzVZzwcLeDsdczrErHQ'
};

// Supabase Client
let supabaseClient = null;

function initializeSupabase() {
    try {
        if (window.supabase) {
            supabaseClient = window.supabase.createClient(
                SUPABASE_CONFIG.url,
                SUPABASE_CONFIG.key
            );
            console.log('✅ Supabase initialized successfully');
            return supabaseClient;
        } else {
            throw new Error('Supabase SDK not loaded');
        }
    } catch (error) {
        console.error('❌ Supabase initialization error:', error);
        throw error;
    }
}

// Database Operations
const DatabaseService = {
    // Search client by identifier (phone or email)
    async searchClient(identifier) {
        if (!supabaseClient) {
            throw new Error('Supabase not initialized');
        }

        try {
            // First, try searching by phone
            const { data: phoneData, error: phoneError } = await supabaseClient
                .from('cases')
                .select(`
                    id,
                    client_name,
                    client_phone,
                    client_email,
                    client_role
                `)
                .eq('client_phone', identifier)
                .limit(1);

            if (phoneError) {
                console.error('Phone search error:', phoneError);
                throw phoneError;
            }

            if (phoneData && phoneData.length > 0) {
                return {
                    found: true,
                    data: phoneData[0],
                    identifierType: 'phone'
                };
            }

            // If not found by phone, try by email
            const { data: emailData, error: emailError } = await supabaseClient
                .from('cases')
                .select(`
                    id,
                    client_name,
                    client_phone,
                    client_email,
                    client_role
                `)
                .eq('client_email', identifier)
                .limit(1);

            if (emailError) {
                console.error('Email search error:', emailError);
                throw emailError;
            }

            if (emailData && emailData.length > 0) {
                return {
                    found: true,
                    data: emailData[0],
                    identifierType: 'email'
                };
            }

            return { found: false };
        } catch (error) {
            console.error('Database search error:', error);
            throw error;
        }
    },

    // Search case by code and client identifier
    async searchCase(caseCode, clientIdentifier) {
        if (!supabaseClient) {
            throw new Error('Supabase not initialized');
        }

        try {
            // Search case by code and phone
            const { data: phoneCase, error: phoneError } = await supabaseClient
                .from('cases')
                .select('*')
                .eq('case_code', caseCode)
                .eq('client_phone', clientIdentifier)
                .limit(1);

            if (phoneError) {
                console.error('Phone case search error:', phoneError);
                throw phoneError;
            }

            if (phoneCase && phoneCase.length > 0) {
                const sessions = await this.getCaseSessions(phoneCase[0].id);
                return {
                    found: true,
                    data: phoneCase[0],
                    sessions: sessions || []
                };
            }

            // Search case by code and email
            const { data: emailCase, error: emailError } = await supabaseClient
                .from('cases')
                .select('*')
                .eq('case_code', caseCode)
                .eq('client_email', clientIdentifier)
                .limit(1);

            if (emailError) {
                console.error('Email case search error:', emailError);
                throw emailError;
            }

            if (emailCase && emailCase.length > 0) {
                const sessions = await this.getCaseSessions(emailCase[0].id);
                return {
                    found: true,
                    data: emailCase[0],
                    sessions: sessions || []
                };
            }

            return { found: false };
        } catch (error) {
            console.error('Case search error:', error);
            throw error;
        }
    },

    // Get sessions for a case
    async getCaseSessions(caseId) {
        if (!supabaseClient) {
            throw new Error('Supabase not initialized');
        }

        try {
            const { data: sessions, error } = await supabaseClient
                .from('sessions')
                .select('*')
                .eq('case_id', caseId)
                .order('session_date', { ascending: true });

            if (error) {
                console.error('Sessions fetch error:', error);
                return [];
            }

            return sessions || [];
        } catch (error) {
            console.error('Get sessions error:', error);
            return [];
        }
    },

    // Get case by ID (for magic links)
    async getCaseById(caseId) {
        if (!supabaseClient) {
            throw new Error('Supabase not initialized');
        }

        try {
            const { data: caseData, error } = await supabaseClient
                .from('cases')
                .select('*')
                .eq('id', caseId)
                .limit(1);

            if (error) {
                throw error;
            }

            if (!caseData || caseData.length === 0) {
                return null;
            }

            const sessions = await this.getCaseSessions(caseData[0].id);
            return {
                ...caseData[0],
                sessions: sessions || []
            };
        } catch (error) {
            console.error('Get case by ID error:', error);
            throw error;
        }
    },

    // Test database connection
    async testConnection() {
        try {
            const { data, error } = await supabaseClient
                .from('cases')
                .select('count', { count: 'exact', head: true });

            if (error) {
                throw error;
            }

            console.log('✅ Supabase connection test passed');
            return {
                connected: true,
                tables: ['cases', 'sessions']
            };
        } catch (error) {
            console.error('❌ Supabase connection test failed:', error);
            return {
                connected: false,
                error: error.message
            };
        }
    }
};

// Export for use in other files
window.SupabaseConfig = {
    initializeSupabase,
    DatabaseService,
    getClient: () => supabaseClient
};
