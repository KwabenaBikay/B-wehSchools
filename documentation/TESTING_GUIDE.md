# Testing Guide
## B-Weh Schools Website - Complete System Test

This guide will help you test all features of the system before deciding on database implementation.

---

## 🚀 Quick Start Testing

### 1. Start Development Server

```bash
cd /opt/lampp/htdocs/bweh/BWehSchoolsnew
npm run dev
```

Server will start at: **http://localhost:3000**

---

## ✅ Test Checklist

### Frontend Tests

#### 1. Homepage
- [ ] Page loads correctly
- [ ] Hero slider rotates automatically
- [ ] Navigation menu works
- [ ] All links are clickable
- [ ] Images load properly
- [ ] Responsive on mobile/tablet

#### 2. Contact Form
- [ ] Form displays correctly
- [ ] All fields are visible
- [ ] Submit button works
- [ ] Validation works (try invalid email)
- [ ] Success message appears
- [ ] Form resets after submission
- [ ] Loading state shows during submission

#### 3. Blog Section
- [ ] Blog posts display on homepage
- [ ] Blog page shows all posts
- [ ] Individual blog post pages work
- [ ] Images load correctly
- [ ] Navigation back to blog list works

#### 4. Other Pages
- [ ] About page loads
- [ ] Admissions page loads
- [ ] Staff page loads
- [ ] Gallery page loads
- [ ] Robotics page loads
- [ ] Student Spotlight page loads

#### 5. Navigation
- [ ] Navbar links work
- [ ] Footer links work
- [ ] Mobile menu works
- [ ] External links open in new tab
- [ ] School Portal link works

---

### Backend API Tests

#### 1. Health Check Endpoint

```bash
curl http://localhost:3000/api/health
```

**Expected:** JSON response with system status

#### 2. Contact Form - Valid Submission

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+233549753104",
    "message": "I am interested in enrolling my child. Please contact me."
  }'
```

**Expected:** 
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon."
}
```

#### 3. Contact Form - Invalid Data (Validation Test)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "invalid-email",
    "phone": "123",
    "message": "short"
  }'
```

**Expected:** Validation errors for each field

#### 4. Rate Limiting Test

```bash
# Submit 6 requests rapidly (limit is 5 per 15 minutes)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test User '$i'",
      "email": "test'$i'@example.com",
      "phone": "+233549753104",
      "message": "Test message number '$i'"
    }'
  echo ""
done
```

**Expected:** First 5 succeed, 6th returns rate limit error

---

## 🧪 Automated Test Script

Run this comprehensive test:

```bash
# Make script executable
chmod +x test-system.sh
./test-system.sh
```

---

## 📋 Manual Testing Steps

### Step 1: Start Server

```bash
npm run dev
```

### Step 2: Test Contact Form (Browser)

1. Go to: http://localhost:3000/contact
2. Fill out the form with valid data
3. Click "Send Message"
4. Verify success message appears
5. Check browser console for errors
6. Try submitting with invalid data
7. Verify validation errors appear

### Step 3: Test API Directly

Use the curl commands above or a tool like Postman.

### Step 4: Test Email Service

**Note:** Email won't actually send without configuration, but it should log:
- Check server console for email logs
- Should see: "No email service configured" or email attempt

### Step 5: Test Rate Limiting

Submit the form multiple times rapidly and verify rate limiting works.

---

## 🔍 What to Check

### ✅ Success Indicators

1. **Form Submission:**
   - Success message appears
   - Form clears after submission
   - No console errors

2. **API Response:**
   - Returns 200 status
   - Contains success message
   - No errors in response

3. **Validation:**
   - Invalid data is rejected
   - Clear error messages
   - Form doesn't submit invalid data

4. **Rate Limiting:**
   - Blocks after 5 submissions
   - Returns 429 status
   - Clear error message

### ⚠️ Things to Watch For

1. **Console Errors:**
   - Check browser console
   - Check server console
   - Should be no errors

2. **Network Issues:**
   - API calls complete
   - No timeout errors
   - Response times are reasonable

3. **Email Service:**
   - Logs email attempts (even if not configured)
   - Doesn't crash if email fails
   - User still sees success message

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

Frontend Tests:
[ ] Homepage loads
[ ] Contact form works
[ ] Blog pages work
[ ] Navigation works
[ ] Mobile responsive

Backend Tests:
[ ] Health endpoint works
[ ] Contact API accepts valid data
[ ] Contact API rejects invalid data
[ ] Rate limiting works
[ ] Error handling works

Issues Found:
1. ________________
2. ________________
3. ________________

Recommendations:
________________
________________
```

---

## 🐛 Troubleshooting

### Form doesn't submit
- Check browser console for errors
- Verify API endpoint is running
- Check network tab in browser dev tools

### Validation not working
- Check form field names match API
- Verify required attributes on inputs
- Check API validation schema

### Rate limiting not working
- Check server console for rate limit logs
- Verify IP detection is working
- Test from different IPs if possible

### Email not sending
- Check environment variables
- Verify email service is configured
- Check server logs for email errors

---

## ✅ Ready for Production?

After testing, verify:
- [ ] All tests pass
- [ ] No console errors
- [ ] Form submissions work
- [ ] Validation works
- [ ] Rate limiting works
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] All pages load

---

**Next Steps:**
1. Run all tests
2. Document any issues
3. Decide on database based on needs
4. Configure email service for production

