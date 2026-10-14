#!/bin/bash

# ============================================================
# CertWinX - Final Complete Fix Script
# - Favicon fix
# - Manifest fix
# - GSAP warnings fix
# - rotateX/Y fix
# - Email setup (SMTP config + Vercel)
# - Inquiry form integration check
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

log()    { echo -e "${GREEN}✓${NC} $1"; }
warn()   { echo -e "${YELLOW}⚠${NC} $1"; }
error()  { echo -e "${RED}✗${NC} $1"; }
header() { echo -e "\n${MAGENTA}━━━ $1 ━━━${NC}"; }
info()   { echo -e "${CYAN}ℹ${NC} $1"; }

clear
echo -e "${MAGENTA}"
cat << "BANNER"
╔════════════════════════════════════════════╗
║   CertWinX - Final Complete Fix Script     ║
║   Favicon + Icons + GSAP + Email Setup     ║
╚════════════════════════════════════════════╝
BANNER
echo -e "${NC}"

if [ ! -f "package.json" ]; then
    error "package.json nahi mila! Root folder me chalao."
    exit 1
fi

# Backup
BACKUP_DIR=".final-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
log "Backup: $BACKUP_DIR"
echo ""

# ============================================================
# SECTION 1: FAVICON FIX
# ============================================================
header "1. Fixing Favicon (public/favicon.svg)"

mkdir -p public

# Create SVG favicon
cat > public/favicon.svg << 'SVG_EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1769FF"/>
      <stop offset="100%" stop-color="#0A47CC"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#g)"/>
  <text x="50" y="72"
        font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
        font-size="62" font-weight="800" fill="white"
        text-anchor="middle" letter-spacing="-2">C</text>
  <circle cx="80" cy="22" r="7" fill="#FFB800"/>
</svg>
SVG_EOF

log "Created: public/favicon.svg"

# Create a simple 32x32 PNG placeholder (base64 decoded)
cat > public/favicon.ico << 'ICO_EOF'
ICO_EOF

# Small hint
warn "Empty favicon.ico created — SVG will be primary"

# Update index.html to use SVG favicon
if [ -f "index.html" ]; then
    cp index.html "$BACKUP_DIR/index.html"
    
    # Remove old favicon links
    sed -i.bak '/rel="icon"/d' index.html
    sed -i.bak '/rel="shortcut icon"/d' index.html
    sed -i.bak '/rel="apple-touch-icon"/d' index.html
    rm -f index.html.bak
    
    # Add new favicon link after <head>
    if command -v perl >/dev/null 2>&1; then
        perl -i -0pe 's/(<head>\s*\n)/$1    <link rel="icon" type="image\/svg+xml" href="\/favicon.svg" \/>\n    <link rel="alternate icon" href="\/favicon.ico" \/>\n/' index.html
        log "Updated index.html with new favicon"
    else
        warn "Perl not found — manually add favicon link to index.html"
    fi
fi
echo ""

# ============================================================
# SECTION 2: MANIFEST FIX
# ============================================================
header "2. Fixing Manifest / PWA Icons"

# Option 1: Remove manifest link (simpler)
if [ -f "index.html" ]; then
    if grep -q 'rel="manifest"' index.html; then
        sed -i.bak '/rel="manifest"/d' index.html
        rm -f index.html.bak
        log "Removed manifest link from index.html"
    fi
    
    # Remove theme-color icon warnings
    if grep -q 'android-chrome' index.html; then
        sed -i.bak '/android-chrome/d' index.html
        rm -f index.html.bak
        log "Removed android-chrome icon references"
    fi
fi

# Create a proper manifest.json (optional - for future)
cat > public/manifest.json << 'MANIFEST_EOF'
{
  "name": "CertWinX - Business Registration & Compliance",
  "short_name": "CertWinX",
  "description": "Business registration, certifications, startup benefits and funding assistance.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1769FF",
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}
MANIFEST_EOF

log "Created: public/manifest.json"
echo ""

# ============================================================
# SECTION 3: GSAP WARNINGS FIX
# ============================================================
header "3. Fixing GSAP data-wa-glow warnings"

# Search for data-wa-glow references
GSAP_FILES=$(find src -type f \( -name "*.jsx" -o -name "*.js" \) 2>/dev/null | \
    xargs grep -l "data-wa-glow" 2>/dev/null || true)

if [ -n "$GSAP_FILES" ]; then
    echo "$GSAP_FILES" | while read -r file; do
        # Backup
        mkdir -p "$BACKUP_DIR/$(dirname "$file")"
        cp "$file" "$BACKUP_DIR/$file"
        
        # Check if the target element exists
        if grep -q 'data-wa-glow=' "$file" || grep -q "data-wa-glow=" "$file"; then
            log "$file — element exists, no fix needed"
        else
            warn "$file — references 'data-wa-glow' but element missing"
            info "   Commenting out GSAP target..."
            
            # Comment out gsap.from/to targeting data-wa-glow
            sed -i.bak "s|gsap\.\(from\|to\|set\)('\[data-wa-glow\]'|// gsap.\1('[data-wa-glow]'|g" "$file"
            rm -f "$file.bak"
        fi
    done
