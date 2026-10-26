/* ELOURE THE STUDIO — shared header/footer, service data, interactions.
   Prices/durations copied from https://www.elourethestudio.ch/book-online (Wix Bookings stays the source of truth). */
const BOOK = 'https://www.elourethestudio.ch/book-online';
const IMG = {
  hero: 'https://static.wixstatic.com/media/f14793_32595ce4209b456998c01eb082e23c8cf000.jpg',
  service: 'https://static.wixstatic.com/media/f14793_2489266460db4c8389c0dcc891e5ef5df000.jpg',
  duo: 'https://static.wixstatic.com/media/f14793_048f74aae3764bd8a38413b3c969d9f1~mv2.jpg',
  team: 'https://static.wixstatic.com/media/f14793_93edd57865de4724a748453eaeb11b84~mv2.jpg',
  room: 'https://static.wixstatic.com/media/f14793_5fc8c0ae8a6e4ae89e8b21cfe57c8aa3~mv2.jpg'
};
const S = (name, price, dur, desc) => ({ name, price, dur, desc });
const SERVICES = {
  frauen: [
    S('Gesicht', 69, '15 Min.'), S('Oberlippe', 39, '15 Min.'), S('Oberlippe & Kinn', 49, '15 Min.'),
    S('Achseln', 49, '15 Min.'), S('Arme', 69, '30 Min.'),
    S('Bikinilinie', 59, '15 Min.'), S('Bikini / Intim', 79, '15 Min.'), S('Kombi Intim + Achseln', 119, '30 Min.'),
    S('Bauch', 49, '15 Min.'), S('Halber Rücken', 49, '15 Min.'), S('Pobacken', 59, '15 Min.'),
    S('Unterschenkel', 89, '30 Min.'), S('Oberschenkel', 89, '30 Min.'), S('Beine komplett', 129, '45 Min.'),
    S('Hände inkl. Finger', 29, '15 Min.'), S('Füsse inkl. Zehen', 29, '15 Min.'),
    S('Ganzkörper halbes Bein', 169, '1 Std.', '3 Zonen, jede weitere Zone +10 CHF'),
    S('Ganzkörper', 179, '1 Std. 15 Min.', 'Enthält 3 Zonen deiner Wahl. Jede weitere Zone +10 CHF')
  ],
  maenner: [
    S('Konturen', 35, '15 Min.'), S('Hals', 49, '15 Min.'), S('Nacken', 39, '15 Min.'),
    S('Achseln', 49, '15 Min.'), S('Rücken inkl. Nacken', 99, '30 Min.'),
    S('Brust', 69, '30 Min.'), S('Bauch', 69, '30 Min.'), S('Brust & Bauch', 119, '30 Min.'),
    S('Oberarme', 49, '15 Min.'), S('Arme komplett', 79, '30 Min.'),
    S('Hände inkl. Finger', 29, '15 Min.'), S('Beine', 129, '45 Min.'), S('Füsse inkl. Zehen', 29, '15 Min.'),
    S('Ganzkörper', 249, '2 Std.', '3 Zonen, jede weitere Zone +15 CHF'),
    S('Jede weitere Zone', 15, '25 Min.', 'Gilt nur in Verbindung mit einer Ganzkörperbehandlung')
  ],
  beratung: [
    S('Beratungsgespräch', null, '25 Min.', 'Wir erklären dir den Ablauf, analysieren deine Haut & Haare und finden den passenden Behandlungsplan'),
    S('Probebehandlung Achsel inkl. Beratung', null, '30 Min.', 'Exklusiv für Laserjungfrauen, kann nur einzeln gebucht werden')
  ]
};
const HOME_PRICES = [['Oberlippe',39,'15 Min.'],['Achseln',49,'15 Min.'],['Gesicht',69,'15 Min.'],['Beine komplett',129,'45 Min.'],['Ganzkörper',179,'1 Std. 15 Min.']];

const ARROW = '<span aria-hidden="true">→</span>';
const NAV = [['index.html','Startseite'],['leistungen.html','Leistungen'],['ueber-uns.html','Über uns'],['unser-studio.html','Unser Studio'],['termin-buchen.html','Termin buchen'],['kontakt.html','Kontakt']];
const page = location.pathname.split('/').pop() || 'index.html';

