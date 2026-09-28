# Usama Amanat – Portfolio (Next.js)

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

- Content lives in `lib/data.js`; edit text, projects, and links there.
- Project images are in `public/projects/`. Replace any SVG with a real screenshot (PNG/JPG) and update the `image` path in `lib/data.js`.
- `node scripts/make-images.js` regenerates the placeholder illustrations.

- Animations use Framer Motion (`components/motion.js`): staggered hero, scroll-drawn timeline line, scroll reveals, and hover effects. Reduced-motion settings are respected.
- Services (icons in `components/icons.js`, copy in `lib/data.js`) sit beside an animated AI agent: pulsing rings, data packets moving between tools, and a cycling task log.

## Chatbot demo
- UI: `components/chat.js`. API route: `app/api/chat/route.js`. Prompt and fallback replies: `lib/bot.js` (it reads your content from `lib/data.js`, so edits there update the bot).
- Live AI: copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`. On Vercel, add the same variable in Project Settings. The key never reaches the browser.
- Without a key the demo still works with scripted replies. Set a spending limit on your API account, since the demo is public.

## Contact form
- UI: `components/contact-form.js`. API route: `app/api/contact/route.js`. It validates the input, blocks simple bots with a hidden field, limits each visitor to 3 messages per 10 minutes, and emails you through Resend.
- Setup: create a free Resend account, add `RESEND_API_KEY` to `.env.local` (and to your host, for example Vercel). Until you verify a domain in Resend, the default sender can only deliver to the email address you signed up with. Set `CONTACT_FROM` to an address on your verified domain when you go live.
- If the key is missing or sending fails, visitors see a link that opens their email app with the message filled in.
# portfolio
# portfolio
# portfolio
