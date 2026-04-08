/** @type {import('next').NextConfig} */
const nextConfig = {
  // I am using export to create a static HTML site for cPanel
  output: 'export',
  
  // I am adding trailingSlash so Next.js builds folders with index.html files, 
  // which prevents those annoying cPanel 404 errors!
  trailingSlash: true, 
  
  // I am turning off built-in image optimization because static HTML hosting 
  // on cPanel doesn't support the Next.js image server.
  images: {
    unoptimized: true,
  },
};

// I am using export default because my configuration file is an ES module (.mjs)
export default nextConfig;