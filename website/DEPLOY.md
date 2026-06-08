# Lean Hippo website — build & go-live guide

A static-exported Next.js site. The build produces a plain `out/` folder of
HTML/CSS/JS — no server, no database. That is what makes it bullet-proof under
load (a CDN/Apache serves files; there is nothing to crash) and fast on slow
connections.

## 1. Local build

```bash
cd website
npm install
npm run build       # outputs the static site to website/out/
```

Preview it exactly as it will be hosted:

```bash
npx serve out
```

## 2. Connect the booking form to contact@leanhippo.io

The booking modal sends each Discovery Session request by email via
[Web3Forms](https://web3forms.com) (free, no backend needed).

1. Go to https://web3forms.com, enter **contact@leanhippo.io**, get an **Access Key** by email, and verify it.
2. Put the key in an env file:
   ```bash
   cp .env.example .env.local
   # edit .env.local → NEXT_PUBLIC_WEB3FORMS_KEY=your-real-key
   ```
3. Rebuild: `npm run build`.

Until a real key is set, the form falls back to a `mailto:` to
contact@leanhippo.io so no request is ever lost. **Submissions are blocked until
every required field (name, business, valid email, phone, date, availability) is
filled** — exactly as requested.

## 3. Deploy to Hostinger (any plan)

Because the site is fully static, it works on **every** Hostinger plan
(Shared/Web, Cloud, or VPS).

### Shared / Web / Cloud hosting (most common)
1. In **hPanel → File Manager** (or via FTP/SFTP), open `public_html`.
2. Delete the default `default.php` / placeholder files.
3. Upload **the entire contents of `website/out/`** into `public_html`
   (so `public_html/index.html` exists — not `public_html/out/index.html`).
   Make sure the hidden **`.htaccess`** is included (enable "show hidden files").
4. In **hPanel → SSL**, install the free SSL certificate for `leanhippo.io`.
5. Point the domain's DNS to Hostinger if it isn't already (hPanel → Domains).

### VPS hosting
Either serve `out/` with Nginx/Apache as a static root, or run the Next server.
For a marketing site, static serving is recommended.

## 4. Going live checklist
- [ ] `npm run build` succeeds with no errors
- [ ] `out/` uploaded to `public_html` (with `.htaccess`)
- [ ] SSL certificate active → `https://leanhippo.io` loads
- [ ] Booking form sends a test email to contact@leanhippo.io
- [ ] Submit a request to [Google Search Console](https://search.google.com/search-console) and add the sitemap: `https://leanhippo.io/sitemap.xml`
- [ ] (Optional) replace `app/favicon.ico` with the Lean Hippo mark

## What's included for SEO + AIEO + security + performance
- **SEO:** per-page `<title>`/meta, canonical URLs, Open Graph + Twitter cards,
  `sitemap.xml`, `robots.txt`, JSON-LD structured data (Organization, WebSite,
  Service, Product). All page copy is server-rendered into the HTML.
- **AIEO (AI answer engines):** `llms.txt` summarising the company and offerings,
  rich JSON-LD, and crawler-friendly `robots.txt` (GPTBot/ClaudeBot/PerplexityBot allowed).
- **Security:** `.htaccess` sets HSTS, CSP, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy, Permissions-Policy, forces HTTPS, and blocks dotfiles.
- **Performance / scale:** static files (cache-friendly, CDN-ready), gzip+brotli
  compression, 1-year immutable caching for hashed assets, font preloading,
  `prefers-reduced-motion` support, and lightweight client JS.
```
