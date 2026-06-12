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
    { id:4, name:'Renault Clio', nameAr:'رينو كليو', nameFr:'Renault Clio',
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
    { id:7, name:'Dacia Duster', nameAr:'داسيا داستر', nameFr:'Dacia Duster',
      cat:'SUV', catAr:'دفع رباعي', catFr:'SUV',
      price:600, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Diesel', fuelAr:'ديزل', fuelFr:'Diesel',
      img:'assets/images/cars/duster.webp',
      desc: {
        en: 'The Dacia Duster is a rugged SUV perfect for exploring Morocco\'s diverse landscapes. Equally at home on city streets and mountain roads.',
        fr: 'Le Dacia Duster est un SUV robuste parfait pour explorer les paysages variés du Maroc.',
        ar: 'داسيا داستر سيارة SUV قوية مثالية لاستكشاف تضاريس المغرب المتنوعة.'
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
        en: 'The Toyota Yaris Hybrid combines outstanding fuel economy with Toyota reliability. Compact, quiet and effortless to drive — perfect for budget-conscious travelers in the city.',
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

  // Get car ID from URL
  var params = new URLSearchParams(window.location.search);
  var carId  = parseInt(params.get('id'), 10);
  var car    = cars.find(function(c) { return c.id === carId; });

  if (!car) {
    window.location.href = 'wijdabir-fleet.html';
  }

  // Thumbnail click handler
  function initThumbs() {
    var mainImg = document.getElementById('gallery-main-img');
    document.querySelectorAll('.thumb').forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        mainImg.src = thumb.src;
        document.querySelectorAll('.thumb').forEach(function(t) { t.classList.remove('active'); });
        thumb.classList.add('active');
      });
    });
  }

  // Populate page with car data
  function populatePage(c) {
    var lang = getLang();

    var displayName = lang === 'ar' ? c.nameAr : lang === 'fr' ? c.nameFr : c.name;
    var displayCat  = lang === 'ar' ? c.catAr  : lang === 'fr' ? c.catFr  : c.cat;
    currentDisplayName = displayName;

    // Hero
    document.getElementById('hero-bg').style.backgroundImage = 'url(' + c.img + ')';
    document.getElementById('hero-car-name').textContent = displayName;
    document.getElementById('breadcrumb-car').textContent = displayName;

    // Sidebar price
    document.getElementById('car-price').textContent = c.price + ' MAD';

    // Specs
    document.getElementById('spec-passengers').textContent  = c.passengers;
    document.getElementById('spec-doors').textContent       = c.doors;
    document.getElementById('spec-transmission').textContent =
      lang === 'ar' ? c.transmissionAr : lang === 'fr' ? c.transmissionFr : c.transmission;
    document.getElementById('spec-fuel').textContent =
      lang === 'ar' ? c.fuelAr : lang === 'fr' ? c.fuelFr : c.fuel;

    // Gallery
    var fallback = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800';
    document.getElementById('gallery-main-img').src = c.img;
    document.getElementById('gallery-main-img').alt = displayName;
    ['thumb-0', 'thumb-1', 'thumb-2'].forEach(function(id) {
      var el = document.getElementById(id);
      el.src = c.img;
      el.alt = displayName;
      el.onerror = function() { el.src = fallback; };
    });

    // Car name + badge
    document.getElementById('car-detail-name').textContent  = displayName;
    document.getElementById('car-detail-badge').textContent = displayCat;

    // Description
    document.getElementById('car-description').textContent = c.desc[lang] || c.desc.en;

    // Page title
    document.title = c.name + ' — Wijdabir Car';

    // WhatsApp button
    var pickup = sessionStorage.getItem('pickup_date') || '';
    var ret    = sessionStorage.getItem('return_date') || '';
    var msg = pickup && ret
      ? 'Hello Wijdabir Car! I want to book the ' + displayName + ' from ' + pickup + ' to ' + ret + '. Please confirm.'
      : 'Hello Wijdabir Car! I am interested in the ' + displayName + '.';
    document.getElementById('whatsapp-book').href =
      'https://wa.me/212667367652?text=' + encodeURIComponent(msg);

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
      var waUrl = 'https://wa.me/212667367652?text=' +
        encodeURIComponent('Hello, I want to book the ' + c.name + '.');
      return '<div class="fleet__card" onclick="window.location=\'wijdabir-car-detail.html?id=' + c.id + '\'">' +
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
              '<span class="fleet__price-amount">' + c.price + ' MAD</span>' +
              '<span class="fleet__price-unit">' + perDay + '</span>' +
            '</div>' +
          '</div>' +
          '<a href="' + waUrl + '" class="fleet__reserve-btn" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" aria-label="Book ' + c.name + ' on WhatsApp">' +
            arrowSvg + '<span>' + reserveLabel + '</span>' +
          '</a>' +
        '</div>' +
      '</div>';
    }).join('');

    refreshSimilarCarousel();
  }

  // ── Similar-cars carousel (same behaviour as the homepage fleet carousel) ──
  var CARD_W = 327.5;
  var GAP    = 30;
  var STEP   = CARD_W + GAP;
  var simCurrent = 0;
  var simMax = 0;

  function simCalcMax() {
    var track = document.getElementById('similarTrack');
    if (!track) return;
    var wrapW = track.parentElement.clientWidth;
    var count = track.children.length;
    var visible = Math.max(1, Math.floor((wrapW + GAP) / STEP));
    simMax = Math.max(0, count - visible);
  }

  function simGoTo(idx) {
    var track = document.getElementById('similarTrack');
    var prevBtn = document.getElementById('similarPrev');
    var nextBtn = document.getElementById('similarNext');
    if (!track) return;
    var rtl = document.documentElement.dir === 'rtl';
    simCurrent = Math.max(0, Math.min(idx, simMax));
    track.style.transform = rtl
      ? 'translateX(' + (simCurrent * STEP) + 'px)'
      : 'translateX(-' + (simCurrent * STEP) + 'px)';
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

  function buildBookingMessage(lang, carName, name, pickup, duration) {
    var d = duration ? duration + (lang === 'ar' ? ' أيام' : lang === 'fr' ? ' jour(s)' : ' day(s)') : '—';
    if (lang === 'ar') {
      return 'مرحباً ويجدابير كار! أود حجز ' + carName + '.\n' +
        '👤 الاسم: ' + (name || '—') + '\n' +
        '📅 تاريخ الاستلام: ' + (pickup || '—') + '\n' +
        '⏱️ المدة: ' + d;
    }
    if (lang === 'fr') {
      return 'Bonjour Wijdabir Car ! Je souhaite réserver la ' + carName + '.\n' +
        '👤 Nom : ' + (name || '—') + '\n' +
        '📅 Date de prise en charge : ' + (pickup || '—') + '\n' +
        '⏱️ Durée : ' + d;
    }
    return 'Hello Wijdabir Car! I would like to book the ' + carName + '.\n' +
      '👤 Name: ' + (name || '—') + '\n' +
      '📅 Pickup date: ' + (pickup || '—') + '\n' +
      '⏱️ Duration: ' + d;
  }

  function openModal() {
    var modal = document.getElementById('bk-modal');
    if (!modal) return;
    document.getElementById('bk-modal-car').textContent = currentDisplayName;
    // Pre-fill pickup with today (or value carried from the homepage search)
    var pickupEl = document.getElementById('bk-pickup');
    var today = new Date().toISOString().split('T')[0];
    pickupEl.min = today;
    pickupEl.value = sessionStorage.getItem('pickup_date') || today;
    document.getElementById('bk-modal-error').textContent = '';
    modal.classList.add('bk-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    var modal = document.getElementById('bk-modal');
    if (!modal) return;
    modal.classList.remove('bk-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModal() {
    var openBtn = document.getElementById('whatsapp-book');
    var closeBtn = document.getElementById('bk-modal-close');
    var overlay = document.getElementById('bk-modal-overlay');
    var submit = document.getElementById('bk-modal-submit');

    if (openBtn) openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    if (submit) submit.addEventListener('click', function () {
      var lang = getLang();
      var name = document.getElementById('bk-name').value.trim();
      var pickup = document.getElementById('bk-pickup').value;
      var duration = document.getElementById('bk-duration').value;
      var errEl = document.getElementById('bk-modal-error');

      var t = (typeof translations !== 'undefined') ? translations[lang] : null;
      if (!name || !pickup || !duration || parseInt(duration, 10) < 1) {
        errEl.textContent = t ? t['detail.form.error'] : 'Please fill in all fields.';
        return;
      }
      errEl.textContent = '';
      var msg = buildBookingMessage(lang, currentDisplayName, name, pickup, duration);
      window.open('https://wa.me/212667367652?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
      closeModal();
    });
  }

  // Re-populate when language changes (i18n.js fires renderFleetPage — we hook similarly)
  document.addEventListener('DOMContentLoaded', function() {
    if (car) {
      populatePage(car);
      initThumbs();
      initSimilarCarousel();
      initModal();
    }

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
