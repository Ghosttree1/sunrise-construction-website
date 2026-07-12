/* Sunrise Construction — mobile navigation (nav-only, self-contained).
   Injects a hamburger toggle + accessible slide-in overlay menu below 900px.
   Does not alter desktop navigation, page CSS, layout, footer, or content. */
(function () {
  "use strict";
  if (window.__sunriseMnav) return;
  window.__sunriseMnav = true;

  var PHONE_TEL = "+15415045831";
  var PHONE_DISPLAY = "541-504-5831";
  var ITEMS = [
    ["Home", "/"],
    ["Selected Work", "sunrise-selected-work.html"],
    ["Community Guides", "sunrise-luxury-communities.html"],
    ["The Process", "sunrise-the-process.html"],
    ["Design + Selections", "sunrise-design-selections.html"],
    ["Resources", "sunrise-resources.html"],
    ["Begin", "sunrise-begin.html"]
  ];

  function init() {
    var nav = document.querySelector("header .nav") || document.querySelector(".nav");
    if (!nav || document.getElementById("mnav")) return;

    var css =
      ".mnav-toggle{display:none;align-items:center;justify-content:center;width:46px;height:46px;padding:0;background:transparent;border:0;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;}" +
      ".mnav-toggle span,.mnav-toggle span::before,.mnav-toggle span::after{display:block;width:26px;height:2px;background:currentColor;border-radius:2px;}" +
      ".mnav-toggle span{position:relative;}" +
      ".mnav-toggle span::before,.mnav-toggle span::after{content:'';position:absolute;left:0;}" +
      ".mnav-toggle span::before{top:-8px;}.mnav-toggle span::after{top:8px;}" +
      "@media(max-width:900px){.mnav-toggle{display:inline-flex;}}" +
      ".mnav{position:fixed;inset:0;z-index:1000;visibility:hidden;opacity:0;transition:opacity .28s ease,visibility 0s linear .28s;}" +
      ".mnav.open{visibility:visible;opacity:1;transition:opacity .28s ease;}" +
      ".mnav-backdrop{position:absolute;inset:0;background:rgba(15,12,9,.62);}" +
      ".mnav-panel{position:absolute;top:0;right:0;height:100%;width:min(86vw,360px);background:#1C1A15;color:#F3EEE3;box-shadow:-16px 0 50px rgba(0,0,0,.4);transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;padding:22px 30px calc(24px + env(safe-area-inset-bottom)) 30px;overflow-y:auto;-webkit-overflow-scrolling:touch;}" +
      ".mnav.open .mnav-panel{transform:translateX(0);}" +
      ".mnav-head{display:flex;justify-content:flex-end;}" +
      ".mnav-close{width:44px;height:44px;background:transparent;border:0;color:#F3EEE3;cursor:pointer;font-size:30px;line-height:1;padding:0;}" +
      ".mnav-links{display:flex;flex-direction:column;margin-top:6px;}" +
      ".mnav-links a{display:block;padding:15px 0;color:#F3EEE3;text-decoration:none;font-family:'Inter',sans-serif;font-size:14px;font-weight:400;letter-spacing:2px;text-transform:uppercase;border-bottom:1px solid rgba(243,238,227,.14);}" +
      ".mnav-links a:hover,.mnav-links a:focus{color:#E2C893;outline:none;}" +
      ".mnav-links a:focus-visible{outline:2px solid #E2C893;outline-offset:3px;}" +
      ".mnav-links a.mnav-begin{margin-top:20px;border:1px solid #F3EEE3;text-align:center;letter-spacing:2.5px;}" +
      ".mnav-links a.mnav-begin:hover,.mnav-links a.mnav-begin:focus{background:#F3EEE3;color:#1C1A15;}" +
      ".mnav-phone{margin-top:auto;padding-top:24px;}" +
      ".mnav-phone a{display:inline-flex;align-items:center;gap:9px;color:#E2C893;text-decoration:none;font-family:'Fraunces',serif;font-size:21px;}" +
      ".mnav-close:focus-visible,.mnav-toggle:focus-visible{outline:2px solid #E2C893;outline-offset:3px;}" +
      "body.mnav-lock{overflow:hidden;}";
    var style = document.createElement("style");
    style.id = "mnav-style";
    style.textContent = css;
    document.head.appendChild(style);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mnav-toggle";
    btn.setAttribute("aria-label", "Open menu");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "mnav");
    btn.innerHTML = "<span></span>";
    nav.appendChild(btn);

    var linksHtml = ITEMS.map(function (it) {
      var cls = it[0] === "Begin" ? ' class="mnav-begin"' : "";
      return '<a' + cls + ' href="' + it[1] + '">' + it[0] + "</a>";
    }).join("");

    var ov = document.createElement("div");
    ov.className = "mnav";
    ov.id = "mnav";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Site menu");
    ov.innerHTML =
      '<div class="mnav-backdrop" data-close></div>' +
      '<nav class="mnav-panel" aria-label="Mobile">' +
        '<div class="mnav-head"><button type="button" class="mnav-close" aria-label="Close menu">&times;</button></div>' +
        '<div class="mnav-links">' + linksHtml + "</div>" +
        '<div class="mnav-phone"><a href="tel:' + PHONE_TEL + '">&#9742; ' + PHONE_DISPLAY + "</a></div>" +
      "</nav>";
    document.body.appendChild(ov);

    var closeBtn = ov.querySelector(".mnav-close");
    var lastFocus = null;

    function focusables() {
      return Array.prototype.slice.call(ov.querySelectorAll('a[href],button:not([disabled])'));
    }
    function openMenu() {
      lastFocus = document.activeElement;
      ov.classList.add("open");
      document.body.classList.add("mnav-lock");
      btn.setAttribute("aria-expanded", "true");
      closeBtn.focus();
      document.addEventListener("keydown", onKey);
    }
    function closeMenu() {
      ov.classList.remove("open");
      document.body.classList.remove("mnav-lock");
      btn.setAttribute("aria-expanded", "false");
      document.removeEventListener("keydown", onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === "Escape" || e.key === "Esc") { e.preventDefault(); closeMenu(); return; }
      if (e.key === "Tab") {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    btn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    ov.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-close")) closeMenu();
    });
    ov.querySelectorAll(".mnav-links a, .mnav-phone a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && ov.classList.contains("open")) closeMenu();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
