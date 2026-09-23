/* ============================================================
   AYM Rent Car - Rule-based Chatbot "Karim"
   Pure vanilla JS · No API · 100% offline
   ============================================================ */
(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────── */
  var WA_NUMBER = '212613616145';
  var WA_BASE   = 'https://wa.me/' + WA_NUMBER;
  var WA_RESERVE = WA_BASE + '?text=' + encodeURIComponent('Bonjour, je souhaite faire une réservation chez AYM Rent Car');
  var MAPS_URL  = 'https://maps.google.com/?q=AYM+Rent+Car+Tanger';

  /* Brand colors (match css/style.css) */
  var C_PRIMARY = '#C41E2A';   /* accent red = chatbot primary */
  var C_DARK    = '#0D0D1A';

  /* ── Language detection ─────────────────────────────── */
  function detectLang() {
    var stored = null;
    try { stored = localStorage.getItem('bsc_lang'); } catch (e) {}
    var lang = stored || document.documentElement.getAttribute('lang') || 'fr';
    if (lang === 'ar' || lang === 'en') return lang;
    return 'fr';
  }
  var LANG = detectLang();
  var RTL  = LANG === 'ar';

  /* ── UI strings (header / placeholder / aria) ───────── */
  var UI = {
    fr: { online: 'En ligne', placeholder: 'Écrivez votre message…', send: 'Envoyer', sub: 'AYM Rent Car', open: 'Ouvrir le chat', close: 'Fermer' },
    en: { online: 'Online',   placeholder: 'Type your message…',    send: 'Send',     sub: 'AYM Rent Car', open: 'Open chat',    close: 'Close' },
    ar: { online: 'متصل',     placeholder: 'اكتب رسالتك…',          send: 'إرسال',    sub: 'AYM Rent Car', open: 'افتح المحادثة', close: 'إغلاق' }
  }[LANG];

  /* ── WhatsApp button (styled per spec) ──────────────── */
  function waButton(label, url) {
    return '<a href="' + (url || WA_RESERVE) + '" target="_blank" rel="noopener" ' +
      'style="display:block;background:#25D366;color:#fff;text-align:center;padding:12px;' +
      'border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px">' +
      (label || '📱 Réserver sur WhatsApp →') + '</a>';
  }

  /* ── Welcome messages (multilingual) ────────────────── */
  var WELCOME = {
    fr: {
      text: "Bonjour ! Je suis Karim 👋<br>Je peux vous aider avec :<br>• Nos voitures et tarifs<br>• Disponibilités<br>• Comment réserver<br><br>Tapez votre question ou choisissez ci-dessous :",
      chips: [
        { label: '🚗 Voir les voitures', action: 'cars' },
        { label: '💰 Tarifs',            action: 'tarifs' },
        { label: '📅 Réserver',          action: 'reserver' },
        { label: '📍 Nous trouver',      action: 'trouver' }
      ]
    },
    en: {
      text: "Hello! I'm Karim from AYM Rent Car 🚗<br>How can I help you today?",
      chips: [
        { label: '🚗 Our Cars',  action: 'cars' },
        { label: '💰 Prices',    action: 'tarifs' },
        { label: '📅 Book Now',  action: 'reserver' },
        { label: '📍 Find Us',   action: 'trouver' }
      ]
    },
    ar: {
      text: "مرحبا! أنا كريم، مساعد AYM Rent Car 🚗<br>كيف يمكنني مساعدتك؟",
      chips: [
        { label: '🚗 السيارات', action: 'cars' },
        { label: '💰 الأسعار',  action: 'tarifs' },
        { label: '📅 الحجز',    action: 'reserver' },
        { label: '📍 موقعنا',   action: 'trouver' }
      ]
    }
  };

  /* ── Flow responses (action → {text, chips}) ────────── */
  var FLOWS = {
    cars: function () {
      return {
        text: "Nous avons 4 catégories de véhicules.<br>Laquelle vous intéresse ?",
        chips: [
          { label: 'Économique', action: 'cars_eco' },
          { label: 'Confort',    action: 'cars_confort' },
          { label: 'SUV',        action: 'cars_suv' },
          { label: 'Luxe',       action: 'cars_luxe' }
        ]
      };
    },
    cars_eco: function () {
      return {
        text: "Nos véhicules Économique :<br>🚗 Toyota Yaris : 330 MAD/jour<br>🚗 Renault Clio : 350 MAD/jour<br>🚗 Dacia Sandero : 320 MAD/jour<br>Climatisation incluse. Kilométrage illimité.<br>Souhaitez-vous réserver ?",
        chips: [
          { label: 'Oui, réserver',            action: 'reserver' },
          { label: "Voir d'autres catégories", action: 'cars' }
        ]
      };
    },
    cars_confort: function () {
      return {
        text: "Nos véhicules Confort :<br>🚙 Peugeot 208 : 420 MAD/jour<br>🚙 Volkswagen T-Roc : 500 MAD/jour<br>🚙 Skoda Octavia : 480 MAD/jour<br>GPS et Bluetooth inclus.<br>Souhaitez-vous réserver ?",
        chips: [
          { label: 'Oui, réserver',            action: 'reserver' },
          { label: "Voir d'autres catégories", action: 'cars' }
        ]
      };
    },
    cars_suv: function () {
      return {
        text: "Nos véhicules SUV :<br>🚙 Kia Sportage : 600 MAD/jour<br>🚙 Hyundai i20 : 550 MAD/jour<br>Idéal pour les longs trajets et famille.<br>Souhaitez-vous réserver ?",
        chips: [
          { label: 'Oui, réserver',            action: 'reserver' },
          { label: "Voir d'autres catégories", action: 'cars' }
        ]
      };
    },
    cars_luxe: function () {
      return {
        text: "Nos véhicules Luxe :<br>✨ Véhicules premium disponibles sur demande.<br>Contactez-nous pour les tarifs et disponibilités.",
        chips: [ { label: '📱 Contacter sur WhatsApp', action: 'wa' } ]
      };
    },
    tarifs: function () {
      return {
        text: "Nos tarifs journaliers :<br>💚 Économique : à partir de 320 MAD/jour<br>💙 Confort : à partir de 420 MAD/jour<br>🧡 SUV : à partir de 550 MAD/jour<br>⭐ Luxe : sur demande<br><br>Réduction semaine : -10%<br>Réduction mois : -20%<br>Assurance et kilométrage illimités inclus.",
        chips: [
          { label: 'Voir les voitures',     action: 'cars' },
          { label: 'Réserver maintenant',   action: 'reserver' }
        ]
      };
    },
    reserver: function () {
      return {
        text: "Pour réserver, c'est très simple !<br>Cliquez sur le bouton ci-dessous et envoyez-nous un message WhatsApp avec :<br>📅 Vos dates de location<br>🚗 Le véhicule souhaité<br>Nous confirmons en moins de 30 minutes !" +
              waButton('Réserver sur WhatsApp →', WA_RESERVE)
      };
    },
    trouver: function () {
      return {
        text: "📍 AYM Rent Car<br>Tanger, Maroc<br><br>🕐 Horaires d'ouverture :<br>Lun - Dim : 8h00 - 20h00<br>7j/7, même les jours fériés<br><br>📞 Téléphone : +212 6 13 61 61 45<br>📱 WhatsApp : +212 6 13 61 61 45",
        chips: [
          { label: '🗺️ Ouvrir sur Google Maps', action: 'maps' },
          { label: '📱 Contacter sur WhatsApp',  action: 'wa' }
        ]
      };
    },
    horaires: function () {
      return {
        text: "🕐 Nous sommes ouverts :<br>Tous les jours de 8h00 à 20h00<br>7 jours sur 7, jours fériés inclus !"
      };
    },
    dispo: function () {
      return {
        text: "Pour vérifier la disponibilité en temps réel, contactez-nous directement :<br>📱 Réponse garantie en moins de 30 minutes !",
        chips: [ { label: '📱 Contacter sur WhatsApp', action: 'wa' } ]
      };
    },
    documents: function () {
      return {
        text: "📋 Documents nécessaires pour louer :<br>✅ Permis de conduire valide<br>✅ CIN ou Passeport<br>✅ Caution (carte bancaire ou espèces)<br>C'est tout ! Pas de paperasse compliquée."
      };
    },
    livraison: function () {
      return {
        text: "🚗 Nous proposons la livraison :<br>✅ Aéroport Ibn Batouta de Tanger<br>✅ Hôtels et résidences à Tanger<br>✅ Gare de Tanger Ville<br>Frais de livraison selon la distance.<br>Contactez-nous pour un devis !",
        chips: [ { label: '📱 Contacter sur WhatsApp', action: 'wa' } ]
      };
    },
    paiement: function () {
      return {
        text: "💳 Modes de paiement acceptés :<br>✅ Espèces (MAD)<br>✅ Carte bancaire<br>✅ Virement bancaire<br>Un acompte peut être demandé à la réservation."
      };
    },
    merci: function () {
      return { text: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions 😊" };
    },
    arabic: function () {
      return {
        text: "مرحبا! للتواصل معنا مباشرة عبر واتساب:" + waButton('📱 WhatsApp →', WA_RESERVE)
      };
    },
    fallback: function () {
      return {
        text: "Je n'ai pas bien compris votre question 😅<br>Vous pouvez me demander :<br>• Les tarifs et voitures disponibles<br>• Comment réserver<br>• Nos horaires et adresse<br>Ou contactez-nous directement sur WhatsApp !",
        chips: [
          { label: '📱 Contacter sur WhatsApp', action: 'wa' },
          { label: '🔄 Recommencer',            action: 'welcome' }
        ]
      };
    }
  };

  /* ── Keyword router for free text ───────────────────── */
  function routeText(raw) {
    var t = (raw || '').toLowerCase();

    // Arabic characters present → Arabic fallback
    if (/[؀-ۿ]/.test(t)) {
      if (/شكرا/.test(t)) return FLOWS.merci();
      return FLOWS.arabic();
    }

    var has = function (arr) {
      for (var i = 0; i < arr.length; i++) { if (t.indexOf(arr[i]) !== -1) return true; }
      return false;
    };

    if (has(['merci', 'thank']))                                   return FLOWS.merci();
    if (has(['bonjour', 'salut', 'salam', 'hello', 'bonsoir']))    return { welcome: true };
    if (has(['tarif', 'prix', 'combien', 'coût', 'cout']))         return FLOWS.tarifs();
    if (has(['réserv', 'reserv', 'louer', 'book', 'location']))    return FLOWS.reserver();
    if (has(['voiture', 'car', 'véhicule', 'vehicule', 'modèle', 'modele', 'économique', 'economique', 'confort', 'suv', 'luxe'])) {
      if (has(['économique', 'economique']))  return FLOWS.cars_eco();
      if (has(['confort']))                   return FLOWS.cars_confort();
      if (has(['suv']))                       return FLOWS.cars_suv();
      if (has(['luxe', 'premium']))           return FLOWS.cars_luxe();
      return FLOWS.cars();
    }
    if (has(['où', 'ou se', 'adresse', 'localisation', 'trouver', 'maps', 'localis'])) return FLOWS.trouver();
    if (has(['horaire', 'ouvert', 'heure', 'open']))              return FLOWS.horaires();
    if (has(['disponible', 'dispo', 'libre']))                    return FLOWS.dispo();
    if (has(['document', 'permis', 'cin', 'papier', 'passeport'])) return FLOWS.documents();
    if (has(['livraison', 'livrer', 'aéroport', 'aeroport', 'hotel', 'hôtel'])) return FLOWS.livraison();
    if (has(['paiement', 'payer', 'cash', 'carte', 'espèce', 'espece', 'virement'])) return FLOWS.paiement();

    return FLOWS.fallback();
  }

  /* ── Resolve a chip action → response ───────────────── */
  function actionResponse(action) {
    if (action === 'welcome') return { welcome: true };
    if (FLOWS[action]) return FLOWS[action]();
    return FLOWS.fallback();
  }

  /* ============================================================
     STYLES
     ============================================================ */
  var css = [
    '#bsc-chat *{box-sizing:border-box;margin:0;padding:0}',
    '#bsc-chat,#bsc-launcher{font-family:"DM Sans","Segoe UI",sans-serif}',
    /* Launcher */
    '#bsc-launcher{position:fixed;bottom:92px;' + (RTL ? 'left:24px' : 'right:24px') + ';width:56px;height:56px;border-radius:50%;background:' + C_PRIMARY + ';color:#fff;border:none;cursor:pointer;z-index:9999;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(196,30,42,.4);transition:transform .2s ease}',
    '#bsc-launcher:hover{transform:scale(1.08)}',
    '#bsc-launcher svg{width:28px;height:28px}',
    '#bsc-launcher.bsc-pulse::after{content:"";position:absolute;inset:0;border-radius:50%;background:' + C_PRIMARY + ';opacity:.6;z-index:-1;animation:bsc-pulse 2s infinite}',
    '@keyframes bsc-pulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.6);opacity:0}100%{opacity:0}}',
    '#bsc-badge{position:absolute;top:-2px;' + (RTL ? 'left:-2px' : 'right:-2px') + ';min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#ef4444;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff}',
    /* Window */
    '#bsc-chat{position:fixed;bottom:160px;' + (RTL ? 'left:24px' : 'right:24px') + ';width:360px;height:500px;max-height:calc(100vh - 120px);background:#fff;border-radius:16px;box-shadow:0 24px 60px rgba(13,13,26,.28);z-index:9999;display:none;flex-direction:column;overflow:hidden;' + (RTL ? 'direction:rtl' : 'direction:ltr') + '}',
    '#bsc-chat.bsc-open{display:flex;animation:bsc-slide .28s cubic-bezier(.16,1,.3,1)}',
    '@keyframes bsc-slide{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}',
    /* Header */
    '#bsc-head{background:' + C_DARK + ';color:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px;flex-shrink:0}',
    '#bsc-avatar{width:42px;height:42px;border-radius:50%;background:' + C_PRIMARY + ';display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '#bsc-avatar svg{width:24px;height:24px}',
    '#bsc-head .bsc-name{font-weight:700;font-size:15px;line-height:1.2}',
    '#bsc-head .bsc-status{font-size:12px;opacity:.85;display:flex;align-items:center;gap:5px;margin-top:2px}',
    '#bsc-head .bsc-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;box-shadow:0 0 0 0 rgba(34,197,94,.6);animation:bsc-blink 2s infinite}',
    '@keyframes bsc-blink{0%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}70%{box-shadow:0 0 0 6px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}',
    '#bsc-close{margin-' + (RTL ? 'right' : 'left') + ':auto;background:none;border:none;color:#fff;font-size:24px;line-height:1;cursor:pointer;opacity:.8;padding:4px}',
    '#bsc-close:hover{opacity:1}',
    /* Messages */
    '#bsc-msgs{flex:1;overflow-y:auto;padding:16px;background:#fff;display:flex;flex-direction:column;gap:10px}',
    '.bsc-row{display:flex;flex-direction:column;max-width:85%;animation:bsc-fade .3s ease}',
    '@keyframes bsc-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}',
    '.bsc-bot{align-self:flex-start}',
    '.bsc-user{align-self:flex-end}',
    '.bsc-bubble{padding:10px 14px;border-radius:14px;font-size:14px;line-height:1.5;word-wrap:break-word}',
    '.bsc-bot .bsc-bubble{background:#f1f5f9;color:#1e293b;border-' + (RTL ? 'top-right' : 'top-left') + '-radius:4px}',
    '.bsc-user .bsc-bubble{background:' + C_PRIMARY + ';color:#fff;border-' + (RTL ? 'top-left' : 'top-right') + '-radius:4px}',
    '.bsc-bubble a{color:inherit}',
    /* Chips */
    '.bsc-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;align-self:flex-start;max-width:90%}',
    '.bsc-chip{background:#fff;border:1.5px solid ' + C_PRIMARY + ';color:' + C_PRIMARY + ';border-radius:20px;padding:7px 14px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s ease;font-family:inherit}',
    '.bsc-chip:hover{background:#fef2f3}',
    '.bsc-chip.bsc-clicked{background:#2563eb;border-color:#2563eb;color:#fff}',
    /* Typing */
    '.bsc-typing{display:flex;gap:4px;padding:12px 14px;background:#f1f5f9;border-radius:14px;border-top-left-radius:4px;align-self:flex-start;width:fit-content}',
    '.bsc-typing span{width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:bsc-bounce 1.2s infinite}',
    '.bsc-typing span:nth-child(2){animation-delay:.2s}',
    '.bsc-typing span:nth-child(3){animation-delay:.4s}',
    '@keyframes bsc-bounce{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-6px);opacity:1}}',
    /* Input */
    '#bsc-input-bar{display:flex;gap:8px;padding:12px;border-top:1px solid #e8e8e8;background:#fff;flex-shrink:0}',
    '#bsc-input{flex:1;border:1.5px solid #e2e8f0;border-radius:22px;padding:10px 16px;font-size:14px;outline:none;font-family:inherit}',
    '#bsc-input:focus{border-color:' + C_PRIMARY + '}',
    '#bsc-send{width:42px;height:42px;border-radius:50%;background:' + C_PRIMARY + ';border:none;color:#fff;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center}',
    '#bsc-send:hover{filter:brightness(1.08)}',
    '#bsc-send svg{width:20px;height:20px}',
    /* Mobile */
    '@media(max-width:480px){#bsc-chat{width:100%;height:100%;max-height:100%;bottom:0;' + (RTL ? 'left:0' : 'right:0') + ';border-radius:0}#bsc-launcher{bottom:74px;' + (RTL ? 'left:18px' : 'right:18px') + '}}'
  ].join('');

  /* ============================================================
     BUILD DOM
     ============================================================ */
  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  var ICON_CAR  = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M5 17a2 2 0 1 1-4 0M19 17a2 2 0 1 0 4 0M3 13l2-5a2 2 0 0 1 2-1.5h10A2 2 0 0 1 19 8l2 5M3 13h18M3 13v3a1 1 0 0 0 1 1M21 13v3a1 1 0 0 1-1 1"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  function init() {
    var style = document.createElement('style');
    style.id = 'bsc-chat-style';
    style.textContent = css;
    document.head.appendChild(style);

    // Launcher
    var launcher = document.createElement('button');
    launcher.id = 'bsc-launcher';
    launcher.className = 'bsc-pulse';
    launcher.setAttribute('aria-label', UI.open);
    launcher.innerHTML = ICON_CHAT + '<span id="bsc-badge">1</span>';
    document.body.appendChild(launcher);

    // Window
    var win = document.createElement('div');
    win.id = 'bsc-chat';
    win.setAttribute('role', 'dialog');
    win.innerHTML =
      '<div id="bsc-head">' +
        '<div id="bsc-avatar">' + ICON_CAR + '</div>' +
        '<div>' +
          '<div class="bsc-name">Karim · AYM Rent Car</div>' +
          '<div class="bsc-status"><span class="bsc-dot"></span>' + UI.online + '</div>' +
        '</div>' +
        '<button id="bsc-close" aria-label="' + UI.close + '">&times;</button>' +
      '</div>' +
      '<div id="bsc-msgs"></div>' +
      '<div id="bsc-input-bar">' +
        '<input id="bsc-input" type="text" autocomplete="off" placeholder="' + UI.placeholder + '" aria-label="' + UI.placeholder + '">' +
        '<button id="bsc-send" aria-label="' + UI.send + '">' + ICON_SEND + '</button>' +
      '</div>';
    document.body.appendChild(win);

    var msgs   = win.querySelector('#bsc-msgs');
    var input  = win.querySelector('#bsc-input');
    var sendBtn = win.querySelector('#bsc-send');
    var badge  = launcher.querySelector('#bsc-badge');
    var welcomed = false;

    /* ── helpers ── */
    function scrollDown() { msgs.scrollTop = msgs.scrollHeight; }

    function addUser(text) {
      var row = document.createElement('div');
      row.className = 'bsc-row bsc-user';
      var b = document.createElement('div');
      b.className = 'bsc-bubble';
      b.textContent = text;
      row.appendChild(b);
      msgs.appendChild(row);
      scrollDown();
    }

    function addBot(resp) {
      var row = document.createElement('div');
      row.className = 'bsc-row bsc-bot';
      var b = document.createElement('div');
      b.className = 'bsc-bubble';
      b.innerHTML = resp.text;
      row.appendChild(b);
      msgs.appendChild(row);

      if (resp.chips && resp.chips.length) {
        var wrap = document.createElement('div');
        wrap.className = 'bsc-chips';
        resp.chips.forEach(function (c) {
          var chip = document.createElement('button');
          chip.className = 'bsc-chip';
          chip.type = 'button';
          chip.innerHTML = c.label;
          chip.addEventListener('click', function () {
            chip.classList.add('bsc-clicked');
            onChip(c);
          });
          wrap.appendChild(chip);
        });
        msgs.appendChild(wrap);
      }
      scrollDown();
    }

    function showTyping(cb) {
      var t = document.createElement('div');
      t.className = 'bsc-typing';
      t.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(t);
      scrollDown();
      setTimeout(function () {
        if (t.parentNode) t.parentNode.removeChild(t);
        cb();
      }, 800);
    }

    function botSay(resp) {
      showTyping(function () { addBot(resp); });
    }

    function sendWelcome() {
      var w = WELCOME[LANG] || WELCOME.fr;
      botSay({ text: w.text, chips: w.chips });
    }

    /* ── chip / action handling ── */
    function onChip(c) {
      if (c.action === 'wa')   { window.open(WA_RESERVE, '_blank'); return; }
      if (c.action === 'maps') { window.open(MAPS_URL, '_blank'); return; }
      // Echo the chip label as a user message, then respond
      addUser(c.label.replace(/^[^\wÀ-ɏ]+/, '').trim() || c.label);
      var resp = actionResponse(c.action);
      if (resp.welcome) { sendWelcome(); }
      else { botSay(resp); }
    }

    /* ── free text ── */
    function submit() {
      var v = input.value.trim();
      if (!v) return;
      addUser(v);
      input.value = '';
      var resp = routeText(v);
      if (resp.welcome) { sendWelcome(); }
      else { botSay(resp); }
    }

    sendBtn.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
    });

    /* ── open / close ── */
    function open() {
      win.classList.add('bsc-open');
      launcher.classList.remove('bsc-pulse');
      if (badge) badge.style.display = 'none';
      if (!welcomed) { welcomed = true; sendWelcome(); }
      setTimeout(function () { input.focus(); }, 300);
    }
    function close() { win.classList.remove('bsc-open'); }

    launcher.addEventListener('click', function () {
      if (win.classList.contains('bsc-open')) close(); else open();
    });
    win.querySelector('#bsc-close').addEventListener('click', close);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
