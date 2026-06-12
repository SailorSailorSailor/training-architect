const express = require('express');
const path = require('path');
const { TOPICS } = require('./lib/literature');
const { generatePackage, DURATIONS } = require('./lib/generator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/topics', (_req, res) => {
  res.json({
    topics: TOPICS.map(t => ({ id: t.id, name: t.name, domain: t.domain, blurb: t.blurb })),
    durations: Object.entries(DURATIONS).map(([id, d]) => ({ id, label: d.label })),
    liveScan: Boolean(process.env.ANTHROPIC_API_KEY)
  });
});

app.post('/api/generate', async (req, res) => {
  const { topicIds = [], duration = 'full-day', audience = '', company = '', customTopic = '' } = req.body || {};

  let topics = TOPICS.filter(t => topicIds.includes(t.id));
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // A custom (non-library) topic requires the live literature scan.
  if (customTopic && !apiKey) {
    return res.status(400).json({
      error: 'Custom topics need the live literature scan. Start the server with ANTHROPIC_API_KEY set, or pick topics from the library.'
    });
  }
  if (!topics.length && !customTopic) {
    return res.status(400).json({ error: 'Choose at least one topic.' });
  }
  if (!DURATIONS[duration]) {
    return res.status(400).json({ error: 'Unknown duration.' });
  }

  if (apiKey) {
    try {
      const enriched = await scanLiterature({ topics, customTopic, apiKey });
      if (enriched) topics = enriched;
    } catch (e) {
      console.error('Live literature scan failed, using curated library:', e.message);
      if (customTopic && !topics.length) {
        return res.status(502).json({ error: `Literature scan failed for the custom topic: ${e.message}` });
      }
    }
  }

  const pkg = generatePackage({ topics, duration, audience, company });
  pkg.source = apiKey ? 'live-scan+library' : 'curated-library';
  res.json(pkg);
});

// Live mode: ask Claude to refresh/extend the evidence base for the selected
// topics (and synthesize a full topic entry for any custom topic), returning
// the same shape the curated library uses so the generator is unchanged.
async function scanLiterature({ topics, customTopic, apiKey }) {
  const model = process.env.ANTHROPIC_MODEL || 'claude-fable-5';
  const topicSchemaHint = `{
  "id": "kebab-case-id",
  "name": "Topic Name",
  "domain": "Managerial Skills | Communication | Personal Development",
  "blurb": "one sentence",
  "learningOutcomes": ["..3-4 items.."],
  "literature": [{"title":"","authors":"","year":2020,"keyIdeas":["..2.."]}],   // 3-4 seminal/recent sources
  "coreModels": [{"name":"","summary":"","teachPoints":["..3-4.."]}],            // 2-3 models
  "exercises": [{"name":"","duration":25,"type":"pairs","description":"","debrief":""}] // 2-3 exercises
}`;
  const parts = [];
  if (customTopic) {
    parts.push(`Create a complete topic entry for this custom training topic: "${customTopic}". Ground it in real, citable published literature (books, HBR articles, peer-reviewed research). Do not invent sources.`);
  }
  if (topics.length) {
    parts.push(`For each of these existing topics, review and return an improved entry — keep the same id, keep solid sources, add at most one more recent source (post-2015) if a well-known one exists:\n` +
      JSON.stringify(topics, null, 1));
  }
  const prompt = `You are a learning & development research assistant scanning management literature.\n\n` +
    parts.join('\n\n') +
    `\n\nReturn ONLY a JSON array of topic objects matching this shape (no markdown, no commentary):\n${topicSchemaHint}`;

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 16000,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Anthropic API ${resp.status}: ${body.slice(0, 300)}`);
  }
  const data = await resp.json();
  const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  const jsonText = text.replace(/^```(json)?/m, '').replace(/```\s*$/m, '').trim();
  const arr = JSON.parse(jsonText);
  if (!Array.isArray(arr) || !arr.length) throw new Error('Empty scan result');
  // Minimal shape validation; fall back per-topic to curated entries.
  const valid = arr.filter(t => t && t.name && Array.isArray(t.literature) && Array.isArray(t.coreModels) && t.coreModels.length && Array.isArray(t.exercises) && t.exercises.length);
  if (!valid.length) throw new Error('Scan result failed validation');
  return valid;
}

app.listen(PORT, () => {
  console.log(`Training Architect running at http://localhost:${PORT}`);
  console.log(process.env.ANTHROPIC_API_KEY
    ? 'Live literature scan: ON (ANTHROPIC_API_KEY detected)'
    : 'Live literature scan: OFF — using curated library. Set ANTHROPIC_API_KEY to enable custom topics.');
});
