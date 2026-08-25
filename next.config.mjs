/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // The site ships as plain files: `npm run build` writes `out/`, which is what the web
  // server serves. There is no Node process in production.
  output: 'export',

  // Emit `where-were-going/index.html` rather than `where-were-going.html`, so Apache
  // serves /where-were-going without MultiViews or a rewrite rule.
  trailingSlash: true,
};

export default nextConfig;
