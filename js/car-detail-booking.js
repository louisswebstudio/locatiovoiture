/* ──────────────────────────────────────────────────────────────
   AYM Rent Car - Simple booking modal (car-detail page)
   ONE screen · 3 fields only: départ date · retour date · prénom
   - Live price total (price/day × days, min 1 day)
   - Multilingual labels (AR/FR/EN) via the shared i18n `translations`
   - WhatsApp message is ALWAYS French (the agency owner reads French)
   - Saves a pending lead to Supabase (BooklyDB) first, then opens WhatsApp;
     a Supabase failure never blocks the customer.

   Public API: window.openCarBooking(carData)
     carData = { name:{ar,fr,en}, cat:{ar,fr,en}, price, img, carId, ref }
   ────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var WA_PHONE = '212613616145';
  // French label used in the WhatsApp message / saved lead (no field shown).
  var PICKUP_LOCATION = 'Agence AYM Rent Car, Tanger';

  // ── i18n helpers ─────────────────────────────────────────
  function getLang() {
    return (typeof currentLang !== 'undefined' && currentLang) ||
           localStorage.getItem('bsc_lang') || 'ar';
  }
  function t(key) {
    var lang = getLang();
    if (typeof translations !== 'undefined') {
      if (translations[lang] && translations[lang][key] != null) return translations[lang][key];
      if (translations.en && translations.en[key] != null) return translations.en[key];
    }
    return key;
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ── date helpers (UTC-safe, no off-by-one) ───────────────
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function addDays(str, n) {
    var p = String(str).split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    d.setUTCDate(d.getUTCDate() + n);
    return d.getUTCFullYear() + '-' + pad2(d.getUTCMonth() + 1) + '-' + pad2(d.getUTCDate());
  }
  function diffDays(a, b) {
    var pa = String(a).split('-'), pb = String(b).split('-');
    var d1 = Date.UTC(+pa[0], +pa[1] - 1, +pa[2]);
    var d2 = Date.UTC(+pb[0], +pb[1] - 1, +pb[2]);
    return Math.round((d2 - d1) / 86400000);
  }
  function fmtDate(str) {
    if (!str) return '';
    var p = String(str).split('-');
    return p[2] + '/' + p[1] + '/' + p[0];           // DD/MM/YYYY
  }
  function fmtNum(n) {                                 // 2766 → "2 766"
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // ── price math ───────────────────────────────────────────
  function totalDays() { return Math.max(1, diffDays(state.pickupDate, state.returnDate)); }
  function totalPrice() { return totalDays() * (state.car ? Number(state.car.price) || 0 : 0); }

  // ── localized car text ───────────────────────────────────
  function carName(lang) {
    var n = state.car && state.car.name;
    if (!n) return '';
    if (typeof n === 'object') return n[lang] || n.fr || n.en || '';
    return n;
  }
  function carCat(lang) {
    var c = state.car && state.car.cat;
    if (!c) return '';
    if (typeof c === 'object') return c[lang] || c.fr || c.en || '';
    return c;
  }

  // ── state ────────────────────────────────────────────────
  var state = {
    car: null,
    pickupDate: todayStr(),
    returnDate: addDays(todayStr(), 1),
    name: ''
  };

  var modal, bodyEl;

  // ── markup ───────────────────────────────────────────────
  function carStripHTML() {
    if (!state.car) return '';
    var img = state.car.img || '';
    return '<div class="cdbk__car">' +
      '<img class="cdbk__car-img" src="' + esc(img) + '" alt="" onerror="this.style.display=\'none\'">' +
      '<div class="cdbk__car-info">' +
        '<span class="cdbk__car-name">' + esc(carName(getLang())) + '</span>' +
        '<span class="cdbk__car-price">' + (Number(state.car.price) > 0
            ? state.car.price + ' MAD <small>' + esc(t('fleet.perday')) + '</small>'
            : esc(t('fleet.priceOnRequest') || 'Prix sur demande')) + '</span>' +
      '</div>' +
    '</div>';
  }

  function field(labelKey, inner) {
    return '<div class="cdbk__field">' +
      '<label>' + esc(t(labelKey)) + '</label>' + inner +
      '<p class="cdbk__err" hidden></p>' +
    '</div>';
  }

  function liveTotalHTML() {
    var n = totalDays();
    var word = n > 1 ? t('cdf.days') : t('cdf.day');
    return '<span class="cdbk__total-label">' + esc(t('cdf.sum.total')) + '</span>' +
           '<span class="cdbk__total-val">' + fmtNum(totalPrice()) + ' MAD <small>(' + n + ' ' + esc(word) + ')</small></span>';
  }

  function formHTML() {
    var waSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>' +
      '<path d="M11.93 2a9.93 9.93 0 00-8.485 15.095L2 22l5.047-1.418A9.93 9.93 0 1011.93 2z"/></svg>';
    var waUrl = 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(buildMessage());

    return '' +
      carStripHTML() +
      '<div class="cdbk__row">' +
        field('cdf.departDate', '<input type="date" id="cdbk-depart" min="' + todayStr() + '" value="' + esc(state.pickupDate) + '">') +
        field('cdf.returnDate', '<input type="date" id="cdbk-return" min="' + esc(addDays(state.pickupDate, 1)) + '" value="' + esc(state.returnDate) + '">') +
      '</div>' +
      field('cdf.firstName', '<input type="text" id="cdbk-name" value="' + esc(state.name) + '" placeholder="' + esc(t('cdf.firstName')) + '" autocomplete="given-name">') +
      '<div class="cdbk__total" id="cdbk-total-live">' + liveTotalHTML() + '</div>' +
      '<a href="' + esc(waUrl) + '" class="cdbk__wa" id="cdbk-confirm" target="_blank" rel="noopener noreferrer">' +
        waSvg + '<span>' + esc(t('cdf.confirm')) + ' →</span>' +
      '</a>' +
      '<p class="cdbk__redirect" data-i18n="detail.confirm">' + esc(t('detail.confirm') || '') + '</p>';
  }

  // ── WhatsApp message (always French) ─────────────────────
  function buildMessage() {
    var n = totalDays();
    var name = carName('fr');
    var cat = carCat('fr') ? ' (' + carCat('fr') + ')' : '';
    var lines = [
      '🚗 Réservation : ' + name + cat,
      '📅 Du ' + fmtDate(state.pickupDate) + ' au ' + fmtDate(state.returnDate) +
        ' (' + n + ' ' + (n > 1 ? 'jours' : 'jour') + ')',
      '💰 Total: ' + fmtNum(totalPrice()) + ' MAD',
      '👤 ' + (state.name || '-'),
      '',
      'Bonjour, je souhaite réserver ce véhicule.'
    ];
    return lines.join('\n');
  }

  // ── Save pending lead to Supabase (non-blocking) ─────────
  function saveLead() {
    try {
      if (!window.BooklyDB || !window.BooklyDB.createBookingFromWebsite) return;
      var p = window.BooklyDB.createBookingFromWebsite({
        agency_id:       window.BESTORE_AGENCY_ID,
        car_id:          state.car && state.car.carId ? state.car.carId : null,
        car_ref:         state.car && state.car.ref != null ? state.car.ref : null,
        car_name:        carName('fr'),
        price_per_day:   state.car ? state.car.price : 0,
        pickup_date:     state.pickupDate,
        return_date:     state.returnDate,
        pickup_location: PICKUP_LOCATION,
        client_name:     state.name,
        source:          'website',
        status:          'pending'
      });
      if (p && typeof p.catch === 'function') {
        p.catch(function (err) { console.warn('[AYM] booking save failed (non-blocking):', err); });
      }
    } catch (e) {
      console.warn('[AYM] booking save error (non-blocking):', e);
    }
  }

  // ── validation ───────────────────────────────────────────
  function setError(inputEl, msg) {
    var fieldEl = inputEl.closest('.cdbk__field');
    if (!fieldEl) return;
    var err = fieldEl.querySelector('.cdbk__err');
    fieldEl.classList.add('is-error');
    if (err) { err.textContent = msg; err.hidden = false; }
  }
  function clearError(inputEl) {
    var fieldEl = inputEl.closest('.cdbk__field');
    if (!fieldEl) return;
    fieldEl.classList.remove('is-error');
    var err = fieldEl.querySelector('.cdbk__err');
    if (err) { err.textContent = ''; err.hidden = true; }
  }

  // ── render + wiring ──────────────────────────────────────
  function render() {
    if (!bodyEl) return;
    bodyEl.innerHTML = formHTML();
    wire();
  }

  function refreshLiveTotal() {
    var el = document.getElementById('cdbk-total-live');
    if (el) el.innerHTML = liveTotalHTML();
  }
  function refreshWaHref() {
    var wa = document.getElementById('cdbk-confirm');
    if (wa) wa.href = 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(buildMessage());
  }

  function wire() {
    var dep  = document.getElementById('cdbk-depart');
    var ret  = document.getElementById('cdbk-return');
    var nm   = document.getElementById('cdbk-name');
    var wa   = document.getElementById('cdbk-confirm');

    dep.addEventListener('change', function () {
      state.pickupDate = dep.value || todayStr();
      var minRet = addDays(state.pickupDate, 1);
      ret.min = minRet;
      if (!ret.value || ret.value < minRet) { ret.value = minRet; }
      state.returnDate = ret.value;
      clearError(ret);
      refreshLiveTotal(); refreshWaHref();
    });
    ret.addEventListener('change', function () {
      state.returnDate = ret.value || addDays(state.pickupDate, 1);
      if (state.returnDate <= state.pickupDate) setError(ret, t('cdf.err.date'));
      else clearError(ret);
      refreshLiveTotal(); refreshWaHref();
    });
    nm.addEventListener('input', function () {
      state.name = nm.value;
      if (nm.value.trim().length >= 2) clearError(nm);
      refreshWaHref();
    });

    // Real <a target="_blank"> → opening WhatsApp is never blocked when valid.
    // Validate first; if good, fire-and-forget the Supabase lead, then let the
    // link open and close the modal shortly after.
    if (wa) wa.addEventListener('click', function (e) {
      state.pickupDate = dep.value || todayStr();
      state.returnDate = ret.value || addDays(state.pickupDate, 1);
      state.name = nm.value.trim();
      var ok = true;
      if (state.returnDate <= state.pickupDate) { setError(ret, t('cdf.err.date')); ok = false; }
      if (state.name.length < 2) { setError(nm, t('cdf.err.name')); ok = false; }
      if (!ok) { e.preventDefault(); return; }
      refreshWaHref();
      wa.href = 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(buildMessage());
      saveLead();
      setTimeout(closeModal, 400);
    });
  }

  // ── modal lifecycle ──────────────────────────────────────
  function buildModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'cdbk';
    modal.id = 'cdbk-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="cdbk__overlay" data-cdbk-close></div>' +
      '<div class="cdbk__card" role="dialog" aria-modal="true" aria-labelledby="cdbk-title">' +
        '<button class="cdbk__close" data-cdbk-close aria-label="Close">&#x2715;</button>' +
        '<h3 class="cdbk__title" id="cdbk-title">' + esc(t('cdf.title')) + '</h3>' +
        '<div class="cdbk__body" id="cdbk-body"></div>' +
      '</div>';
    document.body.appendChild(modal);
    bodyEl = modal.querySelector('#cdbk-body');

    modal.querySelectorAll('[data-cdbk-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ── public API ───────────────────────────────────────────
  function openCarBooking(carData) {
    buildModal();
    state.car = carData || state.car;
    // sensible date defaults
    if (state.pickupDate < todayStr()) state.pickupDate = todayStr();
    if (state.returnDate <= state.pickupDate) state.returnDate = addDays(state.pickupDate, 1);

    var title = modal.querySelector('#cdbk-title');
    if (title) title.textContent = t('cdf.title');

    render();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  window.openCarBooking = openCarBooking;
  window.closeCarBooking = closeModal;

  // Re-render on language change while the modal is open
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang-dd__opt') || e.target.closest('.lang-btn') || e.target.closest('.lang-switcher__btn');
    if (b && modal && modal.classList.contains('is-open')) {
      setTimeout(function () {
        var title = modal.querySelector('#cdbk-title');
        if (title) title.textContent = t('cdf.title');
        render();
      }, 20);
    }
  });
})();
