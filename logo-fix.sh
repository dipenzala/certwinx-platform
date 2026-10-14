#!/bin/bash

# ============================================================
# CertWinX - Logo Fix
# Restore original colorful logo (remove white/inverted)
# ============================================================

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
echo "║   CertWinX - Logo Fix                  ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# ============================================================
# 1. FIND ALL LOGO FILES
# ============================================================
header "1. Finding All Logo Files"

find src public -type f \( -iname "*logo*" -o -iname "*brand*" \) \
  \( -name "*.svg" -o -name "*.png" -o -name "*.webp" \) 2>/dev/null | while read -r f; do
  SIZE=$(du -h "$f" | cut -f1)
  echo "   → $f ($SIZE)"
done
echo ""

# ============================================================
# 2. FIND ALL LOGO USAGES
# ============================================================
header "2. Finding Logo Usages in Code"

grep -rn "certwinx-logo\|CertWinX.*logo\|logo.*\.png\|logo.*\.svg" src --include="*.jsx" --include="*.js" 2>/dev/null | head -20 | while read -r line; do
  echo "   $line"
done
echo ""

# ============================================================
# 3. FIND CSS FILTERS (invert/brightness)
# ============================================================
header "3. Finding CSS Filters on Logo"

echo -e "${YELLOW}invert / brightness filters:${NC}"
grep -rn "invert\|brightness\|filter" src/components --include="*.jsx" 2>/dev/null | grep -i "logo" | head -10 | while read -r line; do
  echo "   ❌ $line"
done
echo ""

echo -e "${YELLOW}All invert filters in JSX:${NC}"
grep -rn "invert" src --include="*.jsx" --include="*.js" 2>/dev/null | head -20 | while read -r line; do
  echo "   → $line"
done
echo ""

# ============================================================
# 4. SHOW HEADER.JSX LOGO USAGE
# ============================================================
header "4. Header.jsx Logo Code"

if [ -f "src/components/layout/Header.jsx" ]; then
    grep -n "logo\|Logo\|img" src/components/layout/Header.jsx | head -20 | sed 's/^/   /'
fi
echo ""

# ============================================================
# 5. SHOW FOOTER.JSX LOGO USAGE
# ============================================================
header "5. Footer.jsx Logo Code"

if [ -f "src/components/layout/Footer.jsx" ]; then
    grep -n "logo\|Logo\|img" src/components/layout/Footer.jsx | head -20 | sed 's/^/   /'
fi
echo ""

# ============================================================
# 6. SHOW Logo.jsx COMPONENT
# ============================================================
header "6. Logo.jsx Component"

if [ -f "src/components/ui/Logo.jsx" ]; then
    echo -e "${CYAN}Full content:${NC}"
    cat src/components/ui/Logo.jsx | head -60 | sed 's/^/   /'
fi
echo ""

# ============================================================
# SUMMARY
# ============================================================
header "Summary"

echo -e "${GREEN}Script complete!${NC}"
echo ""
echo -e "${YELLOW}━━━ Screenshot Bhejo ━━━${NC}"
echo ""
echo "Upar ka output screenshot bhejo — especially:"
echo "   1. Section 3 (CSS filters)"
echo "   2. Section 6 (Logo.jsx component)"
echo ""
echo -e "${CYAN}━━━ Possible Fixes ━━━${NC}"
echo ""
echo "Agar CSS me 'invert' ya 'brightness-0' hai → delete karo"
echo "Agar alag white logo file use ho rahi hai → colorful wali use karo"
echo "Agar filter: 'brightness(0) invert(1)' hai → hatao"
echo ""