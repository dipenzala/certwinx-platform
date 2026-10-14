#!/bin/bash

# ============================================================
# CertWinX - Remove White Logo Filter
# Fixes: brightness(0) invert(1) → colorful logo
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

clear
echo -e "${MAGENTA}"
echo "╔════════════════════════════════════════╗"
echo "║   Remove White Logo Filter             ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

BACKUP_DIR=".logo-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
log "Backup: $BACKUP_DIR"
echo ""

# ============================================================
# 1. FIX FOOTER.JSX
# ============================================================
header "1. Fixing Footer.jsx"

FOOTER="src/components/layout/Footer.jsx"

if [ -f "$FOOTER" ]; then
    cp "$FOOTER" "$BACKUP_DIR/Footer.jsx.bak"
    
    # Show before
    echo -e "${YELLOW}Before:${NC}"
    grep -n "brightness(0)" "$FOOTER" | sed 's/^/   /'
    echo ""
    
    # Remove brightness(0) invert(1) filter
    # Pattern 1: filter: 'brightness(0) invert(1)'
    sed -i.bak "s/filter: 'brightness(0) invert(1)',\?//g" "$FOOTER"
    # Pattern 2: filter: "brightness(0) invert(1)"
    sed -i.bak 's/filter: "brightness(0) invert(1)",\?//g' "$FOOTER"
    # Pattern 3: style={{ filter: 'brightness(0) invert(1)' }}
    sed -i.bak "s/style={{ filter: 'brightness(0) invert(1)' }}//g" "$FOOTER"
    # Pattern 4: with spaces
    sed -i.bak "s/filter: 'brightness(0) invert(1)'//g" "$FOOTER"
    
    rm -f "$FOOTER.bak"
    
    # Show after
    echo -e "${YELLOW}After:${NC}"
    if grep -q "brightness(0)" "$FOOTER"; then
        warn "Filter still present - manual check needed:"
        grep -n "brightness" "$FOOTER" | sed 's/^/   /'
    else
        log "Filter removed from Footer.jsx ✅"
    fi
else
    error "Footer.jsx not found"
fi
echo ""

# ============================================================
# 2. FIX ADMIN.JSX
# ============================================================
header "2. Fixing Admin.jsx"

ADMIN="src/pages/admin/Admin.jsx"

if [ -f "$ADMIN" ]; then
    cp "$ADMIN" "$BACKUP_DIR/Admin.jsx.bak"
    
    echo -e "${YELLOW}Before:${NC}"
    grep -n "brightness(0)" "$ADMIN" | sed 's/^/   /'
    echo ""
    
    # Remove brightness(0) invert(1)
    sed -i.bak "s/filter: 'brightness(0) invert(1)',\?//g" "$ADMIN"
    sed -i.bak 's/filter: "brightness(0) invert(1)",\?//g' "$ADMIN"
    sed -i.bak "s/style={{ filter: 'brightness(0) invert(1)' }}//g" "$ADMIN"
    
    rm -f "$ADMIN.bak"
    
    echo -e "${YELLOW}After:${NC}"
    if grep -q "brightness(0)" "$ADMIN"; then
        warn "Filter still present - manual check needed:"
        grep -n "brightness" "$ADMIN" | sed 's/^/   /'
    else
        log "Filter removed from Admin.jsx ✅"
    fi
else
    error "Admin.jsx not found"
fi
echo ""

# ============================================================
# 3. GLOBAL SWEEP
# ============================================================
header "3. Global Sweep - All Files"

echo -e "${CYAN}Scanning all files for brightness(0)...${NC}"
echo ""

FOUND=0
find src -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.css" \) 2>/dev/null | while read -r file; do
    if grep -q "brightness(0)" "$file" 2>/dev/null; then
        FOUND=1
        echo -e "${YELLOW}Found in: $file${NC}"
        grep -n "brightness(0)" "$file" | sed 's/^/   /'
        echo ""
        
        # Backup
        mkdir -p "$BACKUP_DIR/$(dirname "$file")"
        cp "$file" "$BACKUP_DIR/$file"
        
        # Remove
        sed -i.bak "s/filter: 'brightness(0) invert(1)',\?//g" "$file"
        sed -i.bak 's/filter: "brightness(0) invert(1)",\?//g' "$file"
        sed -i.bak "s/filter: 'brightness(0)'//g" "$file"
        sed -i.bak "s/brightness-0 invert//g" "$file"
        sed -i.bak "s/brightness-0//g" "$file"
        rm -f "$file.bak"
        
        log "Cleaned: $file"
        echo ""
    fi
done

if [ "$FOUND" = "0" ]; then
    log "No brightness(0) filters found - all clean!"
fi
echo ""

# ============================================================
# 4. VERIFY LOGO.JSX
# ============================================================
header "4. Verifying Logo.jsx"

if [ -f "src/components/ui/Logo.jsx" ]; then
    if grep -q "brightness\|invert" src/components/ui/Logo.jsx; then
        warn "Logo.jsx has filter — fixing"
        sed -i.bak "s/brightness-0 invert//g" src/components/ui/Logo.jsx
        sed -i.bak "s/brightness(0) invert(1)//g" src/components/ui/Logo.jsx
        rm -f src/components/ui/Logo.jsx.bak
        log "Cleaned Logo.jsx"
    else
        log "Logo.jsx is clean ✅"
    fi
fi
echo ""

# ============================================================
# 5. VERIFY ALL LOGO IMG TAGS
# ============================================================
header "5. Verifying All Logo <img> Tags"

echo -e "${CYAN}Logo <img> tags in codebase:${NC}"
grep -rn 'src="\/certwinx-logo' src --include="*.jsx" 2>/dev/null | while read -r line; do
    echo "   $line"
done
echo ""

# ============================================================
# 6. FINAL CHECK
# ============================================================
header "6. Final Check"

REMAINING=$(grep -rn "brightness(0)\|brightness-0" src --include="*.jsx" --include="*.js" 2>/dev/null | wc -l)

if [ "$REMAINING" -eq 0 ]; then
    echo -e "${GREEN}"
    cat << "DONE"
╔════════════════════════════════════════╗
║   ✅  ALL CLEAN!                       ║
║   Logo will now be COLORFUL            ║
╚════════════════════════════════════════╝
DONE
    echo -e "${NC}"
else
    echo -e "${YELLOW}"
    cat << "DONE"
╔════════════════════════════════════════╗
║   ⚠️  Some filters remain              ║
╚════════════════════════════════════════╝
DONE
    echo -e "${NC}"
    echo "Remaining instances:"
    grep -rn "brightness(0)\|brightness-0" src --include="*.jsx" --include="*.js" 2>/dev/null | sed 's/^/   /'
fi
echo ""

# ============================================================
# DONE
# ============================================================
echo -e "${CYAN}━━━ Ab Yeh Karo ━━━${NC}"
echo ""
echo -e "${YELLOW}1. Server restart:${NC}"
echo "   Ctrl+C"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}2. Browser HARD refresh:${NC}"
echo "   Ctrl + Shift + R"
echo ""
echo -e "${YELLOW}3. Check logo:${NC}"
echo "   → Header (top left)"
echo "   → Footer (bottom left)"
echo "   → Admin panel"
echo ""
echo -e "${YELLOW}4. Agar ab bhi white:${NC}"
echo "   → Screenshot bhejo"
echo "   → Backup: $BACKUP_DIR"
echo ""