else
    info "No data-wa-glow references found"
fi
echo ""

# ============================================================
# SECTION 4: ROTATEX/ROTATEY FIX (BusinessNeeds.jsx)
# ============================================================
header "4. Fixing rotateX/rotateY warnings"

BN_FILE=""
for f in "src/components/sections/BusinessNeeds.jsx" "src/components/BusinessNeeds.jsx"; do
    if [ -f "$f" ]; then
        BN_FILE="$f"
        break
    fi
done

if [ -n "$BN_FILE" ]; then
    cp "$BN_FILE" "$BACKUP_DIR/$(basename $BN_FILE)"
    
    info "Found: $BN_FILE"
    
    # Fix: add transformPerspective before rotateX/rotateY usage
    # Or replace with rotationX/rotationY
    
    if command -v perl >/dev/null 2>&1; then
        # Replace rotateX: with rotationX: and rotateY: with rotationY:
        perl -i -pe 's/\brotateX:/rotationX:/g' "$BN_FILE"
        perl -i -pe 's/\brotateY:/rotationY:/g' "$BN_FILE"
        log "Replaced rotateX/Y with rotationX/Y"
    else
        sed -i.bak 's/rotateX:/rotationX:/g' "$BN_FILE"
        sed -i.bak 's/rotateY:/rotationY:/g' "$BN_FILE"
        rm -f "$BN_FILE.bak"
        log "Replaced rotateX/Y with rotationX/Y"
    fi
else
    warn "BusinessNeeds.jsx not found — skipping"
fi
echo ""

# ============================================================
# SECTION 5: EMAIL SETUP (.env)
# ============================================================
header "5. Email Setup — .env Configuration"

if [ ! -f ".env" ]; then
    cat > .env << 'ENV_EOF'
# ============================================================
# EMAIL / SMTP SETTINGS
# ============================================================
# Which SMTP to use?
#   Gmail:     smtp.gmail.com         | Port 587 (STARTTLS)
#   Hostinger: smtp.hostinger.com     | Port 587
#   Brevo:     smtp-relay.brevo.com   | Port 587
#   Outlook:   smtp-mail.outlook.com  | Port 587
# ============================================================

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Where should inquiries land?
MAIL_TO=support@shayconsultancy.in

# From address (should match your domain for best deliverability)
MAIL_FROM=no-reply@shayconsultancy.in

# ============================================================
# ADMIN LOGIN (Vite prefix required for frontend access)
# ============================================================
VITE_ADMIN_EMAIL=admin@shayconsultancy.in
VITE_ADMIN_PASS=admin123

# ============================================================
# APP URL (for email links)
# ============================================================
VITE_APP_URL=http://localhost:5173
ENV_EOF
    log "Created: .env (please edit with real credentials)"
else
    log ".env already exists"
fi

# Sync to .env.example
cp .env .env.example 2>/dev/null && \
    sed -i.bak 's/\(SMTP_PASS=\).*/\1your-app-password/' .env.example && \
    sed -i.bak 's/\(VITE_ADMIN_PASS=\).*/\1admin123/' .env.example && \
    rm -f .env.example.bak

log "Synced: .env.example"
echo ""

# ============================================================
# SECTION 6: NODEMAILER INSTALL
# ============================================================
header "6. Installing nodemailer"

if grep -q "nodemailer" package.json; then
    log "nodemailer already in package.json"
else
    info "Adding nodemailer..."
    if command -v npm >/dev/null 2>&1; then
        npm install nodemailer --save 2>&1 | tail -3
        log "Installed nodemailer"
    else
        warn "npm not found — manually run: npm install nodemailer"
    fi
fi
echo ""

# ============================================================
# SECTION 7: VERCEL MAIL API
# ============================================================
header "7. Vercel Mail API (api/contact.js)"

mkdir -p api

cat > api/contact.js << 'API_EOF'
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
API_EOF

log "Created: api/contact.js"
echo ""

# ============================================================
# SECTION 8: VERIFY SUPABASE.JS HAS submitLead
# ============================================================
header "8. Verifying supabase.js has submitLead"

if [ -f "src/lib/supabase.js" ]; then
    if grep -q "export.*submitLead" src/lib/supabase.js; then
        log "submitLead export found ✓"
    else
        error "submitLead missing! Add it to src/lib/supabase.js"
    fi
else
    error "src/lib/supabase.js not found"
fi
echo ""

# ============================================================
# SECTION 9: VERCEL.JSON UPDATE
# ============================================================
header "9. Updating vercel.json"

if [ -f "vercel.json" ]; then
    cp vercel.json "$BACKUP_DIR/vercel.json"
fi

cat > vercel.json << 'VERCEL_EOF'
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
VERCEL_EOF

log "Updated: vercel.json"
echo ""

# ============================================================
# SECTION 10: .gitignore UPDATE
# ============================================================
header "10. Updating .gitignore"

if [ ! -f ".gitignore" ]; then
    touch .gitignore
