/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly expose only Firebase's public web configuration to the browser.
  // Keep the existing Vercel variable names. Never expose SECRET here.
  env: {
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
  },
};

export default nextConfig;
