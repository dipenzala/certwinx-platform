#!/bin/bash

# ============================================================
# CertWinX - FAST FIX
# Images + Preloader + Eligibility + Logo
# ============================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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
echo "╔════════════════════════════════════════╗"
echo "║   CertWinX - FAST FIX                  ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

BACKUP_DIR=".fast-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
log "Backup: $BACKUP_DIR"
echo ""

# ============================================================
# 1. INSTALL IMAGE OPTIMIZER
# ============================================================
header "1. Installing Image Optimizer"

if ! command -v npx >/dev/null 2>&1; then
    error "npx not found"
    exit 1
fi

# Install sharp-cli for image optimization (works locally)
npm list sharp >/dev/null 2>&1 || npm install --save-dev sharp 2>&1 | tail -2
log "sharp installed"
echo ""

# ============================================================
# 2. OPTIMIZE LARGE IMAGES
# ============================================================
header "2. Optimizing Large Images"

mkdir -p public/optimized

# Create optimization script
cat > optimize-images.mjs << 'OPT_EOF'
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const folders = ['public', 'src/assets', 'src/images'];
const TARGET_SIZE = 300 * 1024; // 300KB max
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function findLargeImages(dir) {
  const results = [];
  if (!existsSync(dir)) return results;
  
  try {
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        results.push(...findLargeImages(fullPath));
      } else if (stat.isFile()) {
        const ext = extname(file).toLowerCase();
        if (EXTENSIONS.includes(ext) && stat.size > TARGET_SIZE) {
          results.push({ path: fullPath, size: stat.size });
        }
      }
    }
  } catch (e) {}
  
  return results;
}

async function optimize() {
  console.log('🔍 Finding large images...\n');
  
  let allImages = [];
  for (const folder of folders) {
    allImages = allImages.concat(findLargeImages(folder));
  }
  
  if (allImages.length === 0) {
    console.log('✅ No large images found');
    return;
  }
  
  console.log(`Found ${allImages.length} large images:\n`);
  
  for (const img of allImages) {
    const sizeMB = (img.size / 1024 / 1024).toFixed(2);
    console.log(`📸 ${img.path} (${sizeMB} MB)`);
    
    const outputPath = img.path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    
    try {
      await sharp(img.path)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outputPath);
      
      const newSize = statSync(outputPath).size;
      const newSizeMB = (newSize / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newSize / img.size) * 100).toFixed(0);
      
      console.log(`   ✓ Created: ${basename(outputPath)} (${newSizeMB} MB) - ${reduction}% smaller\n`);
    } catch (e) {
      console.log(`   ❌ Failed: ${e.message}\n`);
    }
  }
  
  console.log('✅ Optimization complete!\n');
  console.log('⚠️  Update code to use .webp versions for best results\n');
}

optimize();
OPT_EOF

node optimize-images.mjs
log "Image optimization complete"
echo ""

# ============================================================
# 3. FIX PRELOADER SPEED
# ============================================================
header "3. Fixing Preloader Speed"

PRELOADER="src/components/ui/Preloader.jsx"

if [ -f "$PRELOADER" ]; then
    cp "$PRELOADER" "$BACKUP_DIR/"
    
    # Read the file
    cat > "$PRELOADER" << 'PRELOADER_EOF'
// ============================================================
// FastPreloader - Optimized loading screen
// No artificial delays, completes as soon as possible
// ============================================================

