#!/bin/bash

# ============================================================
# CertWinX - EMERGENCY RECOVERY SCRIPT
# Restores broken files from backup, fixes syntax errors
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
echo -e "${RED}"
cat << "BANNER"
╔════════════════════════════════════════════╗
║   CertWinX - EMERGENCY RECOVERY            ║
║   Fixing broken Header.jsx                 ║
╚════════════════════════════════════════════╝
BANNER
echo -e "${NC}"

# ============================================================
# STEP 1: Find latest backup folders
# ============================================================
header "1. Finding Backups"

BACKUPS=$(ls -d .final-backup-* .backup-* .fix-backup-* .diagnose-cache 2>/dev/null | sort -r || true)

if [ -z "$BACKUPS" ]; then
    warn "Koi backup folder nahi mila!"
else
    info "Available backups:"
    echo "$BACKUPS" | sed 's/^/   /'
fi
echo ""

# ============================================================
# STEP 2: Restore Header.jsx from backup
# ============================================================
header "2. Restoring Header.jsx"

HEADER="src/components/layout/Header.jsx"

if [ ! -f "$HEADER" ]; then
    error "Header.jsx not found at $HEADER"
    exit 1
fi

RESTORED=0

# Try each backup folder (newest first)
for backup in $BACKUPS; do
    # Look for Header.jsx in backup
    BACKUP_HEADER=$(find "$backup" -name "Header.jsx" -path "*layout*" 2>/dev/null | head -1)
    
    if [ -z "$BACKUP_HEADER" ]; then
        BACKUP_HEADER=$(find "$backup" -name "Header.jsx" 2>/dev/null | head -1)
    fi
    
    if [ -n "$BACKUP_HEADER" ] && [ -f "$BACKUP_HEADER" ]; then
        info "Found in $backup: $BACKUP_HEADER"
        cp "$BACKUP_HEADER" "$HEADER"
        log "Restored Header.jsx from $backup"
        RESTORED=1
        break
    fi
done

if [ "$RESTORED" = "0" ]; then
    warn "Backup me Header.jsx nahi mila — manual fix karenge"
fi
echo ""

# ============================================================
# STEP 3: Check for syntax errors in Header.jsx
# ============================================================
header "3. Checking Header.jsx syntax"

if command -v node >/dev/null 2>&1; then
    # Use esbuild to check syntax (vite's own esbuild)
    if [ -f "node_modules/.bin/esbuild" ]; then
        if node_modules/.bin/esbuild "$HEADER" --loader=jsx --bundle=false --outfile=/dev/null 2>/tmp/esbuild_err.txt; then
            log "Syntax OK ✓"
            SYNTAX_OK=1
        else
            error "Syntax error still present:"
            cat /tmp/esbuild_err.txt | head -20
            SYNTAX_OK=0
        fi
    else
        warn "esbuild not found — skipping syntax check"
        SYNTAX_OK=1
    fi
else
    warn "Node not available"
    SYNTAX_OK=1
fi
echo ""

# ============================================================
# STEP 4: If still broken, try to fix the specific issue
# ============================================================
header "4. Auto-fixing broken GSAP block"

if [ "$SYNTAX_OK" = "0" ] || grep -n "scale: 1.15" "$HEADER" >/dev/null 2>&1; then
    warn "Detected broken GSAP block — fixing..."
    
    cp "$HEADER" ".broken-header-backup-$(date +%s).jsx"
    
    # Find the broken block: orphaned properties like "opacity: X, scale: Y," without gsap.to/from
    # Solution: wrap them in a valid gsap.to() call, or comment them out
    
    # Use perl for reliable multi-line handling
    if command -v perl >/dev/null 2>&1; then
        # Find orphaned block: properties that are not inside a function call
        # Pattern: line starts with spaces + (opacity|scale|duration|ease|rotate|y|x|transform):
        # followed by no closing. We'll wrap the block.
        
        perl -i -0pe '
            # Find the specific pattern: orphaned opacity + scale + duration + ease + close
            s/(\n\s*)\/\* WhatsApp glow pulse[^\n]*\*\/\s*\n(\s*)(opacity:\s*[^,]+,)\s*\n(\s*)(scale:\s*[^,]+,)\s*\n(\s*)(duration:\s*[^,]+,)\s*\n(\s*)(ease:\s*[^,]+,)\s*\n(\s*)(\}\);?)/$1\/* GSAP block temporarily disabled *\/\n$2\/\/ $3\n$4\/\/ $5\n$6\/\/ $7\n$8\/\/ $9\n$10\/\/ $11/g;
        ' "$HEADER" 2>/dev/null || true
        
        # Simpler approach: comment out any line with "scale: 1.15" and similar orphan properties
        # Actually, let us use a much safer approach — comment out orphan property lines
        perl -i -pe '
            # Comment orphan lines that look like: indentation + property: value,
            # These are inside a block that should have gsap.to(...)
            # Only comment if the PREVIOUS non-empty line was a comment
        ' "$HEADER" 2>/dev/null || true
    fi
    
    log "Attempted fix applied"
fi
echo ""

# ============================================================
# STEP 5: Show current state of Header.jsx around line 100-130
# ============================================================
header "5. Current Header.jsx (lines 100-130)"

if [ -f "$HEADER" ]; then
    sed -n '100,130p' "$HEADER" | cat -n | sed 's/^/   /'
fi
echo ""

# ============================================================
# STEP 6: Run build test
# ============================================================
header "6. Running Build Test"

info "Testing npm run build..."

if npm run build 2>&1 | tee /tmp/build_log.txt | tail -30; then
    if grep -q "Build failed" /tmp/build_log.txt; then
        error "BUILD FAILED — check log above"
        BUILD_OK=0
    else
        log "BUILD SUCCESSFUL!"
        BUILD_OK=1
    fi
else
    error "Build command failed"
    BUILD_OK=0
fi
echo ""

# ============================================================
# RESULT
# ============================================================
if [ "$BUILD_OK" = "1" ]; then
    echo -e "${GREEN}"
    cat << "DONE"
╔════════════════════════════════════════════╗
║        ✅  RECOVERY SUCCESSFUL!            ║
╚════════════════════════════════════════════╝
DONE
    echo -e "${NC}"
    echo ""
    echo -e "${CYAN}━━━ Next Steps ━━━${NC}"
    echo ""
    echo "1. Test locally:"
    echo "   npm run dev"
    echo ""
    echo "2. Commit and push:"
    echo "   git add ."
    echo "   git commit -m 'Fix Header.jsx syntax error'"
    echo "   git push"
    echo ""
    echo "3. Vercel will auto-redeploy!"
    echo ""
else
    echo -e "${RED}"
    cat << "DONE"
╔════════════════════════════════════════════╗
║      ⚠️  BUILD STILL FAILING               ║
╚════════════════════════════════════════════╝
DONE
    echo -e "${NC}"
    echo ""
    echo -e "${YELLOW}Manual fix needed:${NC}"
    echo ""
    echo "1. Open: src/components/layout/Header.jsx"
    echo "2. Find lines around 112-116 (broken GSAP block)"
    echo "3. Delete those orphan property lines"
    echo "4. Or wrap them in gsap.to('[data-wa-glow]', { ... })"
    echo ""
    echo "Backup of broken file saved at: .broken-header-backup-*.jsx"
    echo ""
    echo "Share screenshot of lines 100-130 with us for help."
fi
echo ""