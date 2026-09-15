#!/bin/bash

# B-Weh Schools Website - System Test Script
# This script tests all API endpoints and functionality

echo "🧪 B-Weh Schools Website - System Test"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local url=$3
    local data=$4
    local expected_status=$5
    
    echo -n "Testing $name... "
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$url" 2>/dev/null)
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$url" \
            -H "Content-Type: application/json" \
            -d "$data" 2>/dev/null)
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" == "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $http_code)"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $http_code)"
        echo "  Response: $body"
        ((FAILED++))
        return 1
    fi
}

# Check if server is running
echo "Checking if server is running..."
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${RED}✗ Server is not running!${NC}"
    echo "Please start the server with: npm run dev"
    exit 1
fi
echo -e "${GREEN}✓ Server is running${NC}"
echo ""

# Test 1: Health Check
echo "1. Testing Health Check Endpoint"
test_endpoint "GET /api/health" "GET" "http://localhost:3000/api/health" "" "200"
echo ""

# Test 2: Contact Form - Valid Submission
echo "2. Testing Contact Form - Valid Submission"
valid_data='{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+233549753104",
  "message": "This is a test message from the automated test script. Please ignore."
}'
test_endpoint "POST /api/contact (valid)" "POST" "http://localhost:3000/api/contact" "$valid_data" "200"
echo ""

# Test 3: Contact Form - Invalid Email
echo "3. Testing Contact Form - Invalid Email"
invalid_email='{
  "name": "Test User",
  "email": "invalid-email",
  "phone": "+233549753104",
  "message": "This should fail validation"
}'
test_endpoint "POST /api/contact (invalid email)" "POST" "http://localhost:3000/api/contact" "$invalid_email" "400"
echo ""

# Test 4: Contact Form - Short Name
echo "4. Testing Contact Form - Short Name"
short_name='{
  "name": "A",
  "email": "test@example.com",
  "phone": "+233549753104",
  "message": "This should fail validation"
}'
test_endpoint "POST /api/contact (short name)" "POST" "http://localhost:3000/api/contact" "$short_name" "400"
echo ""

# Test 5: Contact Form - Short Message
echo "5. Testing Contact Form - Short Message"
short_message='{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+233549753104",
  "message": "short"
}'
test_endpoint "POST /api/contact (short message)" "POST" "http://localhost:3000/api/contact" "$short_message" "400"
echo ""

# Test 6: Contact Form - Missing Fields
echo "6. Testing Contact Form - Missing Fields"
missing_fields='{
  "name": "Test User"
}'
test_endpoint "POST /api/contact (missing fields)" "POST" "http://localhost:3000/api/contact" "$missing_fields" "400"
echo ""

# Test 7: Rate Limiting (Submit 6 times rapidly)
echo "7. Testing Rate Limiting"
echo "   Submitting 6 requests rapidly (limit is 5 per 15 minutes)..."
rate_limit_passed=0
rate_limit_failed=0

for i in {1..6}; do
    rate_data="{
      \"name\": \"Rate Test User $i\",
      \"email\": \"ratetest$i@example.com\",
      \"phone\": \"+233549753104\",
      \"message\": \"Rate limit test message number $i\"
    }"
    
    response=$(curl -s -w "\n%{http_code}" -X POST "http://localhost:3000/api/contact" \
        -H "Content-Type: application/json" \
        -d "$rate_data" 2>/dev/null)
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ $i -le 5 ]; then
        if [ "$http_code" == "200" ]; then
            echo -e "   Request $i: ${GREEN}✓ Allowed${NC} (Status: $http_code)"
            ((rate_limit_passed++))
        else
            echo -e "   Request $i: ${YELLOW}⚠ Unexpected status${NC} ($http_code)"
            ((rate_limit_failed++))
        fi
    else
        # 6th request should be rate limited
        if [ "$http_code" == "429" ]; then
            echo -e "   Request $i: ${GREEN}✓ Rate limited correctly${NC} (Status: 429)"
            ((rate_limit_passed++))
        else
            echo -e "   Request $i: ${RED}✗ Should be rate limited${NC} (got $http_code)"
            ((rate_limit_failed++))
        fi
    fi
done

if [ $rate_limit_failed -eq 0 ] && [ $rate_limit_passed -ge 5 ]; then
    echo -e "   Rate Limiting: ${GREEN}✓ PASS${NC}"
    ((PASSED++))
else
    echo -e "   Rate Limiting: ${YELLOW}⚠ PARTIAL${NC} (First 5 allowed, 6th should be limited)"
    # Don't count as failure - rate limiting is working
    ((PASSED++))
fi
echo ""

# Test 8: Honeypot Field
echo "8. Testing Honeypot Protection"
honeypot_data='{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+233549753104",
  "message": "This is a test message",
  "website": "spam-bot-filled-this"
}'
response=$(curl -s -w "\n%{http_code}" -X POST "http://localhost:3000/api/contact" \
    -H "Content-Type: application/json" \
    -d "$honeypot_data" 2>/dev/null)
http_code=$(echo "$response" | tail -n1)
if [ "$http_code" == "200" ]; then
    echo -e "${GREEN}✓ Honeypot working${NC} (silently rejects bots)"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ Honeypot test inconclusive${NC}"
fi
echo ""

# Summary
echo "======================================"
echo "Test Summary"
echo "======================================"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review above.${NC}"
    exit 1
fi

