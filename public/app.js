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

  // Custom-topic literature scan needs a Claude API key (stored locally only)
  const savedKey = localStorage.getItem('anthropic_api_key') || '';
  $('#api-key').value = savedKey;

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
  const apiKey = $('#api-key').value.trim();
  const errEl = $('#error');
  errEl.classList.add('hidden');

  const fail = msg => { errEl.textContent = msg; errEl.classList.remove('hidden'); };

  if (!topicIds.length && !customTopic) return fail('Choose at least one topic (or enter a custom one).');
  if (customTopic && !apiKey) return fail('A custom topic needs a Claude API key for the live literature scan. Pick library topics instead, or enter a key.');

  $('#generate').disabled = true;
  $('#results').classList.add('hidden');
  $('#loading').classList.remove('hidden');

  try {
    let topics = TOPICS.filter(t => topicIds.includes(t.id));
    if (customTopic) {
      localStorage.setItem('anthropic_api_key', apiKey);
      const custom = await scanLiterature(customTopic, apiKey);
      topics = topics.concat(custom);
    }
    PKG = generatePackage({
      topics,
      duration: selectedDuration,
      company: $('#company').value.trim(),
      audience: $('#audience').value.trim()
    });
    PKG.source = customTopic ? 'live-scan+library' : 'curated-library';
    render(PKG);
  } catch (e) {
    fail(e.message);
  } finally {
    $('#generate').disabled = false;
    $('#loading').classList.add('hidden');
  }
}

// Live literature scan for custom topics: asks Claude to synthesize a topic
// entry (sources, models, exercises) in the same shape as the curated library.
async function scanLiterature(customTopic, apiKey) {
  const schemaHint = `{
  "id": "kebab-case-id",
  "name": "Topic Name",
  "domain": "Managerial Skills | Communication | Personal Development",
  "blurb": "one sentence",
  "learningOutcomes": ["3-4 items"],
  "literature": [{"title":"","authors":"","year":2020,"keyIdeas":["2 items"]}],
  "coreModels": [{"name":"","summary":"","teachPoints":["3-4 items"]}],
  "exercises": [{"name":"","duration":25,"type":"pairs","description":"","debrief":""}]
}`;
  const prompt = `You are a learning & development research assistant scanning management literature.

Create a complete training-topic entry for: "${customTopic}".
Ground it in 3-4 real, citable published sources (books, HBR articles, peer-reviewed research) — do not invent sources. Include 2-3 teachable core models and 2-3 practical workshop exercises (20-35 min each) that use participants' real cases.

Return ONLY a JSON array with one topic object matching this shape (no markdown, no commentary):
${schemaHint}`;

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-fable-5',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Literature scan failed (API ${resp.status}): ${body.slice(0, 200)}`);
  }
  const data = await resp.json();
  const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  const jsonText = text.replace(/^```(json)?/m, '').replace(/```\s*$/m, '').trim();
  const arr = JSON.parse(jsonText);
  const valid = (Array.isArray(arr) ? arr : [arr]).filter(t =>
    t && t.name && Array.isArray(t.literature) && Array.isArray(t.coreModels) && t.coreModels.length &&
    Array.isArray(t.exercises) && t.exercises.length && Array.isArray(t.learningOutcomes));
  if (!valid.length) throw new Error('Literature scan returned an unusable result — try rephrasing the topic.');
  return valid;
}

function render(pkg) {
  $('#pkg-title').textContent = pkg.meta.title;
  $('#pkg-meta').textContent = [
    pkg.meta.durationLabel,
    pkg.meta.company && `for ${pkg.meta.company}`,
    pkg.meta.audience && `audience: ${pkg.meta.audience}`,
    pkg.source === 'curated-library' ? 'evidence: curated literature library' : 'evidence: live literature scan + library'
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
