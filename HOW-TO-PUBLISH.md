# How to publish the Sunrise website

The live site **sunriseoregon.com** runs on **Cloudflare** (Workers & Pages, project **"sunrisewebsite"**). Nothing auto-syncs — you upload a fresh copy by hand each time and clear the cache.

There are two folders on purpose:

- **`C:\Users\ubenh\Sunrise website`** — the **working folder**. Where all editing happens. Also holds drafts, backups, dev files, `.md` notes, and the helper scripts. **Not** meant to go live as-is.
- **`C:\Users\ubenh\Sunrise deploy`** — the **clean, public-only copy** you actually upload. Keeping it separate keeps junk and backups out of the live site.

---

## The deploy loop (every time)

**1. Finish and check your edits** in the **Sunrise website** folder.

**2. Copy the public files into the deploy folder.** Easiest: run the sync script from the working folder.

```powershell
# Preview what will be copied (changes nothing):
powershell -ExecutionPolicy Bypass -File .\Sync-To-Deploy.ps1

# Actually update the deploy folder:
powershell -ExecutionPolicy Bypass -File .\Sync-To-Deploy.ps1 -Execute
```

`Sync-To-Deploy.ps1` mirrors only the live files (all public `.html`, the `images` folder, `sitemap.xml`, `robots.txt`, `_redirects`, `nav-mobile.js`, logos, favicon) and leaves out drafts, backups, `recover/ fixed/ xp/`, `.md` docs, and `.ps1` scripts. (Doing it by hand instead is fine — just copy those same public files and skip the junk.)

**3. Upload to Cloudflare.** In the dashboard: **Workers & Pages → the "sunrisewebsite" project → Create new deployment / Upload assets → drag the whole `Sunrise deploy` folder in → Deploy.**

**4. Purge the cache.** In Cloudflare: **Caching → Purge Everything.** Without this, visitors keep seeing the old cached version.

**5. Verify.** Hard-refresh **sunriseoregon.com** (Ctrl+Shift+R) and spot-check the pages you changed.

That's it: **edit in "website" → sync to "deploy" → upload "deploy" to Cloudflare → Purge Everything.**

---

## Back up to Git (separate from deploying)

Deploying publishes the site. **Git backs it up** — full version history, easy rollback, and an offsite copy. Do this in addition to deploying, ideally after each work session. This folder is already a Git repo, so:

**In Cursor (or VS Code):**
1. Open the **Source Control** panel (branch icon in the left bar, or `Ctrl+Shift+G`).
2. Review the changed files, type a short message (e.g. `Add Bend pillar page + home-events page`), and click **Commit**.
3. Click **Sync / Push** to send it to your remote for the offsite backup.

**First-time remote setup (one time, if push says "no remote"):** create a **private** repo on GitHub (e.g. `sunrise-website`), then in Cursor's terminal from the working folder:

```powershell
git remote add origin https://github.com/<your-account>/sunrise-website.git
git branch -M main
git push -u origin main
```

After that, "Sync/Push" in Cursor is all you need.

**A `.gitignore` worth adding** so backups/tooling don't clutter history:

```
recover/
fixed/
xp/
sedGA66rV
*.backup.html
```

**If Git ever complains "index file corrupt"** (it happened once, from stray null bytes): from the working folder run `Remove-Item .git\index; git reset`, then commit again. Your files are untouched by this.

Rule of thumb: **commit + push to Git for backup; sync + upload to Cloudflare + Purge to publish.** They're two separate habits — do both.

---

## Notes
- The site is static HTML on Cloudflare Pages, which serves clean extensionless URLs (`/sunrise-selected-work`) and 301-redirects the `.html` versions. Internal links use the `.html` form and resolve fine.
- Images currently live in the site's own `images/` folder (no longer Google Drive).
- Keep the two helper scripts (`Sync-To-Deploy.ps1`, and the cleanup/null-byte scripts) in the working folder — the sync script excludes them from the deploy copy automatically, so they never go live.
