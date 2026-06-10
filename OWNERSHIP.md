# Lean Hippo — Website & Booking System: ownership & how to edit

This repository is the **editable source code** for the leanhippo.io website
(a Next.js static-export site) and its booking system. You own all of it — it
does not depend on Claude or any one person. Claude was only the tool used to
write the code; the code and infrastructure below are entirely yours.

## Where everything lives (all in YOUR accounts)
- Editable source code (this repo): github.com/nuhayrhafiz1-star/lean-hippo-web-update1
- Built site + deploy bundle + n8n workflow: github.com/nuhayrhafiz1-star/leanhippo-site
  (the live build is in leanhippo-deploy/out ; automation in automation/)
- Live website files on your server: /var/www/leanhippo  (Hostinger VPS 213.210.21.81,
  served by nginx-proxy-manager). 
- Booking automation (emails): n8n at https://n8n.leanhippo.io
  (workflow "Lean Hippo — Booking emails")
- Email sending: Hostinger mailbox contact@leanhippo.io (SMTP smtp.hostinger.com)
- Booking logbook (optional): a Google Sheet written by a Google Apps Script
  (in your Google account, nuhayrhafiz1@gmail.com)

## The booking form
Main file: website/app/components/BookingModal.tsx
Styles:    website/app/globals.css

## How to edit & re-publish (any web developer can do this)
1. git clone https://github.com/nuhayrhafiz1-star/lean-hippo-web-update1
2. cd website && npm install
3. (optional) create website/.env.local with:
   NEXT_PUBLIC_BOOKING_LOG_URL=<your Google Apps Script /exec URL>
4. Edit files, then build:  npm run build   (output goes to website/out/)
5. Deploy by copying website/out/* to /var/www/leanhippo on the server,
   or commit to the leanhippo-site repo's leanhippo-deploy/out and pull on the server.
   See website/DEPLOY.md for details.

## Accounts to keep access to
- GitHub: nuhayrhafiz1-star
- Hostinger: VPS + domain + the contact@leanhippo.io mailbox
- n8n login at https://n8n.leanhippo.io
- Google account for the logbook sheet
