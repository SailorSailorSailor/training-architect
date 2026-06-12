# Training Architect — Lux Nova Training

**Live app:** https://sailorsailorsailor.github.io/training-architect/

To publish updates: commit changes, then
`git subtree split --prefix public -b gh-pages --rejoin && git push origin gh-pages --force && git push`

Generates a complete, literature-grounded corporate training package from a topic selection and a duration:

1. **Training schedule** — timed agenda (modules, breaks, lunch) built around an input → practice → debrief structure
2. **Slide deck** — full deck with speaker notes, downloadable as a standalone HTML presentation (arrow-key navigation, print-to-PDF)
3. **Training materials** — facilitator guide, participant workbook, pre-work email, one-page reading guide, 30-day follow-up plan
4. **Management brief** — printable proposal for company approval: executive summary, business case with evidence, outcomes, format, investment, measurement, next steps

Every package is grounded in a curated library of published management literature (Kahneman, Kotter, Goleman, Stone & Heen, Lencioni, Whitmore, Fisher & Ury, Edmondson, …) — 13 topics across **Managerial Skills**, **Communication**, and **Personal Development**, each with seminal sources, teachable models, and practice exercises.

## Run it

No installation needed — it's a static web app.

**Option A (simplest):** double-click `public/index.html`.

**Option B (local server):**
```
python3 serve.py
```
then open http://localhost:8123

**Option C (Node, optional):** `npm install && npm start` runs an Express server (`server.js`) with the same app, plus a server-side literature-scan endpoint if `ANTHROPIC_API_KEY` is set.

## Using it

1. Tick one or more topics (one topic per module slot: 90 min = 1, half-day = 2, full day = 4, two days = 8). With one topic and several slots, the app deepens coverage with the topic's additional models and exercises.
2. Pick the duration.
3. Optionally add company and audience — they flow into the deck and the brief.
4. Generate, review the four tabs, then export:
   - **Download slide deck (HTML)** — standalone presentation file; open it, present with arrow keys, press `S` for speaker notes, or print to PDF as a handout
   - **Print current tab** — print/PDF the schedule, materials, or management brief
   - **Download package (JSON)** — full structured package for reuse

## Custom topics (live literature scan)

Topics not in the library (e.g. "Intercultural communication for remote teams") can be generated through a live Claude API literature scan: enter the topic and a Claude API key (console.anthropic.com). The key is stored only in your browser's localStorage and sent only to api.anthropic.com.

## Files

- `public/literature.js` — the curated evidence base (single source of truth; edit here to add topics)
- `public/generator.js` — schedule/deck/materials/brief builder
- `public/app.js`, `public/index.html`, `public/style.css` — UI
- `serve.py` — zero-dependency local server
- `server.js`, `lib/` — optional Node/Express variant
