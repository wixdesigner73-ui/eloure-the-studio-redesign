/* Generates every page except index.html:  node build.js
   Data (services, prices, images) comes from services.js, so prices live in exactly one place. */
const fs = require('fs');
const { SERVICES, ALL, IMG, CATS, BOOK } = require('./services.js');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const FONTS = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600&display=swap';
const SITE = 'https://wixdesigner73-ui.github.io/eloure-the-studio-redesign/';

function layout({ file, title, desc, body, scripts = '', ld = '' }) {
  fs.writeFileSync(file, `<!doctype html>
<html lang="de-CH">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${SITE}${file}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link rel="stylesheet" href="styles.css">${ld ? `\n<script type="application/ld+json">${ld}</script>` : ''}
</head>
<body>
<div id="hdr"></div>
${body}
<div id="ftr"></div>
<script src="services.js"></script>
<script src="main.js"></script>
${scripts}</body>
</html>
`);
}
const hero = (label, h1, lead = '') => `<div class="page-hero"><div class="wrap"><span class="label fx">${label}</span><h1 class="fx d1">${h1}</h1>${lead ? `<p class="lead fx d2">${lead}</p>` : ''}</div></div>`;
const cta = `<section class="final"><div class="wrap grid"><div class="oval fx"><img data-img="s2" alt="ELOURE THE STUDIO Amriswil"></div><div class="fx d1"><h2>Bereit für dein<br><em>neues Hautgefühl?</em></h2><p>Buche dein Beratungsgespräch oder deine Behandlung – wir freuen uns auf dich.</p><a class="btn" data-book>Termin buchen →</a></div></div></section>`;
const tabs = `<div class="tabs" id="tabs"><button data-k="frauen">Frauen</button><button data-k="maenner">Männer</button><button data-k="beratung">Beratung &amp; Probebehandlung</button></div><div id="list"></div>`;
const initTabs = '<script>initTabs(document.getElementById("tabs"),document.getElementById("list"))</script>\n';
const legalNote = file => `<p class="note" style="background:var(--contrast);padding:16px 20px;border-radius:5px">Zusammenfassung der Inhalte von ELOURE THE STUDIO. Massgeblich ist der vollständige Wortlaut auf der bisherigen Website: <a href="https://www.elourethestudio.ch/${file}">elourethestudio.ch/${file}</a>.</p>`;

/* ---------- main pages ---------- */
layout({ file: 'leistungen.html', title: 'Leistungen &amp; Preise Laserhaarentfernung Amriswil | ELOURE',
  desc: 'Alle Laserbehandlungen für Frauen und Männer mit Preisen und Dauer: Gesicht, Achseln, Bikini, Beine, Ganzkörper und mehr in Amriswil.',
  body: `${hero('Leistungen &amp; Preise', 'Laserhaarentfernung, <em>die zu dir passt.</em>', 'Alle Behandlungen mit Dauer und Preis in CHF. Klicke auf eine Behandlung für Details oder buche direkt.')}
<section style="padding-top:50px"><div class="wrap">${tabs}<p class="note">Bei Ganzkörperbehandlungen sind 3 Zonen deiner Wahl enthalten. Mehr Antworten findest du in den <a class="link" href="faq.html">FAQ</a>.</p></div></section>${cta}`, scripts: initTabs });

layout({ file: 'termin-buchen.html', title: 'Termin buchen | Laserhaarentfernung Amriswil | ELOURE',
  desc: 'Buche deine Laserbehandlung bei ELOURE THE STUDIO in Amriswil: Behandlung wählen, Wunschtermin angeben und Anfrage senden.',
  body: `${hero('Termin buchen', 'Dein Weg zu <em>glatter Haut.</em>', 'Wähle Behandlung und Wunschtermin – wir bestätigen deinen Termin persönlich.')}
<section style="padding-top:60px"><div class="wrap"><div id="wizard"></div></div></section>`, scripts: '<script src="booking.js"></script>\n' });

