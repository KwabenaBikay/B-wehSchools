# B-Weh Schools Montessori Website

A modern, professional website for B-Weh Schools Montessori built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home Page** - Hero section with school branding, highlights, and video section
- **About Page** - School mission, vision, and values
- **Our Staff Page** - Showcase of all staff members with photos and roles
- **Gallery Page** - Image gallery showcasing school activities and events
- **Admissions Page** - Admission process, requirements, and information
- **Contact Page** - Contact form and school information
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI** - Professional design with violet and white color scheme

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bweh-montessori/
├── app/
│   ├── about/
│   ├── admissions/
│   ├── contact/
│   ├── gallery/
│   ├── staff/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── VideoSection.tsx
├── public/
│   └── images/
│       ├── gallery/
│       ├── staff/
│       └── hero-classroom.jpg
└── package.json
```

## Customization

### Update School Information

1. **Management System URL**: Edit `components/Navbar.tsx` and update `MANAGEMENT_SYSTEM_URL`
2. **YouTube Video**: Edit `app/page.tsx` and update `YOUTUBE_EMBED_URL`
3. **Contact Information**: Edit `app/contact/page.tsx` with your school's details
4. **Staff Members**: Edit `app/staff/page.tsx` to add/update staff information
5. **Gallery Images**: Add images to `public/images/gallery/` and update `app/gallery/page.tsx`

### Add Images

Place images in the following directories:
- Hero image: `public/images/hero-classroom.jpg`
- Staff photos: `public/images/staff/[name].jpg`
- Gallery images: `public/images/gallery/[name].jpg`

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is ready to deploy on:
- **Vercel** (recommended for Next.js)
- **Firebase Hosting**
- **Google Cloud**

## Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Google Fonts (Montserrat)

## License

© 2024 B-Weh Schools Montessori. All rights reserved.

