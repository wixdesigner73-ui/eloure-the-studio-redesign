# ELOURE – Umsetzung im Wix Classic Editor

Die HTML-Dateien sind ein **Design-Prototyp** (Öffnen: `index.html` im Browser). Wix Classic kann sie nicht importieren; sie dienen als massgenaue Vorlage.

## Design-Tokens (Site-Farben & Schriften in Wix hinterlegen)
Farben: #F7F0E9 · #FFF9F4 · #E9D8CA · #BD7355 (Hover #A65C43) · #30251F · #9B8577 · #EEDFD4
Schriften: Cormorant Garamond (Titel, 66–82 px Hero / 44–58 px Sections), Manrope (Text 15–17 px, Labels 11 px, Grossbuchstaben, Laufweite ~0.18em).

## Aufbau Startseite (Strips, 980 px Inhaltsbreite)
1. Header-Strip (fixiert, ivory) – Logo links, Menü zentriert, Button «Termin buchen» (→ Wix Bookings).
2. Hero-Strip – Hintergrundverlauf Beige, Foto als Strip-Bild rechts (Bild-Fokus anpassen), Text/Buttons links, runder Terracotta-Stempel als Grafik.
3. Benefits-Strip – 4 Spalten, dünne Trennlinien (Linien-Elemente), Linien-Icons Terracotta.
4. Leistungen-Strip – Repeater mit 4 Karten, Bilder mit Form «Bogen» (Bild-Container mit oberem Radius oder Vektor-Maske).
5. Preise-Strip – Repeater/Tabelle, je Zeile Button → jeweilige Service-Buchungsseite.
6. Terracotta-Strip (#BD7355) – Text links, Bogenbild rechts.
7. Schritte-Strip – 4 Spalten mit Kreis-Nummern, Linie dahinter.
8. Studio-Strip – 1 Bogenbild + 2 Bilder + Textblock (Pro Gallery mit Lightbox für die Seite «Unser Studio»).
9. Abschluss-CTA-Strip, 10. Footer-Strip in Terracotta.
Animationen: Wix-Einblend-/Enthüllungs-Effekte, 300–700 ms. Mobil separat im Mobile-Editor gestalten.

## Wichtig
- Preise/Dauer stammen von `/book-online`. **Quelle der Wahrheit bleibt Wix Bookings**; die Preise im Design nicht doppelt pflegen (Dynamische Seiten/CMS oder Service-Widget nutzen).
- Offene Punkte (siehe Chat-Zusammenfassung): Logo-Datei, Zuordnung Frauen/Männer, Preise für Beratung/Probebehandlung, weitere Studiofotos, Impressum/Datenschutz/AGB/FAQ unverändert übernehmen, URL-Weiterleitungen (z. B. `/kontakt` bleibt, `/book-online` → `/termin-buchen` per 301).
