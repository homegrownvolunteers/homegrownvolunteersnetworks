#!/bin/bash

# Database Migration Quick Start Script
# This script automates the database migration process

set -e  # Exit on error

echo "🚀 Homegrown Volunteers Network - Database Migration Setup"
echo "==========================================================="

# Check if Docker is running
echo "✓ Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi
echo "✅ Docker is running"

# Check if Supabase CLI is installed
echo "✓ Checking Supabase CLI..."
if ! command -v supabase &> /dev/null; then
    echo "📦 Installing Supabase CLI..."
    npm install -g supabase
fi
echo "✅ Supabase CLI is available"

# Get project info
echo ""
echo "📋 Configuration"
echo "=================="
read -p "Enter your Supabase Project Reference ID: " PROJECT_REF
read -p "Enter your Supabase Project ID (just the ID): " PROJECT_ID

if [ -z "$PROJECT_REF" ] || [ -z "$PROJECT_ID" ]; then
    echo "❌ Project reference and ID are required."
    exit 1
fi

# Change to project directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Link to Supabase project
echo ""
echo "🔗 Linking to Supabase project..."
supabase link --project-ref "$PROJECT_REF" || {
    echo "⚠️  Link already exists or failed. Continuing..."
}

# Push migrations
echo ""
echo "📤 Applying database migrations..."
supabase db push || {
    echo "❌ Migration failed. Check your Supabase project connection."
    exit 1
}
echo "✅ Migrations applied successfully"

# Generate types
echo ""
echo "📝 Generating TypeScript types..."
supabase gen types typescript --project-ref "$PROJECT_REF" > src/types/database.ts || {
    echo "⚠️  Type generation had issues. You may need to do this manually."
}
echo "✅ Types generated"

# Build to verify
echo ""
echo "🔨 Building project..."
npm run build || {
    echo "❌ Build failed. Check for TypeScript errors."
    exit 1
}
echo "✅ Build successful"

echo ""
echo "✅ All done!"
echo ""
echo "Next steps:"
echo "1. If admin features were removed, uncomment them in src/App.tsx"
echo "2. Import AdminAccess and AdminAccessRequest components"
echo "3. Add their routes back to the admin panel"
echo "4. Update AdminSidebar to include Admin Access menu item"
echo "5. Run: npm run dev"
