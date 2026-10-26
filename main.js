/* ELOURE THE STUDIO — shared header/footer and interactions. Data lives in services.js. */
const ARROW = '→';
const NAV = [['index.html', 'Startseite'], ['leistungen.html', 'Leistungen'], ['ueber-uns.html', 'Über uns'], ['unser-studio.html', 'Unser Studio'], ['termin-buchen.html', 'Termin buchen'], ['kontakt.html', 'Kontakt']];
const page = location.pathname.split('/').pop() || 'index.html';
const isActive = h => h === page || (h === 'leistungen.html' && page.startsWith('behandlung-'));

document.querySelector('#hdr').outerHTML = `
<header class="site"><div class="wrap bar">
  <a href="index.html" class="logo" aria-label="ELOURE THE STUDIO">Eloure<small>THE STUDIO</small></a>
  <nav class="main" id="nav">${NAV.map(([h, t]) => `<a href="${h}" class="${isActive(h) ? 'active' : ''}">${t}</a>`).join('')}</nav>
  <a href="${BOOK}" class="btn hd">Termin buchen</a>
  <button class="burger" aria-label="Menü" onclick="document.getElementById('nav').classList.toggle('open')"><span></span><span></span></button>
</div></header>`;

document.querySelector('#ftr').outerHTML = `
<footer class="site"><div class="wrap">
  <div class="grid">
    <div><div class="logo">Eloure<small>THE STUDIO</small></div><p style="font-size:13.5px;opacity:.9;max-width:260px">Wo Schönheit und Ästhetik zuhause sind. Laserhaarentfernung in Amriswil.</p></div>
    <div><h4>Navigation</h4><ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    <div><h4>Information</h4><ul><li><a href="faq.html">FAQ</a></li><li><a href="agb.html">AGB</a></li><li><a href="impressum.html">Impressum</a></li><li><a href="datenschutz.html">Datenschutzerklärung</a></li><li><a href="https://www.instagram.com/elourethestudio/">Instagram</a></li></ul></div>
    <div><h4>Kontakt</h4><ul><li>Bahnhofstrasse 20<br>8580 Amriswil</li><li><a href="tel:+41765297129">+41 76 529 71 29</a></li><li><a href="mailto:elourethestudio@outlook.com">elourethestudio@outlook.com</a></li><li>Mo–Fr 10:00–20:00<br>Sa 10:00–16:00</li></ul></div>
  </div>
  <div class="brand" aria-hidden="true">Eloure</div>
  <div class="copy">© ELOURE THE STUDIO · Eloure GmbH. Alle Rechte vorbehalten.</div>
</div></footer>`;

/* compact sticky header */
const hd = document.querySelector('header.site');
addEventListener('scroll', () => hd.classList.toggle('compact', scrollY > 60), { passive: true });

/* scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
const watch = root => root.querySelectorAll('.fx').forEach(el => io.observe(el));

/* lightbox */
const lb = document.createElement('div'); lb.className = 'lightbox'; lb.innerHTML = '<img alt="">'; document.body.append(lb);
lb.onclick = () => lb.classList.remove('open');
document.querySelectorAll('.zoom').forEach(z => z.onclick = () => { lb.querySelector('img').src = z.querySelector('img').currentSrc || z.querySelector('img').src; lb.classList.add('open'); });

/* price rows – each row links to its own treatment page and into the booking flow */
const chf = s => s.price == null ? '<small>auf Anfrage</small>' : s.price + '<small>CHF</small>';
function rowHTML(s) {
  return `<div class="row fx"><h3><a href="${s.page}">${s.name}</a></h3><span class="dur">${s.dur}</span>
    <span class="price">${chf(s)}</span>
    <a class="btn" href="${BOOK}?s=${s.slug}">Buchen</a>${s.desc ? `<p class="desc">${s.desc}</p>` : ''}</div>`;
}
window.renderServices = (el, key) => { el.innerHTML = SERVICES[key].map(rowHTML).join(''); watch(el); };
window.initTabs = (tabsEl, listEl) => {
  const show = k => { tabsEl.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.k === k)); renderServices(listEl, k); };
  tabsEl.querySelectorAll('button').forEach(b => b.onclick = () => show(b.dataset.k));
  show(tabsEl.querySelector('button').dataset.k);
};
document.querySelectorAll('[data-book]').forEach(a => a.href = BOOK + (a.dataset.book ? '?s=' + a.dataset.book : ''));
/* Wix serves a resized copy – originals are several MB each */
const sized = u => u + '/v1/fit/w_1400,h_1400,q_82/studio.jpg';
document.querySelectorAll('[data-img]').forEach(i => { i.loading = i.closest('.hero2,.page-hero,header') ? 'eager' : 'lazy'; i.decoding = 'async'; if (i.dataset.img === 'hero') i.classList.add('trim'); i.src = sized(IMG[i.dataset.img]); });
const hp = document.querySelector('#home-prices');
if (hp) hp.innerHTML = [['frauen', 'Oberlippe'], ['frauen', 'Achseln'], ['frauen', 'Gesicht'], ['frauen', 'Beine komplett'], ['frauen', 'Ganzkörper']]
  .map(([c, n]) => rowHTML(SERVICES[c].find(s => s.name === n))).join('');
watch(document);
