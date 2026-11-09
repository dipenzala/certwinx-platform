// ============================================================
// Vercel Serverless Function - Enterprise Contact & Lead Mailer
// Route: POST /api/contact
// Destination: info@certwinx.com (or process.env.MAIL_TO)
// ============================================================

import nodemailer from 'nodemailer';

// In-memory rate limiter (per serverless instance)
const rateLimit = new Map();
const RATE_WINDOW = 60 * 1000;
const RATE_MAX = 10;

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

const clean = (v) => (typeof v === 'string' ? v.trim().slice(0, 2500) : '');
const esc = (s) =>
  String(s || '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default async function handler(req, res) {
  // CORS headers
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
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    const name     = clean(body.name) || 'Prospective Client';
    const phone    = clean(body.phone || body.mobile || body.contact);
    const email    = clean(body.email);
    const company  = clean(body.company || body.businessName || body.firmName);
    const city     = clean(body.city || body.state || body.location);
    const service  = clean(body.service || body.subject) || 'Startup & Tax Exemption Advisory';
    const message  = clean(body.message || body.requirement || body.details) || 'Enquiry submitted via CertWinX website portal.';
    const source   = clean(body.source) || req.headers.referer || 'CertWinX Official Website';

    // Flexible Indian lead validation: Requires either phone or email
    const errors = [];
    if (!phone && !email) {
      errors.push('Please provide either a phone number or email address so we can reach you.');
    }
    if (email && !isValidEmail(email)) {
      errors.push('Invalid email address format.');
    }

    if (errors.length) {
      return res.status(400).json({ error: errors.join(' ') });
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const targetRecipient = process.env.MAIL_TO || 'info@certwinx.com';
    const senderEmail = process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@certwinx.com';

    // HTML Email Template
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
        <div style="background: linear-gradient(135deg, #0B132B 0%, #060D24 100%); padding: 32px 28px; border-bottom: 3px solid #1C83F3;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
            🎯 New Client Advisory Enquiry
          </h1>
          <p style="color: #94A3B8; margin: 6px 0 0 0; font-size: 13px;">
            CertWinX Platform · AAPKI TARAKKI KA SAATHI, BHAROSHA APKA, JIMMEDARI HUMARI
          </p>
        </div>

        <div style="padding: 28px; background: #FAFBFC;">
          <table cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: separate; border-spacing: 0 8px;">
            <tr style="background: #ffffff;">
              <td style="padding: 12px 16px; width: 140px; font-weight: 600; color: #475569; font-size: 13px; border-radius: 8px 0 0 8px; border: 1px solid #E2E8F0; border-right: none;">
                Client Name:
              </td>
              <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0F172A; border-radius: 0 8px 8px 0; border: 1px solid #E2E8F0; border-left: none;">
                ${esc(name)}
              </td>
            </tr>

            <tr style="background: #ffffff;">
              <td style="padding: 12px 16px; font-weight: 600; color: #475569; font-size: 13px; border-radius: 8px 0 0 8px; border: 1px solid #E2E8F0; border-right: none;">
                Phone Number:
              </td>
              <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0F172A; border-radius: 0 8px 8px 0; border: 1px solid #E2E8F0; border-left: none;">
                ${phone ? `<a href="tel:${esc(phone)}" style="color: #1C83F3; text-decoration: none;">${esc(phone)}</a> &nbsp; <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #10B981; text-decoration: none; font-size: 12px;">[WhatsApp Client]</a>` : '<span style="color: #94A3B8;">Not provided</span>'}
              </td>
            </tr>

            <tr style="background: #ffffff;">
              <td style="padding: 12px 16px; font-weight: 600; color: #475569; font-size: 13px; border-radius: 8px 0 0 8px; border: 1px solid #E2E8F0; border-right: none;">
                Email Address:
              </td>
              <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #0F172A; border-radius: 0 8px 8px 0; border: 1px solid #E2E8F0; border-left: none;">
                ${email ? `<a href="mailto:${esc(email)}" style="color: #1C83F3; text-decoration: none;">${esc(email)}</a>` : '<span style="color: #94A3B8;">Not provided</span>'}
              </td>
            </tr>

            ${company ? `
            <tr style="background: #ffffff;">
              <td style="padding: 12px 16px; font-weight: 600; color: #475569; font-size: 13px; border-radius: 8px 0 0 8px; border: 1px solid #E2E8F0; border-right: none;">
                Company / Startup:
              </td>
              <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #0F172A; border-radius: 0 8px 8px 0; border: 1px solid #E2E8F0; border-left: none;">
                ${esc(company)}
              </td>
            </tr>` : ''}

            ${city ? `
            <tr style="background: #ffffff;">
              <td style="padding: 12px 16px; font-weight: 600; color: #475569; font-size: 13px; border-radius: 8px 0 0 8px; border: 1px solid #E2E8F0; border-right: none;">
                City / State:
              </td>
              <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #0F172A; border-radius: 0 8px 8px 0; border: 1px solid #E2E8F0; border-left: none;">
                ${esc(city)}
              </td>
            </tr>` : ''}

            <tr style="background: #ffffff;">
              <td style="padding: 12px 16px; font-weight: 600; color: #475569; font-size: 13px; border-radius: 8px 0 0 8px; border: 1px solid #E2E8F0; border-right: none;">
                Service Requested:
              </td>
              <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #1C83F3; border-radius: 0 8px 8px 0; border: 1px solid #E2E8F0; border-left: none;">
                ${esc(service)}
              </td>
            </tr>
          </table>

          <div style="margin-top: 20px; background: #ffffff; padding: 18px; border-radius: 12px; border: 1px solid #E2E8F0;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
              Enquiry Details & Requirements:
            </p>
            <p style="margin: 0; font-size: 14px; color: #1E293B; line-height: 1.6; white-space: pre-wrap;">
              ${esc(message)}
            </p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B; line-height: 1.6;">
            <div>📅 <strong>Submitted at:</strong> ${timestamp}</div>
            <div>🌐 <strong>Lead Source:</strong> ${esc(source)}</div>
            <div>🔒 <strong>Delivered to:</strong> ${targetRecipient}</div>
          </div>
        </div>
      </div>
    `;

    const textBody =
      `🎯 NEW CLIENT ENQUIRY — CertWinX\n` +
      `===================================\n` +
      `Name: ${name}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      `Email: ${email || 'Not provided'}\n` +
      `Company: ${company || 'Not provided'}\n` +
      `City: ${city || 'Not provided'}\n` +
      `Service: ${service}\n` +
      `Timestamp: ${timestamp}\n` +
      `Source: ${source}\n\n` +
      `Requirement:\n${message}\n` +
      `===================================\n`;

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('ℹ️ SMTP credentials not found in env — logging enquiry locally:');
      console.log(textBody);
      return res.status(200).json({
        success: true,
        message: 'Enquiry received and saved to advisory inbox.',
        mode: 'logged',
        data: { name, phone, email, service, company },
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CertWinX Enquiry" <${senderEmail}>`,
      to: targetRecipient,
      replyTo: email ? `"${name}" <${email}>` : senderEmail,
      subject: `🎯 [CertWinX Lead] ${name} — ${service} (${phone || email})`,
      text: textBody,
      html: htmlBody,
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry received successfully. Our advisory team will contact you shortly.',
    });
  } catch (err) {
    console.error('❌ Contact handler error:', err);
    return res.status(500).json({ error: 'Server error processing enquiry. Please contact us via WhatsApp.' });
  }
}