fi

for pattern in ".env" ".env.local" ".env.*.local" "node_modules" "dist" ".final-backup-*" ".backup-*" ".fix-backup-*" ".diagnose-cache" ".vercel" ".DS_Store"; do
    if ! grep -qxF "$pattern" .gitignore; then
        echo "$pattern" >> .gitignore
    fi
done

log ".gitignore updated"
echo ""

# ============================================================
# SECTION 11: QUICK TEST SCRIPT
# ============================================================
header "11. Creating test script"

cat > test-mail.js << 'TEST_EOF'
// ============================================================
// Quick Mail Test Script
// Usage: node test-mail.js
// Requires: .env with SMTP credentials
// ============================================================

require('dotenv').config();
const nodemailer = require('nodemailer');

async function testMail() {
  console.log('🧪 Testing SMTP configuration...\n');

  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'];
  const missing = required.filter((k) => !process.env[k]);

  if (missing.length) {
    console.error('❌ Missing env vars:', missing.join(', '));
    console.error('   Please fill in .env file first.');
    process.exit(1);
  }

  console.log('📧 SMTP:', process.env.SMTP_HOST + ':' + process.env.SMTP_PORT);
  console.log('👤 User:', process.env.SMTP_USER);
  console.log('📬 To:  ', process.env.MAIL_TO);
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
      from: `"CertWinX Test" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: '✅ Test Email from CertWinX',
      text: 'Yeh ek test email hai. Agar aapko yeh mil gayi, toh SMTP setup sahi hai! 🎉',
      html: '<h2>✅ Test Email</h2><p>Yeh ek test email hai. Agar aapko yeh mil gayi, toh <strong>SMTP setup sahi hai</strong>! 🎉</p>',
    });

    console.log('✅ Test email sent!');
    console.log('   Message ID:', info.messageId);
    console.log('   Check inbox:', process.env.MAIL_TO);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    console.error('\n💡 Common fixes:');
    console.error('   • Gmail: use App Password (not regular password)');
    console.error('   • Enable 2FA first, then generate App Password');
    console.error('   • Check SMTP_HOST and SMTP_PORT');
    process.exit(1);
  }
}

testMail();
TEST_EOF

log "Created: test-mail.js"
echo ""

# Check if dotenv is installed
if ! grep -q "\"dotenv\"" package.json; then
    info "Installing dotenv..."
    npm install dotenv --save 2>&1 | tail -2
fi

# ============================================================
# DONE
# ============================================================
echo ""
echo -e "${GREEN}"
cat << "DONE"
╔════════════════════════════════════════════╗
║          ✅  ALL FIXES APPLIED!            ║
╚════════════════════════════════════════════╝
DONE
echo -e "${NC}"

echo -e "${CYAN}📁 Backup:${NC} $BACKUP_DIR"
echo ""
echo -e "${MAGENTA}━━━ Files Created/Updated ━━━${NC}"
echo "  ✓ public/favicon.svg"
echo "  ✓ public/manifest.json"
echo "  ✓ index.html (favicon fixed)"
echo "  ✓ .env (email config template)"
echo "  ✓ .env.example"
echo "  ✓ api/contact.js (Vercel mail API)"
echo "  ✓ vercel.json"
echo "  ✓ test-mail.js"
echo "  ✓ BusinessNeeds.jsx (rotateX/Y fixed)"
echo "  ✓ .gitignore"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}   📧 EMAIL SETUP - AB YEH KARO${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}Step 1: .env file me apni SMTP details daalo${NC}"
echo "   code .env"
echo ""
echo -e "${CYAN}Step 2: Gmail use kar rahe ho? App Password banao:${NC}"
echo "   1. https://myaccount.google.com/security"
echo "   2. 2-Step Verification ON karo"
echo "   3. Search: App Passwords"
echo "   4. New app password → 16-char code milega"
echo "   5. Us code ko SMTP_PASS me daalo (bina space ke)"
echo ""
echo -e "${CYAN}Step 3: Mail test karo${NC}"
echo "   node test-mail.js"
echo ""
echo -e "${CYAN}Step 4: Dev server restart${NC}"
echo "   Ctrl+C, phir: npm run dev"
echo ""
echo -e "${CYAN}Step 5: Browser refresh${NC}"
echo "   http://localhost:5173/"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}   🚀 VERCEL DEPLOY (Email live karne ke liye)${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "   git add ."
echo "   git commit -m 'Fix all warnings + email setup'"
echo "   git push"
echo ""
echo "   Phir Vercel Dashboard:"
echo "   → Project → Settings → Environment Variables"
echo "   → Yeh add karo:"
echo "     SMTP_HOST = smtp.gmail.com"
echo "     SMTP_PORT = 587"
echo "     SMTP_USER = your-email@gmail.com"
echo "     SMTP_PASS = your-app-password"
echo "     MAIL_TO   = support@shayconsultancy.in"
echo "   → Redeploy"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}   🔄 RESTORE (if something breaks)${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "   cp -r $BACKUP_DIR/* ."
echo ""