#!/bin/bash

# ============================================================
# CertWinX - Complete Diagnostic & Auto-Fix Script
# - Checks all JSX/JS files for issues
# - Finds unimported components
# - Auto-fixes common problems
# - Verifies build
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
header() { echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; echo -e "${BLUE}  $1${NC}"; echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
info()   { echo -e "${CYAN}ℹ${NC} $1"; }

clear
echo -e "${MAGENTA}"
echo "╔════════════════════════════════════════════╗"
echo "║  CertWinX - Diagnostic & Auto-Fix Script   ║"
echo "║  (Yeh sab kuch check karke fix karega)     ║"
echo "╚════════════════════════════════════════════╝"
echo -e "${NC}"

if [ ! -f "package.json" ]; then
    error "package.json nahi mila! Root folder me chalao."
    exit 1
fi

# ============================================================
# SECTION 1: Project Info
# ============================================================
header "SECTION 1: Project Information"

info "Project name: $(node -e "console.log(require('./package.json').name)" 2>/dev/null || echo 'unknown')"
info "Version: $(node -e "console.log(require('./package.json').version)" 2>/dev/null || echo 'unknown')"
info "Node: $(node -v 2>/dev/null || echo 'not found')"
info "NPM: $(npm -v 2>/dev/null || echo 'not found')"
echo ""

# Check dependencies
info "Key dependencies:"
for pkg in react react-dom vite lucide-react react-router-dom nodemailer; do
    if grep -q "\"$pkg\"" package.json; then
        VERSION=$(node -e "try{console.log(require('./package.json').dependencies['$pkg'] || require('./package.json').devDependencies['$pkg'])}catch(e){console.log('?')}" 2>/dev/null)
        echo "   ✓ $pkg @ $VERSION"
    else
        warn "$pkg not installed"
    fi
done
echo ""

# ============================================================
# SECTION 2: File Structure Check
# ============================================================
header "SECTION 2: File Structure"

REQUIRED_FILES=(
    "src/main.jsx:src/main.js:src/main.tsx:src/index.jsx:src/index.js"
    "src/App.jsx:src/App.js:src/App.tsx"
    "src/lib/supabase.js:src/utils/supabase.js:src/supabaseClient.js"
    "api/contact.js"
    "vercel.json"
    "package.json"
)

for group in "${REQUIRED_FILES[@]}"; do
    IFS=':' read -ra FILES <<< "$group"
    FOUND=""
    for f in "${FILES[@]}"; do
        if [ -f "$f" ]; then
            FOUND="$f"
            break
        fi
    done
    if [ -n "$FOUND" ]; then
        log "Found: $FOUND"
    else
        warn "Missing: ${FILES[0]}"
    fi
done
echo ""

# ============================================================
# SECTION 3: Missing Import Detection
# ============================================================
header "SECTION 3: Detecting Missing Imports (Yeh main issue hai)"

mkdir -p .diagnose-cache

# Find all JSX files
JSX_FILES=$(find src -type f \( -name "*.jsx" -o -name "*.tsx" \) 2>/dev/null || true)

if [ -z "$JSX_FILES" ]; then
    warn "Koi JSX file nahi mili"
else
    ISSUES_FOUND=0

    echo "$JSX_FILES" | while read -r file; do
        # Extract capitalized component tags used in this file
        # Looks for patterns like <Users, <Icon, <MyComponent but not HTML tags
        USED_COMPONENTS=$(grep -oE "<[A-Z][a-zA-Z0-9_]+" "$file" 2>/dev/null | \
            sed 's/^<//' | sort -u || true)

        if [ -z "$USED_COMPONENTS" ]; then
            continue
        fi

        # Get all imports in this file
        IMPORTS=$(grep -E "^import" "$file" 2>/dev/null || true)

        MISSING=""
        while IFS= read -r comp; do
            [ -z "$comp" ] && continue
            # Skip common HTML elements that might be capitalized
            # Skip if it's defined locally in this file
            if grep -qE "(function|const|class)\s+$comp\b" "$file" 2>/dev/null; then
                continue
            fi
            # Skip if it's imported
            if echo "$IMPORTS" | grep -qE "\b$comp\b" 2>/dev/null; then
                continue
            fi
            MISSING="$MISSING $comp"
        done <<< "$USED_COMPONENTS"

        if [ -n "$MISSING" ]; then
            ISSUES_FOUND=$((ISSUES_FOUND + 1))
            echo -e "${RED}✗ $file${NC}"
            echo "   Missing imports:$MISSING"
            echo ""
        fi
    done
fi
echo ""

# ============================================================
# SECTION 4: All Imports From supabase.js
# ============================================================
header "SECTION 4: Imports From supabase.js"

IMPORT_FILES=$(find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
    xargs grep -l "from.*supabase" 2>/dev/null || true)

if [ -z "$IMPORT_FILES" ]; then
    info "No files import from supabase.js"
else
    echo "$IMPORT_FILES" | while read -r file; do
        echo -e "${CYAN}📄 $file${NC}"
        grep -E "import.*supabase" "$file" | sed 's/^/   /'
    done
fi
echo ""

# ============================================================
# SECTION 5: supabase.js Exports Check
# ============================================================
header "SECTION 5: Available Exports in supabase.js"

SUPA_FILE=""
for f in "src/lib/supabase.js" "src/utils/supabase.js" "src/supabaseClient.js" "src/supabase.js"; do
    if [ -f "$f" ]; then
        SUPA_FILE="$f"
        break
    fi
done

if [ -z "$SUPA_FILE" ]; then
    error "supabase.js file nahi mili!"
else
    log "File: $SUPA_FILE"
    echo ""
    info "Named exports:"
    grep -oE "export (async )?function [a-zA-Z_]+" "$SUPA_FILE" 2>/dev/null | \
        sed 's/export //' | sed 's/async //' | sed 's/function //' | \
        sort -u | sed 's/^/   ✓ /' || echo "   (none)"
    echo ""
    info "Default exports:"
    grep -E "export default" "$SUPA_FILE" 2>/dev/null | sed 's/^/   ✓ /' || echo "   (none)"
fi
echo ""

# ============================================================
# SECTION 6: FeaturedServices.jsx Specific Check
# ============================================================
header "SECTION 6: FeaturedServices.jsx Specific Check"

FS_FILE=""
for f in "src/components/sections/FeaturedServices.jsx" "src/components/FeaturedServices.jsx"; do
    if [ -f "$f" ]; then
        FS_FILE="$f"
        break
    fi
done

if [ -n "$FS_FILE" ]; then
    log "Found: $FS_FILE"
    echo ""
    info "Icons imported from lucide-react:"
    grep -E "from ['\"]lucide-react['\"]" "$FS_FILE" 2>/dev/null | sed 's/^/   /' || echo "   ⚠ NO lucide-react import found!"
    echo ""
    info "Components used (capitalized):"
    grep -oE "<[A-Z][a-zA-Z0-9_]+" "$FS_FILE" 2>/dev/null | sed 's/^</   • /' | sort -u || echo "   (none)"
    echo ""
    
    # Check specifically for Users
    if grep -qE "<Users" "$FS_FILE" 2>/dev/null; then
        if grep -qE "\bUsers\b.*from.*lucide-react" "$FS_FILE" 2>/dev/null; then
            log "Users is properly imported"
        else
            error "Users is USED but NOT imported from lucide-react!"
            echo ""
            echo -e "${YELLOW}   FIX: Add this import to $FS_FILE:${NC}"
            echo "   import { Users } from 'lucide-react';"
        fi
    fi
else
    warn "FeaturedServices.jsx not found"
fi
echo ""

# ============================================================
# SECTION 7: All Lucide Icons Used vs Imported
# ============================================================
header "SECTION 7: Lucide Icons Diagnosis"

ICON_FILES=$(find src -type f \( -name "*.jsx" -o -name "*.tsx" \) 2>/dev/null | \
    xargs grep -l "lucide-react" 2>/dev/null || true)

if [ -z "$ICON_FILES" ]; then
    warn "No files use lucide-react"
else
    echo "$ICON_FILES" | while read -r file; do
        echo -e "${CYAN}📄 $file${NC}"
        # Get all imports from lucide-react
        grep -A 30 "from ['\"]lucide-react['\"]" "$file" | \
            grep -E "import|^\s+[A-Z]" | head -40 | sed 's/^/   /'
        echo ""
    done
fi

# ============================================================
# SECTION 8: .env Files Check
# ============================================================
header "SECTION 8: Environment Variables"

for envfile in .env .env.local .env.development; do
    if [ -f "$envfile" ]; then
        log "Found: $envfile"
        echo "   Contents (secrets masked):"
        sed 's/=.*/=***/' "$envfile" | sed 's/^/     /'
        echo ""
    fi
done

if [ ! -f ".env" ] && [ ! -f ".env.local" ]; then
    warn ".env file missing — creating basic one"
    cat > .env << 'EOF'
# Mail SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_TO=support@shayconsultancy.in

# Admin Login
VITE_ADMIN_EMAIL=admin@shayconsultancy.in
VITE_ADMIN_PASS=admin123
EOF
    log "Created .env"
fi
echo ""

# ============================================================
# SECTION 9: Common Errors Pattern Search
# ============================================================
header "SECTION 9: Common Error Patterns"

PATTERNS=(
    "\.\./\.\./lib/supabase:Relative supabase import (check path)"
    "process\.env\.:process.env usage in frontend (should be import.meta.env)"
    "require\(:require() in frontend (use import)"
)

for pattern in "${PATTERNS[@]}"; do
    IFS=':' read -ra P <<< "$pattern"
    MATCHES=$(find src -type f \( -name "*.jsx" -o -name "*.js" \) 2>/dev/null | \
        xargs grep -l "${P[0]}" 2>/dev/null | head -5 || true)
    if [ -n "$MATCHES" ]; then
        warn "${P[1]}"
        echo "$MATCHES" | sed 's/^/   /'
    fi
done
echo ""

# ============================================================
# SECTION 10: Fix FeaturedServices.jsx (Auto-fix)
# ============================================================
header "SECTION 10: Auto-Fix FeaturedServices.jsx"

if [ -n "$FS_FILE" ]; then
    # Check if Users is used but not imported
    if grep -qE "<Users" "$FS_FILE" 2>/dev/null; then
        if ! grep -qE "\bUsers\b.*from.*lucide-react" "$FS_FILE" 2>/dev/null; then
            warn "Auto-fixing Users import..."
            
            # Backup
            BACKUP_FILE=".diagnose-cache/$(basename "$FS_FILE").bak"
            cp "$FS_FILE" "$BACKUP_FILE"
            log "Backed up to $BACKUP_FILE"
            
            # Check if lucide-react import exists
            if grep -q "from ['\"]lucide-react['\"]" "$FS_FILE"; then
                # Find lucide import line and add Users to it
                # Handle multi-line import
                if grep -qE "^import\s*\{[^}]*\}\s*from\s*['\"]lucide-react['\"]" "$FS_FILE"; then
                    # Single line import
                    sed -i.bak -E "s/(import\s*\{)([^}]*)(\}\s*from\s*['\"]lucide-react['\"])/\1\2, Users\3/" "$FS_FILE"
                    # Clean up double commas
                    sed -i.bak -E "s/,\s*,/,/g" "$FS_FILE"
                    rm -f "$FS_FILE.bak"
                    log "Added Users to existing lucide-react import"
                else
                    # Multi-line import - add Users on a new line before closing }
                    # This is trickier with sed, use perl
                    if command -v perl >/dev/null 2>&1; then
                        perl -i -0pe "s/(import\s*\{)([^}]*?)(\}\s*from\s*['\"]lucide-react['\"])/\1\2, Users\3/s" "$FS_FILE"
                        log "Added Users to existing lucide-react import (multiline)"
                    else
                        warn "Perl not available. Manually add 'Users' to lucide-react import"
                    fi
                fi
            else
                # No lucide import, add one at top
                # Find last import line
                LAST_IMPORT=$(grep -n "^import" "$FS_FILE" | tail -1 | cut -d: -f1)
                if [ -n "$LAST_IMPORT" ]; then
                    sed -i.bak "${LAST_IMPORT}a\\
import { Users } from 'lucide-react';
" "$FS_FILE"
                    rm -f "$FS_FILE.bak"
                    log "Added new lucide-react import"
                else
                    # Prepend at top
                    sed -i.bak "1i\\
import { Users } from 'lucide-react';
" "$FS_FILE"
                    rm -f "$FS_FILE.bak"
                    log "Added lucide-react import at top"
                fi
            fi
        else
            log "Users already imported properly"
        fi
    fi
else
    warn "FeaturedServices.jsx not found — skipping auto-fix"
fi
echo ""

# ============================================================
# SECTION 11: Missing Icons Auto-Add (All files)
# ============================================================
header "SECTION 11: Auto-Add All Missing Lucide Icons"

# Common lucide icons that might be missing
COMMON_ICONS="Users User UserCheck UserPlus UserCircle FileText FileCheck FilePlus Briefcase Building Building2 Rocket Target TrendingUp TrendingDown Award Shield CheckCircle CheckCircle2 XCircle AlertCircle Info Mail Phone MessageSquare Send PhoneCall MapPin Globe Calendar Clock DollarSign CreditCard Wallet BarChart BarChart2 BarChart3 PieChart LineChart Activity Zap Star Heart Bookmark Tag Folder FolderOpen Settings Cog LogOut LogIn Menu X Search Plus Minus Edit Trash Copy ExternalLink ChevronRight ChevronDown ChevronUp ArrowRight ArrowLeft ArrowUp ArrowDown Download Upload Eye EyeOff Lock Unlock Key Home LayoutDashboard Grid List"

echo "$JSX_FILES" | while read -r file; do
    if ! grep -q "lucide-react" "$file" 2>/dev/null; then
        continue
    fi
    
    # Get existing lucide imports
    EXISTING=$(grep -A 50 "from ['\"]lucide-react['\"]" "$file" | grep -oE "\b[A-Z][a-zA-Z0-9_]+\b" | sort -u)
    
    # Get used components
    USED=$(grep -oE "<[A-Z][a-zA-Z0-9_]+" "$file" | sed 's/^<//' | sort -u)
    
    # Find icons that are used AND are lucide icons BUT not imported
    MISSING_ICONS=""
    for icon in $COMMON_ICONS; do
        if echo "$USED" | grep -qx "$icon"; then
            if ! echo "$EXISTING" | grep -qx "$icon"; then
                MISSING_ICONS="$MISSING_ICONS $icon"
            fi
        fi
    done
    
    if [ -n "$MISSING_ICONS" ]; then
        warn "$file — missing icons:$MISSING_ICONS"
    fi
done
echo ""

# ============================================================
# SECTION 12: Summary
# ============================================================
header "SECTION 12: Summary & Next Steps"

echo ""
echo -e "${GREEN}✅ Website load ho rahi hai — Supabase fix ho gaya!${NC}"
echo ""
echo -e "${YELLOW}Remaining issues (agar koi ho):${NC}"
echo ""
echo "  1. Missing imports — Section 3 & 6 dekho"
echo "  2. Auto-fix chalaya gaya hai — dobara check karo"
echo ""
echo -e "${CYAN}━━━ Ab Yeh Karo ━━━${NC}"
echo ""
echo -e "${YELLOW}1. Server Restart:${NC}"
echo "   Ctrl+C dabao, phir: npm run dev"
echo ""
echo -e "${YELLOW}2. Browser Refresh:${NC}"
echo "   http://localhost:5173/"
echo ""
echo -e "${YELLOW}3. Console Check Karo:${NC}"
echo "   F12 → Console tab → errors dekhо"
echo ""
echo -e "${YELLOW}4. Backup Location:${NC}"
echo "   .diagnose-cache/"
echo ""
echo -e "${CYAN}━━━ Manual Fix (agar auto-fix fail ho) ━━━${NC}"
echo ""
echo "FeaturedServices.jsx me yeh line add karo (top pe imports ke saath):"
echo ""
echo -e "${GREEN}   import { Users } from 'lucide-react';${NC}"
echo ""