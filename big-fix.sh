#!/bin/bash

# ============================================================
# CertWinX - Big Fix Script
# 1. Logo detection & replacement
# 2. Eligibility flow check
# 3. Loading screen optimization
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
║   CertWinX - Big Fix                       ║
║   Logo + Eligibility + Speed               ║
╚════════════════════════════════════════════╝
BANNER
echo -e "${NC}"

if [ ! -f "package.json" ]; then
    error "Root folder me chalao!"
    exit 1
fi

# ============================================================
# SECTION 1: FIND ALL LOGO FILES
# ============================================================
header "1. Finding Logo Files"

echo -e "${YELLOW}📁 Logo Files:${NC}"
find src public -type f \( -iname "*logo*" -o -iname "*brand*" \) \
  \( -name "*.svg" -o -name "*.png" -o -name "*.webp" -o -name "*.jpg" \) 2>/dev/null | while read -r f; do
  SIZE=$(du -h "$f" | cut -f1)
  echo "   ✓ $f  ($SIZE)"
done
echo ""

echo -e "${YELLOW}📄 Files Using Logo:${NC}"
grep -rln "logo\|CertWinX.*\.svg\|certwinx.*\.svg" src --include="*.jsx" --include="*.js" 2>/dev/null | head -10 | while read -r f; do
  echo "   → $f"
done
echo ""