layout({ file: 'ueber-uns.html', title: 'Über uns | Corine &amp; Caro | ELOURE THE STUDIO Amriswil',
  desc: 'Lerne Corine und Caro kennen – die Gesichter hinter ELOURE THE STUDIO in Amriswil. Zertifizierte Experten für Laserhaarentfernung mit persönlicher Betreuung.',
  body: `${hero('Wer steckt dahinter', 'Hey, wir sind <em>Corine und Caro.</em>')}
<section><div class="wrap two"><div class="arch fx"><img data-img="duo" alt="Corine und Caro, ELOURE THE STUDIO" style="width:100%;height:100%;object-fit:cover;object-position:50% 25%"></div>
 <div class="fx d1"><span class="label">Unsere Geschichte</span><h2>Mit Leidenschaft, Kompetenz und Empathie.</h2><div class="rule"></div>
 <p class="lead">Wir sind ELOURE THE STUDIO – deine zertifizierten Experten für Laserhaarentfernung. Unser Ziel ist es, dir zu einem selbstbewussten, strahlenden Auftreten zu verhelfen. Deine individuellen Bedürfnisse und persönliche Betreuung stehen dabei im Mittelpunkt.</p>
 <p class="lead" style="margin-top:16px">Wir arbeiten mit moderner Lasertechnologie, legen Wert auf faire Preise und hohe Qualität – damit du dich bei uns rundum wohlfühlst. Deine Zufriedenheit steht an erster Stelle.</p></div></div></section>
<section class="story"><div class="wrap grid"><div class="copy fx"><span class="label">Unsere Philosophie</span><h2>Unsere Türen stehen <em>allen offen.</em></h2><p>Wir erklären dir im Beratungsgespräch den Ablauf, analysieren deine Haut und Haare und finden den passenden Behandlungsplan. Die Behandlung ist auch für empfindliche Haut geeignet.</p><a class="btn light" data-book="beratung-beratungsgespraech">Beratung buchen →</a></div>
 <div class="pic fx d1"><div class="arch"><img data-img="team" alt="Das Team von ELOURE THE STUDIO" style="object-position:50% 30%"></div></div></div></section>
<section><div class="wrap two"><div class="fx"><span class="label">Unser Studio</span><h2>Neu und exklusiv eingerichtet – im Zentrum von Amriswil.</h2><div class="rule"></div><p class="lead" style="margin-bottom:28px">Eine offene, vertrauensvolle Atmosphäre, in der wir auf jede Person individuell eingehen.</p><a class="link" href="unser-studio.html">Studio ansehen →</a></div>
 <div class="mosaic" style="grid-template-columns:1fr 1fr"><div class="zoom fx" style="aspect-ratio:3/4"><img data-img="s1" alt="ELOURE Studio"></div><div class="zoom fx d1" style="aspect-ratio:3/4;margin-top:40px"><img data-img="s3" alt="ELOURE Studio Details"></div></div></div></section>${cta}` });

