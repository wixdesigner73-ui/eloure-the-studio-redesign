/* ELOURE booking flow: Kategorie → Behandlung → Wunschtermin → Angaben → Anfrage senden.
   Honest by design: no live calendar is available outside Wix Bookings, so times shown are the studio's opening
   hours and the result is a Terminanfrage that ELOURE confirms (AGB: verbindlich erst nach Bestätigung). */
(() => {
  const root = document.getElementById('wizard');
  const STEPS = ['Kategorie', 'Behandlung', 'Termin', 'Angaben', 'Senden'];
  const MAIL = 'elourethestudio@outlook.com', WA = '41765297129';
  const st = { step: 0, cat: null, s: null, zones: 0, date: '', time: '', date2: '', time2: '', c: {} };
  const DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const tomorrow = (() => { const d = new Date(); d.setDate(d.getDate() + 1); return iso(d); })();
  const fmtDate = v => { if (!v) return ''; const d = new Date(v + 'T12:00'); return `${DAYS[d.getDay()]}, ${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`; };
  const total = () => st.s && st.s.price != null ? st.s.price + st.zones * st.s.extra : null;
  const hasZones = () => st.s && st.s.extra > 0;

  function slots(date) {
    if (!date || !st.s) return [];
    const h = HOURS[new Date(date + 'T12:00').getDay()]; if (!h) return [];
    const out = []; for (let m = h[0] * 60; m + st.s.min <= h[1] * 60; m += 30) out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
    return out;
  }
  function message() {
    const c = st.c, t = total();
    return [`Terminanfrage ELOURE THE STUDIO`, ``, `Behandlung: ${st.s.name} (${CATS[st.s.cat]})`,
      `Dauer: ${st.s.dur}`, t != null ? `Preis: ${t} CHF${st.zones ? ` (inkl. ${st.zones} weitere Zone${st.zones > 1 ? 'n' : ''})` : ''}` : `Preis: auf Anfrage`,
      `Wunschtermin: ${fmtDate(st.date)}, ${st.time} Uhr`, st.date2 && st.time2 ? `Alternativ: ${fmtDate(st.date2)}, ${st.time2} Uhr` : null, ``,
      `Name: ${c.vn} ${c.nn}`, `E-Mail: ${c.em}`, c.tel ? `Telefon: ${c.tel}` : null, c.msg ? `Hinweise: ${c.msg}` : null,
      `Erstbehandlung: ${c.first || 'nicht angegeben'}`].filter(x => x !== null).join('\n');
  }

  function bar() {
    return `<ol class="wsteps">${STEPS.map((n, i) => `<li class="${i === st.step ? 'on' : ''}${i < st.step ? ' done' : ''}"><span>${i < st.step ? '✓' : i + 1}</span>${n}</li>`).join('')}</ol>`;
  }
  function summary() {
    const t = total();
    return `<aside class="wsum"><h3>Deine Anfrage</h3>
      ${st.s ? `<p class="k">Behandlung</p><p><b>${st.s.name}</b><br><span class="m">${CATS[st.s.cat]} · ${st.s.dur}</span></p>` : '<p class="m">Noch keine Behandlung gewählt.</p>'}
      ${st.zones ? `<p class="k">Weitere Zonen</p><p>${st.zones} × ${st.s.extra} CHF</p>` : ''}
      ${st.date && st.time ? `<p class="k">Wunschtermin</p><p>${fmtDate(st.date)}<br>${st.time} Uhr</p>` : ''}
      ${st.s ? `<div class="tot"><span>Preis</span><b>${t != null ? t + ' CHF' : 'auf Anfrage'}</b></div>` : ''}
      <p class="m" style="margin-top:14px">Bezahlung bar vor Ort nach der Behandlung. Absage bis 24 Stunden vorher.</p></aside>`;
  }

  function stepHTML() {
    if (st.step === 0) return `<h2>Was möchtest du buchen?</h2><div class="pick">${Object.entries(CATS).map(([k, v]) =>
      `<button class="opt" data-cat="${k}"><b>${v}</b><span>${k === 'beratung' ? 'Beratungsgespräch oder Probebehandlung' : SERVICES[k].length + ' Behandlungen'}</span></button>`).join('')}</div>`;
    if (st.step === 1) return `<h2>Wähle deine Behandlung</h2><div class="tabs" id="wt">${Object.entries(CATS).map(([k, v]) => `<button data-cat="${k}" class="${k === st.cat ? 'on' : ''}">${v}</button>`).join('')}</div>
      <div class="plist">${SERVICES[st.cat].map(s => `<button class="prow ${st.s && st.s.slug === s.slug ? 'sel' : ''}" data-s="${s.slug}"><span class="nm"><b>${s.name}</b>${s.desc ? `<em>${s.desc}</em>` : ''}</span><span class="du">${s.dur}</span><span class="pr">${s.price != null ? s.price + ' CHF' : 'auf Anfrage'}</span></button>`).join('')}</div>
      ${hasZones() ? `<div class="zones"><span>Weitere Zonen (+${st.s.extra} CHF pro Zone)</span><div><button data-z="-1" aria-label="weniger">−</button><b>${st.zones}</b><button data-z="1" aria-label="mehr">+</button></div></div>` : ''}
      ${st.s && st.s.cat === 'maenner' && st.s.name === 'Jede weitere Zone' ? '<p class="m">Gilt nur in Verbindung mit einer Ganzkörperbehandlung.</p>' : ''}
      <div class="nav"><button class="back" data-go="0">← Zurück</button><button class="btn" data-go="2" ${st.s ? '' : 'disabled'}>Weiter zum Termin →</button></div>`;
    if (st.step === 2) {
      const a = slots(st.date), b = slots(st.date2);
      const sel = (list, v) => list.length ? `<option value="">Zeit wählen</option>${list.map(x => `<option ${x === v ? 'selected' : ''}>${x}</option>`).join('')}` : '<option value="">–</option>';
      const closed = d => d && !HOURS[new Date(d + 'T12:00').getDay()];
      return `<h2>Wann passt es dir?</h2><p class="m">Öffnungszeiten: Mo–Fr 10:00–20:00, Sa 10:00–16:00. Wir bestätigen deinen Wunschtermin persönlich.</p>
      <div class="two-f f"><div><label for="d1">Wunschdatum</label><input type="date" id="d1" min="${tomorrow}" value="${st.date}"></div><div><label for="t1">Uhrzeit</label><select id="t1">${sel(a, st.time)}</select></div></div>
      ${closed(st.date) ? '<p class="err">Sonntags ist das Studio geschlossen – bitte wähle einen anderen Tag.</p>' : ''}
      <div class="two-f f"><div><label for="d2">Alternativ-Datum (optional)</label><input type="date" id="d2" min="${tomorrow}" value="${st.date2}"></div><div><label for="t2">Uhrzeit</label><select id="t2">${sel(b, st.time2)}</select></div></div>
      <p class="m">Kurzfristig? Ruf uns an: <a class="link" href="tel:+41765297129">+41 76 529 71 29</a></p>
      <div class="nav"><button class="back" data-go="1">← Zurück</button><button class="btn" data-go="3" ${st.date && st.time ? '' : 'disabled'}>Weiter →</button></div>`;
    }
    if (st.step === 3) { const c = st.c; return `<h2>Deine Angaben</h2>
      <form id="cf" novalidate><div class="two-f f"><div><label for="vn">Vorname</label><input id="vn" required value="${c.vn || ''}"></div><div><label for="nn">Nachname</label><input id="nn" required value="${c.nn || ''}"></div></div>
      <div class="two-f f"><div><label for="em">E-Mail</label><input id="em" type="email" required value="${c.em || ''}"></div><div><label for="tel">Telefonnummer</label><input id="tel" type="tel" value="${c.tel || ''}"></div></div>
      <div class="f"><label for="first">Hast du schon Laserbehandlungen bei uns gehabt?</label><select id="first"><option>Nein, erste Behandlung</option><option ${c.first === 'Ja, Folgebehandlung' ? 'selected' : ''}>Ja, Folgebehandlung</option></select></div>
      <div class="f"><label for="msg">Nachricht / Hinweise (z. B. Allergien, Medikamente, Schwangerschaft)</label><textarea id="msg">${c.msg || ''}</textarea></div>
      <label class="consent"><input type="checkbox" id="ok" ${c.ok ? 'checked' : ''}> Ich habe die <a class="link" href="agb.html" target="_blank">AGB</a> und die <a class="link" href="datenschutz.html" target="_blank">Datenschutzerklärung</a> gelesen. Absagen sind bis 24 Stunden vor dem Termin möglich.</label>
      <p class="err" id="err" hidden></p>
      <div class="nav"><button type="button" class="back" data-go="2">← Zurück</button><button class="btn" type="submit">Zusammenfassung ansehen →</button></div></form>`; }
    const mailto = `mailto:${MAIL}?subject=${encodeURIComponent('Terminanfrage: ' + st.s.name)}&body=${encodeURIComponent(message())}`;
    const wa = `https://wa.me/${WA}?text=${encodeURIComponent(message())}`;
    return `<h2>Anfrage senden</h2><p class="m">Prüfe deine Anfrage und sende sie per E-Mail oder WhatsApp an ELOURE. Dein Termin ist erst nach unserer Bestätigung verbindlich.</p>
      <pre class="msg">${message().replace(/</g, '&lt;')}</pre>
      <div class="send"><a class="btn" id="smail" href="${mailto}">Per E-Mail senden →</a><a class="btn light" style="border:1px solid var(--terra)" id="swa" href="${wa}" target="_blank" rel="noopener">Per WhatsApp senden →</a></div>
      <div class="ok" id="done" hidden><h3>Danke, ${st.c.vn}!</h3><p>Deine Anfrage ist in deiner E-Mail- bzw. WhatsApp-App bereit. Sobald du sie abgeschickt hast, meldet sich ELOURE bei dir und bestätigt deinen Termin. Falls sich kein Programm geöffnet hat, ruf uns an: <a class="link" href="tel:+41765297129">+41 76 529 71 29</a>.</p></div>
      <div class="nav"><button class="back" data-go="3">← Angaben ändern</button><button class="back" id="copy">Text kopieren</button></div>`;
  }

  function render(focusTop) {
    root.innerHTML = `${bar()}<div class="wgrid"><div class="wmain">${stepHTML()}</div>${summary()}</div>`;
    if (focusTop) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const go = n => { st.step = n; render(true); };

  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.cat) { if (st.cat !== b.dataset.cat) { st.s = null; st.zones = 0; } st.cat = b.dataset.cat; st.step = 1; render(st.step === 1 && !root.querySelector('#wt')); }
    else if (b.dataset.s) { st.s = bySlug(b.dataset.s); st.zones = 0; render(); document.querySelector('.prow.sel')?.scrollIntoView({ block: 'nearest' }); }
    else if (b.dataset.z) { st.zones = Math.max(0, Math.min(20, st.zones + +b.dataset.z)); render(); }
    else if (b.dataset.go !== undefined && !b.disabled) go(+b.dataset.go);
    else if (b.id === 'copy') navigator.clipboard?.writeText(message()).then(() => b.textContent = 'Kopiert ✓');
  });
  root.addEventListener('change', e => {
    const id = e.target.id;
    if (id === 'd1') { st.date = e.target.value; st.time = ''; render(); }
    else if (id === 'd2') { st.date2 = e.target.value; st.time2 = ''; render(); }
    else if (id === 't1') { st.time = e.target.value; render(); }
    else if (id === 't2') { st.time2 = e.target.value; render(); }
  });
  root.addEventListener('submit', e => {
    e.preventDefault();
    const g = id => document.getElementById(id).value.trim(), err = document.getElementById('err');
    st.c = { vn: g('vn'), nn: g('nn'), em: g('em'), tel: g('tel'), msg: g('msg'), first: g('first'), ok: document.getElementById('ok').checked };
    const bad = !st.c.vn || !st.c.nn || !/^\S+@\S+\.\S+$/.test(st.c.em) ? 'Bitte Vorname, Nachname und eine gültige E-Mail-Adresse angeben.' : !st.c.ok ? 'Bitte bestätige AGB und Datenschutzerklärung.' : '';
    if (bad) { err.textContent = bad; err.hidden = false; return; }
    go(4);
  });
  root.addEventListener('click', e => { if (e.target.closest('#smail,#swa')) setTimeout(() => { const d = document.getElementById('done'); if (d) { d.hidden = false; d.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 400); });

  // Deep link: termin-buchen.html?s=<slug> opens directly at the date step
  const pre = bySlug(new URLSearchParams(location.search).get('s') || '');
  if (pre) { st.s = pre; st.cat = pre.cat; st.step = 2; }
  render();
})();