echo -e "${YELLOW}🌐 Favicon Files:${NC}"
ls public/favicon* public/*.ico public/*.svg 2>/dev/null | sed 's/^/   → /' || echo "   (none)"
echo ""

# ============================================================
# SECTION 2: FIND LOADING SCREEN
# ============================================================
header "2. Finding Loading Screen"

LOADING_FILES=$(grep -rln "Loading Experience\|LOADING EXPERIENCE\|Aapki Tarakki\|loading.*screen\|Preloader\|SplashScreen\|Loader" src --include="*.jsx" --include="*.js" 2>/dev/null | head -10 || true)

if [ -z "$LOADING_FILES" ]; then
    warn "Loading screen component nahi mila"
else
    echo "$LOADING_FILES" | while read -r f; do
        echo "   → $f"
    done
fi
echo ""

# ============================================================
# SECTION 3: FIND ELIGIBILITY COMPONENT
# ============================================================
header "3. Finding Eligibility Component"

ELIG_FILES=$(grep -rln "eligibility\|Eligibility\|Check.*Eligib" src --include="*.jsx" --include="*.js" 2>/dev/null | head -10 || true)

if [ -z "$ELIG_FILES" ]; then
    warn "Eligibility component nahi mila"
else
    echo "$ELIG_FILES" | while read -r f; do
        echo "   → $f"
    done
fi
echo ""

# ============================================================
# SECTION 4: LOADING SPEED OPTIMIZATION
# ============================================================
header "4. Optimizing Loading Speed"

# Vite config optimization
if [ -f "vite.config.js" ]; then
    info "vite.config.js found — checking optimizations..."
    
    # Check if already has build optimizations
    if grep -q "chunkSizeWarningLimit\|manualChunks" vite.config.js; then
        log "vite.config.js already optimized"
    else
        warn "vite.config.js needs optimization (see manual steps below)"
    fi
fi
echo ""

# Check large images
info "Large image files (>500KB):"
find src public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) \
  -size +500k 2>/dev/null | while read -r f; do
  SIZE=$(du -h "$f" | cut -f1)
  warn "$f ($SIZE)"
done
echo ""

# Check if loading screen has minimum display time
if [ -n "$LOADING_FILES" ]; then
    info "Checking loading screen timing..."
    echo "$LOADING_FILES" | while read -r f; do
        # Look for setTimeout with high values
        TIMEOUTS=$(grep -n "setTimeout" "$f" 2>/dev/null | head -5)
        if [ -n "$TIMEOUTS" ]; then
            echo -e "${CYAN}$f:${NC}"
            echo "$TIMEOUTS" | sed 's/^/   /'
        fi
    done
fi
echo ""

# ============================================================
# SECTION 5: LOADING SCREEN OPTIMIZATION HINT
# ============================================================
header "5. Loading Screen Fix"

if [ -n "$LOADING_FILES" ]; then
    echo -e "${YELLOW}Loading screen ko fast karne ke liye:${NC}"
    echo ""
    echo "1. Minimum display time kam karo (jaise 2s se 500ms)"
    echo "2. Progress bar ko zyada realistic banao"
    echo ""
    echo -e "${CYAN}Files to check:${NC}"
    echo "$LOADING_FILES" | while read -r f; do
        echo "   → $f"
    done
fi
echo ""

# ============================================================
# SECTION 6: ELIGIBILITY FORM FIX
# ============================================================
header "6. Eligibility Form Fix"

if [ -n "$ELIG_FILES" ]; then
    echo -e "${YELLOW}Eligibility flow ko fix karne ke liye:${NC}"
    echo ""
    echo "Aapko check karna hai:"
    echo "  1. Eligibility steps ke baad form component hai?"
    echo "  2. Form ka submit handler kaam kar raha hai?"
    echo "  3. LeadPopup ya LeadForm component use ho raha hai?"
    echo ""
    echo -e "${CYAN}Related files:${NC}"
    echo "$ELIG_FILES" | while read -r f; do
        echo "   → $f"
    done
fi
echo ""

# ============================================================
# SECTION 7: CREATE LOADING OPTIMIZED COMPONENT
# ============================================================
header "7. Creating Fast Loader Template"

mkdir -p src/components/ui

cat > src/components/ui/FastLoader.jsx << 'LOADER_EOF'
// ============================================================
// FastLoader - Optimized loading screen
// Fast, smooth, no lag
// ============================================================

import { useEffect, useState } from 'react';

export default function FastLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Realistic progress: quick to 90%, then wait for actual load
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear speed: fast at start, slows down
      const increment = current < 60 ? 8 : current < 85 ? 3 : 1;
      current = Math.min(current + increment, 95);
      setProgress(current);
    }, 80);

    // Complete when window is fully loaded
    const finish = () => {
      setProgress(100);
      setTimeout(() => onComplete?.(), 200);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }

    // Hard fallback - max 2 seconds
    const fallback = setTimeout(finish, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="CertWinX"
          className="h-16 sm:h-20 w-auto animate-pulse"
        />

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="text-sm font-mono text-gray-500 tabular-nums">
          {String(progress).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
LOADER_EOF

log "Created: src/components/ui/FastLoader.jsx"
echo ""

# ============================================================
# SECTION 8: CREATE OPTIMIZED VITE CONFIG
# ============================================================
header "8. Optimized Vite Config Template"

cat > vite.config.optimized.js.example << 'VITE_EOF'
// ============================================================
// Optimized Vite Config
// Copy relevant parts to your vite.config.js
// ============================================================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Faster builds
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'gsap': ['gsap'],
          'lucide': ['lucide-react'],
        },
      },
    },
    
    // Increase warning limit
    chunkSizeWarningLimit: 1000,
    
    // Disable source maps in production (faster)
    sourcemap: false,
  },
  
  // Faster dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', 'lucide-react'],
  },
  
  // Dev server speed
  server: {
    hmr: true,
  },
});
VITE_EOF

log "Created: vite.config.optimized.js.example (reference)"
echo ""

# ============================================================
# SUMMARY
# ============================================================
header "Summary"

echo -e "${GREEN}✓ Script complete!${NC}"
echo ""
echo -e "${CYAN}━━━ Ab Yeh Karo ━━━${NC}"
echo ""
echo -e "${YELLOW}1. LOGO CHANGE:${NC}"
echo "   → Upar Section 1 me jo logo files dikhein, unhe replace karo"
echo "   → Screenshot bhejo logo files ka"
echo ""
echo -e "${YELLOW}2. LOADING SPEED:${NC}"
echo "   → src/components/ui/FastLoader.jsx use karo"
echo "   → Ya apni loading screen ka setTimeout kam karo (2000 → 500)"
echo ""
echo -e "${YELLOW}3. ELIGIBILITY FORM:${NC}"
echo "   → Screenshot bhejo eligibility flow ka"
echo "   → Ya bataao kaunsa file hai"
echo ""
echo -e "${MAGENTA}━━━ Mujhe Yeh Bhejo ━━━${NC}"
echo ""
echo "1. Logo files ka screenshot (Section 1 output)"
echo "2. Loading screen component ka code"
echo "3. Eligibility flow ka screenshot/code"
echo ""