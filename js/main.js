// Navbar: add shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
}, { passive: true });

// Mobile drawer menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn   = document.getElementById('mobile-menu-close');
  if (!hamburger || !mobileMenu) return;

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Mark active page link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
});

// Hero: GSAP fade-in on load
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    gsap.from('#heroLabel',   { opacity: 0, y: 18, duration: 0.6, delay: 0.15, ease: 'power2.out' });
    gsap.from('#heroHeading', { opacity: 0, y: 32, duration: 0.8, delay: 0.35, ease: 'power2.out' });
    gsap.from('#heroSubtext', { opacity: 0, y: 20, duration: 0.6, delay: 0.65, ease: 'power2.out' });
    gsap.from('.hero__ctas',  { opacity: 0, y: 20, duration: 0.6, delay: 0.85, ease: 'power2.out' });
    gsap.from('.hero__booking', { opacity: 0, y: 28, duration: 0.7, delay: 1.05, ease: 'power2.out' });
  }
});

// Register ScrollTrigger (used by the section reveals below)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
});

// Fleet carousel
document.addEventListener('DOMContentLoaded', () => {
  const cars = [
    {
      id: 2,
      name: { ar: 'داسيا سانديرو', fr: 'Dacia Sandero', en: 'Dacia Sandero' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', price: '320', doors: 4, passengers: 5,
      img: 'assets/images/cars/sandero.webp'
    },
    {
      id: 4,
      name: { ar: 'رونو كليو 5', fr: 'Renault Clio 5', en: 'Renault Clio 5' },
      cat: { ar: 'سيدان', fr: 'Berline', en: 'Sedan' },
      catKey: 'Sedan', price: '420', doors: 4, passengers: 5,
      img: 'assets/images/cars/clio5.webp'
    },
    {
      id: 7,
      name: { ar: 'فولكسفاغن تي روك', fr: 'Volkswagen T-Roc', en: 'Volkswagen T-Roc' },
      cat: { ar: 'دفع رباعي', fr: 'SUV', en: 'SUV' },
      catKey: 'SUV', price: '550', doors: 4, passengers: 5,
      img: 'assets/images/cars/troc.webp'
    },
    {
      id: 5,
      name: { ar: 'بيجو 208', fr: 'Peugeot 208', en: 'Peugeot 208' },
      cat: { ar: 'سيدان', fr: 'Berline', en: 'Sedan' },
      catKey: 'Sedan', price: '450', doors: 4, passengers: 5,
      img: 'assets/images/cars/p208.webp'
    },
    {
      id: 11,
      name: { ar: 'هيونداي i20', fr: 'Hyundai i20', en: 'Hyundai i20' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', price: '300', doors: 4, passengers: 5,
      img: 'assets/images/cars/i20.webp'
    },
    {
      id: 12,
      name: { ar: 'سكودا أوكتافيا', fr: 'Skoda Octavia', en: 'Skoda Octavia' },
      cat: { ar: 'سيدان', fr: 'Berline', en: 'Sedan' },
      catKey: 'Sedan', price: '500', doors: 4, passengers: 5,
      img: 'assets/images/cars/skoda-octavia.webp'
    },
    {
      id: 13,
      name: { ar: 'سيات إيبيزا', fr: 'Seat Ibiza', en: 'Seat Ibiza' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', price: '350', doors: 4, passengers: 5,
      img: 'assets/images/cars/seat-ibiza.webp'
    },
    {
      id: 14,
      name: { ar: 'تويوتا يارِس', fr: 'Toyota Yaris', en: 'Toyota Yaris' },
      cat: { ar: 'اقتصادية', fr: 'Économique', en: 'Economy' },
      catKey: 'Economy', price: '330', doors: 4, passengers: 5,
      img: 'assets/images/cars/toyota-yaris.webp'
    },
    {
      id: 15,
      name: { ar: 'كيا سبورتاج', fr: 'Kia Sportage', en: 'Kia Sportage' },
      cat: { ar: 'دفع رباعي', fr: 'SUV', en: 'SUV' },
      catKey: 'SUV', price: '700', doors: 4, passengers: 5,
      img: 'assets/images/cars/kia-sportage.webp'
    },
    {
      id: 16,
      name: { ar: 'داسيا داستر', fr: 'Dacia Duster', en: 'Dacia Duster' },
      cat: { ar: 'دفع رباعي', fr: 'SUV', en: 'SUV' },
      catKey: 'SUV', price: '600', doors: 4, passengers: 5,
      img: 'assets/images/cars/duster.webp'
    },
  ];

  const GAP    = 30;
  let   STEP   = 0;   // card width + gap, measured: cards are sized by CSS to fit whole

  const track   = document.getElementById('fleetTrack');
  const prevBtn = document.getElementById('fleetPrev');
  const nextBtn = document.getElementById('fleetNext');
  if (!track || !prevBtn || !nextBtn) return;

  const doorIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="3.75" y="1.25" width="12.5" height="17.5" rx="1.5" stroke="#616161" stroke-width="1.4"/><circle cx="14" cy="10" r="1.1" fill="#616161"/></svg>`;
  const paxIcon  = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="8" cy="5.5" r="3" stroke="#616161" stroke-width="1.4"/><path d="M2 18c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#616161" stroke-width="1.4" stroke-linecap="round"/><circle cx="15.5" cy="6.5" r="2" stroke="#616161" stroke-width="1.2"/><path d="M13.5 17.5c0-2.1 1.2-3.9 3-4.7" stroke="#616161" stroke-width="1.2" stroke-linecap="round"/></svg>`;
  const arrowSvg = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 13.5L13.5 2.5M13.5 2.5H6M13.5 2.5V10" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const fallbackImg = 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600';

  function renderFleetCards() {
    track.innerHTML = '';
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ar';
    const t = (typeof translations !== 'undefined') ? translations[lang] : null;
    const doorsLabel = t ? t['fleet.doors'] : 'Doors';
    const passLabel  = t ? t['fleet.pass']  : 'Passengers';
    const perDay     = t ? t['fleet.perday'] : '/ day';
    const detailsLabel = t ? (t['fleet.details'] || t['fleet.reserve']) : 'View details';

    cars.forEach(car => {
      const carName = car.name[lang] || car.name.en;
      const carCat  = car.cat[lang]  || car.cat.en;
      const detailUrl = `car-detail.html?id=${encodeURIComponent(car.id)}`;
      const card = document.createElement('div');
      card.className = 'fleet__card';
      card.dataset.price = car.price;
      card.dataset.category = car.catKey;
      card.innerHTML = `
        <div class="fleet__card-img-wrap">
          <img class="fleet__card-img" src="${car.img}" alt="${carName}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}'">
          <span class="fleet__card-badge">${carCat}</span>
        </div>
        <div class="fleet__card-body">
          <h3 class="fleet__card-name">${carName}</h3>
          <div class="fleet__card-specs">
            <div class="fleet__spec-row">
              <span class="fleet__spec-label">${doorIcon}${doorsLabel}</span>
              <span class="fleet__spec-val">${car.doors}</span>
            </div>
            <div class="fleet__spec-row">
              <span class="fleet__spec-label">${paxIcon}${passLabel}</span>
              <span class="fleet__spec-val">${car.passengers}</span>
            </div>
          </div>
          <div class="fleet__card-footer">
            <div class="fleet__card-price">
              <span class="fleet__price-amount">${car.price} MAD</span>
              <span class="fleet__price-unit">${perDay}</span>
            </div>
          </div>
          <a href="${detailUrl}" class="fleet__reserve-btn" aria-label="View details for ${car.name.en}">
            ${arrowSvg}<span>${detailsLabel}</span>
          </a>
        </div>`;

      // Entire card navigates to the single car page
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (e) {
        // Let the WhatsApp reserve button keep its own behavior
        if (e.target.closest('.fleet__reserve-btn')) return;
        window.location.href = 'car-detail.html?id=' + car.id;
      });

      track.appendChild(card);
    });

    calcMax();
    goTo(0);
  }

  window.renderFleetCards = renderFleetCards;

  let current  = 0;
  let maxIndex = 0;

  function calcMax() {
    const wrapW  = track.parentElement.clientWidth;
    const card   = track.querySelector('.fleet__card');
    STEP = (card ? card.getBoundingClientRect().width : 327.5) + GAP;
    const visible = Math.max(1, Math.floor((wrapW + GAP) / STEP));
    maxIndex = Math.max(0, cars.length - visible);
  }

  function goTo(idx) {
    const rtl = document.documentElement.dir === 'rtl';
    current = Math.max(0, Math.min(idx, maxIndex));
    track.style.transform = rtl
      ? `translateX(${current * STEP}px)`
      : `translateX(-${current * STEP}px)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex;
  }

  renderFleetCards();

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  window.addEventListener('resize', () => { calcMax(); goTo(Math.min(current, maxIndex)); }, { passive: true });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('#fleetHeader > *', {
      opacity: 0, y: 30, duration: 0.7, ease: 'power2.out', stagger: 0.13,
      scrollTrigger: { trigger: '.fleet', start: 'top 78%', once: true },
    });
    gsap.from('.fleet__track', {
      opacity: 0, y: 40, duration: 0.75, ease: 'power2.out',
      scrollTrigger: { trigger: '.fleet__carousel-wrap', start: 'top 85%', once: true },
    });
  }
});

// How It Works: GSAP ScrollTrigger reveal
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('#hiwLeft > *', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.hiw', start: 'top 78%', once: true },
    });
    gsap.from('#hiwRight', {
      opacity: 0,
      x: 60,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.hiw', start: 'top 78%', once: true },
    });
  }
});

// Testimonials: duplicate each column's cards for a seamless vertical loop,
// then reveal the header with GSAP (matches the other section reveals)
document.addEventListener('DOMContentLoaded', () => {
  // Add a 5-star rating above each review's text (before cloning so both
  // halves of the seamless loop get the stars).
  document.querySelectorAll('.tcard').forEach(card => {
    if (card.querySelector('.tcard__stars')) return;
    const stars = document.createElement('div');
    stars.className = 'tcard__stars';
    stars.setAttribute('aria-label', '5 out of 5 stars');
    stars.textContent = '★★★★★';
    card.insertBefore(stars, card.firstChild);
  });

  document.querySelectorAll('.testimonials__track').forEach(track => {
    // Cloning copies the already-translated text and data-i18n attributes,
    // so language switching still updates both halves of the loop.
    track.innerHTML += track.innerHTML;
  });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('#testimonialsHeader > *', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.testimonials', start: 'top 80%', once: true },
    });
  }
});

// Booking bar: set min dates, validate return >= pickup, send WhatsApp message
document.addEventListener('DOMContentLoaded', () => {
  const btn        = document.getElementById('bookingSubmit');
  const pickupDate = document.getElementById('bk-date');
  const returnDate = document.getElementById('bk-return');
  const returnErr  = document.getElementById('bk-return-error');
  if (!btn || !pickupDate) return;

  const today = new Date().toISOString().split('T')[0];
  pickupDate.min = today;
  if (returnDate) returnDate.min = today;

  pickupDate.addEventListener('change', () => {
    if (returnDate) {
      returnDate.min = pickupDate.value || today;
      if (returnDate.value && returnDate.value < pickupDate.value) {
        returnDate.value = '';
        if (returnErr) returnErr.textContent = '';
      }
    }
  });

  if (returnDate) {
    returnDate.addEventListener('change', () => {
      if (returnErr) {
        if (pickupDate.value && returnDate.value && returnDate.value < pickupDate.value) {
          returnErr.textContent = 'Return date must be after pickup date';
          returnDate.value = '';
        } else {
          returnErr.textContent = '';
        }
      }
    });
  }

  btn.addEventListener('click', () => {
    const phone    = document.getElementById('bk-phone').value.trim()    || '-';
    const location = document.getElementById('bk-location').value.trim() || '-';
    const pickup   = pickupDate.value || '-';
    const rtn      = returnDate ? returnDate.value || '-' : '-';

    if (returnDate && pickupDate.value && returnDate.value && returnDate.value < pickupDate.value) {
      if (returnErr) returnErr.textContent = 'Return date must be after pickup date';
      return;
    }

    const msg =
      `Hello AYM Rent Car! I'd like to book a rental.\n\n` +
      `📞 Phone: ${phone}\n` +
      `📍 Pickup Location: ${location}\n` +
      `📅 Pickup Date: ${pickup}\n` +
      `📅 Return Date: ${rtn}`;

    window.open(
      `https://wa.me/212661661230?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
  });
});

// FAQ: accordion toggle
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--open');
      faqItems.forEach(i => {
        i.classList.remove('faq__item--open');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('faq__item--open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

// Why Choose Us: GSAP staggered ScrollTrigger reveal
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('#wcuHeader > *', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.wcu', start: 'top 78%', once: true },
    });

    gsap.from('#wcuLeft .wcu__feature', {
      opacity: 0,
      x: -40,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '.wcu__grid', start: 'top 80%', once: true },
    });

    gsap.from('#wcuCenter', {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.wcu__grid', start: 'top 80%', once: true },
    });

    gsap.from('#wcuRight .wcu__feature', {
      opacity: 0,
      x: 40,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '.wcu__grid', start: 'top 80%', once: true },
    });
  }
});
