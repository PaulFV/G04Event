# Städtejahr

Ein Überblick über **jährlich wiederkehrende Veranstaltungen in deutschen Städten** — mit Datum,
Dauer, Rhythmus und Kategorie. Stadt anklicken, Thema wählen, fertig.

Eine einzige HTML-Datei, kein Build, keine Abhängigkeiten, kein Backend.

## Funktionen

- **Städte-Auswahl** — jede Stadt als Schaltfläche mit Anzahl der Termine, mehrere gleichzeitig wählbar
- **Countdown** — die nächste Veranstaltung der gewählten Stadt mit Live-Countdown bis zum Start
  (läuft gerade etwas, zählt der Countdown bis zum Ende herunter)
- **Kategorien** — Technik, Essen, Spiel, Musik, Kultur, Film, Sport, Tradition, farblich codiert
- **Sortierung** — nach Datum, Dauer (lang/kurz zuerst), Stadt, Name oder Kategorie
- **Suche** über Name, Stadt, Bundesland und Beschreibung
- **Details** — Klick auf eine Zeile öffnet Beschreibung, Wochentag, Rhythmus und Bundesland
- Helles und dunkles Design, folgt der Systemeinstellung; funktioniert auf Handy und Desktop

## Starten

Datei `index.html` im Browser öffnen. Mehr ist nicht nötig.

Lokaler Server (optional):

```bash
python -m http.server 8000
```

## Veröffentlichen auf GitHub Pages

1. Repository auf GitHub anlegen und den Code hochladen:

```bash
git remote add origin https://github.com/BENUTZERNAME/staedtejahr.git
git push -u origin main
```

2. Im Repository unter **Settings → Pages** als Quelle **GitHub Actions** wählen.
   Der Workflow in `.github/workflows/pages.yml` veröffentlicht dann bei jedem Push auf `main`.

Die Seite liegt danach unter `https://BENUTZERNAME.github.io/staedtejahr/`.

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
| `l`  | Bundesland |
| `k`  | Kategorie: `tech` `food` `play` `music` `art` `film` `sport` `trad` |
| `s`  | Beginn der nächsten Ausgabe, `JJJJ-MM-TT` |
| `e`  | Ende (bei eintägigen Terminen gleich `s`) |
| `r`  | Rhythmus als Text, z. B. `"jährlich"`, `"alle 2 Jahre"` |
| `x`  | `1` = fester Regeltermin, `0` = aus dem Rhythmus fortgeschrieben |
| `d`  | ein Satz Beschreibung |

Dauer und Wochentag berechnet die App selbst aus `s` und `e` — nichts doppelt pflegen.

Eine neue Kategorie braucht zwei Ergänzungen: einen Eintrag in `CATS` und eine Farbvariable
`--c-name` in beiden Farbschemata (hell und dunkel).

## Zu den Terminen

Termine mit **gepunkteter Unterstreichung** (`x:0`) sind aus dem jährlichen Rhythmus
fortgeschrieben und vom Veranstalter noch nicht bestätigt — vor der Anreise auf der offiziellen
Seite prüfen. Feste Regeltermine (`x:1`) folgen einer Regel: Karneval ist an Ostern gekoppelt,
der Wiesn-Anstich fällt auf den dritten Septembersamstag, Weihnachtsmärkte enden an Heiligabend.

Stand der Daten: Saison 2026/27.

## Lizenz

MIT — siehe [LICENSE](LICENSE).