const mosaicItem = (img, span, ratio, extra = '', alt = 'ELOURE THE STUDIO') => `<div class="zoom fx" style="grid-column:span ${span};aspect-ratio:${ratio};${extra}"><img data-img="${img}" alt="${alt}"></div>`;
layout({ file: 'unser-studio.html', title: 'Unser Studio | ELOURE THE STUDIO Amriswil',
  desc: 'Ein Blick in unser Studio an der Bahnhofstrasse 20 in Amriswil – neu und exklusiv eingerichtet, ein Ort zum Wohlfühlen.',
  body: `${hero('Unser Studio', 'Ein Ort <em>zum Wohlfühlen.</em>', 'Neu und exklusiv eingerichtet, im Zentrum von Amriswil – Bahnhofstrasse 20.')}
<section><div class="wrap"><div class="mosaic">
 ${mosaicItem('s1', 7, '16/10', '', 'Studio Amriswil')}${mosaicItem('s2', 5, 'auto', 'border-radius:999px 999px 6px 6px;min-height:340px', 'Studio Detail')}
 ${mosaicItem('s3', 4, '1', '', 'Studio')}${mosaicItem('s4', 4, '1', '', 'Studio')}${mosaicItem('s5', 4, '1', '', 'Studio')}
 ${mosaicItem('room', 6, '4/3', '', 'Behandlungsraum')}${mosaicItem('team', 6, '4/3', '', 'Das ELOURE Team')}</div></div></section>
<section class="studio"><div class="wrap two"><div class="fx"><span class="label">Anfahrt</span><h2>Mitten in Amriswil.</h2><div class="rule"></div><p class="lead" style="margin-bottom:26px">ELOURE THE STUDIO<br>Bahnhofstrasse 20<br>8580 Amriswil<br>Mo–Fr 10:00–20:00 · Sa 10:00–16:00</p><a class="link" href="kontakt.html">Kontakt &amp; Karte →</a></div><div class="map fx" style="margin:0;aspect-ratio:4/3"><iframe loading="lazy" title="Karte" src="https://www.google.com/maps?q=Bahnhofstrasse+20,+8580+Amriswil&amp;output=embed"></iframe></div></div></section>${cta}` });

layout({ file: 'kontakt.html', title: 'Kontakt &amp; Anfahrt | ELOURE THE STUDIO Amriswil',
  desc: 'Kontakt, Anfahrt und Öffnungszeiten von ELOURE THE STUDIO, Bahnhofstrasse 20, 8580 Amriswil.',
  body: `${hero('Kontakt &amp; Anfahrt', 'Wir freuen uns <em>auf dich.</em>')}
<section><div class="wrap"><div class="contact-grid">
 <dl class="info fx"><dt>Adresse</dt><dd>ELOURE THE STUDIO<br>Bahnhofstrasse 20<br>8580 Amriswil</dd><dt>Telefon / WhatsApp</dt><dd><a href="tel:+41765297129">+41 76 529 71 29</a></dd><dt>E-Mail</dt><dd><a href="mailto:elourethestudio@outlook.com">elourethestudio@outlook.com</a></dd><dt>Öffnungszeiten</dt><dd>Montag–Freitag 10:00–20:00<br>Samstag 10:00–16:00</dd><dt>Instagram</dt><dd><a href="https://www.instagram.com/elourethestudio/">@elourethestudio</a></dd><br><br><a class="btn" data-book>Termin buchen →</a></dl>
 <form class="fx d1" id="contact" novalidate>
  <div class="two-f f"><div><label for="v">Vorname</label><input id="v" required></div><div><label for="n">Nachname</label><input id="n" required></div></div>
  <div class="two-f f"><div><label for="e">E-Mail</label><input id="e" type="email" required></div><div><label for="t">Telefonnummer (optional)</label><input id="t" type="tel"></div></div>
  <div class="f"><label for="m">Nachricht</label><textarea id="m" required></textarea></div>
  <label class="consent"><input type="checkbox" id="c" required> Ich habe die <a class="link" href="datenschutz.html">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben einverstanden.</label>
  <p class="err" id="cerr" hidden>Bitte alle Pflichtfelder ausfüllen und der Datenschutzerklärung zustimmen.</p>
  <button class="btn" style="border:0;cursor:pointer">Senden →</button></form></div>
 <div class="map fx"><iframe loading="lazy" title="Karte" src="https://www.google.com/maps?q=Bahnhofstrasse+20,+8580+Amriswil&amp;output=embed"></iframe></div>
</div></section>`,
  scripts: `<script>document.getElementById('contact').onsubmit=e=>{e.preventDefault();const g=i=>document.getElementById(i).value.trim();
if(!g('v')||!g('n')||!/^\\S+@\\S+\\.\\S+$/.test(g('e'))||!g('m')||!document.getElementById('c').checked){document.getElementById('cerr').hidden=false;return}
const body='Name: '+g('v')+' '+g('n')+'\\nE-Mail: '+g('e')+(g('t')?'\\nTelefon: '+g('t'):'')+'\\n\\n'+g('m');
location.href='mailto:elourethestudio@outlook.com?subject='+encodeURIComponent('Kontaktanfrage Website')+'&body='+encodeURIComponent(body);
e.target.innerHTML='<h3>Vielen Dank!</h3><p class="lead">Deine Nachricht ist in deinem E-Mail-Programm bereit. Sobald du sie abgeschickt hast, melden wir uns bei dir.</p>'}</script>\n` });

