# G04Event

Ein Überblick über **jährlich wiederkehrende Veranstaltungen in europäischen Städten** — mit Datum,
Dauer, Rhythmus und Kategorie. Unten auswählen, oben den Countdown ablesen.

**213 Termine · 19 Länder · 8 Kategorien**, Saison 2026/27.

Live: **https://paulfv.github.io/G04Event/**

Eine einzige HTML-Datei, kein Build, keine Abhängigkeiten, kein Backend.

## Funktionen

- **Bedienleiste am unteren Rand**, immer sichtbar — Suche, Land, Region, Stadt, Thema.
  Ein Tipp öffnet die Auswahl als Feld darüber, jeder Knopf zeigt an, was gerade gesetzt ist.
- **Kaskadierende Auswahl** — das Land schränkt die Regionen ein, die Region die Städte.
  Was nicht mehr passt, fällt automatisch aus der Auswahl.
- **Nächster Termin ganz oben**, hervorgehoben und mit Live-Countdown. Läuft gerade etwas,
  zählt der Countdown bis zum Ende. Die Ziffern sind eine Ampel: ab vier Tagen grün,
  ab drei Tagen gelb, am letzten Tag rot.
- **Sortierung** nach Datum, Dauer (lang/kurz zuerst), Stadt, Name oder Kategorie
- **Auswahl bleibt gespeichert** — beim nächsten Öffnen ist alles wieder gesetzt
  (`localStorage`, bleibt im Browser des Betrachters)
- **Details** — Tipp auf eine Zeile öffnet Beschreibung, Wochentag, Rhythmus, Region und Land
- Helles und dunkles Design, folgt der Systemeinstellung

## Auf dem Handy installieren

Die Seite ist eine installierbare Web-App (Manifest, Icons, Vollbildmodus, sichere Ränder für
Notch und Home-Indicator).

- **iPhone:** Seite in Safari öffnen → Teilen-Symbol → *Zum Home-Bildschirm*
- **Android:** Seite in Chrome öffnen → Menü → *App installieren*

Danach startet sie ohne Browserleiste, mit eigenem Icon.

## Starten

Datei `index.html` im Browser öffnen. Mehr ist nicht nötig.

Lokaler Server (nötig, damit Manifest und Installation greifen):

```bash
python -m http.server 8000
```

## Veröffentlichen

Jeder Push auf `main` aktualisiert die Seite:

```bash
git add -A && git commit -m "Neue Veranstaltungen" && git push
```

Die Quelle steht unter **Settings → Pages**; der Workflow in `.github/workflows/pages.yml`
übernimmt die Veröffentlichung.

## Veranstaltung hinzufügen

Alle Daten stehen als Liste `EVENTS` im `<script>`-Block von `index.html`. Eine Zeile je Termin:

```js
{n:"Wacken Open Air", c:"Wacken", l:"Schleswig-Holstein", k:"music",
 s:"2027-07-29", e:"2027-07-31", r:"jährlich", x:0,
 d:"Metalfestival im 1.800-Einwohner-Dorf, seit Jahren im Vorverkauf ausverkauft."},
```

| Feld | Bedeutung |
|------|-----------|
| `n`  | Name der Veranstaltung |
| `c`  | Stadt — neue Städte erscheinen automatisch in der Auswahl |
| `l`  | Region: Bundesland, Kanton, Provinz — je nach Land |
| `p`  | Land. **Fehlt das Feld, gilt Deutschland** — deshalb steht es nur bei den übrigen Ländern |
| `k`  | Kategorie: `tech` `food` `play` `music` `art` `film` `sport` `trad` |
| `s`  | Beginn der nächsten Ausgabe, `JJJJ-MM-TT` |
| `e`  | Ende (bei eintägigen Terminen gleich `s`) |
| `r`  | Rhythmus als Text, z. B. `"jährlich"`, `"alle 2 Jahre"` |
| `x`  | `1` = fester Regeltermin, `0` = aus dem Rhythmus fortgeschrieben |
| `d`  | ein Satz Beschreibung |

Dauer und Wochentag berechnet die App selbst aus `s` und `e` — nichts doppelt pflegen.

Eine neue Kategorie braucht zwei Ergänzungen: einen Eintrag in `CATS` (mit `h` als heller Variante
für den Kopfbereich) und eine Farbvariable `--c-name` in beiden Farbschemata.

## Icon

Das Logo ist ein Neon-Klecks auf Schwarz mit `G04E` auf einer türkisen Kugel. `icon-512.png`
ist die größte Fassung, alle anderen Größen sind daraus verkleinert: `favicon-32.png`,
`icon-180.png` (Apple Touch), `icon-192.png` und `icon-512-maskable.png`. Die maskable Fassung
sitzt auf 78 % Fläche vor schwarzem Grund, damit Android beliebig zuschneiden kann, ohne den
Schriftzug anzuschneiden. Ein SVG gibt es nicht mehr — die Verläufe und das Leuchten lassen sich
als Vektor nicht sauber nachbauen.

## Zu den Terminen

Termine mit **gepunkteter Unterstreichung** (`x:0`) sind aus dem jährlichen Rhythmus
fortgeschrieben und vom Veranstalter noch nicht bestätigt — vor der Anreise auf der offiziellen
Seite prüfen. Feste Regeltermine (`x:1`) folgen einer Regel: Karneval und Semana Santa hängen an
Ostern, der Wiesn-Anstich fällt auf den dritten Septembersamstag, San Fermín läuft immer vom
6. bis 14. Juli, deutsche Weihnachtsmärkte enden an Heiligabend.

## Lizenz

MIT — siehe [LICENSE](LICENSE).
