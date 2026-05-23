#!/bin/bash

# Root startup script for the Best Face Forward Portal

echo "🚀 Starting Best Face Forward Portal..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Install dependencies for backend
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

echo ""
echo -e "${BLUE}📦 Installing website dependencies...${NC}"
cd website
npm install
cd ..

echo ""
echo -e "${BLUE}📦 Installing admin portal dependencies...${NC}"
cd admin-portal
npm install
cd ..

echo ""
echo -e "${BLUE}📦 Installing client portal dependencies...${NC}"
cd client-portal
npm install
cd ..

echo ""
echo -e "${GREEN}✅ All dependencies installed!${NC}"
echo ""
echo "To start the applications, run:"
echo -e "${BLUE}Backend:${NC}       cd backend && npm start"
echo -e "${BLUE}Website:${NC}       cd website && npm start"
echo -e "${BLUE}Admin Portal:${NC}  cd admin-portal && npm start"
echo -e "${BLUE}Client Portal:${NC} cd client-portal && npm start"
