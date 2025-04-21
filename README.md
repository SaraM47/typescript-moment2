# Att göra-lista 

Detta projekt är en enkel men kraftfull att göra-lista byggd med HTML, CSS och TypeScript. Applikationen fokuserar på tillgänglighet, responsivitet, kodstruktur och användarvänlighet.

Projektet är en del av inlämningen för Moment 2, där krav som WCAG-anpassning, användning av TypeScript och lokal datalagring ska uppfyllas.

---

## Syfte

Syftet med applikationen är att ge användaren möjlighet att:
- Skapa uppgifter med olika prioritet
- Markera uppgifter som avklarade
- Redigera eller ta bort uppgifter
- Se sparade uppgifter även efter siduppdatering
- Använda verktyget oavsett enhet, skärmstorlek eller funktionsvariation

---

## Projektstruktur och kodöversikt

### `index.html`
- Grundläggande struktur och gränssnitt.
- Formulärfält för att mata in uppgifter och välja prioritet.
- Använder ett `<template>`-element som mall för uppgiftsrader.
- Visuellt dolda `<label>` och `aria-label` används för tillgänglighet.
- Fel- och bekräftelsemeddelanden hanteras via dedikerade `<div>`-element.

### `style.css`
- Sätter typografi, färgteman och layout via flexbox.
- Anpassad design för både desktop och mobil via media queries.
- Har en `.visually-hidden`-klass för skärmläsare.
- Lägger till olika färger och stilar beroende på om uppgifter är klara eller inte.

### `main.ts`
- Denna fil hanterar all dynamik i gränssnittet.
- Renderar uppgifter från `TodoList` till DOM via `<template>`.
- Lägger till event listeners för att:
  - Skicka in ny uppgift
  - Markera checkbox (klar/inte klar)
  - Redigera en befintlig uppgift
  - Ta bort en uppgift
- Har tydliga funktioner för att visa felmeddelanden och bekräftelser.
- Använder `todoList.getTodos()` och sorterar dem efter prioritet innan rendering.

### `todolist.ts`
- Innehåller en klass `TodoList` som ansvarar för all datalogik:
  - Skapa, redigera, markera och ta bort todos
  - Sortera uppgifterna enligt prioritet
  - Spara och hämta data från `localStorage`
- Returnerar alltid typer som `Todo[]` för att säkerställa att TypeScript förstår innehållet.

### `todo.ts`
- Definierar gränssnittet `Todo`, vilket specificerar hur varje uppgiftsobjekt ska se ut:
  - `task` (sträng)
  - `completed` (boolean)
  - `priority` (1, 2 eller 3)
  - `createdAt` (datumsträng)
  - `completedAt` (valfri datumsträng)

---

## Tillgänglighet (WCAG)

Följande metoder har använts för att uppfylla tillgänglighetskraven:

- Alla formulärfält har tillhörande `<label>` eller `aria-label`
- Ikonknappar (redigera, ta bort) är försedda med `aria-label`
- Kontraster uppfyller nivå AA enligt WCAG
- Responsiv design anpassar layouten för skärmläsare och mobila enheter
- Gränssnittet är testat med WAVE-verktyget för tillgänglighetskontroll

---

## Lagring

- Uppgifterna sparas lokalt i användarens webbläsare via `localStorage`.
- Varje gång användaren uppdaterar eller navigerar bort från sidan bevaras informationen.
- Allt hanteras transparent via `TodoList`-klassen.

---

## Så använder du projektet

1. Öppna `index.html` i webbläsaren (ingen server krävs)
2. Skriv in en uppgift, välj prioritet och tryck på "Lägg till"
3. Markera uppgifter som klara, redigera eller ta bort dem
4. Alla ändringar sparas automatiskt lokalt

> Du kan även bygga om TypeScript-filerna med `tsc` om du redigerar koden.

---

## Exempel på funktioner

- En ny uppgift skapas med:
  - Prioritet: 1 (högst), 2 (medel), 3 (låg)
  - Automatisk datumstämpel
- Redigeringsdialog visas via `prompt()`
- Avklarade uppgifter får genomstruken text och datum för när de slutfördes

