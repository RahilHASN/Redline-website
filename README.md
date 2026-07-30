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

## Adding your own photos to the Services section

Each service card now has an image slot above its title. Right now they're filled with placeholder graphics so nothing looks broken — swap them out for real photos whenever you're ready:

| Service card | File to replace |
|---|---|
| Fire Sprinkler Systems | `assets/img/services/sprinkler.jpg` |
| Fire Hydrant & Hose Systems | `assets/img/services/hydrant.jpg` |
| Gas-Based Fire Suppression | `assets/img/services/suppression.jpg` |
| Design & Engineering | `assets/img/services/design.jpg` |
| Fire Pump Room Design | `assets/img/services/pump-room.jpg` |
| Hydraulic Calculations & Cost Estimation | `assets/img/services/hydraulic-calcs.jpg` |

**To swap one in:**
1. On GitHub, go to `assets/img/services/`.
2. Click into the file you're replacing (e.g. `sprinkler.jpg`).
3. Click the trash icon to delete it, then go back and use **"Add file → Upload files"** to upload your new photo — **keep the exact same filename** (e.g. still call it `sprinkler.jpg`), so `index.html` picks it up automatically without any other edit.

Tips for the photos themselves:
- Roughly a 4:3 ratio (landscape, a bit wider than tall) crops most cleanly — the card will crop to fit automatically if it's a different shape.
- Keep individual files under ~500KB so the page still loads quickly; any online image compressor (e.g. squoosh.app) works well for this.
- If you'd rather add a 7th service or reorder them, copy one whole `<div class="service-card">...</div>` block in `index.html` and edit the text and image filename inside it.

## Adding your own photos to the Industries We Serve section

Same setup as Services — each industry card has an image slot above its title, currently filled with a placeholder:

| Industry card | File to replace |
|---|---|
| Commercial Buildings | `assets/img/industries/commercial.jpg` |
| Warehousing & Logistics | `assets/img/industries/warehousing.jpg` |
| Data Centers & Clean Room | `assets/img/industries/data-center.jpg` |
| Industrial & Process Facilities | `assets/img/industries/industrial.jpg` |

Swap them the same way: delete the placeholder in `assets/img/industries/`, then upload your replacement **using that exact filename**. Same guidance applies — roughly 4:3, under ~500KB.

### Where each industry card links to

Each industry card (image, title, and the whole card) is clickable and opens in a new tab. Right now they all point to the same shared Google Drive folder, since dedicated project galleries per industry aren't ready yet:

```html
<a class="industry-card" href="https://drive.google.com/drive/folders/1UET2DRSxEgO-9p7Ijs2nFvL5Ag7XdTgu?usp=sharing" target="_blank" rel="noopener noreferrer">
```

Once you have a dedicated folder or page for a specific industry (e.g. a Drive folder just for Commercial Buildings projects), open `index.html`, find that card's `<a class="industry-card" href="...">` line, and replace the URL with the specific link — no other changes needed.

## Replacing the hero drawing (the "DWG NO. RFP-101-A" panel)

The panel right under the headline — labeled "DWG NO. RFP-101-A · FIRE SPRINKLER PLAN" — now plays a short looping video instead of a static image. It's set up with two files so it plays in every browser:

- `assets/img/hero/blueprint.mp4` — plays in Chrome, Edge, Firefox, and Safari
- `assets/img/hero/blueprint.webm` — a backup format some browsers prefer
- `assets/img/hero/blueprint.jpg` — a still frame shown for a split second while the video loads

**To use your own video:**
1. Export your video as both an `.mp4` and a `.webm` (most editing tools — Premiere, DaVinci Resolve, CapCut, HandBrake — can export both; if you only have one format, that's fine too, just keep both `<source>` lines pointing at the same file, or delete the one you don't have).
2. On GitHub, go to `assets/img/hero/`, delete the placeholder files, and upload your own using the **exact same filenames**: `blueprint.mp4` and `blueprint.webm`.
3. Optional: replace `blueprint.jpg` with a still frame from your video (any frame grab works) so there's no flash of the placeholder while it loads.

A few things about how it's set up, in case you want to change the behavior — look for the `<video>` tag in `index.html`:
- It **autoplays, loops, and is muted** — this is standard for background-style video and required by browsers (a video with sound cannot autoplay). If you'd rather have a play button instead of autoplay, tell me and I'll change it.
- Keep the clip **short and lightweight** (a few seconds, well under 10MB) so the page still loads quickly — this isn't a full walkthrough video, it's a looping visual accent.
- A wider, landscape clip (roughly 3:1) fits this panel best, matching its shape.

The three small red "redline" notes overlaid on top ("spacing exceeds 15'-0"...", etc.) stay in place regardless of what's playing underneath. If they no longer make sense next to your footage, find the `redline-note` lines just below `<div class="sheet-notes-desktop">` and `<div class="sheet-notes-mobile">` in `index.html` and edit or delete them.

## Light/dark theme toggle

There's now a circle button in the nav (sun/moon icon, next to the hamburger menu) that switches the whole site between light and dark. The choice is remembered per visitor (via their browser's local storage), so it stays on their next visit.

How it works, in case you want to adjust it:
- All the color values live as CSS variables at the top of `assets/css/style.css`. The dark theme is just a second set of values for the same variables, applied when `<html>` has `data-theme="dark"` — look for the `html[data-theme="dark"]{...}` block right under `:root{...}`. Adjust colors there.
- The logo swap is pure CSS (two logo images stacked in the markup, one shown at a time) — see `.logo-light` / `.logo-dark` in `index.html` and the matching rules in `style.css`. No JavaScript needed for that part.
- The toggle logic itself (remembering the choice, flipping the `data-theme` attribute) is in `assets/js/script.js`, under "Light/dark theme toggle."

### Using your own dark-theme logo

Your dark-theme logo files are already in place:
- `assets/img/dark/logo-dark-wide.png` — used in the nav and footer when dark theme is active
- `assets/img/dark/logo-dark-stacked.png` — the taller icon-over-wordmark version, not currently used anywhere, but available if you want it for something later (e.g. a mobile-only lockup)

To swap either for a new version, upload your replacement to `assets/img/dark/` using the same filename.

## Logo files

- `assets/img/logo.png` — transparent background, used in the nav and footer in **light** theme (sits on the white page background).
- `assets/img/logo-on-white.png` — the same mark on a white background, kept in case you need it for print or a light-background use elsewhere.
- `assets/img/dark/logo-dark-wide.png` — used in the nav and footer in **dark** theme (white text, sits on the dark background).
- `assets/img/favicon-*.png` — the "R" mark cropped out of the logo, sized for browser tabs and mobile home-screen icons.
