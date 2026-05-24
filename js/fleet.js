(function () {
  'use strict';

  const CARS_PER_PAGE = 6;
  const fallbackImg = 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600';

  const cars = [
    {
      name: { ar: 'داسيا سانديرو', fr: 'Dacia Sandero', en: 'Dacia Sandero' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', price: '320', doors: 4, passengers: 5,
      img: 'assets/images/cars/sandero.png'
    },
    {
      name: { ar: 'رونو كليو 5', fr: 'Renault Clio 5', en: 'Renault Clio 5' },
      cat: { ar: 'سيدان', fr: 'Berline', en: 'Sedan' },
      catKey: 'Sedan', price: '420', doors: 4, passengers: 5,
      img: 'assets/images/cars/clio5.png'
    },
    {
      name: { ar: 'بيجو 208', fr: 'Peugeot 208', en: 'Peugeot 208' },
      cat: { ar: 'سيدان', fr: 'Berline', en: 'Sedan' },
      catKey: 'Sedan', price: '450', doors: 4, passengers: 5,
      img: 'assets/images/cars/p208.png'
    },
    {
      name: { ar: 'فولكسفاغن تي روك', fr: 'Volkswagen T-Roc', en: 'Volkswagen T-Roc' },
      cat: { ar: 'دفع رباعي', fr: 'SUV', en: 'SUV' },
      catKey: 'SUV', price: '550', doors: 4, passengers: 5,
      img: 'assets/images/cars/troc.png'
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

  function applyFilters() {
    const checked  = getChecked();
    const query    = searchInput.value.trim().toLowerCase();
    const lang = getLang();
    filtered = cars.filter(car => {
      const matchCat   = checked.length === 0 || checked.includes(car.catKey);
      const carName = (car.name[lang] || car.name.en).toLowerCase();
      const matchQuery = query === '' || carName.includes(query);
      return matchCat && matchQuery;
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
          <button class="fc__book-btn" aria-label="Book ${car.name.en} on WhatsApp">${ARROW_ICON}</button>
        </div>
      </div>`;

    card.querySelector('.fc__book-btn').addEventListener('click', function () {
      var pickup = sessionStorage.getItem('pickup_date') || '';
      var ret = sessionStorage.getItem('return_date') || '';
      var carName = car.name.en;
      var msg = pickup && ret
        ? 'Hello Bestore Car! I want to book the ' + carName + ' from ' + pickup + ' to ' + ret + '.'
        : 'Hello Bestore Car! I want to book the ' + carName + '.';
      window.open('https://wa.me/212661661230?text=' + encodeURIComponent(msg));
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

    if (currentPage < totalPages) {
      const next = document.createElement('button');
      next.className = 'fc__page-btn fc__page-btn--arrow';
      next.innerHTML = ARROW_ICON;
      next.setAttribute('aria-label', 'Next page');
      next.addEventListener('click', () => { currentPage = Math.min(currentPage + 1, totalPages); render(); });
      pagination.appendChild(next);
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
  searchInput.addEventListener('input', applyFilters);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      checkboxes.forEach(cb => { cb.checked = false; });
      searchInput.value = '';
      applyFilters();
    });
  }

  render();
})();
