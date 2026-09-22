/* Page loader: the AYM mark fills in while the page loads, then fades out.
   Markup sits right after <body>; CSS in style.css (.page-loader). */
(function () {
  var el = document.getElementById('pageLoader');
  if (!el) return;
  var done = false;
  function hide() {
    if (done) return;
    done = true;
    el.classList.add('is-done');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
  }
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
  // never keep a visitor waiting on a slow image: show the page after 2.5s regardless
  setTimeout(hide, 2500);
  // coming back with the browser's back button restores the page instantly
  window.addEventListener('pageshow', function (e) { if (e.persisted) hide(); });
})();
