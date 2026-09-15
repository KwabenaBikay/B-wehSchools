# Quick Backend Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
npm install zod
```

**Optional (for email):**
```bash
# Option A: Resend (Recommended - easier)
npm install resend

# Option B: SMTP (Nodemailer)
npm install nodemailer
```

### Step 2: Set Up Environment Variables

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. **For Resend (Recommended):**
   - Sign up at https://resend.com (free tier: 3,000 emails/month)
   - Get your API key from the dashboard
   - Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM_EMAIL=noreply@bwehschools.com
   RESEND_TO_EMAIL=info@bwehschools.com
   ```

3. **OR for SMTP (Gmail/Outlook):**
   - For Gmail: Create an App Password (not your regular password)
   - Add to `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@bwehschools.com
   SMTP_TO=info@bwehschools.com
   ```

### Step 3: Update Email Utility

**If using Resend:**
- Edit `lib/email.ts`
- Uncomment the Resend code (lines 12-20)

**If using SMTP:**
- Edit `lib/email.ts`
- Uncomment the Nodemailer code (lines 40-60)

### Step 4: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000/contact and submit the form.

### Step 5: Deploy

The backend is ready! Just make sure to:
- Add environment variables to your hosting platform (Vercel, Netlify, etc.)
- Install dependencies: `npm install zod resend` (or nodemailer)

---

## 📋 What's Included

✅ **API Route** (`app/api/contact/route.ts`)
- Input validation with Zod
- Rate limiting (5 requests per 15 minutes)
- Honeypot spam protection
- Email notifications
- Error handling

✅ **Updated Contact Form** (`app/contact/page.tsx`)
- Loading states
- Success/error messages
- Form validation
- Disabled state during submission

✅ **Security Features**
- Input sanitization
- XSS prevention
- Rate limiting
- Honeypot field

---

## 🔧 Configuration Options

### Rate Limiting

**Current:** Simple in-memory (resets on server restart)
- Good for: Development, low traffic
- Limits: 5 requests per 15 minutes per IP

**For Production:** Use Upstash Redis
1. Sign up at https://upstash.com
2. Create a Redis database
3. Add to `.env.local`:
   ```env
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=xxxxx
   ```
4. Update `lib/rateLimit.ts` (see BACKEND_RECOMMENDATIONS.md)

### Email Service Comparison

| Service | Free Tier | Setup Difficulty | Recommendation |
|---------|-----------|------------------|----------------|
| **Resend** | 3,000/month | ⭐ Easy | ✅ Best for Next.js |
| **SendGrid** | 100/day | ⭐⭐ Medium | Good alternative |
| **Nodemailer** | Depends on SMTP | ⭐⭐⭐ Hard | Use if you have SMTP |

---

## 🐛 Troubleshooting

### Form submits but no email received?

1. **Check console logs** - The email utility logs when emails would be sent
2. **Verify environment variables** - Make sure `.env.local` is configured
3. **Check email service** - Verify API key/SMTP credentials are correct
4. **Check spam folder** - Emails might be filtered

### Rate limit errors?

- Wait 15 minutes and try again
- For production, set up Upstash Redis for persistent rate limiting

### Validation errors?

- Check the error message - it will tell you which field failed
- Ensure all fields meet the requirements:
  - Name: 2-100 characters, letters/spaces only
  - Email: Valid email format
  - Phone: 10-20 characters, numbers/spaces/dashes
  - Message: 10-2000 characters

---

## 📚 Next Steps

1. **Add Database Storage** (Optional)
   - Store submissions in PostgreSQL/MongoDB
   - See BACKEND_RECOMMENDATIONS.md for examples

2. **Add Admin Dashboard** (Optional)
   - View submissions in a dashboard
   - Mark as read/replied

3. **Add Auto-Reply** (Optional)
   - Send confirmation email to user
   - Thank them for contacting

4. **Add CAPTCHA** (Optional)
   - For additional spam protection
   - Consider Google reCAPTCHA or hCaptcha

---

## 📖 Full Documentation

See `BACKEND_RECOMMENDATIONS.md` for:
- Detailed architecture options
- Complete code examples
- Database integration
- Advanced security features
- Deployment guides

---

**Need Help?** Check the full recommendations document or Next.js API Routes documentation.

