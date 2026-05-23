#!/bin/bash

# Script to start all services concurrently

echo "🚀 Starting Best Face Forward Portal Services..."
echo ""
echo "Starting services on:"
echo "  Backend:      http://localhost:5000"
echo "  Website:      http://localhost:3000"
echo "  Admin Portal: http://localhost:3001"
echo "  Client Portal: http://localhost:3002"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start backend
echo "Starting Backend..."
cd backend && npm start &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start website
echo "Starting Website..."
cd ../website && PORT=3000 npm start &
WEBSITE_PID=$!

# Start admin portal
echo "Starting Admin Portal..."
cd ../admin-portal && PORT=3001 npm start &
ADMIN_PID=$!

# Start client portal
echo "Starting Client Portal..."
cd ../client-portal && PORT=3002 npm start &
CLIENT_PID=$!

# Function to kill all processes on script exit
cleanup() {
    echo ""
    echo "Stopping all services..."
    kill $BACKEND_PID $WEBSITE_PID $ADMIN_PID $CLIENT_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup SIGINT

# Wait for all background jobs
wait