document.querySelector('#hdr').outerHTML = `
<header class="site"><div class="wrap bar">
  <a href="index.html" class="logo" aria-label="ELOURE THE STUDIO">Eloure<small>THE STUDIO</small></a>
  <nav class="main" id="nav">${NAV.map(([h, t]) => `<a href="${h}" class="${h === page ? 'active' : ''}">${t}</a>`).join('')}</nav>
  <a href="${BOOK}" class="btn hd">Termin buchen</a>
  <button class="burger" aria-label="Menü" onclick="document.getElementById('nav').classList.toggle('open')"><span></span><span></span></button>
</div></header>`;

document.querySelector('#ftr').outerHTML = `
<footer class="site"><div class="wrap">
  <div class="grid">
    <div><div class="logo">Eloure<small>THE STUDIO</small></div><p style="font-size:13.5px;opacity:.9;max-width:260px">Wo Schönheit und Ästhetik zuhause sind. Laserhaarentfernung in Amriswil.</p></div>
    <div><h4>Navigation</h4><ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    <div><h4>Information</h4><ul><li><a href="https://www.elourethestudio.ch/faq">FAQ</a></li><li><a href="https://www.elourethestudio.ch/agb-s">AGB's</a></li><li><a href="https://www.elourethestudio.ch/impressum">Impressum</a></li><li><a href="https://www.elourethestudio.ch/datenschutz">Datenschutzerklärung</a></li><li><a href="https://www.instagram.com/elourethestudio/">Instagram</a></li></ul></div>
    <div><h4>Kontakt</h4><ul><li>Bahnhofstrasse 20<br>8580 Amriswil</li><li><a href="tel:+41765297129">+41 76 529 71 29</a></li><li><a href="mailto:elourethestudio@outlook.com">elourethestudio@outlook.com</a></li><li>Mo–Fr 10:00–20:00<br>Sa 10:00–16:00</li></ul></div>
  </div>
  <div class="copy">© ELOURE THE STUDIO. Alle Rechte vorbehalten.</div>
</div></footer>`;

/* compact sticky header */
const hd = document.querySelector('header.site');
addEventListener('scroll', () => hd.classList.toggle('compact', scrollY > 60), { passive: true });

/* scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.fx').forEach(el => io.observe(el));

/* lightbox */
const lb = document.createElement('div'); lb.className = 'lightbox'; lb.innerHTML = '<img alt="">'; document.body.append(lb);
lb.onclick = () => lb.classList.remove('open');
document.querySelectorAll('.zoom').forEach(z => z.onclick = () => { lb.querySelector('img').src = z.querySelector('img').src; lb.classList.add('open'); });

/* price rows */
function rowHTML(s) {
  return `<div class="row fx"><h3>${s.name}</h3><span class="dur">${s.dur}</span>
    <span class="price">${s.price == null ? '<small>auf Anfrage</small>' : s.price + '<small>CHF</small>'}</span>
    <a class="btn" href="${BOOK}">Buchen</a>${s.desc ? `<p class="desc">${s.desc}</p>` : ''}</div>`;
}
window.renderServices = (el, key) => { el.innerHTML = SERVICES[key].map(rowHTML).join(''); el.querySelectorAll('.fx').forEach(e => io.observe(e)); };
window.initTabs = (tabsEl, listEl) => {
  const show = k => { tabsEl.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.k === k)); renderServices(listEl, k); };
  tabsEl.querySelectorAll('button').forEach(b => b.onclick = () => show(b.dataset.k));
  show(tabsEl.querySelector('button').dataset.k);
};
document.querySelectorAll('[data-book]').forEach(a => a.href = BOOK);
document.querySelectorAll('[data-img]').forEach(i => i.src = IMG[i.dataset.img]);
const hp = document.querySelector('#home-prices');
if (hp) hp.innerHTML = HOME_PRICES.map(([name, price, dur]) => rowHTML({ name, price, dur })).join('');
document.querySelectorAll('.fx').forEach(el => io.observe(el));
