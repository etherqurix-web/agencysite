# Aetherquorix — Next.js site

Dark tech theme built from the AQ orbit logo (navy, azure, cyan).

## Run
npm install
npm run dev        (http://localhost:3000)
npm run build && npm start

## Brand assets: public/assets/
- aetherquorix-logo.png: full logo, transparent (light backgrounds)
- aetherquorix-mark.png: AQ mark, original colours
- aetherquorix-mark-light.png: brightened mark for dark backgrounds (used across the site)
- aetherquorix-wordmark.png: wordmark only
- aetherquorix-logo-original.jpg: the original supplied file
- Favicons: app/icon.png, app/apple-icon.png

## Content
- Contact email: CONTACT_EMAIL at the top of app/page.tsx
- Put images in public/work-gallery/ (rebuild to update): the 3D gallery shows automatically, hidden when empty
- Blog posts: lib/blog.ts