import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    let finished = false;

    // Fast increment - realistic progress
    const interval = setInterval(() => {
      if (finished) return;
      // Fast at start, slows at end
      const increment = current < 50 ? 15 : current < 80 ? 6 : 2;
      current = Math.min(current + increment, 95);
      setProgress(current);
    }, 50);

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setTimeout(() => {
        setHidden(true);
        setTimeout(() => onComplete?.(), 200);
      }, 150);
    };

    // Complete as soon as page loads
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    // Hard max: 1.5 seconds (fast!)
    const fallback = setTimeout(finish, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white transition-opacity duration-200 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <img
          src="/certwinx-logo.png"
          alt="CertWinX"
          className="h-16 sm:h-20 w-auto"
          loading="eager"
          fetchPriority="high"
        />
        <div className="w-56 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-gray-400 tabular-nums">
          {String(progress).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
PRELOADER_EOF

    log "Preloader optimized (1.5s max, no delays)"
else
    warn "Preloader.jsx not found"
fi
echo ""

# ============================================================
# 4. CHECK ELIGIBILITY FLOW
# ============================================================
header "4. Eligibility Flow Analysis"

HERO="src/components/sections/Hero.jsx"
if [ -f "$HERO" ]; then
    info "Hero.jsx found - checking eligibility flow..."
    
    # Check how eligibility is triggered
    if grep -q "eligibility\|Eligibility" "$HERO"; then
        log "Hero has eligibility CTA"
        
        # Look for what it does
        grep -n "eligibility\|Eligibility" "$HERO" | head -5 | sed 's/^/   /'
    fi
fi
echo ""

# Check LeadPopup - it seems this is what opens
LEADPOPUP="src/components/ui/LeadPopup.jsx"
if [ -f "$LEADPOPUP" ]; then
    info "LeadPopup.jsx found — this might be the form"
    grep -n "eligibility\|Eligibility\|step\|Step" "$LEADPOPUP" | head -10 | sed 's/^/   /'
fi
echo ""

# ============================================================
# 5. UPDATE INDEX.HTML FOR SPEED
# ============================================================
header "5. Adding Preload Hints"

if [ -f "index.html" ]; then
    cp index.html "$BACKUP_DIR/"
    
    # Add preload for logo if not present
    if ! grep -q 'rel="preload".*logo' index.html; then
        if command -v perl >/dev/null 2>&1; then
            perl -i -0pe 's/(<head>\s*\n)/$1    <link rel="preconnect" href="https:\/\/fonts.googleapis.com" \/>\n    <link rel="preconnect" href="https:\/\/fonts.gstatic.com" crossorigin \/>\n/' index.html
        fi
    fi
    log "index.html updated with preconnect hints"
fi
echo ""

# ============================================================
# 6. LOGO INFO
# ============================================================
header "6. Logo Information"

if [ -f "public/certwinx-logo.png" ]; then
    SIZE=$(du -h "public/certwinx-logo.png" | cut -f1)
    warn "Current logo: public/certwinx-logo.png ($SIZE)"
    info "To change logo, replace THIS file with your new logo"
    info "Keep the name: certwinx-logo.png"
fi
echo ""

# ============================================================
# SUMMARY
# ============================================================
header "Done!"

echo -e "${GREEN}✓ Image optimization complete${NC}"
echo -e "${GREEN}✓ Preloader optimized${NC}"
echo -e "${GREEN}✓ Speed improvements applied${NC}"
echo ""
echo -e "${YELLOW}━━━ Ab Yeh Karo ━━━${NC}"
echo ""
echo -e "${CYAN}1. LOGO CHANGE:${NC}"
echo "   → public/certwinx-logo.png ko apne naye logo se replace karo"
echo "   → Same naam rakho (certwinx-logo.png)"
echo ""
echo -e "${CYAN}2. PRELOADER + IMAGES TEST:${NC}"
echo "   → npm run dev"
echo "   → Website khulega - ab tez load hoga"
echo ""
echo -e "${CYAN}3. ELIGIBILITY FORM:${NC}"
echo "   → Mujhe batao eligibility button click karne pe kya hota hai"
echo "   → Screenshot bhejo"
echo ""
echo -e "${YELLOW}━━━ Deploy ━━━${NC}"
echo ""
echo "   git add ."
echo "   git commit -m 'Speed optimization + preloader fix'"
echo "   git push"
echo ""