/* js/contract-doc.js
   Rental contract document - shared by dashboard.html (agency) and sign.html
   (client signing link), so both see exactly the same contract.

   window.ContractDoc = { TERMS, number(c), html(c, agency), pdf(el, c), captureSignature(opts), signatureSlot(el, opts) } */
(function () {
  'use strict';

  var TERMS = [
    "Le locataire reconnaît avoir reçu le véhicule dans l'état décrit au présent contrat et s'engage à le restituer dans le même état, à la date, l'heure et au lieu convenus.",
    "Le véhicule ne peut être conduit que par le locataire et, le cas échéant, le deuxième conducteur désigné, titulaires d'un permis de conduire valide. Toute sous-location ou prêt est interdit.",
    "Le véhicule est restitué avec le même niveau de carburant qu'au départ. À défaut, le carburant manquant est facturé au locataire.",
    "Tout retard de restitution non autorisé par l'agence est facturé par journée supplémentaire au tarif journalier du contrat.",
    "Les contraventions, amendes, péages et frais de fourrière survenus pendant la durée de location sont à la charge du locataire.",
    "En cas d'accident, de vol ou de panne, le locataire doit prévenir l'agence immédiatement et établir un constat amiable ou une déclaration auprès des autorités compétentes.",
    "Les dommages non couverts par l'assurance, ainsi que ceux résultant d'une faute, d'une négligence ou d'une conduite sous l'emprise d'alcool ou de stupéfiants, restent à la charge du locataire.",
    "La sortie du territoire marocain est interdite sans l'accord écrit préalable de l'agence.",
    "La caution est restituée après vérification de l'état du véhicule, déduction faite des éventuels frais dus par le locataire.",
    "Le présent contrat est signé électroniquement par les deux parties ; chaque partie reconnaît cette signature comme valant accord sur l'ensemble de ses clauses."
  ];
  var STATUS = { draft: 'Brouillon', signed: 'Signé', closed: 'Clôturé' };
  var PAYMENT = { especes: 'Espèces', carte: 'Carte bancaire', virement: 'Virement', cheque: 'Chèque' };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function dateFR(s) { return s ? parse(s).toLocaleDateString('fr-FR') : '-'; }
  function dateOrBlank(s) { return s ? parse(s).toLocaleDateString('fr-FR') : ''; }
  function dateTimeFR(s) { return s ? new Date(s).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : ''; }
  function money(n) { return Number(n || 0).toLocaleString('fr-FR') + ' MAD'; }
  function orDash(v) { return (v === 0 || v) ? esc(v) : '-'; }

  // Numérotation de la liasse papier : un simple compteur sur 6 chiffres (000214).
  function number(c) {
    return String(c.number || 0).padStart(6, '0');
  }

  // Chemin du cachet de l'agence. Le <img> disparaît tout seul si le
  // fichier n'existe pas encore (onerror), et le nom de la société prend
  // sa place - le contrat reste donc imprimable dans tous les cas.
  var STAMP_SRC = 'assets/images/cachet.png';

  /* Jauge de carburant de la liasse papier : 0 - 1/4 - 1/2 - 3/4 - 0 */
  function gaugeSVG() {
    return '<svg width="118" height="66" viewBox="0 0 118 66" fill="none" aria-hidden="true">' +
      // arc principal, centre (59,58), rayon 38
      '<path d="M21 58 A38 38 0 0 1 97 58" stroke="#1B3FAE" stroke-width="1.6" fill="none"/>' +
      // graduations, tirees vers l'interieur depuis l'arc
      '<path d="M21 58 L29 58"   stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<path d="M32 31 L37 37"   stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<path d="M59 20 L59 28"   stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<path d="M86 31 L81 37"   stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<path d="M97 58 L89 58"   stroke="#1B3FAE" stroke-width="1.2"/>' +
      // libelles, poses a l'exterieur de l'arc
      '<text x="12" y="62"  font-size="8.5" fill="#111" font-weight="700">0</text>' +
      '<text x="20" y="28"  font-size="8.5" fill="#111" font-weight="700">1/4</text>' +
      '<text x="52" y="15"  font-size="8.5" fill="#111" font-weight="700">1/2</text>' +
      '<text x="86" y="28"  font-size="8.5" fill="#111" font-weight="700">3/4</text>' +
      '<text x="100" y="62" font-size="8.5" fill="#111" font-weight="700">0</text>' +
      '</svg>';
  }

  /* Schéma du véhicule vu de dessus, pour cocher les dommages apparents. */
  function damageSVG() {
    return '<svg viewBox="0 0 210 86" fill="none" aria-hidden="true">' +
      '<rect x="6" y="14" width="198" height="58" rx="26" stroke="#1B3FAE" stroke-width="1.6"/>' +
      '<path d="M52 14 L52 72 M150 14 L150 72" stroke="#1B3FAE" stroke-width="1.4"/>' +
      '<rect x="60" y="22" width="36" height="18" rx="4" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<rect x="60" y="46" width="36" height="18" rx="4" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<rect x="104" y="22" width="38" height="18" rx="4" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<rect x="104" y="46" width="38" height="18" rx="4" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<path d="M20 26 A20 20 0 0 0 20 60" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<path d="M190 26 A20 20 0 0 1 190 60" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<circle cx="34" cy="14" r="4" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<circle cx="34" cy="72" r="4" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<circle cx="172" cy="14" r="4" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '<circle cx="172" cy="72" r="4" stroke="#1B3FAE" stroke-width="1.2"/>' +
      '</svg>';
  }

  function html(c, agency) {
    agency = agency || {};

    /* Une ligne « Libellé ....... valeur ». Vide = trait pointillé à remplir. */
    function line(label, value) {
      var v = (value === 0 || value) ? esc(value) : '';
      return '<div class="ct-line"><span class="ct-line__l">' + label + ' :</span>' +
             '<span class="ct-line__v">' + v + '</span></div>';
    }
    /* Deux champs sur la même ligne (ex. « Délivré par … le … »). */
    function line2(l1, v1, l2, v2) {
      function part(l, v) {
        return '<span class="ct-line__l">' + l + ' :</span><span class="ct-line__v">' +
               ((v === 0 || v) ? esc(v) : '') + '</span>';
      }
      return '<div class="ct-line ct-line--split">' + part(l1, v1) + part(l2, v2) + '</div>';
    }
    function box(title, body) {
      return '<div class="ct-box"><div class="ct-box__head">' + title + '</div>' +
             '<div class="ct-box__body">' + body + '</div></div>';
    }
    function signBox(title, img, when) {
      return '<div class="ct-sign"><div class="ct-sign__head">' + title + '</div>' +
        '<div class="ct-sign__area">' + (img ? '<img src="' + esc(img) + '" alt="' + title + '">' : '') + '</div>' +
        (when ? '<div class="ct-sign__meta">Signé le ' + dateTimeFR(when) + '</div>' : '') + '</div>';
    }
    function yn(label, val) {
      var on = String(val == null ? '' : val).toLowerCase();
      return '<div class="ct-opt"><span class="ct-opt__l">' + label + '</span><span class="ct-opt__yn">' +
        '<b class="' + (on === 'oui' ? 'on' : '') + '">oui</b>' +
        '<b class="' + (on === 'non' ? 'on' : '') + '">Non</b></span></div>';
    }

    var days    = c.total_days || 0;
    var balance = Math.max(0, (c.total_price || 0) - (c.amount_paid || 0));
    var name    = agency.name || 'AYM Rent Car';
    var terms   = (c.terms ? c.terms.split('\n') : TERMS).filter(Boolean);
    var fuel    = String(c.fuel_out || '').toLowerCase();

    var h = '';

    /* ── En-tête : raison sociale (sans logo, comme le contrat papier) + numéro ── */
    h += '<div class="ct-top">' +
      '<div class="ct-top__brand">' +
        '<div class="ct-top__names">' +
          '<div class="ct-top__name">' + esc(name) + '</div>' +
          '<div class="ct-top__tag">Location de voiture</div>' +
          '<div class="ct-top__ar">كراء السيارات</div>' +
        '</div>' +
      '</div>' +
      '<div class="ct-top__title"><span class="ct-top__word">Contrat</span>' +
        '<span class="ct-top__no"><small>N°</small>' + esc(number(c)) + '</span></div>' +
      '</div>';

    /* ── Colonne gauche : locataire + conducteurs additionnels ── */
    var locataire =
      line('Nom', c.client_name) +
      line('Prénom', c.client_firstname) +
      line('Nationalité', c.client_nationality) +
      line('Date de naissance', dateOrBlank(c.client_birth_date)) +
      line('Adresse Permanente', c.client_address) +
      '<div class="ct-fill"></div><div class="ct-fill"></div>' +
      line('Téléphone', c.client_phone) +
      line('Permis de conduire', c.licence_no) +
      line2('Délivré par', c.licence_place, 'Le', dateOrBlank(c.licence_date)) +
      line('Passeport n°', c.client_passport) +
      line2('Délivré par', c.passport_place, 'Le', dateOrBlank(c.passport_date)) +
      line('C.I.N n°', c.client_cin) +
      line2('Délivré par', c.cin_place, 'le', dateOrBlank(c.cin_date));

    var conducteurs =
      line('Nom / Prénom', c.driver2_name) +
      line('Permis de conduire', c.driver2_licence) +
      line('C.I.N N°', c.driver2_cin) +
      line('Nom / Prénom', c.driver3_name) +
      line('Permis de conduire', c.driver3_licence) +
      line('C.I.N N°', c.driver3_cin);

    /* ── Colonne droite : véhicule + facturation ── */
    var vehicule =
      line2('Marque', c.car_name, 'Type', c.car_type) +
      line('Immatriculation', c.car_plate) +
      '<div class="ct-fuel">' +
        '<span class="' + (fuel.indexOf('ess') === 0 || fuel.indexOf('sans plomb') > -1 ? 'on' : '') + '">Super sans plomb</span>' +
        '<span class="' + (fuel.indexOf('diesel') > -1 || fuel.indexOf('gasoil') > -1 ? 'on' : '') + '">Gasoile</span>' +
      '</div>' +
      '<div class="ct-visual">' +
        '<div class="ct-gauge"><div class="ct-gauge__cap">Carburant</div>' + gaugeSVG() + '</div>' +
        '<div class="ct-damage"><div class="ct-damage__cap">dommage apparents sur le véhicule</div>' + damageSVG() + '</div>' +
      '</div>' +
      line('Km de départ', c.km_out != null ? c.km_out : '') +
      line('Km de retour', c.km_in != null ? c.km_in : '') +
      '<div class="ct-opts">' + yn('Auto Radio', c.auto_radio) + yn('Roue de secours', c.spare_wheel) + '</div>' +
      line2('Date de Départ', dateOrBlank(c.pickup_date), 'Heure', c.pickup_time) +
      line2('Date de Retour', dateOrBlank(c.return_date), 'Heure', c.return_time) +
      line2('Véhicule rendu le', dateOrBlank(c.closed_at), 'Heure', c.return_actual_time);

    var facturation =
      line('Nombre de Jours', days ? days + ' jour' + (days > 1 ? 's' : '') : '') +
      line('Prix de Location', c.price_per_day ? money(c.price_per_day) + ' / jour' : '') +
      line('Total à Payé', c.total_price != null ? money(c.total_price) : '') +
      line('Le Reste', money(balance)) +
      line('Voiture Rendez le Reste à payer', '');

    h += '<div class="ct-cols">' +
      '<div class="ct-col">' +
        box('Renseignements concernant le 1<sup>er</sup> locataire', locataire) +
        box('2ème et 3ème Conducteur', conducteurs) +
      '</div>' +
      '<div class="ct-col">' +
        box('Caractéristiques du véhicule', vehicule) +
        box('Facturation', facturation) +
      '</div>' +
    '</div>';

    /* ── Acceptation + première signature ── */
    // Un seul cadre, comme sur le contrat papier : texte à gauche, signature à droite.
    var acceptSig = c.client_signature;
    var acceptWhen = c.client_signed_at || (c.client_signature ? c.signed_at : null);
    h += '<div class="ct-accept">' +
      '<div class="ct-accept__txt">Je reconnais avoir lu et accepté les conditions générales ' +
        'de location mentionnées aux 1 et 2 du présent contrat</div>' +
      '<div class="ct-accept__sign">' +
        '<div class="ct-accept__sign-head">Signature du Client</div>' +
        '<div class="ct-accept__sign-area">' +
          (acceptSig ? '<img src="' + esc(acceptSig) + '" alt="Signature du client">' : '') +
        '</div>' +
        (acceptWhen ? '<div class="ct-accept__sign-meta">Signé le ' + dateTimeFR(acceptWhen) + '</div>' : '') +
      '</div>' +
    '</div>';

    /* ── Visa de la direction (cachet) + signature client ── */
    // Le visa porte toujours le cachet ; la signature de la direction vient
    // par-dessus quand elle existe, comme sur un contrat signé à la main.
    var visa = '<div class="ct-sign"><div class="ct-sign__head">Visa de la Direction</div>' +
      '<div class="ct-sign__area ct-visa">' +
        '<img class="ct-visa__stamp" src="' + STAMP_SRC + '" alt="Cachet ' + esc(name) + '" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' +
        '<div class="ct-visa__fallback" style="display:none">' + esc(name) +
          '<small>' + esc(agency.address || '') + '</small></div>' +
        (c.agency_signature
          ? '<img class="ct-visa__sig" src="' + esc(c.agency_signature) + '" alt="Signature de la direction">'
          : '') +
      '</div>' +
      (c.agency_signed_at ? '<div class="ct-sign__meta">Signé le ' + dateTimeFR(c.agency_signed_at) + '</div>' : '') +
      '</div>';

    h += '<div class="ct-sigs">' + visa +
      signBox('Signature du client', c.client_signature,
              c.client_signed_at || (c.client_signature ? c.signed_at : null)) + '</div>';

    /* ── Pied de page légal ── */
    var legal = [
      agency.patente ? 'Patente : ' + esc(agency.patente) : '',
      agency.rc ? 'R.C : ' + esc(agency.rc) : '',
      agency.if_no ? 'I.F : ' + esc(agency.if_no) : '',
      agency.ice ? 'ICE : ' + esc(agency.ice) : ''
    ].filter(Boolean).join(' - ');

    h += '<div class="ct-foot">' +
      esc(agency.address || '') + (agency.phone ? ' - Tél : ' + esc(agency.phone) : '') +
      (legal ? '<div class="ct-foot__legal">' + legal + '</div>' : '') +
    '</div>';

    /* ── Conditions générales, page suivante ── */
    h += '<div class="ct-terms"><h4>Conditions générales de location</h4><ol>' +
      terms.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') +
    '</ol></div>';

    if (c.notes) {
      h += '<div class="ct-terms" style="break-before:auto;page-break-before:auto;margin-top:10px">' +
        '<h4>Notes</h4><div style="font-size:9.5px">' + esc(c.notes) + '</div></div>';
    }

    return h;
  }

  // PDF of a rendered contract element (html2pdf.js loaded on demand).
  var H2P = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
  function loadH2P() {
    if (window.html2pdf) return Promise.resolve(window.html2pdf);
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = H2P; s.onload = function () { res(window.html2pdf); };
      s.onerror = function () { rej(new Error('Chargement du générateur PDF impossible')); };
      document.head.appendChild(s);
    });
  }
  // Le PDF est rendu depuis une copie hors écran figée en largeur bureau :
  // sinon, sur téléphone, la mise en page passe en une colonne et le contrat
  // s'étale sur plusieurs pages au lieu d'une.
  function pdf(el, c) {
    var holder = document.createElement('div');
    holder.className = 'ct-pdf-holder';
    var clone = el.cloneNode(true);
    clone.classList.add('ct-pdf');
    holder.appendChild(clone);
    document.body.appendChild(holder);
    function cleanup() { if (holder.parentNode) holder.parentNode.removeChild(holder); }
    return loadH2P().then(function (h2p) {
      return h2p().set({
        margin: [10, 10, 12, 10],
        filename: 'Contrat-' + number(c) + '.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff', windowWidth: 900 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['.contract__sec', '.contract__sign', 'li'] },
      }).from(clone).outputPdf('blob');
    }).then(function (blob) {
      cleanup();
      return new File([blob], 'Contrat-' + number(c) + '.pdf', { type: 'application/pdf' });
    }, function (err) {
      cleanup();
      throw err;
    });
  }

  // ═══════════════ SIGNATURE CAPTURE ═══════════════
  // Full-screen signing sheet: pen-like ink (signature_pad, speed + stylus pressure),
  // undo, clear, optional "type my name", auto-cropped transparent PNG.
  var SP_URL = 'https://cdn.jsdelivr.net/npm/signature_pad@5.1.4/dist/signature_pad.umd.min.js';
  var FONT_URL = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
  var INK = '#1E3A8A';                       // dark blue, like a ballpoint pen

  function loadScript(src, globalName) {
    if (window[globalName]) return Promise.resolve(window[globalName]);
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { window[globalName] ? res(window[globalName]) : rej(new Error('Script vide')); };
      s.onerror = function () { rej(new Error('Chargement du module de signature impossible, vérifiez la connexion')); };
      document.head.appendChild(s);
    });
  }
  function loadHandFont() {
    if (!document.querySelector('link[data-hand-font]')) {
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = FONT_URL; l.setAttribute('data-hand-font', '');
      document.head.appendChild(l);
    }
    return (document.fonts && document.fonts.load) ? document.fonts.load('64px "Great Vibes"').catch(function () {}) : Promise.resolve();
  }

  // Crop transparent borders so the signature fills its box on the contract.
  function trimCanvas(src, pad) {
    pad = pad || 12;
    var w = src.width, h = src.height, ctx = src.getContext('2d');
    var px = ctx.getImageData(0, 0, w, h).data;
    var x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        if (px[(y * w + x) * 4 + 3] > 8) {
          if (x < x0) x0 = x; if (x > x1) x1 = x;
          if (y < y0) y0 = y; if (y > y1) y1 = y;
        }
      }
    }
    if (x1 < 0) return null;
    x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
    x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);
    var cw = x1 - x0 + 1, ch = y1 - y0 + 1, k = Math.min(1, 900 / cw, 360 / ch);   // keep the PNG light
    var out = document.createElement('canvas');
    out.width = Math.max(1, Math.round(cw * k)); out.height = Math.max(1, Math.round(ch * k));
    var octx = out.getContext('2d'); octx.imageSmoothingQuality = 'high';
    octx.drawImage(src, x0, y0, cw, ch, 0, 0, out.width, out.height);
    return out.toDataURL('image/png');
  }

  function typedSignature(name) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d'), size = 110;
    ctx.font = size + 'px "Great Vibes", cursive';
    var w = Math.ceil(ctx.measureText(name).width) + 60;
    c.width = Math.min(Math.max(w, 200), 2400); c.height = 190;
    ctx = c.getContext('2d');
    ctx.font = size + 'px "Great Vibes", cursive';
    ctx.fillStyle = INK; ctx.textBaseline = 'middle';
    ctx.fillText(name, 30, c.height / 2);
    return trimCanvas(c, 10);
  }

  var SHEET = null;
  function buildSheet() {
    if (SHEET) return SHEET;
    var el = document.createElement('div');
    el.className = 'sigcap';
    el.innerHTML =
      '<div class="sigcap__box" role="dialog" aria-modal="true">' +
        '<div class="sigcap__head">' +
          '<div><div class="sigcap__title"></div><div class="sigcap__sub"></div></div>' +
          '<button type="button" class="sigcap__x" data-act="cancel" aria-label="Fermer">&times;</button>' +
        '</div>' +
        '<div class="sigcap__tabs"><button type="button" data-tab="draw" class="on">Dessiner</button><button type="button" data-tab="type">Écrire mon nom</button></div>' +
        '<div class="sigcap__rotate">↻ Tournez votre téléphone à l\'horizontale pour plus d\'espace</div>' +
        '<div class="sigcap__area" data-pane="draw">' +
          '<canvas></canvas>' +
          '<div class="sigcap__line"><span>✕</span></div>' +
          '<div class="sigcap__ph">Signez ici</div>' +
        '</div>' +
        '<div class="sigcap__area sigcap__area--type" data-pane="type" hidden>' +
          '<input type="text" class="sigcap__name" placeholder="Votre nom complet" autocomplete="name">' +
          '<div class="sigcap__preview"></div>' +
        '</div>' +
        '<div class="sigcap__foot">' +
          '<div class="sigcap__tools">' +
            '<button type="button" class="sigcap__tool" data-act="undo">↶ Annuler</button>' +
            '<button type="button" class="sigcap__tool" data-act="clear">Effacer</button>' +
          '</div>' +
          '<button type="button" class="sigcap__ok" data-act="ok">Valider la signature</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);
    SHEET = {
      el: el, canvas: el.querySelector('canvas'), pad: null, mode: 'draw', resolve: null, pressure: 0,
      q: function (s) { return el.querySelector(s); },
    };
    return SHEET;
  }

  function sizeCanvas(S) {
    var cv = S.canvas, r = cv.getBoundingClientRect(), dpr = Math.max(window.devicePixelRatio || 1, 2);
    var data = S.pad ? S.pad.toData() : null;
    var prevW = cv._cssW || r.width, prevH = cv._cssH || r.height;
    cv.width = Math.max(1, Math.round(r.width * dpr));
    cv.height = Math.max(1, Math.round(r.height * dpr));
    cv.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    cv._cssW = r.width; cv._cssH = r.height;
    if (S.pad) {
      S.pad.clear();
      if (data && data.length) {
        // keep strokes when the phone rotates: scale points to the new size
        var sx = r.width / prevW, sy = r.height / prevH, k = Math.min(sx, sy);
        data.forEach(function (g) { g.points.forEach(function (p) { p.x *= k; p.y *= k; }); });
        S.pad.fromData(data);
      }
    }
    refresh(S);
  }

  function refresh(S) {
    var empty = S.mode === 'draw' ? (!S.pad || S.pad.isEmpty()) : !S.q('.sigcap__name').value.trim();
    S.q('.sigcap__ph').style.display = (S.mode === 'draw' && empty) ? '' : 'none';
    S.q('[data-act="ok"]').disabled = empty;
    S.q('[data-act="undo"]').disabled = S.mode !== 'draw' || empty;
    S.q('[data-act="clear"]').disabled = empty;
  }

  function renderTyped(S) {
    var name = S.q('.sigcap__name').value.trim();
    S.q('.sigcap__preview').textContent = name || 'Votre signature';
    S.q('.sigcap__preview').classList.toggle('empty', !name);
    refresh(S);
  }

  function setMode(S, mode) {
    S.mode = mode;
    S.el.querySelectorAll('[data-tab]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-tab') === mode); });
    S.q('[data-pane="draw"]').hidden = mode !== 'draw';
    S.q('[data-pane="type"]').hidden = mode !== 'type';
    S.q('[data-act="undo"]').style.visibility = mode === 'draw' ? '' : 'hidden';
    if (mode === 'draw') requestAnimationFrame(function () { sizeCanvas(S); });
    else { loadHandFont().then(function () { renderTyped(S); }); setTimeout(function () { S.q('.sigcap__name').focus(); }, 50); }
    refresh(S);
  }

  function close(S, value) {
    S.el.classList.remove('show');
    document.documentElement.classList.remove('sigcap-lock');
    window.removeEventListener('resize', S.onResize);
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
    var r = S.resolve; S.resolve = null;
    if (r) r(value);
  }

  function wireSheet(S, SignaturePad) {
    if (S.pad) return;
    S.pad = new SignaturePad(S.canvas, {
      penColor: INK, backgroundColor: 'rgba(0,0,0,0)',
      minWidth: 0.7, maxWidth: 3.2, velocityFilterWeight: 0.7, minDistance: 2, throttle: 8,
    });
    // stylus pressure: scale the speed-based width by how hard the pen presses
    var baseWidth = S.pad._strokeWidth;
    if (typeof baseWidth === 'function') {
      S.pad._strokeWidth = function (v, o) {
        var w = baseWidth.call(this, v, o);
        return S.pressure > 0 ? Math.max(o.minWidth, w * (0.45 + S.pressure * 1.1)) : w;
      };
    }
    function track(e) {
      var ev = e.detail && (e.detail.event || e.detail);
      S.pressure = (ev && ev.pointerType === 'pen' && ev.pressure > 0) ? ev.pressure : 0;
    }
    S.pad.addEventListener('beginStroke', track);
    S.pad.addEventListener('beforeUpdateStroke', track);
    S.pad.addEventListener('endStroke', function () { refresh(S); });

    S.el.addEventListener('click', function (e) {
      var t = e.target.closest('[data-act],[data-tab]');
      if (!t) { if (e.target === S.el) close(S, null); return; }
      if (t.hasAttribute('data-tab')) return setMode(S, t.getAttribute('data-tab'));
      var act = t.getAttribute('data-act');
      if (act === 'cancel') close(S, null);
      if (act === 'clear') { if (S.mode === 'draw') S.pad.clear(); else { S.q('.sigcap__name').value = ''; renderTyped(S); } refresh(S); }
      if (act === 'undo') { var d = S.pad.toData(); d.pop(); S.pad.fromData(d); refresh(S); }
      if (act === 'ok') {
        var png = S.mode === 'draw' ? trimCanvas(S.canvas, 16) : typedSignature(S.q('.sigcap__name').value.trim());
        if (png) close(S, { image: png, method: S.mode });
      }
    });
    S.q('.sigcap__name').addEventListener('input', function () { renderTyped(S); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && S.el.classList.contains('show')) close(S, null); });
  }

  /* opts: { title, subtitle, allowType, name }  →  Promise<{image, method} | null> */
  function captureSignature(opts) {
    opts = opts || {};
    var S = buildSheet();
    return loadScript(SP_URL, 'SignaturePad').then(function (SignaturePad) {
      wireSheet(S, SignaturePad);
      if (S.resolve) close(S, null);
      S.q('.sigcap__title').textContent = opts.title || 'Signature';
      S.q('.sigcap__sub').textContent = opts.subtitle || '';
      S.q('.sigcap__tabs').style.display = opts.allowType ? '' : 'none';
      S.q('.sigcap__name').value = opts.name || '';
      // a stroke interrupted by closing the sheet would block new strokes
      if (S.pad._drawingStroke) {
        try { S.pad._strokeEnd({ event: null, type: 'pointerup', x: 0, y: 0, pressure: 0 }, false); }
        catch (_) { S.pad._drawingStroke = false; }
      }
      S.pad.clear();
      S.el.classList.add('show');
      document.documentElement.classList.add('sigcap-lock');
      // phones: go full screen and try to switch to landscape (ignored where unsupported)
      var phone = matchMedia('(pointer:coarse)').matches && Math.min(screen.width, screen.height) < 600;
      if (phone && S.el.requestFullscreen) {
        S.el.requestFullscreen().then(function () {
          return screen.orientation && screen.orientation.lock ? screen.orientation.lock('landscape') : null;
        }).catch(function () {});
      }
      S.onResize = function () { if (S.mode === 'draw') sizeCanvas(S); };
      window.addEventListener('resize', S.onResize);
      setMode(S, 'draw');
      return new Promise(function (res) { S.resolve = res; });
    });
  }

  /* A tappable box on the page that opens the signing sheet and shows the result.
     opts: { title, subtitle, allowType, getName(), placeholder, onChange(value) } */
  function signatureSlot(el, opts) {
    opts = opts || {};
    var value = null, method = null;
    function paint() {
      el.classList.toggle('filled', !!value);
      el.innerHTML = value
        ? '<img src="' + esc(value) + '" alt="Signature"><span class="sig-slot__edit">Modifier</span>'
        : '<span class="sig-slot__pen">✍</span><span class="sig-slot__ph">' + esc(opts.placeholder || 'Touchez pour signer') + '</span>';
    }
    el.classList.add('sig-slot');
    el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0');
    el.addEventListener('click', open);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    function open() {
      captureSignature({
        title: opts.title, subtitle: opts.subtitle, allowType: opts.allowType,
        name: opts.getName ? opts.getName() : '',
      }).then(function (r) {
        if (!r) return;
        value = r.image; method = r.method; paint();
        if (opts.onChange) opts.onChange(value);
      }).catch(function (e) { alert(e.message || 'Signature impossible'); });
    }
    paint();
    return {
      get value() { return value; },
      get method() { return method; },
      set: function (v, m) { value = v || null; method = v ? (m || 'saved') : null; paint(); },
      clear: function () { value = null; method = null; paint(); },
      isEmpty: function () { return !value; },
      open: open,
    };
  }

  window.ContractDoc = { TERMS: TERMS, STATUS: STATUS, PAYMENT: PAYMENT, number: number, html: html, pdf: pdf, captureSignature: captureSignature, signatureSlot: signatureSlot, esc: esc };
})();
