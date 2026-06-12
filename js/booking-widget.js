/* ──────────────────────────────────────────────────────────────
   Bestore Car — 3-step booking widget
   Step 1: pick-up details · Step 2: car selection · Step 3: summary + WhatsApp
   Vanilla JS, no dependencies. Reuses the existing i18n `translations`
   object and `currentLang`. Renders into a modal appended to <body>.
   Public API: window.openBookingWidget(options)
   ────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // Canonical car list (matches the homepage fleet carousel)
  var WIDGET_CARS = [
    { id: 2,  name: { ar: 'داسيا سانديرو',     fr: 'Dacia Sandero',     en: 'Dacia Sandero' },     price: 320, img: 'assets/images/cars/sandero.webp' },
    { id: 4,  name: { ar: 'رونو كليو 5',       fr: 'Renault Clio 5',    en: 'Renault Clio 5' },    price: 420, img: 'assets/images/cars/clio5.webp' },
    { id: 7,  name: { ar: 'فولكسفاغن تي روك',  fr: 'Volkswagen T-Roc',  en: 'Volkswagen T-Roc' },  price: 550, img: 'assets/images/cars/troc.webp' },
    { id: 5,  name: { ar: 'بيجو 208',          fr: 'Peugeot 208',       en: 'Peugeot 208' },       price: 450, img: 'assets/images/cars/p208.webp' },
    { id: 11, name: { ar: 'هيونداي i20',       fr: 'Hyundai i20',       en: 'Hyundai i20' },       price: 300, img: 'assets/images/cars/i20.webp' },
    { id: 12, name: { ar: 'سكودا أوكتافيا',    fr: 'Skoda Octavia',     en: 'Skoda Octavia' },     price: 500, img: 'assets/images/cars/skoda-octavia.webp' },
    { id: 13, name: { ar: 'سيات إيبيزا',       fr: 'Seat Ibiza',        en: 'Seat Ibiza' },        price: 350, img: 'assets/images/cars/seat-ibiza.webp' },
    { id: 14, name: { ar: 'تويوتا يارِس',      fr: 'Toyota Yaris',      en: 'Toyota Yaris' },      price: 330, img: 'assets/images/cars/toyota-yaris.webp' },
    { id: 15, name: { ar: 'كيا سبورتاج',       fr: 'Kia Sportage',      en: 'Kia Sportage' },      price: 700, img: 'assets/images/cars/kia-sportage.webp' },
    { id: 16, name: { ar: 'داسيا داستر',       fr: 'Dacia Duster',      en: 'Dacia Duster' },      price: 600, img: 'assets/images/cars/duster.webp' }
  ];

  var FALLBACK_IMG = 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600';
  var WA_PHONE = '212661661230';
  var DEFAULT_LOCATION = 'Tanger - Avenue Arrar N°27';

  // Live car list (Step 2). Starts as the static list above and is replaced by
  // Supabase data once it loads, so prices shown — and carried to Step 3's total
  // — always match the dashboard. Keyed by ref_id so leads still resolve the car.
  var liveCars = WIDGET_CARS.slice();
  var WIDGET_META = {};
  WIDGET_CARS.forEach(function (c) { WIDGET_META[c.id] = c; });

  function loadLiveCars() {
    try {
      if (!window.BooklyDB || typeof window.BooklyDB.getCars !== 'function') return;
      var p = window.BooklyDB.getCars(window.BESTORE_AGENCY_ID);
      if (!p || typeof p.then !== 'function') return;
      p.then(function (rows) {
        if (!rows || !rows.length) return;
        // Prefer cars the agency marks as available; fall back to all if none.
        var avail = rows.filter(function (r) { return (r.status || 'available') === 'available'; });
        var use = avail.length ? avail : rows;
        liveCars = use.map(function (r) {
          var ref = r.ref_id != null ? r.ref_id : r.id;
          var meta = WIDGET_META[ref];
          return {
            id: ref,                                     // stable id (ref_id)
            name: meta ? meta.name : { ar: r.name, fr: r.name, en: r.name },
            price: Number(r.price_per_day) || 0,
            img: r.photo_url || (meta ? meta.img : FALLBACK_IMG)
          };
        });
        // If the widget is open on Step 2, reflect the fresh data immediately.
        if (modal && modal.classList.contains('is-open') && state.step === 2) render();
      }).catch(function (err) {
        console.warn('[Bestore] booking widget: live cars load failed, using static list.', err);
      });
    } catch (e) {
      console.warn('[Bestore] booking widget: live cars load error.', e);
    }
  }

  // ── Helpers ──────────────────────────────────────────────
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

  function carName(car) {
    if (!car) return '';
    if (car.name && typeof car.name === 'object') return car.name[getLang()] || car.name.en;
    return car.name || '';
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  // Local calendar date as YYYY-MM-DD (avoids UTC off-by-one)
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  // Date math done in UTC on the parsed parts so it never shifts a day
  function addDays(str, n) {
    var p = str.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    d.setUTCDate(d.getUTCDate() + n);
    return d.getUTCFullYear() + '-' + pad2(d.getUTCMonth() + 1) + '-' + pad2(d.getUTCDate());
  }

  function diffDays(a, b) {
    var pa = a.split('-'), pb = b.split('-');
    var d1 = Date.UTC(+pa[0], +pa[1] - 1, +pa[2]);
    var d2 = Date.UTC(+pb[0], +pb[1] - 1, +pb[2]);
    return Math.round((d2 - d1) / 86400000);
  }

  function totalDays() { return Math.max(1, diffDays(state.pickupDate, state.returnDate)); }

  function totalPrice() {
    var p = state.car ? Number(state.car.price) || 0 : 0;
    return totalDays() * p;
  }

  function normalizeCar(c) {
    if (!c) return null;
    return { name: c.name, price: Number(c.price) || 0, img: c.img || FALLBACK_IMG };
  }

  function findCar(id) {
    id = parseInt(id, 10);
    for (var i = 0; i < liveCars.length; i++) if (liveCars[i].id === id) return liveCars[i];
    for (var j = 0; j < WIDGET_CARS.length; j++) if (WIDGET_CARS[j].id === id) return WIDGET_CARS[j];
    return null;
  }

  // ── State ────────────────────────────────────────────────
  var state = {
    step: 1,
    location: DEFAULT_LOCATION,
    pickupDate: todayStr(),
    returnDate: addDays(todayStr(), 1),
    pickupTime: '10:00',
    car: null,
    carId: null,    // stable widget car id (resolved to a Supabase car on save)
    locked: false   // car was pre-selected (skip step 2)
  };

  var modal, cardEl, bodyEl, stepsEl;

  // ── Markup builders ──────────────────────────────────────
  function timeOptions(selected) {
    var out = '';
    for (var h = 8; h <= 20; h++) {
      for (var m = 0; m < 60; m += 30) {
        if (h === 20 && m > 0) break;
        var v = (h < 10 ? '0' : '') + h + ':' + (m === 0 ? '00' : '30');
        out += '<option value="' + v + '"' + (v === selected ? ' selected' : '') + '>' + v + '</option>';
      }
    }
    return out;
  }

  function visibleSteps() { return state.locked ? [1, 3] : [1, 2, 3]; }

  function stepperHTML() {
    var steps = visibleSteps();
    return '<div class="bw-stepper">' + steps.map(function (s, i) {
      var cls = 'bw-stepper__dot' + (s === state.step ? ' is-active' : (s < state.step ? ' is-done' : ''));
      return '<span class="' + cls + '">' + (i + 1) + '</span>' +
             (i < steps.length - 1 ? '<span class="bw-stepper__line"></span>' : '');
    }).join('') + '</div>';
  }

  function step1HTML() {
    return '' +
      '<h3 class="bw-modal__title">' + esc(t('bw.step1.title')) + '</h3>' +
      '<div class="bw-grid">' +
        '<div class="bw-field bw-field--full">' +
          '<label for="bw-location">' + esc(t('bw.location')) + '</label>' +
          '<input type="text" id="bw-location" value="' + esc(state.location) + '">' +
        '</div>' +
        '<div class="bw-field">' +
          '<label for="bw-pickup">' + esc(t('bw.pickupDate')) + '</label>' +
          '<input type="date" id="bw-pickup" min="' + todayStr() + '" value="' + esc(state.pickupDate) + '">' +
        '</div>' +
        '<div class="bw-field">' +
          '<label for="bw-return">' + esc(t('bw.returnDate')) + '</label>' +
          '<input type="date" id="bw-return" min="' + esc(addDays(state.pickupDate, 1)) + '" value="' + esc(state.returnDate) + '">' +
        '</div>' +
        '<div class="bw-field bw-field--full">' +
          '<label for="bw-time">' + esc(t('bw.pickupTime')) + '</label>' +
          '<select id="bw-time">' + timeOptions(state.pickupTime) + '</select>' +
        '</div>' +
      '</div>' +
      '<p class="bw-error" id="bw-error"></p>' +
      '<div class="bw-actions">' +
        '<button type="button" class="bw-btn bw-btn--primary" id="bw-next">' + esc(t('bw.next')) + ' →</button>' +
      '</div>';
  }

  function step2HTML() {
    var perday = t('fleet.perday');
    var cards = liveCars.map(function (c) {
      return '<button type="button" class="bw-car" data-car-id="' + c.id + '">' +
        '<span class="bw-car__img-wrap"><img class="bw-car__img" src="' + esc(c.img) + '" alt="' + esc(carName(c)) +
          '" loading="lazy" onerror="this.onerror=null;this.src=\'' + FALLBACK_IMG + '\'"></span>' +
        '<span class="bw-car__body">' +
          '<span class="bw-car__name">' + esc(carName(c)) + '</span>' +
          '<span class="bw-car__price">' + c.price + ' MAD <small>' + esc(perday) + '</small></span>' +
        '</span>' +
      '</button>';
    }).join('');
    return '' +
      '<h3 class="bw-modal__title">' + esc(t('bw.step2.title')) + '</h3>' +
      '<div class="bw-cars">' + cards + '</div>' +
      '<div class="bw-actions">' +
        '<button type="button" class="bw-btn bw-btn--ghost" id="bw-back">← ' + esc(t('bw.back')) + '</button>' +
      '</div>';
  }

  function summaryRow(label, value) {
    return '<div class="bw-sum__row"><span class="bw-sum__key">' + esc(label) +
           '</span><span class="bw-sum__val">' + esc(value) + '</span></div>';
  }

  function step3HTML() {
    var n = totalDays();
    var daysWord = t('bw.days');
    var rows =
      summaryRow(t('bw.sum.car'),      carName(state.car)) +
      summaryRow(t('bw.sum.location'), state.location) +
      summaryRow(t('bw.sum.pickup'),   state.pickupDate + ' · ' + state.pickupTime) +
      summaryRow(t('bw.sum.return'),   state.returnDate) +
      summaryRow(t('bw.sum.days'),     n + ' ' + daysWord) +
      '<div class="bw-sum__row bw-sum__row--total"><span class="bw-sum__key">' + esc(t('bw.sum.total')) +
        '</span><span class="bw-sum__val">' + totalPrice() + ' MAD</span></div>';

    var waSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>' +
      '<path d="M11.93 2a9.93 9.93 0 00-8.485 15.095L2 22l5.047-1.418A9.93 9.93 0 1011.93 2z"/></svg>';

    var waUrl = 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(buildMessage());

    return '' +
      '<h3 class="bw-modal__title">' + esc(t('bw.step3.title')) + '</h3>' +
      '<div class="bw-sum">' + rows + '</div>' +
      '<a href="' + esc(waUrl) + '" class="bw-wa-btn" id="bw-wa" target="_blank" rel="noopener noreferrer">' + waSvg + '<span>' + esc(t('bw.whatsapp')) + '</span></a>' +
      '<div class="bw-actions">' +
        '<button type="button" class="bw-btn bw-btn--ghost" id="bw-back">← ' + esc(t('bw.back')) + '</button>' +
      '</div>';
  }

  // ── Render + wiring ──────────────────────────────────────
  function render() {
    if (!bodyEl) return;
    stepsEl.innerHTML = stepperHTML();
    if (state.step === 1)      bodyEl.innerHTML = step1HTML();
    else if (state.step === 2) bodyEl.innerHTML = step2HTML();
    else                       bodyEl.innerHTML = step3HTML();
    wireStep();
  }

  function go(step) { state.step = step; render(); }

  function wireStep() {
    if (state.step === 1) {
      var loc = document.getElementById('bw-location');
      var pk  = document.getElementById('bw-pickup');
      var rt  = document.getElementById('bw-return');
      var tm  = document.getElementById('bw-time');
      var err = document.getElementById('bw-error');

      pk.addEventListener('change', function () {
        state.pickupDate = pk.value || todayStr();
        var minRet = addDays(state.pickupDate, 1);
        rt.min = minRet;
        if (!rt.value || rt.value < minRet) { rt.value = minRet; state.returnDate = minRet; }
      });
      rt.addEventListener('change', function () {
        if (rt.value && pk.value && rt.value <= pk.value) {
          err.textContent = t('bw.dateError');
        } else { err.textContent = ''; }
      });

      document.getElementById('bw-next').addEventListener('click', function () {
        state.location   = (loc.value || '').trim() || DEFAULT_LOCATION;
        state.pickupDate = pk.value || todayStr();
        state.returnDate = rt.value || addDays(state.pickupDate, 1);
        state.pickupTime = tm.value;
        if (state.returnDate <= state.pickupDate) {
          err.textContent = t('bw.dateError');
          return;
        }
        err.textContent = '';
        // Persist for other pages that read these keys
        try {
          sessionStorage.setItem('pickup_date', state.pickupDate);
          sessionStorage.setItem('return_date', state.returnDate);
        } catch (e) {}
        go(state.locked ? 3 : 2);
      });
    } else if (state.step === 2) {
      bodyEl.querySelectorAll('.bw-car').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var picked = findCar(btn.getAttribute('data-car-id'));
          state.car = normalizeCar(picked);
          state.carId = picked ? picked.id : null;
          go(3);
        });
      });
      var back2 = document.getElementById('bw-back');
      if (back2) back2.addEventListener('click', function () { go(1); });
    } else if (state.step === 3) {
      // The WhatsApp button is a real <a target="_blank"> link — opening it is
      // never blocked. We just fire-and-forget a pending booking to Supabase
      // first, so every WhatsApp inquiry also lands in the dashboard.
      var wa = document.getElementById('bw-wa');
      if (wa) wa.addEventListener('click', function () { saveLead(); });
      var back3 = document.getElementById('bw-back');
      if (back3) back3.addEventListener('click', function () { go(state.locked ? 1 : 2); });
    }
  }

  // Save the inquiry as a pending booking. Never throws / never blocks WhatsApp.
  function saveLead() {
    try {
      if (!window.BooklyDB || !window.BooklyDB.createBookingFromWebsite) return;
      var p = window.BooklyDB.createBookingFromWebsite({
        agency_id:    window.BESTORE_AGENCY_ID,
        car_ref:      state.carId,
        car_name:     carName(state.car),
        pickup_date:  state.pickupDate,
        return_date:  state.returnDate,
        pickup_time:  state.pickupTime,
        price_per_day: state.car ? state.car.price : 0,
        source: 'website',
        status: 'pending'
      });
      if (p && typeof p.catch === 'function') {
        p.catch(function (err) { console.warn('[Bestore] lead save failed (non-blocking):', err); });
      }
    } catch (e) {
      console.warn('[Bestore] lead save error (non-blocking):', e);
    }
  }

  function buildMessage() {
    var lang = getLang();
    var name = carName(state.car);
    var d1 = state.pickupDate, d2 = state.returnDate, n = totalDays(), total = totalPrice();
    if (lang === 'fr') {
      return 'Bonjour, je souhaite réserver ' + name + ' du ' + d1 + ' au ' + d2 + ' (' + n + ' jours) — Total: ' + total + ' MAD';
    }
    if (lang === 'ar') {
      return 'مرحبا، أريد حجز ' + name + ' من ' + d1 + ' إلى ' + d2 + ' (' + n + ' أيام) — المجموع: ' + total + ' درهم';
    }
    return 'Hello, I\'d like to book ' + name + ' from ' + d1 + ' to ' + d2 + ' (' + n + ' days) — Total: ' + total + ' MAD';
  }

  // ── Modal lifecycle ──────────────────────────────────────
  function buildModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'bw-modal';
    modal.id = 'bw-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="bw-modal__overlay" data-bw-close></div>' +
      '<div class="bw-modal__card" role="dialog" aria-modal="true" aria-label="Booking">' +
        '<button class="bw-modal__close" data-bw-close aria-label="Close">&#x2715;</button>' +
        '<div class="bw-modal__steps" id="bw-steps"></div>' +
        '<div class="bw-modal__body" id="bw-body"></div>' +
      '</div>';
    document.body.appendChild(modal);
    cardEl = modal.querySelector('.bw-modal__card');
    bodyEl = modal.querySelector('#bw-body');
    stepsEl = modal.querySelector('#bw-steps');

    modal.querySelectorAll('[data-bw-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  function showModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ── Public API ───────────────────────────────────────────
  // openBookingWidget({ car, prefill, startStep })
  //  - car: a car object {name, price, img} or a numeric id → pre-selects + jumps to summary
  //  - prefill: { location, pickupDate, returnDate, pickupTime }
  //  - startStep: force a starting step (overrides default)
  function openBookingWidget(opts) {
    opts = opts || {};
    buildModal();

    if (opts.prefill) {
      var p = opts.prefill;
      if (p.location)   state.location   = p.location;
      if (p.pickupDate) state.pickupDate = p.pickupDate;
      if (p.returnDate) state.returnDate = p.returnDate;
      if (p.pickupTime) state.pickupTime = p.pickupTime;
    }
    // Keep dates coherent
    if (state.returnDate <= state.pickupDate) state.returnDate = addDays(state.pickupDate, 1);

    if (opts.car != null) {
      var c = (typeof opts.car === 'object') ? opts.car : findCar(opts.car);
      state.car = normalizeCar(c);
      state.carId = (c && c.id != null) ? c.id
                  : (typeof opts.car !== 'object' ? parseInt(opts.car, 10) : null);
      state.locked = !!state.car;
    } else {
      state.locked = false;
      state.carId = null;
    }

    state.step = opts.startStep || (state.locked ? 3 : 1);
    render();
    showModal();
  }

  window.openBookingWidget = openBookingWidget;
  window.closeBookingWidget = closeModal;
  // Re-render an open widget (e.g. after a language switch)
  window.refreshBookingWidget = function () {
    if (modal && modal.classList.contains('is-open')) render();
  };

  // ── Hero inline booking bar (index.html) ─────────────────
  function initHeroBar() {
    var bar = document.getElementById('bwHeroBar');
    if (!bar) return;

    var loc = document.getElementById('bwHeroLocation');
    var pk  = document.getElementById('bwHeroPickup');
    var rt  = document.getElementById('bwHeroReturn');
    var tm  = document.getElementById('bwHeroTime');
    var btn = document.getElementById('bwHeroSearch');

    if (loc && !loc.value) loc.value = DEFAULT_LOCATION;
    if (pk) { pk.min = todayStr(); if (!pk.value) pk.value = todayStr(); }
    if (rt) { rt.min = addDays(pk ? pk.value : todayStr(), 1); if (!rt.value) rt.value = rt.min; }
    if (tm && !tm.options.length) tm.innerHTML = timeOptions(state.pickupTime);

    if (pk) pk.addEventListener('change', function () {
      var minRet = addDays(pk.value || todayStr(), 1);
      if (rt) { rt.min = minRet; if (!rt.value || rt.value < minRet) rt.value = minRet; }
    });

    if (btn) btn.addEventListener('click', function () {
      openBookingWidget({
        prefill: {
          location:   loc ? loc.value : DEFAULT_LOCATION,
          pickupDate: pk ? pk.value : todayStr(),
          returnDate: rt ? rt.value : addDays(todayStr(), 1),
          pickupTime: tm ? tm.value : '10:00'
        },
        startStep: 2
      });
    });
  }

  // ── Floating Reserve button (fleet.html) ─────────────────
  function initReserveFloat() {
    var fab = document.getElementById('bwReserveFloat');
    if (!fab) return;
    fab.addEventListener('click', function () { openBookingWidget(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildModal();
    initHeroBar();
    initReserveFloat();
    loadLiveCars();
  });

  // Update hero-bar labels + any open modal when the language changes
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang-btn') || e.target.closest('.lang-switcher__btn');
    if (b) setTimeout(function () { window.refreshBookingWidget(); }, 20);
  });
})();
