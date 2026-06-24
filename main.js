/* ============================================================
   PodMont — Homepage interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Color swatch picker ---------- */
  var swatches = document.querySelectorAll(".swatch");
  var heroImg = document.getElementById("heroImg");
  var heroWrap = heroImg ? heroImg.closest(".hero__imgwrap") : null;
  var colorLabel = document.getElementById("colorLabel");

  swatches.forEach(function (sw) {
    sw.addEventListener("click", function () {
      if (sw.classList.contains("is-active")) return;

      swatches.forEach(function (s) {
        s.classList.remove("is-active");
        s.setAttribute("aria-checked", "false");
      });
      sw.classList.add("is-active");
      sw.setAttribute("aria-checked", "true");

      var name = sw.dataset.color;
      var src = sw.dataset.img;

      if (colorLabel) colorLabel.textContent = name;

      if (heroImg && src) {
        if (heroWrap) heroWrap.classList.add("is-swapping");
        var pre = new Image();
        pre.onload = function () {
          heroImg.src = src;
          heroImg.alt = "PodMont AirPods phone mount in " + name;
          if (heroWrap) heroWrap.classList.remove("is-swapping");
        };
        pre.src = src;
      }
    });
  });

  /* ---------- 2. Countdown to July 1, 2026 00:00:00 UTC ---------- */
  var target = Date.UTC(2026, 6, 1, 0, 0, 0); // month is 0-indexed: 6 = July
  var elDays = document.getElementById("cdDays");
  var elHours = document.getElementById("cdHours");
  var elMins = document.getElementById("cdMins");
  var elSecs = document.getElementById("cdSecs");

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function tickCountdown() {
    var diff = target - Date.now();
    if (diff < 0) diff = 0;

    var secs = Math.floor(diff / 1000);
    var days = Math.floor(secs / 86400);
    var hours = Math.floor((secs % 86400) / 3600);
    var mins = Math.floor((secs % 3600) / 60);
    var s = secs % 60;

    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMins) elMins.textContent = pad(mins);
    if (elSecs) elSecs.textContent = pad(s);
  }

  if (elDays) {
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  /* ---------- 3. Sticky nav shadow on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 4. Hamburger mobile menu ---------- */
  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!burger || !navLinks) return;
    burger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }

  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Smooth-scroll for in-page anchors (e.g. "See How It Works") ---------- */
  document.querySelectorAll('.js-scroll, a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    });
  });

  /* ---------- 7. Video play overlay ---------- */
  var video = document.getElementById("heroVideo");
  var playBtn = document.getElementById("videoPlay");
  var videoFrame = document.getElementById("videoFrame");

  if (video && playBtn && videoFrame) {
    playBtn.addEventListener("click", function () {
      video.play();
    });
    video.addEventListener("play", function () {
      videoFrame.classList.add("is-playing");
      video.setAttribute("controls", "controls");
    });
    video.addEventListener("pause", function () {
      videoFrame.classList.remove("is-playing");
    });
  }

  /* ---------- 9. Reviews carousel: drag, buttons, auto-scroll, pause-on-hover ---------- */
  var viewport = document.getElementById("reviewsViewport");
  var track = document.getElementById("reviewsTrack");
  var prevBtn = document.getElementById("revPrev");
  var nextBtn = document.getElementById("revNext");

  if (viewport && track) {
    var card = track.querySelector(".review");
    var step = card ? card.offsetWidth + 22 : 340;

    if (nextBtn) nextBtn.addEventListener("click", function () {
      viewport.scrollBy({ left: step, behavior: "smooth" });
    });
    if (prevBtn) prevBtn.addEventListener("click", function () {
      viewport.scrollBy({ left: -step, behavior: "smooth" });
    });

    /* Drag to scroll */
    var isDown = false, startX = 0, startScroll = 0, moved = false;

    viewport.addEventListener("pointerdown", function (e) {
      isDown = true; moved = false;
      startX = e.clientX;
      startScroll = viewport.scrollLeft;
      viewport.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      viewport.scrollLeft = startScroll - dx;
    });
    window.addEventListener("pointerup", function () {
      isDown = false;
      viewport.classList.remove("is-dragging");
    });
    /* Prevent link/text-select jump after a drag */
    viewport.addEventListener("click", function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    /* Auto-scroll, pause on hover/focus/drag */
    var paused = false;
    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    viewport.addEventListener("mouseenter", function () { paused = true; });
    viewport.addEventListener("mouseleave", function () { paused = false; });
    viewport.addEventListener("focusin", function () { paused = true; });
    viewport.addEventListener("focusout", function () { paused = false; });

    if (!prefersReduced) {
      setInterval(function () {
        if (paused || isDown) return;
        var maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (viewport.scrollLeft >= maxScroll - 2) {
          viewport.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          viewport.scrollBy({ left: 1, behavior: "auto" });
        }
      }, 28);
    }
  }

  /* ---------- 11. Email capture ---------- */
  var form = document.getElementById("captureForm");
  var emailInput = document.getElementById("captureEmail");
  var success = document.getElementById("captureSuccess");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = (emailInput && emailInput.value || "").trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!valid) {
        if (emailInput) {
          emailInput.focus();
          emailInput.reportValidity && emailInput.reportValidity();
        }
        return;
      }
      form.hidden = true;
      if (success) success.hidden = false;
    });
  }

  /* ---------- Footer year ---------- */
  // (Static 2026 per spec; left intentionally hard-coded.)

})();
