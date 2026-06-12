/* Training Architect frontend — fully static: literature.js + generator.js run in the browser. */

let PKG = null;
let selectedDuration = 'full-day';

const $ = sel => document.querySelector(sel);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function init() {
  // Topics grouped by domain
  const groups = {};
  for (const t of TOPICS) (groups[t.domain] = groups[t.domain] || []).push(t);
  $('#topic-groups').innerHTML = Object.entries(groups).map(([domain, topics]) => `
    <div class="domain-group">
      <p class="domain-name">${esc(domain)}</p>
      <div class="topic-grid">
        ${topics.map(t => `
          <label class="topic" data-id="${esc(t.id)}">
            <input type="checkbox" value="${esc(t.id)}">
            <span><span class="t-name">${esc(t.name)}</span><br><span class="t-blurb">${esc(t.blurb)}</span></span>
          </label>`).join('')}
      </div>
    </div>`).join('');

  document.querySelectorAll('.topic input').forEach(cb =>
    cb.addEventListener('change', () => cb.closest('.topic').classList.toggle('selected', cb.checked)));

  // Durations
  $('#durations').innerHTML = Object.entries(DURATIONS).map(([id, d]) =>
    `<button type="button" class="duration${id === selectedDuration ? ' selected' : ''}" data-id="${esc(id)}">${esc(d.label)}</button>`).join('');
  document.querySelectorAll('.duration').forEach(btn => btn.addEventListener('click', () => {
    selectedDuration = btn.dataset.id;
    document.querySelectorAll('.duration').forEach(b => b.classList.toggle('selected', b === btn));
  }));

  $('#generate').addEventListener('click', generate);
  document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => showTab(tab.dataset.tab)));
  document.querySelectorAll('[data-export]').forEach(btn => btn.addEventListener('click', () => doExport(btn.dataset.export)));
}

function showTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('hidden', p.id !== 'tab-' + name));
}

async function generate() {
  const topicIds = [...document.querySelectorAll('.topic input:checked')].map(cb => cb.value);
  const customTopic = $('#custom-topic').value.trim();
  const errEl = $('#error');
  errEl.classList.add('hidden');

  const fail = msg => { errEl.textContent = msg; errEl.classList.remove('hidden'); };

  if (!topicIds.length && !customTopic) return fail('Choose at least one topic (or enter a custom one).');

  $('#generate').disabled = true;
  $('#results').classList.add('hidden');
  $('#loading').classList.remove('hidden');

  try {
    let topics = TOPICS.filter(t => topicIds.includes(t.id));
    let customNames = [];
    if (customTopic) {
      const custom = await scanLiterature(customTopic);
      customNames = custom.map(t => t.name);
      topics = topics.concat(custom);
    }
    PKG = generatePackage({
      topics,
      duration: selectedDuration,
      company: $('#company').value.trim(),
      audience: $('#audience').value.trim()
    });
    PKG.source = customTopic ? 'web-scan+library' : 'curated-library';
    if (customNames.length) {
      PKG.warnings.push(`Sources for "${customNames.join('", "')}" were gathered by an automated scan of Google Books, Crossref, Open Library and Wikipedia — review them before presenting to a client.`);
    }
    render(PKG);
  } catch (e) {
    fail(e.message);
  } finally {
    $('#generate').disabled = false;
    $('#loading').classList.add('hidden');
  }
}

