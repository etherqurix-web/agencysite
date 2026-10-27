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


## Global light / dark theme

- The site defaults to **Light Cosmic** mode.
- Use the **Dark / Light** control in the header to switch themes.
- The selected theme is saved in `localStorage` under `aq-theme` and is restored on subsequent visits, including blog detail pages.
- The dark theme reuses the original midnight-navy styling; light-only Liquid Glass refinements are scoped to `html[data-theme="light"]`.
- The Selected Projects AQ watermark remains centered in both themes.
