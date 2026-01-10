// api/send-otp.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // السماح بـ CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone, caseCode } = req.body;

    if (!phone || !caseCode) {
      return res.status(400).json({ error: 'رقم الهاتف وكود القضية مطلوبان' });
    }

    // تهيئة Supabase
    const supabaseUrl = process.env.SUPABASE_URL || 'https://iyhfafodhptcdwrjywek.supabase.co';
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aGZhZm9kaHB0Y2R3cmp5d2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMzUzODYsImV4cCI6MjA4MjcxMTM4Nn0.YmeMSDkQ3Z_vpyMTyZ-3jbKLFzVZzwcLeDsdczrErHQ';
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // التحقق من وجود القضية
    const { data: caseData, error: caseError } = await supabase
      .from('cases')
      .select('client_name, client_phone')
      .eq('case_code', caseCode)
      .single();

    if (caseError || !caseData) {
      return res.status(404).json({ error: 'كود القضية غير موجود' });
    }

    // التحقق من مطابقة رقم الهاتف
    if (caseData.client_phone !== phone) {
      return res.status(403).json({ error: 'رقم الهاتف لا يتطابق مع المسجل في القضية' });
    }

    // توليد OTP (6 أرقام)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // وقت انتهاء الصلاحية (10 دقائق من الآن)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // حفظ OTP في قاعدة البيانات
    const { error: otpError } = await supabase
      .from('otp_codes')
      .insert([
        {
          case_code: caseCode,
          phone_number: phone,
          otp_code: otpCode,
          expires_at: expiresAt,
          is_used: false
        }
      ]);

    if (otpError) {
      console.error('Error saving OTP:', otpError);
      return res.status(500).json({ error: 'خطأ في حفظ رمز التحقق' });
    }

    // هنا يمكنك اختيار طريقة إرسال OTP:
    // 1. Telegram Bot (مستحسن - مجاني وسهل)
    // 2. Email via Gmail
    // 3. Console Log للتجربة (للاختبار فقط)

    // **الخيار 1: إرسال عبر Telegram (الأفضل)**
    await sendViaTelegram(phone, otpCode, caseData.client_name);

    // **الخيار 2: للتجربة فقط - عرض OTP في الكونسول**
    console.log(`OTP for ${caseData.client_name}: ${otpCode}`);
    console.log(`Case: ${caseCode}, Phone: ${phone}`);

    return res.status(200).json({ 
      success: true, 
      message: 'تم إرسال رمز التحقق',
      // إرجاع OTP فقط للتجربة - إزله في الإنتاج
      otp: otpCode 
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
}

// دالة إرسال OTP عبر Telegram
async function sendViaTelegram(phone, otp, clientName) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID; // يمكن أن يكون رقم هاتف أو ID دردشة

  if (!botToken || !chatId) {
    console.log('Telegram credentials not set, skipping Telegram send');
    return;
  }

  const message = `🔐 رمز التحقق للاستعلام عن القضية\n\n`
                + `👤 العميل: ${clientName}\n`
                + `📞 الهاتف: ${phone}\n`
                + `🔢 رمز التحقق: *${otp}*\n\n`
                + `⏰ ينتهي خلال 10 دقائق`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    
    if (!data.ok) {
      console.error('Telegram API error:', data);
    } else {
      console.log('Telegram message sent successfully');
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}

// دالة إرسال OTP عبر البريد الإلكتروني (خيار بديل)
async function sendViaEmail(email, otp, clientName) {
  // تحتاج إلى إعداد nodemailer أو خدمة بريد
  // هذا مثال باستخدام Resend.com (مجاني لحد 3000 بريد شهرياً)
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.log('Resend API key not set, skipping email send');
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'المكتب <noreply@yourdomain.com>',
        to: [email],
        subject: 'رمز التحقق لاستعلام القضية',
        html: `
          <div style="font-family: 'Tajawal', Arial, sans-serif; text-align: right; direction: rtl;">
            <h2 style="color: #bf953f;">🔐 رمز التحقق</h2>
            <p>عزيزي/عزيزتي ${clientName},</p>
            <p>رمز التحقق الخاص بك هو:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 10px; color: #020617;">
              ${otp}
            </div>
            <p>⏰ هذا الرمز صالح لمدة 10 دقائق فقط</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              مؤسسة محمود عبد الحميد للمحاماة<br>
              أسوان - أمام مجمع المحاكم<br>
              هاتف: 01101076000
            </p>
          </div>
        `
      })
    });

    const data = await response.json();
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