// Keyless live literature scan for custom topics. Queries public scholarly
// sources directly from the browser — all CORS-enabled, no account or key:
//   Google Books + Open Library  → books (descriptions + popularity signal)
//   Crossref                     → peer-reviewed articles (citation counts)
//   Wikipedia                    → topic overview
// Results are assembled into the same topic shape as the curated library.
async function scanLiterature(customTopic) {
  const q = encodeURIComponent(customTopic);
  const getJson = url => fetch(url).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); });

  const [gb, cr, ol, wiki] = await Promise.allSettled([
    getJson(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=12&printType=books&langRestrict=en&orderBy=relevance`),
    getJson(`https://api.crossref.org/works?query=${q}&rows=12&filter=type:journal-article&select=title,author,issued,is-referenced-by-count,container-title`),
    getJson(`https://openlibrary.org/search.json?q=${q}&limit=12&fields=title,author_name,first_publish_year,edition_count`),
    wikipediaOverview(customTopic)
  ]);

  // Books: Google Books carries descriptions; Open Library edition counts
  // act as a popularity signal for ranking when both know the title.
  const editionCount = {};
  if (ol.status === 'fulfilled') for (const d of (ol.value.docs || [])) {
    if (d.title) editionCount[d.title.toLowerCase()] = d.edition_count || 0;
  }

  const books = [];
  if (gb.status === 'fulfilled') {
    const seen = new Set();
    const items = (gb.value.items || [])
      .map(i => i.volumeInfo)
      .filter(v => v && v.title && v.authors && v.description && v.description.length > 80)
      .sort((a, b) => (editionCount[b.title.toLowerCase()] || 0) - (editionCount[a.title.toLowerCase()] || 0));
    for (const v of items) {
      const key = v.title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const sentences = v.description.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]/g) || [v.description];
      books.push({
        title: v.title + (v.subtitle ? ': ' + v.subtitle : ''),
        authors: v.authors.join(' & '),
        year: parseInt(v.publishedDate, 10) || '',
        keyIdeas: sentences.slice(0, 2).map(s => s.trim().slice(0, 220))
      });
      if (books.length === 2) break;
    }
  }

  // Fallback book source: Open Library (no descriptions, but reliable and
  // keyless) — used when Google Books is rate-limited or returns nothing.
  // Specific phrasings ("X for remote teams") often match no book titles,
  // so retry with the core phrase before for/in/with/of.
  if (books.length < 2 && ol.status === 'fulfilled') {
    let olDocs = ol.value.docs || [];
    if (!olDocs.length) {
      const core = customTopic.split(/\s+(?:for|in|with|of|at)\s+/i)[0];
      if (core && core !== customTopic) {
        olDocs = await getJson(`https://openlibrary.org/search.json?q=${encodeURIComponent(core)}&limit=12&fields=title,author_name,first_publish_year,edition_count`)
          .then(r => r.docs || []).catch(() => []);
      }
    }
    const taken = new Set(books.map(b => b.title.toLowerCase()));
    const docs = olDocs
      .filter(d => d.title && d.author_name && d.first_publish_year && (d.edition_count || 0) >= 2)
      .sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));
    for (const d of docs) {
      const key = d.title.toLowerCase();
      if (taken.has(key)) continue;
      taken.add(key);
      // OL lists name variants of the same author ("William B. Gudykunst",
      // "William Gudykunst") — dedupe on last name + first initial.
      const seenAuthors = new Set();
      const authors = d.author_name.filter(n => {
        const k = (n.trim().split(/\s+/).pop() + '|' + n.trim()[0]).toLowerCase();
        if (seenAuthors.has(k)) return false;
        seenAuthors.add(k);
        return true;
      });
      books.push({
        title: d.title,
        authors: authors.slice(0, 3).join(' & '),
        year: d.first_publish_year,
        keyIdeas: [`Published book (${d.edition_count} editions) surfaced by the live literature scan — review the full text before citing`]
      });
      if (books.length === 2) break;
    }
  }

  const papers = [];
  if (cr.status === 'fulfilled') {
    const items = ((cr.value.message || {}).items || [])
      .filter(w => w.title && w.title[0] && w.author && w.author.length)
      .sort((a, b) => (b['is-referenced-by-count'] || 0) - (a['is-referenced-by-count'] || 0));
    for (const w of items.slice(0, 2)) {
      const names = w.author.slice(0, 3).map(a => [a.given, a.family].filter(Boolean).join(' ')).join(', ')
        + (w.author.length > 3 ? ' et al.' : '');
      const journal = (w['container-title'] && w['container-title'][0]) || '';
      papers.push({
        title: w.title[0],
        authors: names,
        year: (w.issued && w.issued['date-parts'] && w.issued['date-parts'][0][0]) || '',
        keyIdeas: [`Peer-reviewed article${journal ? ' in ' + journal : ''}, cited ${w['is-referenced-by-count'] || 0} times`]
      });
    }
  }

  const literature = books.concat(papers);
  if (!literature.length) {
    throw new Error('The live scan found no usable sources for this topic — try a broader or differently-worded topic, or check your internet connection.');
  }

  const overview = wiki.status === 'fulfilled' ? wiki.value : null;
  const name = customTopic.charAt(0).toUpperCase() + customTopic.slice(1);
  const nameLc = customTopic.toLowerCase();
  const domain = /manag|leader|delegat|team|decision|perform|strateg/.test(nameLc) ? 'Managerial Skills'
    : /communicat|present|negotiat|conflict|feedback|conversation|listen|influen/.test(nameLc) ? 'Communication'
    : 'Personal Development';

  return [{
    id: 'custom-' + nameLc.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40),
    name,
    domain,
    blurb: overview && overview.extract
      ? overview.extract.replace(/\s+/g, ' ').split('. ')[0].slice(0, 200) + '.'
      : `Evidence-based working session on ${nameLc}, built from a live scan of published sources.`,
    learningOutcomes: [
      `Explain the strongest published findings on ${nameLc} and their workplace implications`,
      'Diagnose current practice against the frameworks from the literature',
      'Apply at least one evidence-based technique to a real, current case',
      'Commit to a specific behaviour change with a measure and a follow-up date'
    ],
    literature,
    coreModels: [
      {
        name: `What the literature says about ${nameLc}`,
        summary: overview && overview.extract
          ? overview.extract.replace(/\s+/g, ' ').slice(0, 280)
          : `Survey of the strongest published sources on ${nameLc} surfaced by the live scan.`,
        teachPoints: literature.slice(0, 4).map(l =>
          `${l.authors}${l.year ? ' (' + l.year + ')' : ''} — ${l.title}: ${l.keyIdeas[0]}`)
      },
      {
        name: 'From insight to behaviour',
        summary: `Translate the published evidence on ${nameLc} into workplace behaviour: diagnose the current situation, select a technique from the sources, rehearse it on a real case.`,
        teachPoints: [
          'Diagnose: where does this topic cost the team time, quality or trust today?',
          'Select: which finding from the sources addresses that specific cost?',
          'Rehearse: practise the technique on a real case before using it live',
          'Review: agree what evidence would show the new behaviour is working'
        ]
      }
    ],
    exercises: [
      {
        name: 'Real-case mapping', duration: 25, type: 'individual + pairs',
        description: `Participants describe one real, current situation involving ${nameLc} and map it against the findings presented: what does the literature predict, and what would "good" look like here?`,
        debrief: 'Collect the most common patterns on a flipchart; connect each to a source.'
      },
      {
        name: 'Technique practice rounds', duration: 30, type: 'trios',
        description: 'Each participant picks one technique from the input session and rehearses it on their real case; the observer notes where it held up and where it broke down. Rotate roles.',
        debrief: 'Each trio reports one thing that worked and one adaptation they had to make.'
      },
      {
        name: 'Action planning', duration: 20, type: 'individual + pairs',
        description: 'Participants commit to one specific behaviour change, a date, and a measure; pairs pressure-test feasibility.',
        debrief: 'Commitments exchanged with an accountability partner for the 30-day follow-up.'
      }
    ]
  }];
}

