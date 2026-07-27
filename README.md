# Redline Fire Protection Engineering — website

A static, one-page site for Redline Fire Protection Engineering, ready to host for free on GitHub Pages.

## What's in here

```
index.html              ← all page content (text, sections, structure)
assets/css/style.css    ← all colors, fonts, spacing (edit here for design changes)
assets/js/script.js     ← mobile menu, scroll animation, contact form behavior
assets/img/             ← logo files and favicon
```

Nothing needs to be built or compiled — it's plain HTML/CSS/JS, so any change you save is live the moment you refresh the page (or push it to GitHub).

## How to put this on GitHub Pages

1. **Create a repository.** Go to [github.com/new](https://github.com/new), name it something like `redline-website` (or `<your-username>.github.io` if you want it at the root of your GitHub domain), and create it.
2. **Upload these files.** Easiest way with no command line:
   - Open your new repo, click **"Add file" → "Upload files"**.
   - Drag in `index.html`, `README.md`, and the whole `assets` folder (keep the folder structure — GitHub preserves it).
   - Commit the files.
3. **Turn on Pages.** In the repo, go to **Settings → Pages**. Under "Build and deployment," set **Source** to `Deploy from a branch`, pick the `main` branch and `/ (root)` folder, then **Save**.
4. **Wait ~1 minute**, then refresh that Pages settings page — it will show your live URL, something like:
   `https://<your-username>.github.io/redline-website/`
5. **Custom domain (optional).** If you own a domain like `redlinefpe.com`, add it in the same Settings → Pages screen under "Custom domain," and point your domain's DNS to GitHub Pages per [GitHub's instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

Every time you edit a file and commit the change (or upload a new version through the GitHub web UI), the live site updates automatically within a minute or two.

## Editing content

Open `index.html` in any text editor (or directly on GitHub via the pencil icon). It's organized into clearly labeled sections with HTML comments:

```html
<!-- ================================== ABOUT ================================== -->
<section id="about"> ... </section>
```

Look for the section you want to change, and edit the text between the tags. A few common edits:

- **Phone / email / location** — in the `<!-- CONTACT -->` section, inside `<ul class="contact-list">`.
- **Services** — each service is one `<div class="service-card">` block in the `<!-- SERVICES -->` section. Copy/paste a block to add a new service.
- **Industries** — same pattern, in `<!-- INDUSTRIES -->`.
- **Hero headline / intro paragraph** — right after `<!-- HERO -->`, in the `<h1>` and `<p class="lede">` tags.

## Editing design (colors, fonts, spacing)

Everything lives in `assets/css/style.css`, and the whole palette is controlled from one place at the very top of the file:

```css
:root{
  --bg:        #FFFFFF;   /* main page background */
  --panel:     #F5F4F0;   /* card / panel background, a shade off white */
  --ink:       #14181F;   /* main text color (near-black) */
  --red:       #E71F27;   /* brand red, sampled from the logo */
  --red-dim:   #B4141B;   /* darker red, used on hover */
  --steel:     #4B5563;   /* muted secondary text */
}
```

Change any hex value there and it updates everywhere that color is used on the site — no need to hunt through the rest of the file.

## Activating the contact form

GitHub Pages only serves static files, so it can't receive form submissions on its own. The form is wired up for **[Formspree](https://formspree.io)**, a free service built for exactly this:

1. Sign up at formspree.io with `rahil.hasan.mrh@gmail.com`.
2. Create a new form — Formspree gives you an endpoint like `https://formspree.io/f/abcd1234`.
3. In `index.html`, find:
   ```html
   <form class="reveal" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and replace `YOUR_FORM_ID` with your real ID.

Until that's done, the form still works — submitting it opens the visitor's email app with the message pre-filled to `rahil.hasan.mrh@gmail.com`, so no inquiry is ever lost.

## Logo files

- `assets/img/logo.png` — transparent background, used in the nav and footer (both sit on the white page background).
- `assets/img/logo-on-white.png` — the same mark on a white background, kept in case you need it for print or a light-background use elsewhere.
- `assets/img/favicon-*.png` — the "R" mark cropped out of the logo, sized for browser tabs and mobile home-screen icons.
