(function () {
  'use strict';

  const CARS_PER_PAGE = 12;
  const fallbackImg = 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600';

  // ── Static metadata (multilingual names, brand, specs) ─────────────────
  // This is also the offline fallback if Supabase is unreachable. Live data
  // (price / photo / status / availability) comes from Supabase and is merged
  // onto these entries by ref_id so the rich UI + filters keep working.
  const FALLBACK_CARS = [
    {
      id: 2,
      name: { ar: 'داسيا سانديرو', fr: 'Dacia Sandero', en: 'Dacia Sandero' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', brand: 'Dacia', price: '320', doors: 4, passengers: 5,
      img: 'assets/images/cars/sandero.webp'
    },
    {
      id: 4,
      name: { ar: 'رونو كليو', fr: 'Renault Clio', en: 'Renault Clio' },
      cat: { ar: 'سيدان', fr: 'Berline', en: 'Sedan' },
      catKey: 'Sedan', brand: 'Renault', price: '420', doors: 4, passengers: 5,
      img: 'assets/images/cars/clio5.webp'
    },
    {
      id: 5,
      name: { ar: 'بيجو 208', fr: 'Peugeot 208', en: 'Peugeot 208' },
      cat: { ar: 'سيدان', fr: 'Berline', en: 'Sedan' },
      catKey: 'Sedan', brand: 'Peugeot', price: '450', doors: 4, passengers: 5,
      img: 'assets/images/cars/p208.webp'
    },
    {
      id: 7,
      name: { ar: 'فولكس واجن T-Roc', fr: 'Volkswagen T-Roc', en: 'Volkswagen T-Roc' },
      cat: { ar: 'دفع رباعي', fr: 'SUV', en: 'SUV' },
      catKey: 'SUV', brand: 'Volkswagen', price: '600', doors: 4, passengers: 5,
      img: 'assets/images/cars/troc.webp'
    },
    {
      id: 11,
      name: { ar: 'هيونداي i20', fr: 'Hyundai i20', en: 'Hyundai i20' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', brand: 'Hyundai', price: '300', doors: 4, passengers: 5,
      img: 'assets/images/cars/i20.webp'
    },
    {
      id: 12,
      name: { ar: 'سكودا أوكتافيا', fr: 'Skoda Octavia', en: 'Skoda Octavia' },
      cat: { ar: 'سيدان', fr: 'Berline', en: 'Sedan' },
      catKey: 'Sedan', brand: 'Skoda', price: '500', doors: 4, passengers: 5,
      img: 'assets/images/cars/skoda-octavia.webp'
    },
    {
      id: 13,
      name: { ar: 'سيات إيبيزا', fr: 'Seat Ibiza', en: 'Seat Ibiza' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', brand: 'Seat', price: '350', doors: 4, passengers: 5,
      img: 'assets/images/cars/seat-ibiza.webp'
    },
    {
      id: 14,
      name: { ar: 'تويوتا يارِس', fr: 'Toyota Yaris', en: 'Toyota Yaris' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', brand: 'Toyota', price: '330', doors: 4, passengers: 5,
      img: 'assets/images/cars/toyota-yaris.webp'
    },
    {
      id: 15,
      name: { ar: 'كيا سبورتاج', fr: 'Kia Sportage', en: 'Kia Sportage' },
      cat: { ar: 'دفع رباعي', fr: 'SUV', en: 'SUV' },
      catKey: 'SUV', brand: 'Kia', price: '700', doors: 4, passengers: 5,
      img: 'assets/images/cars/kia-sportage.webp'
    },
    {
      id: 16,
      name: { ar: 'داسيا داستر', fr: 'Dacia Duster', en: 'Dacia Duster' },
      cat: { ar: 'دفع رباعي', fr: 'SUV', en: 'SUV' },
      catKey: 'SUV', brand: 'Dacia', price: '600', doors: 4, passengers: 5,
      img: 'assets/images/cars/duster.webp'
    },
  ];

  // Lookup of static metadata by ref_id (= the small numeric id above).
  const META_BY_REF = {};
  FALLBACK_CARS.forEach(function (c) { META_BY_REF[c.id] = c; });

  // Price shown on a card: "sur demande" until the agency sets one.
  function priceHTML(price, perDay) {
    var n = Number(price);
    if (n > 0) return '<span class="fc__price-num">' + n + ' MAD</span><span class="fc__price-per">' + perDay + '</span>';
    var lang = (typeof getCurrentLang === 'function' && getCurrentLang()) ||
               (localStorage.getItem('bsc_lang') || 'fr');
    var ask = { fr: 'Prix sur demande', en: 'Price on request', ar: 'السعر عند الطلب' };
    return '<span class="fc__price-ask">' + (ask[lang] || ask.fr) + '</span>';
  }

  // Brand of a car, from its name. Multi-word brands need their own entry.
  var MULTI_WORD_BRANDS = ['Range Rover', 'Land Rover', 'Alfa Romeo'];
  function brandOf(name) {
    var n = String(name || '').trim();
    for (var i = 0; i < MULTI_WORD_BRANDS.length; i++) {
      if (n.toLowerCase().indexOf(MULTI_WORD_BRANDS[i].toLowerCase()) === 0) return MULTI_WORD_BRANDS[i];
    }
    return n.split(' ')[0];
  }

  // simpleicons.org slug for the brand logo shown in the filter list.
  var BRAND_ICON = {
    'dacia': 'dacia', 'renault': 'renault', 'peugeot': 'peugeot', 'volkswagen': 'volkswagen',
    'hyundai': 'hyundai', 'seat': 'seat', 'audi': 'audi', 'bmw': 'bmw',
    'opel': 'opel', 'porsche': 'porsche', 'skoda': 'skoda', 'toyota': 'toyota',
    'kia': 'kia', 'ford': 'ford', 'fiat': 'fiat', 'nissan': 'nissan', 'citroen': 'citroen',
  };

  // Marques absentes de Simple Icons (retirées à la demande des constructeurs) :
  // logos simplifiés hébergés dans le projet.
  var BRAND_ICON_LOCAL = {
    'cupra': 'assets/images/brands/cupra.svg',
    'mercedes': 'assets/images/brands/mercedes.svg',
    'mercedes-benz': 'assets/images/brands/mercedes.svg',
    'range rover': 'assets/images/brands/land-rover.svg',
    'land rover': 'assets/images/brands/land-rover.svg',
  };

  function brandIconSrc(brand) {
    var k = String(brand || '').toLowerCase();
    if (BRAND_ICON_LOCAL[k]) return BRAND_ICON_LOCAL[k];
    return BRAND_ICON[k] ? 'https://cdn.simpleicons.org/' + BRAND_ICON[k] : null;
  }

  // The sidebar brand list follows the cars actually published, so it never
  // shows a brand the agency no longer rents.
  function renderBrandFilters(list) {
    var box = document.getElementById('fcBrands');
    if (!box) return;
    var checked = {};
    box.querySelectorAll('.fc__brand-checkbox:checked').forEach(function (cb) { checked[cb.value] = true; });
    var brands = [];
    list.forEach(function (c) { if (c.brand && brands.indexOf(c.brand) === -1) brands.push(c.brand); });
    brands.sort(function (a, b) { return a.localeCompare(b, 'fr'); });
    box.innerHTML = brands.map(function (b) {
      var icon = brandIconSrc(b);
      return '<li class="fc__filter-item"><label class="fc__filter-label">' +
        '<input type="checkbox" class="fc__brand-checkbox" value="' + b.replace(/"/g, '&quot;') + '"' + (checked[b] ? ' checked' : '') + '>' +
        (icon ? '<img class="fc__brand-logo" src="' + icon + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
        '<span>' + b + '</span></label></li>';
    }).join('');
    box.querySelectorAll('.fc__brand-checkbox').forEach(function (cb) { cb.addEventListener('change', applyFilters); });
  }

  // Map a Supabase category label → the catKey used by the sidebar filters.
  function catKeyOf(category, fallbackKey) {
    var s = String(category || '').toLowerCase();
    if (s.indexOf('économ') === 0 || s.indexOf('econom') === 0 || s.indexOf('اقتصاد') !== -1) return 'Economy';
    if (s.indexOf('suv') !== -1 || s.indexOf('رباعي') !== -1) return 'SUV';
    if (s.indexOf('luxe') !== -1 || s.indexOf('luxury') !== -1 || s.indexOf('فاخر') !== -1) return 'Luxury';
    if (s.indexOf('sport') !== -1 || s.indexOf('رياضي') !== -1) return 'Sport';
    if (s.indexOf('confort') !== -1 || s.indexOf('berline') !== -1 || s.indexOf('sedan') !== -1 || s.indexOf('سيدان') !== -1) return 'Sedan';
    return fallbackKey || 'Sedan';
  }

  // Build a multilingual category object for a car that has no static metadata.
  function catObjFor(catKey, raw) {
    var keyMap = { Economy: 'fleet.economy', Sedan: 'fleet.sedan', SUV: 'fleet.suv', Luxury: 'fleet.luxury', Sport: 'fleet.sport' };
    var k = keyMap[catKey];
    function lbl(lang) {
      if (k && typeof translations !== 'undefined' && translations[lang] && translations[lang][k]) {
        return translations[lang][k];
      }
      return raw || catKey;
    }
    return { ar: lbl('ar'), fr: lbl('fr'), en: lbl('en') };
  }

  const STATUS_KEY = {
    available:   'fleet.status.available',
    rented:      'fleet.status.rented',
    maintenance: 'fleet.status.maintenance',
  };
  const STATUS_COLOR = {
    available:   { bg: 'rgba(22,163,74,.92)' },
    rented:      { bg: 'rgba(217,119,6,.92)' },
    maintenance: { bg: 'rgba(107,114,128,.92)' },
  };

  // Normalize a Supabase car (full shape) → the display shape the cards use.
  function fromDb(db) {
    var meta = (db.ref_id != null && META_BY_REF[db.ref_id]) || null;
    var catKey = catKeyOf(db.category, meta ? meta.catKey : null);
    var name = meta ? meta.name : { ar: db.name, fr: db.name, en: db.name };
    var cat  = meta ? meta.cat  : catObjFor(catKey, db.category);
    return {
      id: db.id,                                   // Supabase UUID → detail link
      name: name,
      cat: cat,
      catKey: catKey,
      brand: meta ? meta.brand : brandOf(db.name),
      price: String(db.price_per_day),
      doors: meta ? meta.doors : 4,
      passengers: meta ? meta.passengers : 5,
      img: db.photo_url || (meta ? meta.img : fallbackImg),
      status: db.status || 'available',
    };
  }

  // Normalize a static fallback entry → the display shape.
  function fromFallback(c) {
    return {
      id: c.id, name: c.name, cat: c.cat, catKey: c.catKey, brand: c.brand,
      price: c.price, doors: c.doors, passengers: c.passengers, img: c.img,
      status: 'available',
    };
  }

  const DOOR_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="1" width="14" height="18" rx="2" stroke="#616161" stroke-width="1.5" fill="none"/><circle cx="14" cy="10" r="1.5" fill="#616161"/></svg>`;
  const PASS_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6" r="3.5" stroke="#616161" stroke-width="1.5" fill="none"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#616161" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;
  const ARROW_ICON = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 13.5L13.5 2.5M13.5 2.5H6M13.5 2.5V10" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const grid       = document.getElementById('fcGrid');
  const pagination = document.getElementById('fcPagination');
  const searchInput = document.getElementById('fcSearch');
  const clearBtn   = document.getElementById('fcClearBtn');
  const checkboxes = document.querySelectorAll('.fc__checkbox');
  const brandBoxes = document.querySelectorAll('.fc__brand-checkbox');

  let cars = FALLBACK_CARS.map(fromFallback);   // populated from Supabase on load
  let filtered = cars.slice();
  let currentPage = 1;

  function getLang() {
    return (typeof currentLang !== 'undefined') ? currentLang : 'ar';
  }

  function getTranslation(key) {
    const lang = getLang();
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return null;
  }

  function getChecked() {
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
  }

  // Pastille sur le bouton « Marques » : nombre de marques cochées.
  function updateBrandsCount(n) {
    var el = document.getElementById('fcBrandsCount');
    if (!el) return;
    el.textContent = n;
    el.hidden = n === 0;
  }

  function getCheckedBrands() {
    return Array.from(document.querySelectorAll('.fc__brand-checkbox')).filter(cb => cb.checked).map(cb => cb.value);
  }

  // Vitrine : sans filtre, on alterne les catégories pour que la première page
  // montre un peu de tout (dont du haut de gamme) et pas 12 citadines d'affilée.
  const SHOWCASE_ORDER = ['Luxury', 'SUV', 'Sedan', 'Sport', 'Economy'];
  function showcase(list) {
    var groups = {};
    list.forEach(function (car) {
      var k = car.catKey || 'Sedan';
      (groups[k] = groups[k] || []).push(car);
    });
    var keys = SHOWCASE_ORDER.filter(function (k) { return groups[k] && groups[k].length; })
      .concat(Object.keys(groups).filter(function (k) { return SHOWCASE_ORDER.indexOf(k) === -1; }));
    var out = [], added = true;
    while (added) {
      added = false;
      keys.forEach(function (k) {
        var car = groups[k].shift();
        if (car) { out.push(car); added = true; }
      });
    }
    return out;
  }

  function applyFilters() {
    const checked  = getChecked();
    const brands   = getCheckedBrands();
    updateBrandsCount(brands.length);
    const query    = searchInput.value.trim().toLowerCase();
    const lang = getLang();
    filtered = cars.filter(car => {
      const matchCat   = checked.length === 0 || checked.includes(car.catKey);
      const matchBrand = brands.length === 0 || brands.includes(car.brand);
      const carName = (car.name[lang] || car.name.en).toLowerCase();
      const matchQuery = query === '' || carName.includes(query);
      return matchCat && matchBrand && matchQuery;
    });
    // l'ordre vitrine ne s'applique que sans filtre ni recherche
    if (checked.length === 0 && brands.length === 0 && query === '') {
      filtered = showcase(filtered);
    }
    currentPage = 1;
    render();
  }

  function statusBadge(status) {
    var label = getTranslation(STATUS_KEY[status]) ||
                (STATUS_KEY[status] ? status : '');
    var color = (STATUS_COLOR[status] || STATUS_COLOR.available).bg;
    if (!label) return '';
    return `<span class="fc__status-badge" style="position:absolute;top:12px;` +
      `inset-inline-start:12px;background:${color};color:#fff;font-size:12px;` +
      `font-weight:700;padding:5px 11px;border-radius:999px;letter-spacing:.2px;` +
      `box-shadow:0 2px 8px rgba(0,0,0,.18);z-index:2;">${label}</span>`;
  }

  function buildCard(car) {
    const lang = getLang();
    const carName = car.name[lang] || car.name.en;
    const carCat  = car.cat[lang]  || car.cat.en;
    const doorsLabel = getTranslation('fleet.doors') || 'Doors';
    const passLabel  = getTranslation('fleet.pass')  || 'Passengers';
    const perDay     = getTranslation('fleet.perday') || '/ day';
    const detailsLabel = getTranslation('fleet.details') || getTranslation('fleet.reserve') || 'View details';

    const card = document.createElement('article');
    card.className = 'fc__card';
    card.dataset.price = car.price;
    card.dataset.category = car.catKey;
    card.innerHTML = `
      <div class="fc__card-img-wrap" style="position:relative">
        ${statusBadge(car.status)}
        <img class="fc__card-img" src="${car.img}" alt="${carName}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}'">
      </div>
      <div class="fc__card-body">
        <div class="fc__card-meta">
          <span class="fc__card-badge">${carCat}</span>
          <h3 class="fc__card-name">${carName}</h3>
        </div>
        <div class="fc__card-specs">
          <div class="fc__spec">
            <span class="fc__spec-icon">${DOOR_ICON}</span>
            <span class="fc__spec-label">${doorsLabel}</span>
            <span class="fc__spec-val">${car.doors}</span>
          </div>
          <div class="fc__spec">
            <span class="fc__spec-icon">${PASS_ICON}</span>
            <span class="fc__spec-label">${passLabel}</span>
            <span class="fc__spec-val">${car.passengers}</span>
          </div>
        </div>
        <div class="fc__card-footer">
          <div class="fc__card-price">${priceHTML(car.price, perDay)}</div>
        </div>
        <button class="fc__reserve-btn" aria-label="${detailsLabel} ${car.name.en}">
          ${ARROW_ICON}<span>${detailsLabel}</span>
        </button>
      </div>`;

    // Entire card navigates to detail page (id is the Supabase car id when live)
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      window.location.href = 'car-detail.html?id=' + encodeURIComponent(car.id);
    });
    return card;
  }

  function buildPagination(totalPages) {
    pagination.innerHTML = '';
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = 'fc__page-btn' + (i === currentPage ? ' fc__page-btn--active' : '');
      btn.textContent = i;
      btn.setAttribute('aria-label', 'Page ' + i);
      btn.addEventListener('click', () => { currentPage = i; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      pagination.appendChild(btn);
    }
  }

  // ── Loading skeleton ───────────────────────────────────────────────────
  function renderSkeleton() {
    pagination.innerHTML = '';
    var cells = '';
    for (var i = 0; i < CARS_PER_PAGE; i++) {
      cells +=
        '<article class="fc__card fc__card--skeleton" aria-hidden="true">' +
          '<div class="fc__sk fc__sk-img"></div>' +
          '<div class="fc__card-body">' +
            '<div class="fc__sk fc__sk-line fc__sk-line--sm"></div>' +
            '<div class="fc__sk fc__sk-line fc__sk-line--lg"></div>' +
            '<div class="fc__sk fc__sk-line"></div>' +
            '<div class="fc__sk fc__sk-btn"></div>' +
          '</div>' +
        '</article>';
    }
    grid.innerHTML = cells;
  }

  function render() {
    grid.innerHTML = '';

    const totalPages = Math.max(1, Math.ceil(filtered.length / CARS_PER_PAGE));
    const start = (currentPage - 1) * CARS_PER_PAGE;
    const slice = filtered.slice(start, start + CARS_PER_PAGE);
    // Total filtré (toutes pages) : lu par le compteur « N résultats » de mobile.js.
    grid.dataset.total = filtered.length;

    if (slice.length === 0) {
      grid.innerHTML = cars.length
        ? '<p class="fc__empty" data-i18n="fleet.noMatch">Aucune voiture ne correspond à votre recherche.</p>'
        : '<p class="fc__empty">Notre flotte est en cours de mise à jour. Contactez-nous sur WhatsApp pour connaître les véhicules disponibles.</p>';
    } else {
      slice.forEach(car => grid.appendChild(buildCard(car)));
    }

    buildPagination(totalPages);

    requestAnimationFrame(() => {
      grid.querySelectorAll('.fc__card').forEach((card, i) => {
        card.style.animationDelay = (i * 50) + 'ms';
        card.classList.add('fc__card--in');
      });
    });
  }

  window.renderFleetPage = function () {
    applyFilters();
  };

  // ── Live data load ─────────────────────────────────────────────────────
  async function loadCars() {
    renderSkeleton();
    try {
      if (!window.BooklyDB || typeof window.BooklyDB.getCars !== 'function') {
        throw new Error('BooklyDB unavailable');
      }
      var rows = await window.BooklyDB.getCars(window.BESTORE_AGENCY_ID);
      // An empty result is a real answer (no car published yet), not a failure:
      // showing the old static demo fleet would advertise cars the agency
      // doesn't rent. Only a load error falls back to the static list.
      cars = (rows || []).map(fromDb);
    } catch (e) {
      // Never fall back to the old demo list: it would advertise cars the
      // agency does not rent. An outage shows the 'fleet being updated' note.
      console.warn('[AYM] fleet: Supabase load failed.', e);
      cars = [];
    }
    renderBrandFilters(cars);
    applyFilters();
  }

  checkboxes.forEach(cb => cb.addEventListener('change', applyFilters));
  brandBoxes.forEach(cb => cb.addEventListener('change', applyFilters));   // static markup, replaced after load
  searchInput.addEventListener('input', applyFilters);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      checkboxes.forEach(cb => { cb.checked = false; });
      document.querySelectorAll('.fc__brand-checkbox').forEach(cb => { cb.checked = false; });
      searchInput.value = '';
      applyFilters();
    });
  }

  // Menu déroulant des marques (ordinateur) : se referme au clic à
  // l'extérieur ou avec Échap. Dans la feuille mobile il reste ouvert.
  var brandsDd = document.getElementById('fcBrandsDd');
  if (brandsDd) {
    document.addEventListener('click', function (e) {
      if (brandsDd.open && !brandsDd.contains(e.target) && !window.matchMedia('(max-width: 768px)').matches) {
        brandsDd.open = false;
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && brandsDd.open && !window.matchMedia('(max-width: 768px)').matches) {
        brandsDd.open = false;
      }
    });
  }

  // fleet.js is loaded before bookly-data.js in fleet.html, so wait until the
  // data layer (window.BooklyDB) has been defined before the first fetch.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCars);
  } else {
    loadCars();
  }
})();