/* ---------- FAQ (zusammengefasst aus der bestehenden FAQ-Seite) ---------- */
const FAQ = [
 ['Was ist Laserhaarentfernung?', 'Ein kosmetisches Verfahren, das unerwünschte Haare langfristig reduziert. Es arbeitet präzise und die Sitzungen sind vergleichsweise kurz.'],
 ['Wie funktioniert Laserhaarentfernung?', 'Der Laser zielt auf das Melanin im Haar. Dadurch erwärmt sich der Haarfollikel und der Nachwuchs wird gebremst. Am besten wirkt es in der Wachstumsphase der Haare.'],
 ['Welche Ergebnisse kann ich erwarten?', 'Die Ergebnisse hängen von Hauttyp, Haarfarbe und behandelter Zone ab. Die Haare werden mit jeder Sitzung weniger; für ein nachhaltiges Ergebnis sind in der Regel mehrere Sitzungen im Abstand von einigen Wochen nötig.'],
 ['Wann fallen die Haare aus?', 'Behandelte Haare fallen meist innerhalb von ein bis drei Wochen aus. Eine dauerhafte Reduktion erreichst du mit mehreren Behandlungen.'],
 ['Wie oft muss ich zur Laserhaarentfernung?', 'Das ist individuell. Die Behandlungen können sich über rund zwei Jahre erstrecken, mit der Zeit grösseren Abständen von bis zu 12 Wochen. Gesicht und Achseln brauchen oft etwas mehr Sitzungen.'],
 ['Wie lange dauert eine Behandlung?', 'Kleine Zonen dauern etwa 10 bis 20 Minuten, grössere Zonen 30 bis 60 Minuten. Die genaue Dauer siehst du bei jeder Behandlung.'],
 ['Wie lange bin ich haarfrei?', 'Die Ergebnisse können Monate bis Jahre anhalten – die Dauer ist von Mensch zu Mensch unterschiedlich.'],
 ['Wann muss ich mich rasieren?', 'Rasiere die Zone 24 bis 48 Stunden vor der Behandlung, sodass noch leichte Stoppeln stehen bleiben. Bitte nicht wachsen oder zupfen.'],
 ['Wie rasiere ich am besten mein Gesicht?', 'Am besten mit einem Einklingen-Rasierer fürs Gesicht, der die Haare sauber an der Oberfläche schneidet – in Haarwuchsrichtung.'],
 ['Was muss ich vor und nach der Behandlung beachten?', 'Vorher: Sonne, Selbstbräuner und aggressive Hautpflege meiden und vier Wochen vorher nicht wachsen. Nachher: Haut kühlen und pflegen, konsequent Sonnenschutz verwenden und zwei Tage lang Chlor, Salzwasser und starkes Schwitzen meiden.'],
 ['Wann kann ich keine Laserhaarentfernung durchführen?', 'Nicht geeignet sind unter anderem sehr dunkle Haut (ggf. Testfeld), helle Haare, aktive Hauterkrankungen, bestimmte lichtsensibilisierende Medikamente, Schwangerschaft, Stillzeit und frisch sonnengeschädigte Haut. Im Beratungsgespräch klären wir das persönlich.'],
 ['Welcher Laser ist der beste?', 'Das hängt von Hauttyp, Haarfarbe und Ziel ab. Der Diodenlaser gilt als vielseitig und ist auch für dunklere Haut geeignet. Laser arbeiten gezielter als IPL, das mit einem breiteren Lichtspektrum arbeitet.'],
 ['Wer darf Laserhaarentfernung durchführen?', 'Nur qualifizierte Fachpersonen sollten eine Laserhaarentfernung durchführen.'],
 ['Wie sieht es mit Terminen und Absagen aus?', 'Termine kannst du online buchen. Absagen sind bis 24 Stunden vor dem Termin möglich, sonst wird der volle Preis verrechnet. Bezahlt wird bar vor Ort.']
];
layout({ file: 'faq.html', title: 'FAQ Laserhaarentfernung | ELOURE THE STUDIO Amriswil',
  desc: 'Antworten auf häufige Fragen zur Laserhaarentfernung: Ablauf, Vorbereitung, Nachsorge, Ergebnisse und Anzahl Sitzungen.',
  body: `${hero('FAQ', 'Gut zu wissen – <em>deine Fragen.</em>')}<section style="padding-top:50px"><div class="wrap prose" style="max-width:860px">
${FAQ.map(([q, a]) => `<details class="fx"><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
<p class="note" style="margin-top:30px">Noch Fragen? <a class="link" href="kontakt.html">Schreib uns</a> oder <a class="link" href="termin-buchen.html?s=beratung-beratungsgespraech">buche ein Beratungsgespräch</a>.</p></div></section>${cta}`,
  ld: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }) });

/* ---------- Rechtliches ---------- */
layout({ file: 'impressum.html', title: 'Impressum | ELOURE THE STUDIO', desc: 'Impressum von ELOURE THE STUDIO – Eloure GmbH, Amriswil.',
  body: `${hero('Rechtliches', 'Impressum')}<section style="padding-top:50px"><div class="wrap prose">${legalNote('impressum')}
<h2>Angaben gemäss Gesetz</h2><p><b>Eloure GmbH</b> (ELOURE THE STUDIO)<br>Bahnhofstrasse 20<br>8580 Amriswil</p>
<h3>Vertreten durch</h3><p>Corine Claudia Keller</p>
<h3>Handelsregister</h3><p>TR 6257, Kanton St. Gallen</p>
<h3>Umsatzsteuer-Identifikationsnummer (UID)</h3><p>CHE-492.666.255</p>
<h3>Kontakt</h3><p>Telefon: <a href="tel:+41765297129">+41 76 529 71 29</a><br>E-Mail: <a href="mailto:elourethestudio@outlook.com">elourethestudio@outlook.com</a></p>
<h3>Streitbeilegung</h3><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></div></section>` });

layout({ file: 'agb.html', title: 'AGB | ELOURE THE STUDIO', desc: 'Allgemeine Geschäftsbedingungen von ELOURE THE STUDIO: Buchung, Absage, Zahlung und Haftung.',
  body: `${hero('Rechtliches', 'Allgemeine <em>Geschäftsbedingungen</em>')}<section style="padding-top:50px"><div class="wrap prose">${legalNote('agb-s')}
<h2>Durchführung</h2><p>Die Dienstleistung wird sorgfältig erbracht; ein bestimmter Erfolg wird nicht garantiert. Die Gesundheit der Kundin bzw. des Kunden hat oberste Priorität.</p>
<h2>Buchung und Vertragsabschluss</h2><p>Angebote auf der Website sind unverbindlich. Eine Buchung (telefonisch, über Kontaktformular oder Online-Buchung) ist ein Angebot der Kundschaft und wird verbindlich, sobald eine Bestätigung per E-Mail oder Telefon erfolgt.</p>
<h2>Absage</h2><p>Termine müssen mindestens 24 Stunden vor dem vereinbarten Zeitpunkt abgesagt werden. Andernfalls wird der volle Preis verrechnet, als hätte der Termin stattgefunden.</p>
<h2>Haftungsausschluss</h2><p>Allergien und andere relevante Umstände sind wahrheitsgemäss anzugeben. Für falsche oder unvollständige Angaben übernimmt ELOURE keine Verantwortung. Die Behandlung kann bei Risiken verweigert werden. Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.</p>
<h2>Zahlung</h2><p>Die Zahlung erfolgt bar vor Ort nach dem Termin. Wird eine Gebühr für eine zu späte Absage fällig, erfolgt die Zahlung per Rechnung.</p>
<h2>Cookies, Inhalte und Links</h2><p>Die Website verwendet Cookies; technisch notwendige Cookies sind stets aktiv. Die Inhalte dieser Website sind urheberrechtlich geschützt. Weitere Regelungen zu Verlinkungen, Kommentaren und Haftung für Inhalte findest du im vollständigen Wortlaut.</p>
<h2>Anwendbares Recht</h2><p>Es gilt ausschliesslich Schweizer Recht.</p></div></section>` });

layout({ file: 'datenschutz.html', title: 'Datenschutzerklärung | ELOURE THE STUDIO', desc: 'Datenschutzerklärung von ELOURE THE STUDIO.',
  body: `${hero('Rechtliches', 'Datenschutz<em>erklärung</em>')}<section style="padding-top:50px"><div class="wrap prose">${legalNote('datenschutz')}
<p class="note" style="color:#9b3b2a">Hinweis zum Prototyp: Diese Seiten werden aktuell bei GitHub Pages gehostet und Terminanfragen laufen über das E-Mail- bzw. WhatsApp-Programm der Besucher. Bevor die Website produktiv geht, muss diese Erklärung zum tatsächlichen Hosting und Anfrageweg passen.</p>
<h2>Verantwortliche Stelle</h2><p>Eloure GmbH, Wiesenstrasse 11, 9436 Balgach, Schweiz<br>Telefon: +41 76 529 71 29 · E-Mail: elourethestudio@outlook.com</p>
<h2>Datenerfassung auf dieser Website</h2><p>Daten entstehen durch deine Eingaben (z. B. Kontakt- oder Buchungsanfrage) sowie automatisch durch technische Daten wie Browser, Betriebssystem und Zeitpunkt des Besuchs.</p>
<h2>Kontaktanfragen und Terminanfragen</h2><p>Angaben aus Anfragen per Formular, E-Mail, Telefon oder WhatsApp werden zur Bearbeitung gespeichert und nicht ohne deine Einwilligung weitergegeben. Sie werden gelöscht, wenn du die Löschung verlangst, die Einwilligung widerrufst oder der Zweck entfällt – vorbehältlich gesetzlicher Aufbewahrungspflichten.</p>
<h2>Cookies</h2><p>Notwendige Cookies werden auf Grundlage des berechtigten Interesses gespeichert, weitere nur mit deiner Einwilligung. Du kannst Cookies in den Browser-Einstellungen einschränken.</p>
<h2>Soziale Medien</h2><p>Eingebundene Instagram-Funktionen verbinden dein Gerät mit den Servern von Meta; die Verarbeitung erfolgt auf Grundlage deiner Einwilligung.</p>
<h2>Deine Rechte</h2><p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch und Widerruf der Einwilligung sowie auf Beschwerde bei einer Aufsichtsbehörde.</p>
<h2>Sicherheit</h2><p>Diese Website nutzt SSL-/TLS-Verschlüsselung. Eine vollständige Sicherheit bei der Datenübertragung im Internet kann nicht garantiert werden.</p></div></section>` });

/* ---------- one page per treatment ---------- */
const FACE = /Gesicht|Oberlippe|Konturen/;
const IMGS = ['s1', 's2', 's3', 's4', 's5', 'room'];
ALL.forEach((s, i) => {
  const isCons = s.cat === 'beratung', who = s.cat === 'maenner' ? 'Männer' : s.cat === 'frauen' ? 'Frauen' : '';
  const price = s.price == null ? 'auf Anfrage' : `${s.price} CHF`;
  const related = SERVICES[s.cat].filter(x => x !== s);
  const prep = isCons ? `<p>${s.desc}.</p><p>Bring einfach deine Fragen mit – wir nehmen uns Zeit für dich.</p>` : `
<h2>Vor der Behandlung</h2><ul><li>Rasiere die Zone <b>24 bis 48 Stunden vorher</b>, sodass noch leichte Stoppeln stehen bleiben.</li><li>Bitte nicht wachsen oder zupfen – vier Wochen vorher mit dem Wachsen aufhören.</li><li>Sonne, Selbstbräuner und aggressive Hautpflege meiden.</li>${FACE.test(s.name) ? '<li>Im Gesicht am besten mit einem Einklingen-Rasierer in Haarwuchsrichtung rasieren.</li>' : ''}</ul>
<h2>Nach der Behandlung</h2><ul><li>Haut kühlen und pflegen.</li><li>Konsequent Sonnenschutz verwenden.</li><li>Zwei Tage lang Chlor, Salzwasser und starkes Schwitzen meiden.</li></ul>
<h2>Wie viele Sitzungen?</h2><p>Für ein nachhaltiges Ergebnis sind in der Regel mehrere Sitzungen im Abstand von einigen Wochen nötig. Mehr dazu in den <a href="faq.html">FAQ</a>.</p>`;
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: `Laserhaarentfernung ${s.name}${who ? ' (' + who + ')' : ''}`, provider: { '@type': 'HealthAndBeautyBusiness', name: 'ELOURE THE STUDIO', address: { '@type': 'PostalAddress', streetAddress: 'Bahnhofstrasse 20', postalCode: '8580', addressLocality: 'Amriswil', addressCountry: 'CH' } }, ...(s.price != null ? { offers: { '@type': 'Offer', price: s.price, priceCurrency: 'CHF' } } : {}) });
  layout({ file: s.page, ld,
    title: `${esc(s.name)} ${isCons ? '' : 'Laserhaarentfernung ' + who + ' '}Amriswil | ELOURE`.replace('  ', ' '),
    desc: `${esc(s.name)}${who ? ' für ' + who : ''} bei ELOURE THE STUDIO in Amriswil: ${s.dur}${s.price != null ? ', ' + s.price + ' CHF' : ''}. Jetzt Termin buchen.`,
    body: `<section class="tpage" style="padding-top:60px"><div class="wrap two">
 <div class="fx"><p class="crumbs"><a href="leistungen.html">Leistungen</a> / ${CATS[s.cat]}</p><h1 style="font-size:clamp(42px,5.5vw,70px)">${esc(s.name)}</h1><div class="rule"></div>
  <p class="lead">${s.desc ? s.desc + '.' : `Professionelle Laserhaarentfernung${who ? ' für ' + who : ''} bei ELOURE THE STUDIO in Amriswil – präzise, sicher und persönlich betreut.`}</p>
  <div class="facts"><div><small>Dauer</small><b>${s.dur}</b></div><div><small>Preis</small><b>${price}</b></div></div>
  <a class="btn" href="${BOOK}?s=${s.slug}">${isCons ? 'Termin anfragen' : 'Jetzt buchen'} →</a></div>
 <div class="arch fx d1"><img data-img="${IMGS[i % IMGS.length]}" alt="ELOURE THE STUDIO – ${esc(s.name)}" style="object-position:50% 40%"></div></div></section>
<section style="padding-top:0"><div class="wrap prose">${prep}
<h2>Termin &amp; Zahlung</h2><p>Absagen sind bis 24 Stunden vor dem Termin möglich. Bezahlt wird bar vor Ort nach der Behandlung. Öffnungszeiten: Mo–Fr 10:00–20:00, Sa 10:00–16:00.</p>
<h2>Weitere Behandlungen</h2><div class="chips">${related.map(r => `<a href="${r.page}">${esc(r.name)}</a>`).join('')}</div></div></section>${cta}` });
});
console.log('pages written:', 9 + ALL.length);
