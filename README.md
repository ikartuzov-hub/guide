<p align="center">
  <img src="icon.svg" width="72" alt="Guide">
</p>

<h1 align="center">Guide</h1>

<p align="center">
  <em>An immersive local guide, in your language — starting with undiscovered Madeira.</em><br>
  <a href="https://ikartuzov-hub.github.io/guide/">Live demo</a> ·
  <a href="https://ikartuzov-hub.github.io/seedwave-catalog/hub">SeedWave Hub</a> ·
  <a href="https://www.linkedin.com/in/igor-kartuzov">Built by Igor Kartuzov</a>
</p>

---

## The problem
Travel guides are generic and language-flat — the same listicle, translated. A place worth knowing deserves a guide that feels local and speaks the reader's own language, not a tourist brochure.

## The build
Guide is a data-driven guide engine: each guide is a JSON file, loaded by `?guide=`, rendered multilingually on top of the same SeedWave core. The first one — *My Undiscovered Madeira* — is the studio's emotional entry point: the warm door into the rest of the ecosystem.

## Stack
`data-driven engine (data/{id}.json)` · `multilingual (RU/EN/PT/ES/DE)` · `GitHub Pages` · `two-theme UI`

## See it live
- **Demo:** https://ikartuzov-hub.github.io/guide/
- Any guide is one URL: `?guide={id}&lang={code}`.

## Screenshots
<!-- TODO: add 1–3 clean screenshots of the Madeira guide. Show the product, not the code.
<p align="center">
  <img src="screenshot-1.png" width="320" alt="My Undiscovered Madeira">
</p>
-->

## What's reusable
- **Content as data** — a new guide is a new JSON file, not a new build. The engine stays put.
- **Multilingual by layer** — the same guide renders in every supported language from one source.

## Status & next
- **Status:** live MVP — emotional entry point to the ecosystem.
- **Next:** more guides; English content pass.

---

<p align="center">
  <sub>© Igor Kartuzov · <a href="https://ikartuzov-hub.github.io/seedwave-catalog/hub">SeedWave</a> — AI-first studio · Madeira, EU</sub>
</p>
