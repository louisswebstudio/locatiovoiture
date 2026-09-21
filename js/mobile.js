/**
 * mobile.js
 * Comportements réservés au mobile (≤768px) :
 *   1. Flotte  - les filtres deviennent une feuille coulissante.
 *   2. Fiche   - barre de réservation collante en bas d'écran.
 *
 * Tout est inerte en desktop : chaque bloc vérifie le breakpoint et
 * se réévalue au redimensionnement.
 */
(function () {
  'use strict';

  var MQ = window.matchMedia('(max-width: 768px)');
  function isMobile() { return MQ.matches; }

  /* ========================================================
     1. FLOTTE - feuille de filtres
     ======================================================== */
  function initFleetSheet() {
    var sidebar  = document.querySelector('.fc__sidebar');
    var openBtn  = document.getElementById('fcFilterOpen');
    var closeBtn = document.getElementById('fcSheetClose');
    var doneBtn  = document.getElementById('fcSheetDone');
    var backdrop = document.getElementById('fcSheetBackdrop');
    var countEl  = document.getElementById('fcFilterCount');
    var resultEl = document.getElementById('fcFilterResults');
    var grid     = document.getElementById('fcGrid');

    if (!sidebar || !openBtn) return;

    var lastScrollY = 0;

    function open() {
      if (!isMobile()) return;
      lastScrollY = window.scrollY;
      // Sur ordinateur les marques sont un menu déroulant ; dans la feuille
      // on les veut dépliées d'emblée.
      var brandsDd = document.getElementById('fcBrandsDd');
      if (brandsDd) brandsDd.open = true;
      sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      document.body.classList.add('fc-sheet-open');
      openBtn.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-open');
      document.body.classList.remove('fc-sheet-open');
      openBtn.setAttribute('aria-expanded', 'false');
      // `overflow:hidden` sur <body> ne déplace pas le scroll ici,
      // mais on restaure par sécurité si un navigateur le fait.
      if (Math.abs(window.scrollY - lastScrollY) > 2) window.scrollTo(0, lastScrollY);
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (doneBtn) doneBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) close();
    });

    /* Pastille : nombre de filtres cochés + recherche active. */
    function refreshCount() {
      if (!countEl) return;
      var checked = sidebar.querySelectorAll('input[type="checkbox"]:checked').length;
      var search  = document.getElementById('fcSearch');
      if (search && search.value.trim()) checked += 1;
      countEl.textContent = checked;
      countEl.classList.toggle('is-on', checked > 0);
    }

    /* Compteur de résultats, lu directement dans la grille rendue. */
    function refreshResults() {
      if (!resultEl || !grid) return;
      // Le total filtré toutes pages confondues, pas seulement la page affichée.
      var n = grid.dataset.total != null
        ? Number(grid.dataset.total)
        : grid.querySelectorAll('.fc__card:not(.fc__card--skeleton)').length;
      var tpl = resultEl.getAttribute('data-tpl') || '{n}';
      resultEl.textContent = tpl.replace('{n}', n);
    }

    // Les filtres sont cochés/décochés par fleet.js comme par l'utilisateur :
    // on écoute au niveau du sidebar pour attraper les deux cas.
    sidebar.addEventListener('change', refreshCount);
    sidebar.addEventListener('input', refreshCount);
    var searchInput = document.getElementById('fcSearch');
    if (searchInput) searchInput.addEventListener('input', refreshCount);

    if (grid && 'MutationObserver' in window) {
      new MutationObserver(refreshResults).observe(grid, { childList: true });
    }

    refreshCount();
    refreshResults();

    // Repasse en desktop : on referme pour ne pas laisser un état fantôme.
    MQ.addEventListener('change', function (e) { if (!e.matches) close(); });
  }

  /* ========================================================
     2. FICHE VÉHICULE - barre collante
     ======================================================== */
  function initDetailStickybar() {
    var bar = document.getElementById('cdStickybar');
    if (!bar) return;

    var srcBtn   = document.getElementById('whatsapp-book');
    var srcPrice = document.getElementById('car-price');
    var barBtn   = document.getElementById('cdStickyBtn');
    var barPrice = document.getElementById('cdStickyPrice');

    document.body.classList.add('has-stickybar');

    /* Le prix et le lien WhatsApp sont remplis par car-detail.js après
       la réponse Supabase : on recopie à chaque mutation. */
    function sync() {
      if (srcPrice && barPrice) barPrice.textContent = srcPrice.textContent;
      if (srcBtn && barBtn) {
        var href = srcBtn.getAttribute('href');
        if (href) barBtn.setAttribute('href', href);
      }
    }

    if ('MutationObserver' in window) {
      var mo = new MutationObserver(sync);
      if (srcPrice) mo.observe(srcPrice, { childList: true, characterData: true, subtree: true });
      if (srcBtn) mo.observe(srcBtn, { attributes: true, attributeFilter: ['href'] });
    }
    sync();

    /* Visible seulement une fois le CTA principal sorti de l'écran :
       tant qu'il est visible, la barre ferait doublon. */
    function toggle() {
      if (!isMobile() || !srcBtn) { bar.classList.remove('is-visible'); return; }
      var r = srcBtn.getBoundingClientRect();
      var passed = r.bottom < 0;                       // CTA remonté hors champ
      var atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 120);
      bar.classList.toggle('is-visible', passed && !atBottom);
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { toggle(); ticking = false; });
    }, { passive: true });

    window.addEventListener('resize', toggle);
    MQ.addEventListener('change', toggle);
    toggle();
  }

  function boot() {
    initFleetSheet();
    initDetailStickybar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
