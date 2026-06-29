/**
 * car-images.js
 * Maps each car to its 3 gallery photos (hero / front / side), sourced from:
 *   - assets/images/34/          → hero / splash (front 3/4)
 *   - assets/images/cars/        → front view
 *   - assets/images/side view/   → side profile
 *
 * Loaded BEFORE car-detail.js. Exposes:
 *   - window.CAR_IMAGES            the raw mapping (keyed by slug)
 *   - window.getCarImages(car)    resolves a car (by ref_id, then name) → {hero, front, side}
 *
 * `ref` matches the Supabase cars.ref_id so lookup works regardless of the
 * URL using a Supabase UUID or a numeric ref.
 */
(function (global) {
  'use strict';

  var CAR_IMAGES = {
    'toyota-yaris': {
      ref: 14,
      hero:  'assets/images/34/yaris.webp',
      front: 'assets/images/cars/toyota-yaris.webp',
      side:  'assets/images/side view/yaris.webp'
    },
    'renault-clio': {
      ref: 4,
      hero:  'assets/images/34/clio 5.webp',
      front: 'assets/images/cars/clio5.webp',
      side:  'assets/images/side view/clio 5.webp'
    },
    'dacia-sandero': {
      ref: 2,
      hero:  'assets/images/34/sandero.webp',
      front: 'assets/images/cars/sandero.webp',
      side:  'assets/images/side view/sandero.webp'
    },
    'peugeot-208': {
      ref: 5,
      hero:  'assets/images/34/208.webp',
      front: 'assets/images/cars/p208.webp',
      side:  'assets/images/side view/208.webp'
    },
    'skoda-octavia': {
      ref: 12,
      hero:  'assets/images/34/skoda octavia.webp',
      front: 'assets/images/cars/skoda-octavia.webp',
      side:  'assets/images/side view/skoda octavia.webp'
    },
    'volkswagen-troc': {
      ref: 7,
      hero:  'assets/images/34/troc.webp',
      front: 'assets/images/cars/troc.webp',
      side:  'assets/images/side view/troc.webp'
    },
    'hyundai-i20': {
      ref: 11,
      hero:  'assets/images/34/i20.webp',
      front: 'assets/images/cars/i20.webp',
      side:  'assets/images/side view/i20.webp'
    },
    'kia-sportage': {
      ref: 15,
      hero:  'assets/images/34/kia sportage.webp',
      front: 'assets/images/cars/kia-sportage.webp',
      side:  'assets/images/side view/kia sportage.webp'
    }
  };

  // Build a name → slug index (English names) for a secondary lookup.
  var NAME_TO_SLUG = {
    'toyota yaris':     'toyota-yaris',
    'renault clio':     'renault-clio',
    'dacia sandero':    'dacia-sandero',
    'peugeot 208':      'peugeot-208',
    'skoda octavia':    'skoda-octavia',
    'volkswagen t-roc': 'volkswagen-troc',
    'vw t-roc':         'volkswagen-troc',
    'hyundai i20':      'hyundai-i20',
    'kia sportage':     'kia-sportage'
  };

  // Build a ref_id → entry index for the primary lookup.
  var REF_INDEX = {};
  Object.keys(CAR_IMAGES).forEach(function (slug) {
    var e = CAR_IMAGES[slug];
    if (e.ref != null) REF_INDEX[String(e.ref)] = e;
  });

  /**
   * Resolve a car's gallery photos. Tries ref_id first (stable across DB & static
   * data), then the car's English name. Returns null when no mapping exists so the
   * caller can fall back to the single Supabase photo_url.
   */
  function getCarImages(car) {
    if (!car) return null;
    if (car.ref_id != null && REF_INDEX[String(car.ref_id)]) {
      return REF_INDEX[String(car.ref_id)];
    }
    // Numeric `id` may also carry a ref in static fallbacks.
    if (car.id != null && REF_INDEX[String(car.id)]) {
      return REF_INDEX[String(car.id)];
    }
    var name = (car.name || '').trim().toLowerCase();
    if (name && NAME_TO_SLUG[name] && CAR_IMAGES[NAME_TO_SLUG[name]]) {
      return CAR_IMAGES[NAME_TO_SLUG[name]];
    }
    return null;
  }

  global.CAR_IMAGES = CAR_IMAGES;
  global.getCarImages = getCarImages;
})(window);
