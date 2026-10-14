// ============================================================
// Mail Test Script (ES Module)
// ============================================================

import 'dotenv/config';
import nodemailer from 'nodemailer';

async function testMail() {
  console.log('🧪 Testing SMTP configuration...\n');

  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'];
  const missing = required.filter((k) => !process.env[k]);

  if (missing.length) {
    console.error('❌ Missing env vars:', missing.join(', '));
    console.error('   .env file me values daalo.');
    process.exit(1);
  }

  console.log('📧 SMTP:  ', process.env.SMTP_HOST + ':' + process.env.SMTP_PORT);
  console.log('👤 User:  ', process.env.SMTP_USER);
  console.log('📬 To:    ', process.env.MAIL_TO);
  console.log('');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: parseInt(process.env.SMTP_PORT, 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified!\n');

    const info = await transporter.sendMail({
      from: `"CertWinX Test" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: '✅ Test Email from CertWinX',
      text: 'Yeh ek test email hai. Agar aapko mil gayi, toh SMTP setup sahi hai! 🎉',
      html: '<h2>✅ Test Email</h2><p>SMTP setup sahi hai! 🎉</p>',
    });

    console.log('✅ Test email sent!');
    console.log('   Message ID:', info.messageId);
    console.log('   Check inbox:', process.env.MAIL_TO);
    console.log('\n🎉 Email setup complete!');
  } catch (err) {
    console.error('❌ Failed:', err.message);
    console.error('\n💡 Check:');
    console.error('   • SMTP_USER = xxxxx@smtp-brevo.com');
    console.error('   • SMTP_PASS = SMTP Key from Brevo');
    console.error('   • SMTP_HOST = smtp-relay.brevo.com');
    process.exit(1);
  }
}

testMail();
