/* js/supabase-client.js
   Creates the browser Supabase client from the CDN UMD build (@supabase/
   supabase-js exposes `window.supabase`) using js/supabase-config.js.

   Result: window.sbClient — a configured client, or null when the config
   still holds placeholders (in which case the data layer uses its localStorage
   fallback driver). */
(function () {
  'use strict';
  var cfg = window.SUPABASE_CONFIG || {};
  // Treat any obvious placeholder as "not configured" so the site stays on the
  // local demo fallback instead of firing requests with an invalid key.
  function isPlaceholder(v) {
    v = String(v || '').toLowerCase();
    return !v || v.indexOf('your-') !== -1 || v.indexOf('your_') !== -1 ||
           v.indexOf('-here') !== -1 || v.indexOf('project-ref') !== -1;
  }
  var configured = !isPlaceholder(cfg.url) && !isPlaceholder(cfg.anonKey);

  if (!configured) {
    window.sbClient = null;
    console.info(
      '[Bestore] Supabase not configured — using local demo data. ' +
        'Fill in js/supabase-config.js to go live.'
    );
    return;
  }

  if (!window.supabase || !window.supabase.createClient) {
    window.sbClient = null;
    console.warn('[Bestore] supabase-js CDN script did not load; using local demo data.');
    return;
  }

  window.sbClient = window.supabase.createClient(cfg.url, cfg.anonKey);
})();
