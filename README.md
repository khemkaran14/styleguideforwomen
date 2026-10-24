# The Ultimate Style Guide

A style guide for Indian and global wardrobes: a photo lookbook, outfits by occasion, a style quiz, colour combos, and a **Dressing Room** where you try on and restyle outfits. Members can sign up to save hearts and looks across devices and get picks based on their style profile. Admins get a dashboard to manage members and the site.

## Features

- **Lookbook, Occasions, Style Quiz, Colour Combos, Rules**: browse and filter 47 photo looks
- **Dressing Room**: swap and recolour pieces, save looks
- **Accounts**: sign up, sign in, sign out, change password, forgot password (email link or admin-issued link), style profile, delete account
- **Admin**: member list with CSV export, reset links, roles, contact-form inbox, announcement banner, front-page and hidden looks
- **Pages for Google**: a page for every look (`/looks/<id>`) and occasion (`/occasions/<id>`), About, Contact, Privacy policy, Terms of use, a real 404 page, `robots.txt`, `sitemap.xml` (with images), canonical and Open Graph tags, structured data, icons and a share image

## Tech

- Node.js 22.13+ with Express 5, using the built-in `node:sqlite` (no native modules to compile)
- Plain HTML/CSS/JS front end in `public/`, no build step
- Optional SMTP (nodemailer) for password-reset emails

## Run locally

```bash
npm ci
COOKIE_SECURE=false PORT=3000 npm start
# open http://127.0.0.1:3000 — the first account created becomes admin when ADMIN_EMAILS is unset
```

Run the automated checks with `bash scripts/smoke-test.sh`. All settings are listed in `.env.example`.

## Deploy

See **[README-DEPLOY.md](README-DEPLOY.md)** for the step-by-step guide to putting it on a subdomain of a Hostinger VPS with HTTPS, nightly backups and optional auto-deploy from GitHub.
