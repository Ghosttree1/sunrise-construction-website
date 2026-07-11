# How to publish the Sunrise site for staff review

The site is a folder of static HTML files. To share a live link with staff, drop the whole folder onto a free static host. Easiest option first.

---

## Option 1 — Netlify Drop (fastest, ~2 minutes, free)

1. Go to **https://app.netlify.com/drop**
2. Open your **"Sunrise website"** folder on your computer.
3. **Drag the entire folder** onto the Netlify Drop page.
4. Netlify uploads it and gives you a live link like `https://sunrise-xyz.netlify.app` — share that with staff.

Notes:
- The site opens at the homepage automatically (an `index.html` redirect is included).
- No account needed to test; create a free account if you want to keep the link or re-upload updates.
- To update after edits: drag the folder again (or, with an account, use the same site's "Deploys" tab).

## Option 2 — Cloudflare Pages (best for a private, lasting staging site, free)

Why choose this: fast global hosting, a permanent URL, free custom-domain support, and — the big one — **free password/login protection** so only staff can see it (Netlify charges for that).

**Publish (Direct Upload, no developer needed):**
1. Create a free account at **https://dash.cloudflare.com** (sign up).
2. In the left menu choose **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
3. Name the project (e.g., `sunrise-staging`).
4. **Drag your entire "Sunrise website" folder** in (or zip it first and upload the zip), then **Deploy**.
5. You get a live link like `https://sunrise-staging.pages.dev` — share with staff.
6. To post updates: open the project → **Create new deployment** → drag the folder again.

**Lock it to staff only (free, recommended for review) — Cloudflare Access:**
1. In the dashboard go to **Zero Trust** (one-time free setup).
2. **Access → Applications → Add an application → Self-hosted**, point it at your `pages.dev` URL.
3. Add a policy that **allows only specific emails** (your staff) — they get a one-time email code to view. Everyone else is blocked.

**Custom domain later (e.g., staging.sunriseoregon.com or the live site):**
- In the Pages project → **Custom domains** → add the domain and follow the DNS steps. Easiest if `sunriseoregon.com` is (or moves) onto Cloudflare's free DNS.

### Netlify vs Cloudflare — quick take
- **Netlify Drop:** fastest to test (no account), but free tier can't password-protect.
- **Cloudflare Pages:** a few more minutes to set up, but free **login protection** and a clean permanent URL — better for a real internal review.

## Option 3 — GitHub Pages (free, version history)
Best if a developer wants version control and auto-deploys. Put this folder in a repo, enable Pages in repo settings. ~10 minutes for someone comfortable with Git.

---

## A few things to tell staff
- This is a **draft/comp** for feedback — copy, photos, and layout are still being refined.
- Photos currently load from Google Drive and press sources; final photography will be hosted on the real site.
- The homepage hero direction shown is **"Built around the way you want to live."**
- Click **any project tile** to open its full page; project galleries **enlarge on click**.

## Collecting feedback (suggestion)
Have staff note: page name + section + comment. A shared doc or spreadsheet works well, e.g.:
`Page | Section | Comment | Priority`

---

## Privacy / search engines
- Each page has a `canonical` tag pointing to `sunriseoregon.com`, so search engines won't index the staging URL as the "real" site.
- The `index.html` entry is set to `noindex` for extra safety.
- If you want it fully private, Netlify offers password protection on a paid plan; otherwise just share the link only with staff.

## When you're ready to go truly live on sunriseoregon.com
- Point the domain to the host, set the homepage file as `index.html` (or keep the redirect), and move images off Google Drive onto the site's own hosting for speed.
- I can prep all of that when you're ready.
