# B-Weh Schools Montessori Website

A modern, professional, and secure website for B-Weh Schools Montessori built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Frontend
- **Home Page** - Hero section with image slider, highlights, and video section
- **About Page** - School mission, vision, and values
- **Our Staff Page** - Showcase of all staff members with photos and roles
- **Gallery Page** - Pinterest-style masonry gallery showcasing school activities
- **Admissions Page** - Admission process, requirements, and downloadable forms
- **Contact Page** - Secure contact form with validation
- **Blog/News Section** - Latest school news and events
- **Robotics Page** - Information about Robotics & AI Lab
- **Student Spotlight** - Featured student achievements
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI** - Professional design with violet and white color scheme

### Backend & Security
- **Secure Contact Form API** - Full validation, rate limiting, spam protection
- **Email Integration** - Resend & SMTP support
- **Security Headers** - Comprehensive security headers configured
- **Content Security Policy** - XSS protection
- **Input Validation** - Zod schema validation
- **Rate Limiting** - Prevents spam and DoS attacks
- **Honeypot Protection** - Bot detection
- **Bwexus Integration** - Ready for future unified platform integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KwabenaBikay/B-WehSchools.git
cd B-WehSchools
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy example file (if exists) or create .env.local
# Add your email service credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
BWehSchoolsnew/
├── app/
│   ├── api/              # API routes
│   │   ├── contact/      # Contact form endpoint
│   │   └── health/        # Health check endpoint
│   ├── about/            # About page
│   ├── admissions/       # Admissions page
│   ├── blog/             # Blog pages
│   ├── contact/          # Contact page
│   ├── gallery/         # Gallery page
│   ├── robotics/         # Robotics page
│   ├── staff/            # Staff page
│   └── student-spotlight/ # Student spotlight page
├── components/           # React components
│   ├── BlogSection.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── VideoSection.tsx
│   └── ...
├── lib/                  # Utility libraries
│   ├── blog-data.ts      # Blog posts data
│   ├── bwexus-api.ts     # Bwexus integration
│   ├── email.ts          # Email service
│   ├── env.ts            # Environment validation
│   ├── logger.ts         # Logging utility
│   └── rateLimit.ts      # Rate limiting
├── public/               # Static assets
│   └── images/           # Image assets
└── documentation/        # Project documentation
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Email Service (Choose one)

# Option 1: Resend (Recommended)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@bwehschools.com
RESEND_TO_EMAIL=bwehschools@gmail.com

# Option 2: SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@bwehschools.com
SMTP_TO=bwehschools@gmail.com

# Optional: Bwexus Integration
BWEXUS_API_ENABLED=false
BWEXUS_API_URL=https://api.bwexus.com
BWEXUS_API_KEY=your-key-here
```

### Contact Information

**Email:** bwehschools@gmail.com  
**Phone:** +233 54 975 3104  
**Address:** Windy Ridge, CP, Kasoa, Ghana

## Security Features

- Security headers (HSTS, X-Frame-Options, CSP, etc.)
- Content Security Policy (CSP)
- Input validation and sanitization
- Rate limiting (5 requests per 15 minutes)
- Honeypot spam protection
- Secure external links (`rel="noopener noreferrer"`)
- URL validation for YouTube embeds
- No XSS vulnerabilities
- No dependency vulnerabilities

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Contact Form API

### Endpoint
`POST /api/contact`

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233549753104",
  "message": "Your message here"
}
```

### Response
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon."
}
```

### Features
- Input validation (Zod)
- Rate limiting
- Honeypot protection
- Email notifications
- Error handling

## Integration

### Bwexus Platform Integration

The system includes an integration layer for the future Bwexus unified platform. When enabled, contact form submissions will be synchronized with Bwexus.

**Configuration:**
```env
BWEXUS_API_ENABLED=true
BWEXUS_API_URL=https://api.bwexus.com
BWEXUS_API_KEY=your-key
```

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is ready to deploy on:

- **Vercel** (recommended for Next.js)
  - Automatic deployments from GitHub
  - Built-in environment variable management
  - Free tier available

- **Netlify**
  - Easy deployment
  - Form handling support

- **Other Platforms**
  - Any platform supporting Node.js
  - Ensure environment variables are set

### Deployment Checklist

- [ ] Set environment variables on hosting platform
- [ ] Configure email service (Resend or SMTP)
- [ ] Verify security headers
- [ ] Test contact form
- [ ] Test all pages
- [ ] Verify images load correctly

## Testing

### Run Automated Tests
```bash
./test-system.sh
```

### Manual Testing
1. Test contact form submission
2. Verify validation works
3. Test rate limiting
4. Check all pages load
5. Verify mobile responsiveness

## Documentation

See the `documentation/` folder for detailed documentation:
- `SECURITY_AUDIT.md` - Security audit report
- `BACKEND_RECOMMENDATIONS.md` - Backend implementation guide
- `API_INTEGRATION.md` - Bwexus integration guide
- `PRODUCTION_READY.md` - Production deployment guide

## Security

This project follows security best practices:
- All security headers configured
- Input validation and sanitization
- Rate limiting
- Spam protection
- Secure external links
- No hardcoded secrets
- Regular dependency updates

## Customization

### Update School Information

1. **Contact Information**: Edit `app/contact/page.tsx`
2. **Staff Members**: Edit `app/staff/page.tsx`
3. **Blog Posts**: Edit `lib/blog-data.ts`
4. **Gallery Images**: Add to `public/images/gallery/`
5. **YouTube Video**: Edit `app/page.tsx` - `YOUTUBE_EMBED_URL`
6. **School Portal URL**: Edit `components/Navbar.tsx` and `components/Footer.tsx`

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - Schema validation
- **Resend** - Email service (optional)
- **Nodemailer** - SMTP email (optional)

## License

© 2025 B-Weh Schools Montessori. All rights reserved.

## Contributors

- **KwabenaBikay** - Repository owner
- **malike2356** - Collaborator

## Support

For issues or questions:
- **Email:** bwehschools@gmail.com
- **Phone:** +233 54 975 3104

## Links

- **School Portal:** https://sms.bwehschools.com/login
- **GitHub Repository:** https://github.com/KwabenaBikay/B-WehSchools

---

**Last Updated:** December 15, 2025  
**Version:** 1.0.0  
**Status:** Production Ready
