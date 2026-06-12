(function () {
  'use strict';

  const CARS_PER_PAGE = 6;
  const fallbackImg = 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600';

  const cars = [
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

  const DOOR_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="1" width="14" height="18" rx="2" stroke="#616161" stroke-width="1.5" fill="none"/><circle cx="14" cy="10" r="1.5" fill="#616161"/></svg>`;
  const PASS_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6" r="3.5" stroke="#616161" stroke-width="1.5" fill="none"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#616161" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;
  const ARROW_ICON = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 13.5L13.5 2.5M13.5 2.5H6M13.5 2.5V10" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const grid       = document.getElementById('fcGrid');
  const pagination = document.getElementById('fcPagination');
  const searchInput = document.getElementById('fcSearch');
  const clearBtn   = document.getElementById('fcClearBtn');
  const checkboxes = document.querySelectorAll('.fc__checkbox');
  const brandBoxes = document.querySelectorAll('.fc__brand-checkbox');

  let filtered = [...cars];
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

  function getCheckedBrands() {
    return Array.from(brandBoxes).filter(cb => cb.checked).map(cb => cb.value);
  }

  function applyFilters() {
    const checked  = getChecked();
    const brands   = getCheckedBrands();
    const query    = searchInput.value.trim().toLowerCase();
    const lang = getLang();
    filtered = cars.filter(car => {
      const matchCat   = checked.length === 0 || checked.includes(car.catKey);
      const matchBrand = brands.length === 0 || brands.includes(car.brand);
      const carName = (car.name[lang] || car.name.en).toLowerCase();
      const matchQuery = query === '' || carName.includes(query);
      return matchCat && matchBrand && matchQuery;
    });
    currentPage = 1;
    render();
  }

  function buildCard(car) {
    const lang = getLang();
    const carName = car.name[lang] || car.name.en;
    const carCat  = car.cat[lang]  || car.cat.en;
    const doorsLabel = getTranslation('fleet.doors') || 'Doors';
    const passLabel  = getTranslation('fleet.pass')  || 'Passengers';
    const perDay     = getTranslation('fleet.perday') || '/ day';
    const reserveLabel = getTranslation('fleet.reserve') || 'Réserver';

    const card = document.createElement('article');
    card.className = 'fc__card';
    card.dataset.price = car.price;
    card.dataset.category = car.catKey;
    card.innerHTML = `
      <div class="fc__card-img-wrap">
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
          <div class="fc__card-price">
            <span class="fc__price-num">${car.price} MAD</span>
            <span class="fc__price-per">${perDay}</span>
          </div>
        </div>
        <button class="fc__reserve-btn" aria-label="Reserve ${car.name.en}">
          ${ARROW_ICON}<span>${reserveLabel}</span>
        </button>
      </div>`;

    // Entire card navigates to detail page
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      window.location.href = 'wijdabir-car-detail.html?id=' + car.id;
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
      btn.addEventListener('click', () => { currentPage = i; render(); });
      pagination.appendChild(btn);
    }
  }

  function render() {
    grid.innerHTML = '';

    const totalPages = Math.max(1, Math.ceil(filtered.length / CARS_PER_PAGE));
    const start = (currentPage - 1) * CARS_PER_PAGE;
    const slice = filtered.slice(start, start + CARS_PER_PAGE);

    if (slice.length === 0) {
      grid.innerHTML = '<p class="fc__empty">No cars match your search.</p>';
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

  checkboxes.forEach(cb => cb.addEventListener('change', applyFilters));
  brandBoxes.forEach(cb => cb.addEventListener('change', applyFilters));
  searchInput.addEventListener('input', applyFilters);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      checkboxes.forEach(cb => { cb.checked = false; });
      brandBoxes.forEach(cb => { cb.checked = false; });
      searchInput.value = '';
      applyFilters();
    });
  }

  render();
})();
