#!/bin/bash

# ============================================================
# CertWinX - FINAL ALL-IN-ONE SCRIPT
# Everything: Fix + Test + Prepare Deploy
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
header() { echo -e "\n${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; echo -e "${MAGENTA}  $1${NC}"; echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
info()   { echo -e "${CYAN}ℹ${NC} $1"; }

clear
echo -e "${MAGENTA}"
cat << "BANNER"
╔════════════════════════════════════════════╗
║   CertWinX - FINAL ALL-IN-ONE FIXER        ║
║   Fix + Test + Deploy Prep                 ║
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

# ============================================================
# SECTION 1: Fix test-mail.js (ES Module)
# ============================================================
header "1. Fixing test-mail.js (ES Module)"

cat > test-mail.js << 'TEST_EOF'
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
TEST_EOF

log "Fixed: test-mail.js"

# Make sure dotenv is installed
if ! grep -q "\"dotenv\"" package.json; then
    npm install dotenv --save 2>&1 | tail -2
fi
log "dotenv installed"
echo ""

# ============================================================
# SECTION 2: Verify .env
# ============================================================
header "2. Verifying .env"

if [ ! -f ".env" ]; then
    error ".env file nahi mili!"
    info "Creating template..."
    cat > .env << 'ENV_EOF'
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=xxxxxxx@smtp-brevo.com
SMTP_PASS=your-smtp-key
MAIL_TO=info@certwinx.com
MAIL_FROM=info@certwinx.com
VITE_ADMIN_EMAIL=admin@certwinx.com
VITE_ADMIN_PASS=admin123
VITE_APP_URL=http://localhost:5173
ENV_EOF
    warn "Please edit .env with your Brevo credentials and re-run"
    exit 1
fi

# Check required vars
MISSING=0
for var in SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS MAIL_TO MAIL_FROM; do
    VAL=$(grep "^$var=" .env 2>/dev/null | cut -d'=' -f2- | tr -d ' ')
    if [ -z "$VAL" ] || [[ "$VAL" == *"your-"* ]] || [[ "$VAL" == *"xxxx"* ]]; then
        warn "$var not set or still placeholder"
        MISSING=1
    else
        log "$var ✓"
    fi
done

if [ $MISSING -eq 1 ]; then
    error "Please fill .env with real Brevo credentials"
    info "Run: code .env"
    exit 1
fi
echo ""

# ============================================================
# SECTION 3: Fix GSAP data-wa-glow
# ============================================================
header "3. Fixing GSAP warnings"

GSAP_FILES=$(find src -type f \( -name "*.jsx" -o -name "*.js" \) 2>/dev/null | \
    xargs grep -l "data-wa-glow" 2>/dev/null || true)

if [ -n "$GSAP_FILES" ]; then
    echo "$GSAP_FILES" | while read -r file; do
        mkdir -p "$BACKUP_DIR/$(dirname "$file")"
        cp "$file" "$BACKUP_DIR/$file"
        
        # Check if the target exists in the file
        if grep -q 'data-wa-glow' "$file" && ! grep -q 'data-wa-glow=' "$file"; then
            # Only in gsap selector, element missing
            sed -i.bak "/\[data-wa-glow\]/d" "$file"
            rm -f "$file.bak"
            log "Removed data-wa-glow selector from $(basename $file)"
        else
            info "$(basename $file) — OK"
        fi
    done
else
    info "No data-wa-glow references found"
fi
echo ""

# ============================================================
# SECTION 4: Fix rotateX/Y
# ============================================================
header "4. Fixing rotateX/rotateY warnings"

BN_FILE="src/components/sections/BusinessNeeds.jsx"
if [ -f "$BN_FILE" ]; then
    cp "$BN_FILE" "$BACKUP_DIR/$(basename $BN_FILE)"
    
    # Add transformPerspective if using rotateX/Y
    if grep -q "rotateX\|rotateY" "$BN_FILE"; then
        # Replace with rotationX/rotationY (safer)
        sed -i.bak 's/\brotateX:/rotationX:/g; s/\brotateY:/rotationY:/g' "$BN_FILE"
        rm -f "$BN_FILE.bak"
        log "Fixed rotateX/Y in BusinessNeeds.jsx"
    else
        info "No rotateX/Y in BusinessNeeds.jsx"
    fi
else
    warn "BusinessNeeds.jsx not found"
fi
echo ""

# ============================================================
# SECTION 5: Ensure favicon exists
# ============================================================
header "5. Favicon Check"

mkdir -p public

if [ ! -f "public/favicon.svg" ]; then
    cat > public/favicon.svg << 'SVG_EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1769FF"/>
      <stop offset="100%" stop-color="#0A47CC"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#g)"/>
  <text x="50" y="72" font-family="Arial, sans-serif" font-size="62" font-weight="800" fill="white" text-anchor="middle">C</text>
  <circle cx="80" cy="22" r="7" fill="#FFB800"/>
</svg>
SVG_EOF
    log "Created: public/favicon.svg"
else
    info "favicon.svg already exists"
fi

# ============================================================
# SECTION 6: Ensure vercel.json is correct
# ============================================================
header "6. Updating vercel.json"

[ -f "vercel.json" ] && cp vercel.json "$BACKUP_DIR/vercel.json"

cat > vercel.json << 'VERCEL_EOF'
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
VERCEL_EOF

log "Updated: vercel.json"
echo ""

# ============================================================
# SECTION 7: Ensure api/contact.js exists
# ============================================================
header "7. Mail API Check"

if [ ! -f "api/contact.js" ]; then
    error "api/contact.js missing! Run previous fix-all.sh first"
    exit 1
fi
log "api/contact.js exists"
echo ""

# ============================================================
# SECTION 8: Ensure supabase.js has all exports
# ============================================================
header "8. Supabase.js Exports Check"

SUPA="src/lib/supabase.js"
if [ -f "$SUPA" ]; then
    for fn in submitLead getLeads signIn signOut getSession; do
        if grep -q "export.*$fn" "$SUPA"; then
            log "export $fn ✓"
        else
            warn "export $fn MISSING"
        fi
    done
else
    error "src/lib/supabase.js not found!"
fi
echo ""

# ============================================================
# SECTION 9: TEST EMAIL
# ============================================================
header "9. TESTING EMAIL"

info "Running node test-mail.js..."
echo ""

if node test-mail.js; then
    echo ""
    log "🎉 EMAIL TEST PASSED!"
    EMAIL_OK=1
else
    echo ""
    error "EMAIL TEST FAILED"
    EMAIL_OK=0
fi
echo ""

# ============================================================
# SECTION 10: Deploy Prep
# ============================================================
header "10. Deploy Preparation"

# Create .env.example
cat > .env.example << 'ENV_EX_EOF'
# Brevo SMTP
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-login@smtp-brevo.com
SMTP_PASS=your-smtp-key
MAIL_TO=info@certwinx.com
MAIL_FROM=info@certwinx.com

# Admin
VITE_ADMIN_EMAIL=admin@certwinx.com
VITE_ADMIN_PASS=admin123

# App
VITE_APP_URL=https://certwinx.com
ENV_EX_EOF

log "Created: .env.example"

# Update .gitignore
for pattern in ".env" ".env.local" ".env.*.local" ".final-backup-*" ".vercel"; do
    if [ -f ".gitignore" ] && ! grep -qxF "$pattern" .gitignore; then
        echo "$pattern" >> .gitignore
    fi
done
log "Updated: .gitignore"
echo ""

# ============================================================
# DONE
# ============================================================
echo ""
if [ "$EMAIL_OK" = "1" ]; then
    echo -e "${GREEN}"
    cat << "DONE"
╔════════════════════════════════════════════╗
║        ✅  ALL DONE - EMAIL WORKING!       ║
╚════════════════════════════════════════════╝
DONE
    echo -e "${NC}"
else
    echo -e "${YELLOW}"
    cat << "DONE"
╔════════════════════════════════════════════╗
║   ⚠️  SETUP DONE BUT EMAIL TEST FAILED     ║
╚════════════════════════════════════════════╝
DONE
    echo -e "${NC}"
fi

echo ""
echo -e "${CYAN}📁 Backup:${NC} $BACKUP_DIR"
echo ""
echo -e "${MAGENTA}━━━ Ab Yeh Karo ━━━${NC}"
echo ""
echo -e "${YELLOW}1. Dev server restart karo:${NC}"
echo "   Ctrl+C dabao, phir: npm run dev"
echo ""
echo -e "${YELLOW}2. Form test karne ke liye (LOCAL):${NC}"
echo "   # Vercel CLI install karo"
echo "   npm install -g vercel"
echo "   # Phir"
echo "   vercel dev"
echo "   # Ab local pe /api/contact bhi chalega"
echo ""
echo -e "${YELLOW}3. Ya seedha Vercel pe deploy karo:${NC}"
echo "   git add ."
echo "   git commit -m 'Complete email setup with Brevo'"
echo "   git push"
echo ""
echo -e "${YELLOW}4. Vercel Dashboard me env variables add karo:${NC}"
echo "   → Project → Settings → Environment Variables"
echo "   → Yeh add karo:"
echo "     SMTP_HOST=smtp-relay.brevo.com"
echo "     SMTP_PORT=587"
echo "     SMTP_USER=xxxxxxx@smtp-brevo.com"
echo "     SMTP_PASS=your-smtp-key"
echo "     MAIL_TO=info@certwinx.com"
echo "     MAIL_FROM=info@certwinx.com"
echo "     VITE_ADMIN_EMAIL=admin@certwinx.com"
echo "     VITE_ADMIN_PASS=your-password"
echo "   → Deployments → Redeploy"
echo ""
echo -e "${MAGENTA}━━━ Restore (if needed) ━━━${NC}"
echo "   cp -r $BACKUP_DIR/* ."
echo ""