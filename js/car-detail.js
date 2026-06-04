(function () {
  'use strict';

  const cars = [
    { id:1, name:'Dacia Logan', nameAr:'داسيا لوغان', nameFr:'Dacia Logan',
      cat:'Economy', catAr:'اقتصادية', catFr:'Économique',
      price:350, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/logan.png',
      desc: {
        en: 'The Dacia Logan is a reliable and spacious sedan perfect for both city trips and longer journeys around Morocco. Comfortable for 5 passengers with generous boot space.',
        fr: 'La Dacia Logan est une berline fiable et spacieuse, idéale pour les trajets urbains et les voyages autour du Maroc. Confortable pour 5 passagers.',
        ar: 'سيارة داسيا لوغان موثوقة وواسعة، مثالية للتنقل في المدينة والرحلات الطويلة حول المغرب. مريحة لـ5 ركاب مع مساحة تخزين ممتازة.'
      }
    },
    { id:2, name:'Dacia Sandero', nameAr:'داسيا سانديرو', nameFr:'Dacia Sandero',
      cat:'Economy', catAr:'اقتصادية', catFr:'Économique',
      price:320, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/sandero.png',
      desc: {
        en: 'The Dacia Sandero is our most popular economy choice. Compact, fuel-efficient and easy to park around Tangier, perfect for solo travelers and couples.',
        fr: 'La Dacia Sandero est notre choix économique le plus populaire. Compacte, économique en carburant et facile à garer à Tanger.',
        ar: 'داسيا سانديرو هي الخيار الاقتصادي الأكثر شعبية لدينا. مدمجة وموفرة للوقود وسهلة الركن في طنجة.'
      }
    },
    { id:3, name:'Hyundai i10', nameAr:'هيونداي i10', nameFr:'Hyundai i10',
      cat:'Economy', catAr:'اقتصادية', catFr:'Économique',
      price:280, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/i10.png',
      desc: {
        en: 'The Hyundai i10 is our most affordable option. Small, nimble and perfect for navigating the streets of Tangier. Great for solo travelers on a budget.',
        fr: 'La Hyundai i10 est notre option la plus abordable, petite et parfaite pour naviguer dans les rues de Tanger.',
        ar: 'هيونداي i10 هي خيارنا الأكثر تكلفة. صغيرة ومثالية للتنقل في شوارع طنجة.'
      }
    },
    { id:4, name:'Renault Clio', nameAr:'رينو كليو', nameFr:'Renault Clio',
      cat:'Sedan', catAr:'سيدان', catFr:'Berline',
      price:420, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/clio.png',
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
      img:'assets/images/cars/208.png',
      desc: {
        en: 'The Peugeot 208 is a premium compact with automatic transmission, offering a smooth and comfortable driving experience across Tangier and beyond.',
        fr: 'La Peugeot 208 est une compacte premium avec boîte automatique, offrant une conduite douce et confortable.',
        ar: 'بيجو 208 سيارة مدمجة راقية بناقل حركة أوتوماتيكي توفر تجربة قيادة سلسة ومريحة.'
      }
    },
    { id:6, name:'Volkswagen Golf', nameAr:'فولكسواغن غولف', nameFr:'Volkswagen Golf',
      cat:'Sedan', catAr:'سيدان', catFr:'Berline',
      price:550, doors:4, passengers:5, transmission:'Automatic',
      transmissionAr:'أوتوماتيك', transmissionFr:'Automatique',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/golf.png',
      desc: {
        en: 'The Volkswagen Golf is a premium sedan with excellent comfort and performance. Ideal for longer journeys and business travel in Morocco.',
        fr: 'La Volkswagen Golf offre confort et performance premium, idéale pour les longs trajets au Maroc.',
        ar: 'فولكسواغن غولف سيدان راقية توفر راحة وأداء ممتازين، مثالية للرحلات الطويلة في المغرب.'
      }
    },
    { id:7, name:'Dacia Duster', nameAr:'داسيا داستر', nameFr:'Dacia Duster',
      cat:'SUV', catAr:'دفع رباعي', catFr:'SUV',
      price:600, doors:4, passengers:5, transmission:'Manual',
      transmissionAr:'يدوي', transmissionFr:'Manuelle',
      fuel:'Diesel', fuelAr:'ديزل', fuelFr:'Diesel',
      img:'assets/images/cars/duster.png',
      desc: {
        en: 'The Dacia Duster is a rugged SUV perfect for exploring Morocco\'s diverse landscapes. Equally at home on city streets and mountain roads.',
        fr: 'Le Dacia Duster est un SUV robuste parfait pour explorer les paysages variés du Maroc.',
        ar: 'داسيا داستر سيارة SUV قوية مثالية لاستكشاف تضاريس المغرب المتنوعة.'
      }
    },
    { id:8, name:'Toyota RAV4', nameAr:'تويوتا راف4', nameFr:'Toyota RAV4',
      cat:'SUV', catAr:'دفع رباعي', catFr:'SUV',
      price:780, doors:4, passengers:5, transmission:'Automatic',
      transmissionAr:'أوتوماتيك', transmissionFr:'Automatique',
      fuel:'Hybrid', fuelAr:'هجين', fuelFr:'Hybride',
      img:'assets/images/cars/rav4.png',
      desc: {
        en: 'The Toyota RAV4 Hybrid is our premium SUV option. Spacious, powerful and fuel-efficient — perfect for families and longer road trips across Morocco.',
        fr: 'Le Toyota RAV4 Hybride est notre SUV premium, spacieux et puissant pour les familles et longs trajets.',
        ar: 'تويوتا راف4 هجين هو خيار SUV الفاخر لدينا، واسع وقوي لرحلات العائلة عبر المغرب.'
      }
    },
    { id:9, name:'Volkswagen Golf 8R', nameAr:'فولكسواغن غولف 8R', nameFr:'Volkswagen Golf 8R',
      cat:'Sedan', catAr:'سيدان', catFr:'Berline',
      price:550, doors:4, passengers:5, transmission:'Automatic',
      transmissionAr:'أوتوماتيك', transmissionFr:'Automatique',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/GOLF8R.png',
      desc: {
        en: 'The Volkswagen Golf 8R is a sporty and refined hatchback with automatic transmission. Combining dynamic performance with everyday comfort — ideal for those who love driving.',
        fr: 'La Volkswagen Golf 8R est une sportive raffinée avec boîte automatique, alliant performance et confort au quotidien.',
        ar: 'فولكسواغن غولف 8R هاتشباك رياضية راقية بناقل حركة أوتوماتيكي، تجمع بين الأداء الديناميكي والراحة اليومية.'
      }
    },
    { id:10, name:'Cupra Formentor', nameAr:'كوبرا فورمنتور', nameFr:'Cupra Formentor',
      cat:'SUV', catAr:'دفع رباعي', catFr:'SUV',
      price:650, doors:4, passengers:5, transmission:'Automatic',
      transmissionAr:'أوتوماتيك', transmissionFr:'Automatique',
      fuel:'Petrol', fuelAr:'بنزين', fuelFr:'Essence',
      img:'assets/images/cars/cupra-formentor.png',
      desc: {
        en: 'The Cupra Formentor is a bold and stylish SUV with a sporty character. Powerful automatic transmission and a premium interior make it perfect for those seeking excitement on Moroccan roads.',
        fr: 'Le Cupra Formentor est un SUV audacieux et stylé à caractère sportif. Boîte automatique puissante et intérieur premium pour une conduite dynamique.',
        ar: 'كوبرا فورمنتور SUV جريئة وأنيقة ذات طابع رياضي. ناقل حركة أوتوماتيكي قوي وتصميم داخلي فاخر لمن يبحث عن الإثارة على الطرق المغربية.'
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
    window.location.href = 'fleet.html';
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
    document.title = c.name + ' — Bestore Car';

    // WhatsApp button
    var pickup = sessionStorage.getItem('pickup_date') || '';
    var ret    = sessionStorage.getItem('return_date') || '';
    var msg = pickup && ret
      ? 'Hello Bestore Car! I want to book the ' + displayName + ' from ' + pickup + ' to ' + ret + '. Please confirm.'
      : 'Hello Bestore Car! I am interested in the ' + displayName + '.';
    document.getElementById('whatsapp-book').href =
      'https://wa.me/212661661230?text=' + encodeURIComponent(msg);

    // Similar cars
    renderSimilarCars(c, lang);
  }

  // Render similar cars
  function renderSimilarCars(currentCar, lang) {
    var similar = cars.filter(function(c) {
      return c.id !== currentCar.id && c.cat === currentCar.cat;
    }).slice(0, 3);

    if (similar.length < 3) {
      var others = cars.filter(function(c) {
        return c.id !== currentCar.id && c.cat !== currentCar.cat;
      }).slice(0, 3 - similar.length);
      similar = similar.concat(others);
    }

    var container = document.getElementById('similar-cars-grid');
    var fallback = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800';

    container.innerHTML = similar.map(function(c) {
      var n = lang === 'ar' ? c.nameAr : lang === 'fr' ? c.nameFr : c.name;
      var b = lang === 'ar' ? c.catAr  : lang === 'fr' ? c.catFr  : c.cat;
      return '<div class="car-card" onclick="window.location=\'car-detail.html?id=' + c.id + '\'">' +
        '<div class="car-image-wrap">' +
          '<img src="' + c.img + '" alt="' + n + '" loading="lazy" onerror="this.src=\'' + fallback + '\'">' +
          '<span class="car-badge">' + b + '</span>' +
        '</div>' +
        '<div class="car-card-body">' +
          '<h3 class="car-name">' + n + '</h3>' +
          '<div class="car-specs">' +
            '<span>🚪 ' + c.doors + '</span>' +
            '<span>👥 ' + c.passengers + '</span>' +
          '</div>' +
          '<div class="car-price-row">' +
            '<span class="price-amount">' + c.price + ' MAD</span>' +
            '<span class="price-label">/ day</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // Re-populate when language changes (i18n.js fires renderFleetPage — we hook similarly)
  var _origApply = window.applyLanguage;
  document.addEventListener('DOMContentLoaded', function() {
    if (car) {
      populatePage(car);
      initThumbs();
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
