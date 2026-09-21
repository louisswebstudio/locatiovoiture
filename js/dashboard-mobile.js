/**
 * dashboard-mobile.js
 * Rend les tableaux du dashboard lisibles sur mobile.
 *
 * Les lignes sont générées par plusieurs fonctions de rendu qui écrivent
 * des <td> nus. Plutôt que de toucher à chacune, on recopie ici
 * l'intitulé du <th> correspondant dans data-label sur chaque <td> :
 * css/dashboard-mobile.css s'en sert pour afficher chaque ligne en carte.
 *
 * Générique : marche pour les 5 tableaux, et se réapplique à chaque
 * re-rendu (filtre, pagination, rechargement Supabase).
 */
(function () {
  'use strict';

  /* Libellé d'une colonne, lu dans le <thead> du tableau. */
  function headings(table) {
    var ths = table.querySelectorAll('thead th');
    var out = [];
    for (var i = 0; i < ths.length; i++) {
      out.push((ths[i].textContent || '').trim());
    }
    return out;
  }

  /* Étiquette chaque cellule d'un tableau. */
  function label(table) {
    var heads = headings(table);
    if (!heads.length) return;

    var rows = table.querySelectorAll('tbody tr');
    for (var r = 0; r < rows.length; r++) {
      var cells = rows[r].children;

      // Ligne « aucun résultat » : une seule cellule en colspan, on la laisse.
      if (cells.length === 1 && cells[0].hasAttribute('colspan')) continue;

      for (var c = 0; c < cells.length; c++) {
        var td = cells[c];
        if (td.tagName !== 'TD') continue;
        td.setAttribute('data-label', heads[c] != null ? heads[c] : '');

        // La colonne d'actions se repère à son contenu, pas à son intitulé
        // (elle est parfois sans titre).
        if (td.querySelector('.row-actions')) td.classList.add('is-actions');
      }
    }
  }

  function labelAll() {
    var tables = document.querySelectorAll('.table-wrap table');
    for (var i = 0; i < tables.length; i++) label(tables[i]);
  }

  function boot() {
    labelAll();

    // Les tbody sont réécrits par les fonctions de rendu : on réétiquette
    // à chaque changement. Un seul observer pour tout le conteneur applicatif.
    var root = document.getElementById('app') || document.body;
    if (!('MutationObserver' in window)) return;

    var pending = false;
    new MutationObserver(function (records) {
      var touched = false;
      for (var i = 0; i < records.length; i++) {
        var t = records[i].target;
        if (t && (t.tagName === 'TBODY' || t.tagName === 'TABLE' ||
                  (t.closest && t.closest('.table-wrap')))) {
          touched = true;
          break;
        }
      }
      if (!touched || pending) return;

      // Groupe les rafales de mutations d'un même rendu.
      pending = true;
      setTimeout(function () {
        pending = false;
        labelAll();
      }, 0);
    }).observe(root, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
