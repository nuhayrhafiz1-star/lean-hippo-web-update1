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

## 3. Deploy to a Hostinger VPS (Nginx + Let's Encrypt)

This is the recommended setup for your VPS: Nginx serves the static `out/`
folder. The provided `deploy/nginx-leanhippo.conf` mirrors the `.htaccess`
(security headers, gzip, caching, clean URLs). The `.htaccess` only applies if
your VPS runs Apache/LiteSpeed (e.g. an OpenLiteSpeed/CyberPanel template).

### A. Point the domain (registered elsewhere) at the VPS
At your registrar's DNS settings, create:
- `A` record: `@` → `YOUR_VPS_IP`
- `A` record: `www` → `YOUR_VPS_IP`
- (optional) `AAAA` records if the VPS has IPv6.
DNS can take up to a few hours to propagate.

### B. Prepare the VPS (one-time)
SSH in, then:
```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx rsync
sudo mkdir -p /var/www/leanhippo/out

# Install the site config
sudo cp deploy/nginx-leanhippo.conf /etc/nginx/sites-available/leanhippo
sudo ln -s /etc/nginx/sites-available/leanhippo /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Issue HTTPS certificates (after DNS points here)
sudo certbot --nginx -d leanhippo.io -d www.leanhippo.io
```
Certbot auto-renews via a systemd timer — nothing else to do.

### C. Build & upload (every time you publish)
From your machine, in `website/`:
```bash
VPS_USER=root VPS_HOST=YOUR_VPS_IP ./deploy/deploy-vps.sh
```
This builds the export and rsyncs `out/` to `/var/www/leanhippo/out`, then
reloads Nginx. (Or build locally with `npm run build` and copy `out/` up
manually with `scp -r out/* root@YOUR_VPS_IP:/var/www/leanhippo/out/`.)

### Performance / handling thousands of concurrent visitors
Static files served by Nginx handle very high concurrency on modest hardware.
For extra headroom and global low latency, putting **Cloudflare** (free) in
front of the domain is recommended — it caches the static pages at the edge,
adds DDoS protection, and offloads almost all traffic from the VPS.

### Alternative: Apache/LiteSpeed VPS template
If your VPS uses an OpenLiteSpeed/CyberPanel template, you can instead drop the
contents of `out/` (including the hidden `.htaccess`) into the site's document
root and the `.htaccess` will apply directly — no Nginx config needed.

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
