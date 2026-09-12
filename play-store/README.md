# G04Event – Vorbereitung für Google Play

Die Website ist jetzt als installierbare PWA mit Manifest, Icons, Service Worker und öffentlicher Datenschutzseite vorbereitet.

## Öffentliche URLs

- App: `https://paulfv.github.io/G04Event/`
- Privacy Policy: `https://paulfv.github.io/G04Event/privacy.html`
- Copyright/Lizenz: in der App und in `privacy.html`

## Was noch benötigt wird

1. Die eingetragenen Betreiber- und Kontaktdaten in `index.html` und `privacy.html` vor der Veröffentlichung nochmals prüfen.
2. Android-Paketname: `de.g04event.app`.
3. Mit Bubblewrap oder PWABuilder ein Android-TWA-Projekt erzeugen und als AAB bauen.
4. Nach dem Einrichten von Play App Signing die Datei `assetlinks.json.example` mit Paketname und SHA-256-Zertifikatsfingerprint ausfüllen.
5. Die ausgefüllte Datei auf der Website unter `/.well-known/assetlinks.json` veröffentlichen.
6. Im Play Console-Formular die Privacy-Policy-URL, Data-Safety-Angaben, App-Inhalte, Screenshots und Altersfreigabe hinterlegen.

## Wichtig

`assetlinks.json` darf erst mit den echten Werten veröffentlicht werden. Bei Play App Signing ist der Fingerprint aus der Play Console maßgeblich, nicht nur der lokale Upload-Key.

Vor der Einreichung außerdem die Live-URL auf HTTPS, Manifest, Service Worker, Offline-Start, Benachrichtigungen, beide Sprachen und die Datenschutzseite auf einem aktuellen Android-Gerät testen.
