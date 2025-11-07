#!/bin/bash

echo "================================================"
echo "Clean Restart Script for Development Servers"
echo "================================================"
echo ""

# Step 1: Kill all related processes
echo "[1/5] Killing all related processes..."
pkill -9 -f "concurrently" 2>/dev/null
pkill -9 -f "gulp.*config-workspace" 2>/dev/null
pkill -9 -f "ng serve" 2>/dev/null
pkill -9 -f "node.*md2json" 2>/dev/null
sleep 2

# Step 2: Force kill any processes on ports 3100 and 4200
echo "[2/5] Clearing ports 3100 and 4200..."
lsof -ti:3100 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:4200 2>/dev/null | xargs kill -9 2>/dev/null
sleep 1

# Step 3: Verify ports are clear
echo "[3/5] Verifying ports are available..."
if lsof -i:3100 >/dev/null 2>&1; then
    echo "ERROR: Port 3100 is still in use!"
    lsof -i:3100
    exit 1
fi

if lsof -i:4200 >/dev/null 2>&1; then
    echo "ERROR: Port 4200 is still in use!"
    lsof -i:4200
    exit 1
fi

echo "✓ Ports 3100 and 4200 are clear"
echo ""

# Step 4: Clean old logs
echo "[4/5] Cleaning old log files..."
rm -f /tmp/dev-servers.log /tmp/ng-serve.log /tmp/clean-start.log
echo "✓ Old logs cleaned"
echo ""

# Step 5: Start fresh
echo "[5/5] Starting development servers..."
echo ""
nohup npm run dev > /tmp/dev-servers.log 2>&1 &
DEV_PID=$!

echo "Development servers starting (PID: $DEV_PID)..."
echo "Waiting for startup (this takes ~10 seconds)..."
echo ""

# Wait and show progress
for i in {1..10}; do
    echo -n "."
    sleep 1
done
echo ""
echo ""

# Show startup status
echo "================================================"
echo "Startup Status:"
echo "================================================"
tail -100 /tmp/dev-servers.log | grep -E "(listening on|Config workspace server|Compiled successfully|ERROR|EADDRINUSE)" | tail -20

echo ""
echo "================================================"
echo "Final Checks:"
echo "================================================"

# Check if backend is responding
if curl -s http://localhost:3100/api/health >/dev/null 2>&1; then
    CATALOG_SIZE=$(curl -s http://localhost:3100/api/health | grep -o '"catalogSize":[0-9]*' | cut -d: -f2)
    echo "✓ Backend (port 3100): Running - $CATALOG_SIZE catalog items"
else
    echo "✗ Backend (port 3100): NOT responding"
fi

# Check if frontend is responding
if curl -s http://localhost:4200 >/dev/null 2>&1; then
    echo "✓ Frontend (port 4200): Running"
else
    echo "✗ Frontend (port 4200): NOT responding"
fi

# Check if proxy is working
if curl -s http://localhost:4200/api/config/catalog >/dev/null 2>&1; then
    PROXY_COUNT=$(curl -s http://localhost:4200/api/config/catalog | grep -o '"id":' | wc -l)
    echo "✓ Proxy: Working - forwarding $PROXY_COUNT items"
else
    echo "✗ Proxy: NOT working"
fi

echo ""
echo "================================================"
echo "Development servers are ready!"
echo "================================================"
echo ""
echo "Open: http://localhost:4200/admin/config"
echo ""
echo "To view logs: tail -f /tmp/dev-servers.log"
echo "To stop: pkill -f 'concurrently|gulp|ng serve'"
echo ""
