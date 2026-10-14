// ============================================================
// Vercel Serverless Function - Contact Form Mail Sender
// Route: POST /api/contact
// ============================================================

const nodemailer = require('nodemailer');

// In-memory rate limiter (per serverless instance)
const rateLimit = new Map();
const RATE_WINDOW = 60 * 1000;
const RATE_MAX = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const rec = rateLimit.get(ip) || { count: 0, start: now };
  if (now - rec.start > RATE_WINDOW) {
    rec.count = 0;
    rec.start = now;
  }
  rec.count++;
  rateLimit.set(ip, rec);
  return rec.count > RATE_MAX;
}

const clean = (v) => (typeof v === 'string' ? v.trim().slice(0, 2000) : '');
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const name    = clean(body.name);
    const email   = clean(body.email);
    const phone   = clean(body.phone);
    const subject = clean(body.subject) || 'Website Inquiry';
    const message = clean(body.message);

    const errors = [];
    if (!name) errors.push('Name required');
    if (!email) errors.push('Email required');
    if (email && !isValidEmail(email)) errors.push('Invalid email');
    if (!message) errors.push('Message required');

    if (errors.length) return res.status(400).json({ error: errors.join(', ') });

    // Validate env vars
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('❌ SMTP credentials missing in env');
      return res.status(500).json({ error: 'Server email not configured' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlBody = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; color: #1f2937; line-height: 1.6;">
        <div style="background: linear-gradient(135deg, #1769FF, #0A47CC); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">🎯 New Website Inquiry</h1>
        </div>
        <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
          <table cellpadding="10" style="border-collapse: collapse; width: 100%;">
            <tr><td style="width: 110px;"><strong>Name:</strong></td><td>${esc(name)}</td></tr>
            <tr><td><strong>Email:</strong></td><td><a href="mailto:${esc(email)}" style="color: #1769FF;">${esc(email)}</a></td></tr>
            <tr><td><strong>Phone:</strong></td><td>${esc(phone) || '<span style="color: #9ca3af;">—</span>'}</td></tr>
            <tr><td><strong>Subject:</strong></td><td>${esc(subject)}</td></tr>
          </table>
          <h3 style="margin-top: 20px; color: #1769FF;">Message</h3>
          <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #1769FF; white-space: pre-wrap;">${esc(message)}</div>
          <hr style="margin-top: 24px; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            📅 Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })}<br>
            🌐 Source: ${esc(req.headers.host || 'website')}
          </p>
        </div>
      </div>
    `;

    const textBody =
      `New Inquiry\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}\n\n` +
      `— Sent from website contact form`;

    await transporter.sendMail({
      from: `"CertWinX Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `🎯 New Inquiry from ${name}${subject ? ' - ' + subject : ''}`,
      text: textBody,
      html: htmlBody,
    });

    console.log(`✅ Email sent: ${name} <${email}>`);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('❌ Mail error:', err);
    return res.status(500).json({
      error: 'Failed to send email. Please try again.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};
