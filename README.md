# theera asai website

React + Vite + TypeScript + Framer Motion (plain CSS, no Tailwind).

    npm install
    npm run dev        # http://localhost:5173
    npm run build

## Things to replace
- src/data.ts: saree names, WhatsApp number (WHATSAPP), tagline.
- src/components/Visit.tsx: boutique address and hours.
- Logo: nav and hero use live text in Cormorant Garamond so the name can be animated.
  To use your real logo or feather artwork, put a transparent SVG/PNG in public/ and swap it into
  Navbar.tsx and PeacockFeather.tsx (keep the quill tip bottom-left so the writing effect lines up).
- Saree photos: public/sarees/saree-1..6.webp (3:4 portrait).

## Where the animation lives
- Hero.tsx: reveal timeline (feather writes the name), settle, pointer parallax.
- Orbit.tsx: sarees orbit with decelerating spin, depth scaling, blur and z-order.
- Lookbook.tsx: page-turning book (3 leaves, 6 sarees, spring flips, shading, swipe/click/arrow keys).
