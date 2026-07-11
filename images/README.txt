SUNRISE WEBSITE — SELF-HOSTED IMAGES
=====================================

Put site image files in THIS folder so they deploy with the site and are
served directly from sunriseoregon.com (Cloudflare). This is more reliable
than linking to Google Drive or GoDaddy (img1.wsimg.com), which can rate-limit,
change, or break if an account is closed.

HOW IT WORKS
- Any file in this folder deploys with the site (upload the whole site folder
  to the Cloudflare "sunrisewebsite" Worker as usual).
- Reference it in the HTML with a relative path, e.g.  images/home-hero.jpg

FILES THE SITE CURRENTLY EXPECTS HERE
  home-hero.jpg    -> Homepage HERO background.
                      Use the Smith Rock–area estate at dusk (TPark_0090_071720.jpg).
                      Recommended: ~2400px wide, JPEG, quality ~80 (aim < 600 KB).
  home-footer.jpg  -> Homepage closing/"footer" CTA background.
                      Use the Aquatic modern home at dusk (TPark_5808_020620.jpg).
                      Recommended: ~2000px wide, JPEG, quality ~80.

TO ADD THEM
  1. Copy those two photos into this "images" folder.
  2. Rename them exactly:  home-hero.jpg  and  home-footer.jpg
  3. Deploy the site. Done — both are now served from your own domain.

NOTE
- These are CSS background images, so if a file is missing the section simply
  shows its dark fallback color (no broken-image icon) until the file is added.
- Ask Sunrise's site assistant to migrate the rest of the site's images
  (the remaining Google Drive and img1.wsimg.com / GoDaddy links) into this
  folder the same way whenever you're ready.
