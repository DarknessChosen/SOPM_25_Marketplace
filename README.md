# GameHub — React (Web) & React Native (Android & iOS)

Un hub simplu și fun în care alegi rapid unul dintre trei jocuri făcute individual de fiecare student al echipei. David (autorul paginii de bun‑venit) construiesc **landing-ul** și selectorul de jocuri; fiecare membru livrează câte un joc Web în React, apoi îl portăm în **React Native** pentru Android si iOS.

> 🎯 **Obiectiv de laborator**: un produs minim viabil (MVP) plăcut vizual, cu 3 jocuri jucabile, scor/local storage, navigație clară și documentație.

---

## Cuprins

* [Funcționalități cheie](#funcționalități-cheie)
* [Tehnologii](#tehnologii)
* [Arhitectură & structură directoare](#arhitectură--structură-directoare)
* [Pagini & navigație](#pagini--navigație)
* [Jocuri (sloturi)](#jocuri-sloturi)
* [Instalare & rulare](#instalare--rulare)
* [Calitate cod & testare](#calitate-cod--testare)
* [Portare în React Native (Android)](#portare-în-react-native-android)
* [Contribuții & roluri](#contribuții--roluri)

---

## Funcționalități cheie

* 🏠 **Landing/Welcome** cu selector de jocuri (carduri + preview + buton *Play*).
* 🎮 **3 jocuri** independente, fiecare în propriul modul.
* 🧭 **Navigație** cu React Router (Home → Game → Back to Hub).
* 🏆 **Scor & best score** salvate local (localStorage).
* 📱 **Port mobil**: același joc portat în React Native (Android) după finalizarea versiunii Web.
* 🎨 **Design coerent** (temă, fonturi, culori, iconografie) + dark mode opțional.

## Tehnologii

* **Runtime**: Node.js LTS (18/20)
* **Web**: React 18 + **Create React App (react-scripts)** pe portul implicit **[http://localhost:3000](http://localhost:3000)**
* **Routing**: React Router DOM
* **Stilizare**: CSS Modules / SCSS sau Tailwind (la alegere)
* **Testare**: Jest + React Testing Library
* **Calitate**: ESLint + Prettier (opțional Husky/lint-staged)

---

## Arhitectură & structură directoare

```text
firstapp/
├─ public/
│  ├─ index.html
│  └─ assets/                    # favicon, imagini globale (opțional)
├─ src/
│  ├─ index.jsx
│  ├─ App.jsx
│  └─ GameHub/                   # TOT proiectul GameHub locuiește aici
│     ├─ app/                    # layout, temă, router, providers
│     │  ├─ Router.jsx
│     │  └─ theme.css / tailwind.css
│     ├─ components/             # UI reutilizabil (Button, Card, ScoreBadge, etc.)
│     ├─ pages/                  # fiecare pagină în propriul folder
│     │  ├─ Home/
│     │  │  ├─ index.jsx         # pagina principală (selector jocuri) — făcută de tine
│     │  │  ├─ styles.css / module.css
│     │  │  └─ assets/           # imagini, gif‑uri pentru carduri
│     │  ├─ About/
│     │  │  ├─ index.jsx
│     │  │  └─ assets/
│     │  └─ NotFound/
│     │     └─ index.jsx
│     ├─ games/                  # fiecare joc în folder propriu
│     │  ├─ game-a/
│     │  │  ├─ index.jsx         # UI joc A
│     │  │  ├─ logic.js          # reguli/logică pură (ușor de portat în RN)
│     │  │  ├─ styles.css
│     │  │  └─ assets/
│     │  ├─ game-b/
│     │  │  ├─ index.jsx
│     │  │  ├─ logic.js
│     │  │  ├─ styles.css
│     │  │  └─ assets/
│     │  └─ game-c/
│     │     ├─ index.jsx
│     │     ├─ logic.js
│     │     ├─ styles.css
│     │     └─ assets/
│     ├─ hooks/                  # useBestScore, useLocalStorage etc.
│     ├─ utils/                  # helperi generici
│     └─ styles/                 # stiluri globale
├─ package.json
└─ README.md
```

**Principiu**: *fiecare pagină are propriul director* (cu `index.jsx`, stiluri și `assets/`). Jocurile păstrează logica în fișiere separate (`logic.js`) pentru a fi reutilizată în portarea React Native.

---

## Pagini & navigație

* **/** – Landing/Welcome (carduri cu previzualizare, descriere, *Play*).
* **/game/:id** – Pagina jocului (UI + scor + butoane „Restart” / „Back to Hub”).
* **/about** – Despre proiect & echipă (opțional).

Routing: `react-router-dom` cu `BrowserRouter`.

---

## Jocuri (sloturi)

* **Game A** — *Nume joc* · Autor: *David*
* **Game B** — *Nume joc* · Autor: *Madalin*
* **Game C** — *Nume joc* · Autor: *Marian*

---

## Instalare & rulare

### Prerechizite

* Node.js 18+ (recomandat 20+)
* npm

### Setup proiect (Web)

```bash
cd firstapp
npm install
npm start            # pornește dev server pe http://localhost:3000
```

Build de producție:

```bash
npm run build        # output în folderul build/
```

(Optional) Servește build-ul local cu un server static (`serve` sau `http-server`).

---

## Calitate cod & testare

* **ESLint + Prettier** pentru stil consistent.
* **Testare**: Jest + React Testing Library pentru UI; teste unitare pe `logic.js` din jocuri.

Scripturi tipice (CRA):

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint ."
  }
}
```

---

## Portare în React Native (Android)

**Strategie**: Refolosești **logica din** `src/GameHub/games/**/logic.js`.

Mapare rapidă:

* Pagini → Screens (`HomeScreen`, `GameXScreen`) cu React Navigation
* Button/Card web → `Pressable` / `TouchableOpacity` + `View`/`Text`
* `localStorage` → `@react-native-async-storage/async-storage`

Pași:

1. Creează un nou proiect RN cu Expo într-un repo/folder separat (ex.: `gamehub-mobile`).
2. Copiază logicile din `src/GameHub/games/**/logic.js` (evită API-uri de browser).
3. Fă `HomeScreen` (selector jocuri) + câte un `GameXScreen`.
4. Integrează best score cu `AsyncStorage` folosind aceleași chei (`gamehub:game-x:best`).
5. Rulează pe Android: `npx expo start` → `a`.

Build: EAS Build (opțional pentru APK/AAB).

---

## Contribuții & roluri

* **Landing & design sistem**: *David* (owner Home, temă, navigație, integrare jocuri).
* **Game A**: *David* — descriere scurtă.
* **Game B**: *Madalin* — descriere scurtă.
* **Game C**: *Marian* — descriere scurtă.

> Fiecare autor își face UI-ul jocului în Web și apoi îl portează în Mobile folosind logica comună.
