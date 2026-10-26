/* ELOURE THE STUDIO – Single source of truth for services, prices, durations and images.
   Data copied from https://www.elourethestudio.ch/book-online. Used in the browser (global consts) and by build.js (Node). */
const BOOK = 'termin-buchen.html';
const W = 'https://static.wixstatic.com/media/';
const IMG = {
  hero: W + 'f14793_32595ce4209b456998c01eb082e23c8cf000.jpg',
  service: W + 'f14793_2489266460db4c8389c0dcc891e5ef5df000.jpg',
  duo: W + 'f14793_048f74aae3764bd8a38413b3c969d9f1~mv2.jpg',
  team: W + 'f14793_93edd57865de4724a748453eaeb11b84~mv2.jpg',
  room: W + 'f14793_5fc8c0ae8a6e4ae89e8b21cfe57c8aa3~mv2.jpg',
  s1: W + 'f14793_22fbf6da50b64f9694b16ca4e96ffaac~mv2.jpg',
  s2: W + 'f14793_7940294fde124e748787eb7709c32f92~mv2.jpg',
  s3: W + 'f14793_42461ac764c748b5b9c458745de9daae~mv2.jpg',
  s4: W + 'f14793_a96d7c360a554929a100d1abd6c85127~mv2.jpg',
  s5: W + 'f14793_9418a88802834b36bd161a8a40cde83d~mv2.jpg'
};
const CATS = { frauen: 'Frauen', maenner: 'Männer', beratung: 'Beratung & Probebehandlung' };
const HOURS = { 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 20], 6: [10, 16] }; // Mo–Fr 10–20, Sa 10–16, So geschlossen

const slugify = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/&/g, 'und').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const toMin = d => (/(\d+)\s*Std/.test(d) ? +RegExp.$1 * 60 : 0) + (/(\d+)\s*Min/.test(d) ? +RegExp.$1 : 0);
// [name, price CHF (null = auf Anfrage), duration, description, extra CHF per additional zone]
const RAW = {
  frauen: [
    ['Gesicht', 69, '15 Min.'], ['Oberlippe', 39, '15 Min.'], ['Oberlippe & Kinn', 49, '15 Min.'],
    ['Achseln', 49, '15 Min.'], ['Arme', 69, '30 Min.'],
    ['Bikinilinie', 59, '15 Min.'], ['Bikini / Intim', 79, '15 Min.'], ['Kombi Intim + Achseln', 119, '30 Min.'],
    ['Bauch', 49, '15 Min.'], ['Halber Rücken', 49, '15 Min.'], ['Pobacken', 59, '15 Min.'],
    ['Unterschenkel', 89, '30 Min.'], ['Oberschenkel', 89, '30 Min.'], ['Beine komplett', 129, '45 Min.'],
    ['Hände inkl. Finger', 29, '15 Min.'], ['Füsse inkl. Zehen', 29, '15 Min.'],
    ['Ganzkörper halbes Bein', 169, '1 Std.', '3 Zonen, jede weitere Zone +10 CHF', 10],
    ['Ganzkörper', 179, '1 Std. 15 Min.', 'Enthält 3 Zonen deiner Wahl. Jede weitere Zone +10 CHF', 10]
  ],
  maenner: [
    ['Konturen', 35, '15 Min.'], ['Hals', 49, '15 Min.'], ['Nacken', 39, '15 Min.'],
    ['Achseln', 49, '15 Min.'], ['Rücken inkl. Nacken', 99, '30 Min.'],
    ['Brust', 69, '30 Min.'], ['Bauch', 69, '30 Min.'], ['Brust & Bauch', 119, '30 Min.'],
    ['Oberarme', 49, '15 Min.'], ['Arme komplett', 79, '30 Min.'],
    ['Hände inkl. Finger', 29, '15 Min.'], ['Beine', 129, '45 Min.'], ['Füsse inkl. Zehen', 29, '15 Min.'],
    ['Ganzkörper', 249, '2 Std.', '3 Zonen, jede weitere Zone +15 CHF', 15],
    ['Jede weitere Zone', 15, '25 Min.', 'Gilt nur in Verbindung mit einer Ganzkörperbehandlung']
  ],
  beratung: [
    ['Beratungsgespräch', null, '25 Min.', 'Wir erklären dir den Ablauf, analysieren deine Haut & Haare und finden den passenden Behandlungsplan'],
    ['Probebehandlung Achsel inkl. Beratung', null, '30 Min.', 'Exklusiv für Laserjungfrauen, kann nur einzeln gebucht werden']
  ]
};
const SERVICES = {}, ALL = [];
for (const cat of Object.keys(RAW)) {
  SERVICES[cat] = RAW[cat].map(([name, price, dur, desc, extra]) => {
    const s = { cat, name, price, dur, desc, extra: extra || 0, min: toMin(dur), slug: slugify(cat + '-' + name) };
    s.page = 'behandlung-' + s.slug + '.html';
    ALL.push(s); return s;
  });
}
const bySlug = slug => ALL.find(s => s.slug === slug);
if (typeof module !== 'undefined') module.exports = { SERVICES, ALL, IMG, CATS, HOURS, BOOK, bySlug };
