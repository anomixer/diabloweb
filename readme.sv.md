# Diablo Webbversion (DiabloWeb)

Detta är en webbversion av det ursprungliga Diablo-spelet, baserat på källkoden som rekonstruerats av GalaXyHaXz och devilution-teamet.

## 🎮 Spela online

Besök [diabloweb.pages.dev](https://diabloweb.pages.dev) för att börja spela direkt!

## 🌐 Språkstöd

Detta projekt stöder nu flerspråkiga gränssnitt:
- 🇺🇸 English (Engelska)
- 🇹🇼 繁體中文 (Traditionell kinesiska)
- 🇨🇳 简体中文 (Förenklad kinesiska)
- 🇯🇵 日本語 (Japanska)
- 🇰🇷 한국어 (Koreanska)
- 🇩🇪 Deutsch (Tyska)
- 🇪🇸 Español (Spanska)
- 🇫🇷 Français (Franska)
- 🇮🇹 Italiano (Italienska)
- 🇳🇱 Nederlands (Nederländska)
- 🇵🇹 Português (Portugisiska)
- 🇷🇺 Русский (Ryska)
- 🇸🇪 Svenska

Du kan byta språk i det övre högra hörnet av spelskärmen.

## 📋 Uppdatering 9 september 2025

### 🔧 Tekniska korrigeringar och förbättringar

- Förbättrad prestanda på mobila enheter
- Lösta problem med tangentbordsinmatning
- Uppdaterade WebAssembly-moduler för bättre kompatibilitet
- Förbättrad ljudkvalitet och prestanda

### ✨ Nya funktioner

- Stöd för ytterligare språk
- Förbättrade touchkontroller för mobila enheter
- Lokal lagring av sparfiler
- Stöd för flerspelarläge via WebRTC

## 🎲 Spellägen

### Shareware-version

Shareware-versionen kan spelas direkt utan att kräva ytterligare filer. Den erbjuder:
- Tillgång till den första dungeonsnivån
- Tre spelbara karaktärsklasser
- Begränsat spelinnehåll

### Fullständig version

För att spela den fullständiga versionen behöver du din egen DIABDAT.MPQ-fil, som du kan få med en originalversion av spelet från [GoG](https://www.gog.com/game/diablo).

Den fullständiga versionen erbjuder:
- Fullständig tillgång till alla 16 dungeonsnivåer
- Allt spelinnehåll och alla uppdrag
- Flerspelarfunktionalitet

## 🖥️ Lokal installation

1. Klona repositoryt: `git clone https://github.com/d07RiV/diabloweb.git`
2. Installera beroenden: `npm install --legacy-peer-deps`
3. Starta utvecklingsservern: `npm start`
4. För shareware-versionen krävs ingen ytterligare åtgärd
5. För den fullständiga versionen, placera din DIABDAT.MPQ-fil i webbläsarfönstret

## 📱 Mobilkontroller

- Tryck på skärmen för att röra dig
- Använd virtuella knappar för åtgärder
- Svep för att navigera i inventariet och menyer

## 🛠️ Teknik

Detta projekt använder:
- React för användargränssnittet
- WebAssembly för spellogiken
- Web Workers för prestandaoptimering
- IndexedDB för lokal lagring

## 📄 Licens

Detta projekt är baserat på devilution-källkoden och är föremål för dess licensvillkor.

## 🙏 Erkännanden

- GalaXyHaXz och devilution-teamet för rekonstruktionen av källkoden
- Blizzard Entertainment för det ursprungliga Diablo-spelet
- Alla bidragsgivare och översättare till detta projekt