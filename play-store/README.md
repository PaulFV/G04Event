# G04Event für Google Play

Dieses Verzeichnis enthält die Android-Hülle für G04Event. Es handelt sich um eine
Trusted Web Activity (TWA), erzeugt mit Bubblewrap: Die App öffnet die veröffentlichte PWA
`https://paulfv.github.io/G04Event/` im Vollbild über Chrome. Termine, Suche, Service Worker
und Erinnerungen bleiben damit an einer Stelle gepflegt — jede Änderung an der Website ist
sofort auch in der App.

## Öffentliche URLs

- App: `https://paulfv.github.io/G04Event/`
- Datenschutz / Privacy Policy: `https://paulfv.github.io/G04Event/privacy.html`
- Copyright/Lizenz: in der App und in `privacy.html`
- Kontakt: fodorpaul@web.de

## Fester App-Identifier

`de.g04event.app` — muss vor dem ersten Upload endgültig sein und darf danach nicht mehr
geändert werden.

## Build über GitHub Actions

Der Workflow [`android-build.yml`](../.github/workflows/android-build.yml) baut das App Bundle
(`.aab`) bei `workflow_dispatch` (Actions → *Android App Bundle* → *Run workflow*) oder bei
Änderungen unter `play-store/android-twa/`. Das Ergebnis liegt als Artefakt
`g04event-release-bundle` am Workflow-Lauf.

Für ein **signiertes** Bundle unter **Repository → Settings → Secrets and variables → Actions**
diese Secrets anlegen:

- `ANDROID_KEYSTORE_BASE64` – Base64-Inhalt der Keystore-Datei
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS` (bei Bubblewrap: `android`)
- `ANDROID_KEY_PASSWORD`

Ohne diese Secrets entsteht ein unsigniertes Prüf-Bundle — gut zum Testen, aber nicht
hochladbar. Der Upload-Schlüssel ist `play-store/android-twa/g04event-upload.keystore` (Alias `android`,
angelegt am 19.09.2026; nicht im Repository, siehe `.gitignore`). Als Base64 erzeugen:

```text
certutil -encode g04event-upload.keystore keystore.b64
```

Aus `keystore.b64` die Kopf- und Fußzeile (`-----BEGIN/END CERTIFICATE-----`) entfernen und den
Rest als `ANDROID_KEYSTORE_BASE64` eintragen. Den Schlüssel sicher aufbewahren — ohne ihn sind
keine Updates mehr möglich (außer mit Play App Signing und Schlüssel-Reset über Google).

## Lokal bauen

JDK 17 und Android SDK liegen bereits unter `%USERPROFILE%\.bubblewrap` bzw.
`%LOCALAPPDATA%\Android\Sdk`:

```text
set JAVA_HOME=%USERPROFILE%\.bubblewrap\jdk\jdk-17.0.11+9
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
cd play-store\android-twa
gradlew.bat bundleRelease
```

Ergebnis: `app/build/outputs/bundle/release/app-release.aab`.

Vor jedem neuen Upload in `app/build.gradle` `versionCode` um 1 erhöhen (und `versionName`
anpassen) — Google Play lehnt eine bereits verwendete `versionCode` ab.

## Domain-Verknüpfung (Digital Asset Links) — wichtig

Android öffnet die App nur dann **ohne Browser-Adressleiste**, wenn die Domain die App
bestätigt. Die Datei muss an der **Wurzel der Domain** liegen:

`https://paulfv.github.io/.well-known/assetlinks.json`

Diese Datei gibt es bereits (Repository `paulfv.github.io`), sie enthält aber **nur G04EggX**.
Für G04Event muss ein zweiter Eintrag dazu — die Vorlage mit beiden Apps steht in
[`assetlinks.json`](assetlinks.json). Den Platzhalter durch den SHA-256-
Fingerprint aus der Play Console (**Test und Release → App-Integrität → App-Signatur**)
ersetzen; bei Play App Signing zählt dieser Schlüssel, nicht nur der lokale Upload-Schlüssel.
Den Fingerprint des Upload-Schlüssels zusätzlich einzutragen schadet nicht.

Prüfen nach dem Veröffentlichen:
`https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://paulfv.github.io&relation=delegate_permission/common.handle_all_urls`

## Absturzsicherheit

- Die Android-Hülle ist Bubblewrap-Standardcode; der bekannte Absturz beim Setzen der
  Ausrichtung auf Android 8.0 und älter ist bereits abgefangen (`LauncherActivity`).
- Benachrichtigungssymbol ist eine weiße Silhouette auf transparentem Grund (farbige Symbole
  erscheinen in der Statusleiste sonst als weißes Quadrat).
- Die Web-App prüft gespeicherte Daten beim Start und sortiert beschädigte eigene Termine aus.
  Scheitert der Start dennoch, erscheint statt einer leeren Seite ein Hinweis mit
  *Neu laden* und *Daten zurücksetzen*.
- Ohne Netz startet die App aus dem Service-Worker-Cache.

## Play-Store-Checkliste

- [ ] Play-Console-App mit dem Identifier `de.g04event.app` anlegen
- [ ] Datenschutz-URL hinterlegen: `https://paulfv.github.io/G04Event/privacy.html`
- [ ] Data-Safety-Formular: keine Datenerhebung, keine Weitergabe — alle Einstellungen,
      Merkliste und eigene Termine bleiben lokal auf dem Gerät (siehe `privacy.html`);
      Google Fonts wird beim Laden der Schriften angefragt
- [ ] App-Inhalte: Zielgruppe ab 13 Jahren, keine Werbung, Einstufungsfragebogen ausfüllen
- [ ] Store-Eintrag aus [`store-listing.md`](store-listing.md) übernehmen
- [ ] Grafiken: App-Symbol `android-twa/store_icon.png` (512 × 512), Feature-Grafik
      1024 × 500, mindestens 2 Handy-Screenshots
- [ ] Secrets setzen, Workflow starten, signiertes `.aab` im **internen Test** hochladen
- [ ] `assetlinks.json` im Repository `paulfv.github.io` um G04Event ergänzen
- [ ] Auf einem Android-Gerät testen: Vollbild ohne Adressleiste, Start ohne Netz, beide
      Sprachen, Hell/Dunkel, Erinnerungen, Zurück-Taste, Absturzberichte in der Play Console
      (*Android Vitals*) nach dem internen Test prüfen