async function wikipediaOverview(topic) {
  // Try the full phrase first; specific topics ("X for remote teams") often
  // have no page, so retry with the core phrase before for/in/with/of.
  const candidates = [topic];
  const core = topic.split(/\s+(?:for|in|with|of|at)\s+/i)[0];
  if (core && core !== topic) candidates.push(core);
  for (const c of candidates) {
    const os = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(c)}&limit=1&format=json&origin=*`)
      .then(r => r.json()).catch(() => null);
    const title = os && os[1] && os[1][0];
    if (!title) continue;
    const s = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then(r => r.json()).catch(() => null);
    if (s && s.extract && s.type !== 'disambiguation') return { title: s.title, extract: s.extract };
  }
  return null;
}

function render(pkg) {
  $('#pkg-title').textContent = pkg.meta.title;
  $('#pkg-meta').textContent = [
    pkg.meta.durationLabel,
    pkg.meta.company && `for ${pkg.meta.company}`,
    pkg.meta.audience && `audience: ${pkg.meta.audience}`,
    pkg.source === 'curated-library' ? 'evidence: curated literature library' : 'evidence: live web scan (Google Books, Crossref, Open Library, Wikipedia) + library'
  ].filter(Boolean).join(' · ');

  const warnEl = $('#pkg-warnings');
  if (pkg.warnings && pkg.warnings.length) {
    warnEl.textContent = pkg.warnings.join(' ');
    warnEl.classList.remove('hidden');
  } else warnEl.classList.add('hidden');

  renderSchedule(pkg.schedule);
  renderDeck(pkg.deck);
  renderMaterials(pkg.materials);
  renderBrief(pkg.brief);

  showTab('schedule');
  $('#results').classList.remove('hidden');
  $('#results').scrollIntoView({ behavior: 'smooth' });
}

function renderSchedule(schedule) {
  let lastDay = null;
  const rows = schedule.map(b => {
    let dayRow = '';
    if (b.day && b.day !== lastDay) {
      lastDay = b.day;
      dayRow = `<tr class="day-header"><td colspan="2">${esc(b.day)}</td></tr>`;
    }
    return dayRow + `
      <tr class="row-${esc(b.type)}">
        <td class="time">${esc(b.start)}–${esc(b.end)}</td>
        <td>
          <div class="block-name">${esc(b.block)}</div>
          ${b.details ? `<div class="block-details">${esc(b.details)}</div>` : ''}
        </td>
      </tr>`;
  }).join('');
  $('#tab-schedule').innerHTML = `<table><thead><tr><th>Time</th><th>Block</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderDeck(deck) {
  $('#tab-deck').innerHTML = deck.map((s, i) => `
    <div class="slide">
      <div class="slide-head"><h3>${i + 1}. ${esc(s.title)}</h3><span class="sec">${esc(s.section)}</span></div>
      <div class="slide-body"><ul>${s.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul></div>
      <div class="slide-notes">${esc(s.notes)}</div>
    </div>`).join('');
}

function renderMaterials(materials) {
  $('#tab-materials').innerHTML = materials.map(m => `
    <div class="material">
      <h3>${esc(m.name)}</h3>
      ${m.sections.map(s => `<h4>${esc(s.heading)}</h4><p>${esc(s.body)}</p>`).join('')}
    </div>`).join('');
}

function renderBrief(b) {
  $('#tab-brief').innerHTML = `
    <div class="brief">
      <h3>${esc(b.title)}</h3>
      <p><strong>Prepared for:</strong> ${esc(b.preparedFor)}</p>
      <h3>Executive summary</h3>
      <p>${esc(b.executiveSummary)}</p>
      <h3>Business case</h3>
      ${b.businessCase.map(c => `
        <div class="case-item">
          <strong>${esc(c.topic)}</strong> — ${esc(c.rationale)}
          ${c.evidence ? `<div class="ev">Evidence: ${esc(c.evidence)}</div>` : ''}
        </div>`).join('')}
      <h3>Expected outcomes</h3>
      <ul>${b.expectedOutcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      <h3>Format</h3>
      <ul>
        <li><strong>Duration:</strong> ${esc(b.format.duration)}</li>
        <li><strong>Schedule:</strong> ${esc(b.format.schedule)}</li>
        <li><strong>Group size:</strong> ${esc(b.format.groupSize)}</li>
        <li><strong>Delivery:</strong> ${esc(b.format.delivery)}</li>
        <li><strong>Follow-up:</strong> ${esc(b.format.followUp)}</li>
      </ul>
      <h3>Evidence base</h3>
      <ul>${[...new Set(b.evidenceBase)].map(e => `<li>${esc(e)}</li>`).join('')}</ul>
      <h3>Investment</h3>
      <ul>${b.investment.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
      <h3>Measurement</h3>
      <ul>${b.measurement.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
      <h3>Next steps</h3>
      <ul>${b.nextSteps.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
    </div>`;
}

/* ---------- exports ---------- */

function doExport(kind) {
  if (!PKG) return;
  if (kind === 'print') { window.print(); return; }
  if (kind === 'json') {
    download(`${slug(PKG.meta.title)}.json`, JSON.stringify(PKG, null, 2), 'application/json');
    return;
  }
  if (kind === 'deck') {
    download(`${slug(PKG.meta.title)}-deck.html`, buildStandaloneDeck(PKG), 'text/html');
  }
}

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60); }

