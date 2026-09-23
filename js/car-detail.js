(function () {
  'use strict';

  const cars = [
    { id:2, name:'Dacia Sandero', nameAr:'داسيا سانديرو', nameFr:'Dacia Sandero',
      cat:'Economy', catAr:'اقتصادية', catFr:'Économique',
      price:320, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/sandero.webp',
      desc: {
        en: 'The Dacia Sandero is our most popular economy choice. Compact, fuel-efficient and easy to park around Tangier, perfect for solo travelers and couples.',
        fr: 'La Dacia Sandero est notre choix économique le plus populaire. Compacte, économique en carburant et facile à garer à Tanger.',
        ar: 'داسيا سانديرو هي الخيار الاقتصادي الأكثر شعبية لدينا. مدمجة وموفرة للوقود وسهلة الركن في طنجة.'
      }
    },
    { id:4, name:'Renault Clio 5', nameAr:'رونو كليو 5', nameFr:'Renault Clio 5',
      cat:'Sedan', catAr:'سيدان', catFr:'Berline',
      price:420, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/clio.webp',
      desc: {
        en: 'The Renault Clio combines style with practicality. A comfortable sedan ideal for business trips and family outings around Tangier and northern Morocco.',
        fr: 'La Renault Clio combine style et praticité, idéale pour les voyages d\'affaires et les sorties en famille autour de Tanger.',
        ar: 'رينو كليو تجمع بين الأناقة والعملية، مثالية لرحلات العمل والعائلة حول طنجة.'
      }
    },
    { id:5, name:'Peugeot 208', nameAr:'بيجو 208', nameFr:'Peugeot 208',
      cat:'Sedan', catAr:'سيدان', catFr:'Berline',
      price:450, doors:4, passengers:5, transmission:'Automatic',
      transmissionAr:'أوتوماتيك', transmissionFr:'Automatique',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/208.webp',
      desc: {
        en: 'The Peugeot 208 is a premium compact with automatic transmission, offering a smooth and comfortable driving experience across Tangier and beyond.',
        fr: 'La Peugeot 208 est une compacte premium avec boîte automatique, offrant une conduite douce et confortable.',
        ar: 'بيجو 208 سيارة مدمجة راقية بناقل حركة أوتوماتيكي توفر تجربة قيادة سلسة ومريحة.'
      }
    },
    // ref 7 = Volkswagen T-Roc, comme dans la base, fleet.js et car-images.js.
    // (Cette entrée était un doublon du Duster, qui a déjà la ref 16.)
    { id:7, name:'Volkswagen T-Roc', nameAr:'فولكس واجن T-Roc', nameFr:'Volkswagen T-Roc',
      cat:'SUV', catAr:'دفع رباعي', catFr:'SUV',
      price:600, doors:4, passengers:5, transmission:'-',
      transmissionAr:'-', transmissionFr:'-',
      fuel:'-', fuelAr:'-', fuelFr:'-',
      img:'assets/images/cars/troc.webp',
      desc: {
        en: 'The Volkswagen T-Roc is a compact SUV with a raised driving position, a comfortable ride and a practical boot. At ease in the city and on longer trips.',
        fr: 'Le Volkswagen T-Roc est un SUV compact avec une position de conduite surélevée, un confort de route agréable et un coffre pratique. À l\'aise en ville comme sur les longs trajets.',
        ar: 'فولكس واجن T-Roc سيارة SUV مدمجة بوضعية قيادة مرتفعة وراحة في القيادة وصندوق عملي، مناسبة للمدينة وللرحلات الطويلة.'
      }
    },
    { id:11, name:'Hyundai i20', nameAr:'هيونداي i20', nameFr:'Hyundai i20',
      cat:'Economy', catAr:'اقتصادية', catFr:'Économique',
      price:300, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/i20.webp',
      desc: {
        en: 'The Hyundai i20 is a modern and efficient hatchback with a roomy cabin and a refined ride. A smart economy choice for getting around Tangier in comfort.',
        fr: 'La Hyundai i20 est une compacte moderne et efficace, avec un habitacle spacieux et une conduite raffinée. Un choix économique malin pour Tanger.',
        ar: 'هيونداي i20 هاتشباك عصرية وموفرة بمقصورة واسعة وقيادة سلسة. خيار اقتصادي ذكي للتنقل في طنجة براحة.'
      }
    },
    { id:12, name:'Skoda Octavia', nameAr:'سكودا أوكتافيا', nameFr:'Skoda Octavia',
      cat:'Sedan', catAr:'سيدان', catFr:'Berline',
      price:500, doors:4, passengers:5, transmission:'Automatic',
      transmissionAr:'أوتوماتيك', transmissionFr:'Automatique',
      fuel:'Diesel', fuelAr:'ديزل', fuelFr:'Diesel',
      img:'assets/images/cars/skoda-octavia.webp',
      desc: {
        en: 'The Skoda Octavia is a spacious and elegant sedan with one of the largest boots in its class. Comfortable, economical and ideal for business travel and family road trips across Morocco.',
        fr: 'La Skoda Octavia est une berline spacieuse et élégante, dotée d\'un des plus grands coffres de sa catégorie. Confortable et économique pour les voyages d\'affaires et en famille.',
        ar: 'سكودا أوكتافيا سيدان أنيقة وواسعة بأحد أكبر صناديق الأمتعة في فئتها. مريحة واقتصادية ومثالية لرحلات العمل والعائلة عبر المغرب.'
      }
    },
    { id:13, name:'Seat Ibiza', nameAr:'سيات إيبيزا', nameFr:'Seat Ibiza',
      cat:'Economy', catAr:'اقتصادية', catFr:'Économique',
      price:350, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/seat-ibiza.webp',
      desc: {
        en: 'The Seat Ibiza is a fun and sporty hatchback that\'s easy to drive and economical to run. A stylish pick for city driving and weekend getaways around northern Morocco.',
        fr: 'La Seat Ibiza est une compacte sportive et amusante, facile à conduire et économique. Un choix stylé pour la ville et les escapades dans le nord du Maroc.',
        ar: 'سيات إيبيزا هاتشباك رياضية وممتعة، سهلة القيادة وموفرة للوقود. خيار أنيق للتنقل في المدينة ورحلات نهاية الأسبوع في شمال المغرب.'
      }
    },
    { id:14, name:'Toyota Yaris', nameAr:'تويوتا يارِس', nameFr:'Toyota Yaris',
      cat:'Economy', catAr:'اقتصادية', catFr:'Économique',
      price:330, doors:4, passengers:5, transmission:'Automatic',
      transmissionAr:'أوتوماتيك', transmissionFr:'Automatique',
      fuel:'Hybrid', fuelAr:'هجين', fuelFr:'Hybride',
      img:'assets/images/cars/toyota-yaris.webp',
      desc: {
        en: 'The Toyota Yaris Hybrid combines outstanding fuel economy with Toyota reliability. Compact, quiet and effortless to drive, perfect for budget-conscious travelers in the city.',
        fr: 'La Toyota Yaris Hybride allie une consommation exemplaire à la fiabilité Toyota. Compacte, silencieuse et facile à conduire, idéale en ville.',
        ar: 'تويوتا يارِس هجين تجمع بين اقتصاد ممتاز في الوقود وموثوقية تويوتا. مدمجة وهادئة وسهلة القيادة، مثالية للمسافرين الموفرين في المدينة.'
      }
    },
    { id:15, name:'Kia Sportage', nameAr:'كيا سبورتاج', nameFr:'Kia Sportage',
      cat:'SUV', catAr:'دفع رباعي', catFr:'SUV',
      price:700, doors:4, passengers:5, transmission:'Automatic',
      transmissionAr:'أوتوماتيك', transmissionFr:'Automatique',
      fuel:'Diesel', fuelAr:'ديزل', fuelFr:'Diesel',
      img:'assets/images/cars/kia-sportage.webp',
      desc: {
        en: 'The Kia Sportage is a modern and well-equipped SUV with a bold design and a spacious, high-tech interior. Comfortable and capable for family trips across Morocco\'s varied terrain.',
        fr: 'Le Kia Sportage est un SUV moderne et bien équipé au design audacieux et à l\'intérieur spacieux et high-tech. Confortable pour les voyages en famille au Maroc.',
        ar: 'كيا سبورتاج SUV عصرية ومجهزة جيدًا بتصميم جريء ومقصورة واسعة وعالية التقنية. مريحة وقادرة لرحلات العائلة عبر تضاريس المغرب المتنوعة.'
      }
    },
    { id:16, name:'Dacia Duster', nameAr:'داسيا داستر', nameFr:'Dacia Duster',
      cat:'SUV', catAr:'دفع رباعي', catFr:'SUV',
      price:600, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Diesel', fuelAr:'ديزل', fuelFr:'Diesel',
      img:'assets/images/cars/duster.webp',
      desc: {
        en: 'The Dacia Duster is a rugged and dependable SUV that handles everything from city streets to mountain roads. Great value and plenty of space for exploring Morocco\'s diverse landscapes.',
        fr: 'Le Dacia Duster est un SUV robuste et fiable, à l\'aise aussi bien en ville que sur les routes de montagne. Excellent rapport qualité-prix pour explorer le Maroc.',
        ar: 'داسيا داستر SUV قوية وموثوقة تتعامل مع كل شيء من شوارع المدينة إلى طرق الجبال. قيمة ممتازة ومساحة وفيرة لاستكشاف تضاريس المغرب المتنوعة.'
      }
    }
  ];

  // Resolve lang using the same key as i18n.js
  function getLang() {
    return localStorage.getItem('bsc_lang') || 'ar';
  }

  function getT(key) {
    var lang = getLang();
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return null;
  }

  // Static metadata lookup by ref_id (= the numeric id in the array above).
  function metaByRef(ref) {
    return cars.find(function (c) { return String(c.id) === String(ref); }) || null;
  }

  // Merge a Supabase car (full shape) with its static metadata so the rich
  // page (description / transmission / fuel / multilingual names) keeps working
  // while price, photo, category, status and features come live from Supabase.
  function mergeCar(db) {
    var meta = (db.ref_id != null && metaByRef(db.ref_id)) || null;
    var base = meta ? Object.assign({}, meta) : {
      id: db.id, name: db.name, nameAr: db.name, nameFr: db.name,
      cat: db.category || '', catAr: db.category || '', catFr: db.category || '',
      doors: 4, passengers: 5,
      transmission: '-', transmissionAr: '-', transmissionFr: '-',
      fuel: '-', fuelAr: '-', fuelFr: '-',
      img: db.photo_url,
      desc: { en: db.name, fr: db.name, ar: db.name }
    };
    base.id = db.id;                                  // identity = Supabase id
    base.ref_id = (db.ref_id != null) ? db.ref_id : null; // stable ref for lead save
    base.price = db.price_per_day;                    // live price
    if (db.photo_url) base.img = db.photo_url;        // live photo
    base.status = db.status || 'available';
    base.features = Array.isArray(db.features) ? db.features : [];
    // the fleet list stores the gearbox (and hybrid) as features
    var feats = base.features.map(function (f) { return String(f).toLowerCase(); });
    if (feats.indexOf('automatique') !== -1) {
      base.transmission = 'Automatic'; base.transmissionFr = 'Automatique'; base.transmissionAr = 'أوتوماتيك';
    } else if (feats.indexOf('manuelle') !== -1) {
      base.transmission = 'Manual'; base.transmissionFr = 'Manuelle'; base.transmissionAr = 'يدوي';
    }
    if (feats.indexOf('hybride') !== -1) {
      base.fuel = 'Hybrid'; base.fuelFr = 'Hybride'; base.fuelAr = 'هجين';
    }
    return base;
  }

  // Get car ID from URL (Supabase UUID, or a numeric ref_id from similar cars).
  var params = new URLSearchParams(window.location.search);
  var rawId  = params.get('id');
  var car    = null;   // resolved asynchronously from Supabase before render

  function isNumericId(v) { return /^\d+$/.test(String(v || '')); }

  // Resolve the car to display. Never guesses: with no id, or an id that
  // matches no car, it returns null and the page sends the visitor back to
  // the fleet. (It used to show the first car, which hid broken links behind
  // the wrong vehicle.)
  async function resolveCar() {
    if (!rawId) return null;
    var agencyId = window.BESTORE_AGENCY_ID;
    var db = null;
    try {
      if (window.BooklyDB && typeof window.BooklyDB.getCarById === 'function') {
        if (rawId && !isNumericId(rawId)) {
          db = await window.BooklyDB.getCarById(rawId);
        } else if (rawId && typeof window.BooklyDB.getCars === 'function') {
          // numeric id → treat as ref_id (or local id) within the full list
          var all = await window.BooklyDB.getCars(agencyId);
          db = (all || []).filter(function (c) {
            return String(c.ref_id) === String(rawId) || String(c.id) === String(rawId);
          })[0] || null;
        }
      }
    } catch (e) {
      console.warn('[AYM] car-detail: Supabase load failed, using static fallback.', e);
    }
    if (db) return mergeCar(db);
    // Supabase unreachable: static data, but only for the car that was asked for.
    return metaByRef(rawId) || null;
  }

  // Thumbnail click handler - swaps the main image with a smooth fade and
  // moves the active (highlighted) state to the clicked thumbnail.
  function initThumbs() {
    var mainImg = document.getElementById('gallery-main-img');
    document.querySelectorAll('.thumb').forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        if (thumb.classList.contains('active')) return;
        var next = thumb.getAttribute('src');
        mainImg.classList.add('is-fading');
        var swap = function () {
          mainImg.removeEventListener('transitionend', swap);
          mainImg.src = next;
          mainImg.alt = thumb.alt || '';
          mainImg.classList.remove('is-fading');
        };
        mainImg.addEventListener('transitionend', swap);
        // Fallback in case transitionend doesn't fire.
        setTimeout(swap, 320);

        document.querySelectorAll('.thumb').forEach(function(t) { t.classList.remove('active'); });
        thumb.classList.add('active');
      });
    });
  }

  // Live status badge - injected next to the category badge in the car header.
  var STATUS_KEY = {
    available:   'fleet.status.available',
    rented:      'fleet.status.rented',
    maintenance: 'fleet.status.maintenance'
  };
  var STATUS_BG = {
    available:   'rgba(22,163,74,.95)',
    rented:      'rgba(217,119,6,.95)',
    maintenance: 'rgba(107,114,128,.95)'
  };
  function renderStatus(c, lang) {
    var header = document.querySelector('.cd-car-header');
    if (!header) return;
    var el = document.getElementById('car-detail-status');
    if (!el) {
      el = document.createElement('span');
      el.id = 'car-detail-status';
      el.style.cssText = 'display:inline-block;margin-inline-start:10px;color:#fff;' +
        'font-size:12px;font-weight:700;padding:4px 11px;border-radius:999px;vertical-align:middle';
      var badge = document.getElementById('car-detail-badge');
      if (badge && badge.parentNode) badge.parentNode.insertBefore(el, badge.nextSibling);
      else header.appendChild(el);
    }
    var status = c.status || 'available';
    el.textContent = getT(STATUS_KEY[status]) || status;
    el.style.background = STATUS_BG[status] || STATUS_BG.available;
  }

  // Live features list (from car.features JSON) - rendered as chips under the
  // car header. Hidden when the car has no features.
  function renderFeatures(c) {
    var header = document.querySelector('.cd-car-header');
    if (!header) return;
    var wrap = document.getElementById('car-detail-features');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'car-detail-features';
      wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:14px';
      header.insertAdjacentElement('afterend', wrap);
    }
    var feats = Array.isArray(c.features) ? c.features : [];
    if (!feats.length) { wrap.style.display = 'none'; wrap.innerHTML = ''; return; }
    wrap.style.display = 'flex';
    wrap.innerHTML = feats.map(function (f) {
      return '<span style="background:#f1f3f6;color:#2b2b2b;font-size:13px;font-weight:600;' +
        'padding:6px 13px;border-radius:999px;border:1px solid #e3e6ea">' +
        String(f).replace(/</g, '&lt;') + '</span>';
    }).join('');
  }

  // Populate page with car data
  function populatePage(c) {
    var lang = getLang();

    var displayName = lang === 'ar' ? c.nameAr : lang === 'fr' ? c.nameFr : c.name;
    var displayCat  = lang === 'ar' ? c.catAr  : lang === 'fr' ? c.catFr  : c.cat;
    currentDisplayName = displayName;

    // Sidebar price
    var priceEl = document.getElementById('car-price');
    if (Number(c.price) > 0) {
      priceEl.textContent = c.price + ' MAD';
    } else {
      var lang0 = localStorage.getItem('bsc_lang') || 'fr';
      priceEl.textContent = { fr: 'Sur demande', en: 'On request', ar: 'عند الطلب' }[lang0] || 'Sur demande';
      priceEl.classList.add('cd-price-amount--ask');
    }

    // Specs
    document.getElementById('spec-passengers').textContent  = c.passengers;
    document.getElementById('spec-doors').textContent       = c.doors;
    document.getElementById('spec-transmission').textContent =
      lang === 'ar' ? c.transmissionAr : lang === 'fr' ? c.transmissionFr : c.transmission;
    document.getElementById('spec-fuel').textContent =
      lang === 'ar' ? c.fuelAr : lang === 'fr' ? c.fuelFr : c.fuel;

    // Gallery - 3 photos (front / rear / side) from CAR_IMAGES, with the live
    // Supabase photo_url as fallback when no mapping exists for this car.
    var fallback = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800';
    var imgs = (typeof getCarImages === 'function') ? getCarImages(c) : null;
    var photos = imgs
      ? [imgs.front, imgs.hero, imgs.side]   // 3/4 avant d'abord, comme la vignette des cartes
      : [c.img, c.img, c.img];

    var mainImg = document.getElementById('gallery-main-img');
    mainImg.classList.remove('is-fading');
    mainImg.src = photos[0] || c.img || fallback;
    mainImg.alt = displayName;

    ['thumb-0', 'thumb-1', 'thumb-2'].forEach(function(id, i) {
      var el = document.getElementById(id);
      el.src = photos[i] || c.img || fallback;
      el.alt = displayName;
      el.classList.toggle('active', i === 0);
      el.onerror = function() { el.onerror = null; el.src = fallback; };
    });

    // Car name + badge
    document.getElementById('car-detail-name').textContent  = displayName;
    document.getElementById('car-detail-badge').textContent = displayCat;

    // Live status badge + features (from Supabase)
    renderStatus(c, lang);
    renderFeatures(c);

    // Description
    document.getElementById('car-description').textContent = c.desc[lang] || c.desc.en;

    // Page title
    document.title = c.name + ' | AYM Rent Car';

    // WhatsApp button
    var pickup = sessionStorage.getItem('pickup_date') || '';
    var ret    = sessionStorage.getItem('return_date') || '';
    var msg = pickup && ret
      ? 'Hello AYM Rent Car! I want to book the ' + displayName + ' from ' + pickup + ' to ' + ret + '. Please confirm.'
      : 'Hello AYM Rent Car! I am interested in the ' + displayName + '.';
    document.getElementById('whatsapp-book').href =
      'https://wa.me/212613616145?text=' + encodeURIComponent(msg);

    // Similar cars
    renderSimilarCars(c, lang);
  }

  // Render similar cars
  var TARGET_SIMILAR = 8;
  function renderSimilarCars(currentCar, lang) {
    // Same category first, then fill with other cars so the carousel has enough cards
    var similar = cars.filter(function(c) {
      return c.id !== currentCar.id && c.cat === currentCar.cat;
    });
    if (similar.length < TARGET_SIMILAR) {
      var others = cars.filter(function(c) {
        return c.id !== currentCar.id && c.cat !== currentCar.cat;
      }).slice(0, TARGET_SIMILAR - similar.length);
      similar = similar.concat(others);
    }
    similar = similar.slice(0, TARGET_SIMILAR);

    var container = document.getElementById('similarTrack');
    var fallback = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800';

    // Same icons / labels as the homepage fleet cards
    var doorIcon = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="3.75" y="1.25" width="12.5" height="17.5" rx="1.5" stroke="#616161" stroke-width="1.4"/><circle cx="14" cy="10" r="1.1" fill="#616161"/></svg>';
    var paxIcon  = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="8" cy="5.5" r="3" stroke="#616161" stroke-width="1.4"/><path d="M2 18c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#616161" stroke-width="1.4" stroke-linecap="round"/><circle cx="15.5" cy="6.5" r="2" stroke="#616161" stroke-width="1.2"/><path d="M13.5 17.5c0-2.1 1.2-3.9 3-4.7" stroke="#616161" stroke-width="1.2" stroke-linecap="round"/></svg>';
    var arrowSvg = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 13.5L13.5 2.5M13.5 2.5H6M13.5 2.5V10" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var t = (typeof translations !== 'undefined') ? translations[lang] : null;
    var doorsLabel   = t ? t['fleet.doors']   : 'Doors';
    var passLabel    = t ? t['fleet.pass']    : 'Passengers';
    var perDay       = t ? t['fleet.perday']  : '/ day';
    var reserveLabel = t ? t['fleet.reserve'] : 'Réserver';

    container.innerHTML = similar.map(function(c) {
      var n = lang === 'ar' ? c.nameAr : lang === 'fr' ? c.nameFr : c.name;
      var b = lang === 'ar' ? c.catAr  : lang === 'fr' ? c.catFr  : c.cat;
      return '<div class="fleet__card" onclick="window.location=\'car-detail.html?id=' + c.id + '\'">' +
        '<div class="fleet__card-img-wrap">' +
          '<img class="fleet__card-img" src="' + c.img + '" alt="' + n + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + fallback + '\'">' +
          '<span class="fleet__card-badge">' + b + '</span>' +
        '</div>' +
        '<div class="fleet__card-body">' +
          '<h3 class="fleet__card-name">' + n + '</h3>' +
          '<div class="fleet__card-specs">' +
            '<div class="fleet__spec-row">' +
              '<span class="fleet__spec-label">' + doorIcon + doorsLabel + '</span>' +
              '<span class="fleet__spec-val">' + c.doors + '</span>' +
            '</div>' +
            '<div class="fleet__spec-row">' +
              '<span class="fleet__spec-label">' + paxIcon + passLabel + '</span>' +
              '<span class="fleet__spec-val">' + c.passengers + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="fleet__card-footer">' +
            '<div class="fleet__card-price">' +
              (Number(c.price) > 0
                ? '<span class="fleet__price-amount">' + c.price + ' MAD</span>' +
                  '<span class="fleet__price-unit">' + perDay + '</span>'
                : '<span class="fleet__price-unit">' +
                  ({ fr: 'Prix sur demande', en: 'Price on request', ar: 'السعر عند الطلب' }[localStorage.getItem('bsc_lang') || 'fr'] || 'Prix sur demande') +
                  '</span>') +
            '</div>' +
          '</div>' +
          '<button type="button" class="fleet__reserve-btn cd-sim-reserve" data-ref="' + c.id + '" aria-label="Book ' + c.name + '">' +
            arrowSvg + '<span>' + reserveLabel + '</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    // Similar-car "Reserve" buttons open the same smart booking modal,
    // pre-filled with that car (no navigation to a new page).
    container.querySelectorAll('.cd-sim-reserve').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var ref = btn.getAttribute('data-ref');
        var picked = cars.find(function (x) { return String(x.id) === String(ref); });
        if (picked && typeof window.openCarBooking === 'function') {
          window.openCarBooking(carBookingData(picked));
        }
      });
    });

    refreshSimilarCarousel();
  }

  // ── Similar-cars carousel (same behaviour as the homepage fleet carousel) ──
  var GAP    = 30;
  var STEP   = 0;       // card width + gap, measured (cards are sized by CSS)
  var simCurrent = 0;
  var simMax = 0;
  var simShift = 0;     // px: the last card ends flush with the right edge

  function simCalcMax() {
    var track = document.getElementById('similarTrack');
    if (!track) return;
    var wrapW = track.parentElement.clientWidth;
    var card = track.querySelector('.fleet__card');
    STEP = (card ? card.getBoundingClientRect().width : 327.5) + GAP;
    simShift = Math.max(0, track.scrollWidth - wrapW);
    simMax = Math.ceil(simShift / STEP - 0.01);
  }

  function simGoTo(idx) {
    var track = document.getElementById('similarTrack');
    var prevBtn = document.getElementById('similarPrev');
    var nextBtn = document.getElementById('similarNext');
    if (!track) return;
    var rtl = document.documentElement.dir === 'rtl';
    simCurrent = Math.max(0, Math.min(idx, simMax));
    var shift = Math.min(simCurrent * STEP, simShift);
    track.style.transform = rtl
      ? 'translateX(' + shift + 'px)'
      : 'translateX(-' + shift + 'px)';
    if (prevBtn) prevBtn.disabled = simCurrent === 0;
    if (nextBtn) nextBtn.disabled = simCurrent >= simMax;
  }

  function refreshSimilarCarousel() {
    simCalcMax();
    simGoTo(Math.min(simCurrent, simMax));
  }

  function initSimilarCarousel() {
    var prevBtn = document.getElementById('similarPrev');
    var nextBtn = document.getElementById('similarNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { simGoTo(simCurrent - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { simGoTo(simCurrent + 1); });
    window.addEventListener('resize', function () {
      simCalcMax();
      simGoTo(Math.min(simCurrent, simMax));
    }, { passive: true });
  }

  // ── Booking form modal ──
  var currentDisplayName = '';

  // Build the carData payload consumed by the smart booking modal.
  function carBookingData(c) {
    return {
      name: { ar: c.nameAr, fr: c.nameFr, en: c.name },
      cat:  { ar: c.catAr,  fr: c.catFr,  en: c.cat },
      price: c.price,
      img:   c.img,
      carId: c.id && !/^\d+$/.test(String(c.id)) ? c.id : null,  // Supabase UUID only
      ref:   (c.ref_id != null) ? c.ref_id : (/^\d+$/.test(String(c.id)) ? c.id : null)
    };
  }

  function initModal() {
    var openBtn = document.getElementById('whatsapp-book');
    if (openBtn) openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (car && typeof window.openCarBooking === 'function') {
        window.openCarBooking(carBookingData(car));
      }
    });
  }

  // Re-populate when language changes (i18n.js fires renderFleetPage - we hook similarly)
  document.addEventListener('DOMContentLoaded', function() {
    // Resolve the car from Supabase (with static + first-car fallbacks), then render.
    resolveCar().then(function (resolved) {
      car = resolved;
      // replace(): the broken URL leaves the history, so "Back" doesn't loop here.
      if (!car) { window.location.replace('fleet.html'); return; }
      populatePage(car);
      initThumbs();
      initSimilarCarousel();
      initModal();
    });

    // Re-populate dynamic content when language changes
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('.lang-switcher__btn');
      if (btn && car) {
        // Give i18n.js time to update currentLang
        setTimeout(function() { populatePage(car); }, 10);
      }
    });
  });

})();