function download(name, content, mime) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

// Standalone HTML slide deck: arrow keys / click to navigate, print-friendly (one slide per page).
function buildStandaloneDeck(pkg) {
  const slides = pkg.deck.map((s, i) => `
    <section class="slide" data-n="${i + 1}">
      <header><span>${esc(s.section)}</span><span>${i + 1} / ${pkg.deck.length}</span></header>
      <h1>${esc(s.title)}</h1>
      <ul>${s.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      <footer>${esc(pkg.meta.title)} · Lux Nova Training</footer>
      <aside class="notes">${esc(s.notes)}</aside>
    </section>`).join('');

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>${esc(pkg.meta.title)} — slide deck</title>
<style>
  :root { --navy:#14213d; --gold:#c9a227; }
  * { box-sizing:border-box; }
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; background:#222; }
  .slide { display:none; width:100vw; height:100vh; padding:6vh 8vw; background:#fff; flex-direction:column; }
  .slide.active { display:flex; }
  .slide header { display:flex; justify-content:space-between; color:var(--gold); font-size:0.85rem; text-transform:uppercase; letter-spacing:1.5px; }
  .slide h1 { color:var(--navy); font-size:2.4rem; margin:2vh 0 3vh; border-bottom:4px solid var(--gold); padding-bottom:1.5vh; }
  .slide ul { font-size:1.4rem; line-height:1.7; flex:1; margin:0; padding-left:1.4em; }
  .slide li { margin-bottom:0.6em; }
  .slide footer { color:#888; font-size:0.8rem; }
  .notes { display:none; }
  #help { position:fixed; bottom:10px; right:14px; color:#aaa; font-size:0.75rem; font-family:inherit; }
  @media print {
    .slide { display:flex !important; page-break-after:always; height:100vh; }
    #help { display:none; }
    .notes { display:block; border-top:1px dashed #bbb; margin-top:1vh; padding-top:1vh; color:#666; font-size:0.85rem; }
  }
</style></head>
<body>
${slides}
<div id="help">← → to navigate · S = speaker notes · Ctrl/Cmd+P to print as handout</div>
<script>
  var slides = document.querySelectorAll('.slide'), cur = 0, notes = false;
  function show(n) { cur = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function(s, i){ s.classList.toggle('active', i === cur); }); }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') show(cur + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') show(cur - 1);
    else if (e.key.toLowerCase() === 's') { notes = !notes;
      document.querySelectorAll('.notes').forEach(function(n){ n.style.display = notes ? 'block' : 'none'; }); }
  });
  document.addEventListener('click', function(){ show(cur + 1); });
  show(0);
<\/script>
</body></html>`;
}

init();
