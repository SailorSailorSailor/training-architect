// Deterministic training-package generator. Builds the full package
// (schedule, deck, materials, management brief) from a list of topic entries.
// Runs in the browser; also consumable from Node (optional server).

const DURATIONS = {
  '90min': {
    label: '90-minute focused session',
    days: 1, openingMin: 10, closingMin: 10, moduleSlotsPerDay: 1, moduleMin: 70,
    breaks: []
  },
  'half-day': {
    label: 'Half-day workshop (3.5 hours)',
    days: 1, openingMin: 20, closingMin: 15, moduleSlotsPerDay: 2, moduleMin: 80,
    breaks: [{ afterModule: 1, min: 15, name: 'Break' }]
  },
  'full-day': {
    label: 'Full-day workshop (09:00–17:00)',
    days: 1, openingMin: 25, closingMin: 25, moduleSlotsPerDay: 4, moduleMin: 85,
    breaks: [
      { afterModule: 1, min: 15, name: 'Coffee break' },
      { afterModule: 2, min: 60, name: 'Lunch' },
      { afterModule: 3, min: 15, name: 'Coffee break' }
    ]
  },
  'two-day': {
    label: 'Two-day programme (09:00–17:00 both days)',
    days: 2, openingMin: 25, closingMin: 25, moduleSlotsPerDay: 4, moduleMin: 85,
    breaks: [
      { afterModule: 1, min: 15, name: 'Coffee break' },
      { afterModule: 2, min: 60, name: 'Lunch' },
      { afterModule: 3, min: 15, name: 'Coffee break' }
    ]
  }
};

function fmtTime(minutes) {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function buildTitle(topics) {
  if (topics.length === 1) return topics[0].name;
  const domains = [...new Set(topics.map(t => t.domain))];
  const stem = domains.length === 1 ? domains[0] : 'Management & Personal Effectiveness';
  return `${stem} Intensive: ${topics.map(t => t.name).join(' · ')}`;
}

// Assign module slots to topics round-robin; the k-th module for a topic
// pulls its k-th core model and exercise (cycling if it runs out).
function buildModules(topics, totalSlots) {
  const modules = [];
  const perTopicCount = {};
  const slots = Math.min(totalSlots, topics.length * 3); // cap repeats at 3 modules per topic
  for (let i = 0; i < slots; i++) {
    const topic = topics[i % topics.length];
    const k = perTopicCount[topic.id] || 0;
    perTopicCount[topic.id] = k + 1;
    const model = topic.coreModels[k % topic.coreModels.length];
    const exercise = topic.exercises[k % topic.exercises.length];
    modules.push({
      number: i + 1,
      topicId: topic.id,
      topicName: topic.name,
      title: topics.length === 1 || perTopicCount[topic.id] > 1
        ? `${topic.name} — ${model.name.split('(')[0].trim()}`
        : topic.name,
      model, exercise,
      sources: topic.literature.map(l => `${l.authors} — ${l.title} (${l.year})`)
    });
  }
  return modules;
}

function buildSchedule(modules, cfg) {
  const schedule = [];
  const perDay = cfg.moduleSlotsPerDay;
  let mi = 0;
  for (let day = 1; day <= cfg.days; day++) {
    let t = 9 * 60; // 09:00 start
    const dayLabel = cfg.days > 1 ? `Day ${day}` : null;
    const push = (mins, block, type, details) => {
      schedule.push({ day: dayLabel, start: fmtTime(t), end: fmtTime(t + mins), block, type, details });
      t += mins;
    };
    push(cfg.openingMin, day === 1 ? 'Opening & objectives' : 'Day 2 opening & recap',
      'opening',
      day === 1
        ? 'Welcome, business context for the training, participant expectations, agenda and ground rules.'
        : 'Recap of Day 1 commitments, overnight reflections, agenda for the day.');
    for (let s = 0; s < perDay && mi < modules.length; s++, mi++) {
      const m = modules[mi];
      const theory = Math.round((cfg.moduleMin - m.exercise.duration) * 0.7);
      const debrief = cfg.moduleMin - m.exercise.duration - theory;
      push(cfg.moduleMin, `Module ${m.number}: ${m.title}`, 'module',
        `Input (${theory} min): ${m.model.name} — ${m.model.summary} ` +
        `Practice (${m.exercise.duration} min): ${m.exercise.name} (${m.exercise.type}). ` +
        `Debrief (${debrief} min): ${m.exercise.debrief}`);
      const br = cfg.breaks.find(b => b.afterModule === s + 1);
      if (br && (s < perDay - 1) && mi < modules.length - 1) push(br.min, br.name, 'break', '');
    }
    push(cfg.closingMin,
      day === cfg.days ? 'Commitments & close' : 'Day wrap-up',
      'closing',
      day === cfg.days
        ? 'Each participant states one concrete commitment with a date. Action plans collected for the 30-day follow-up. Evaluation.'
        : 'Key takeaways round, preview of Day 2, overnight reflection assignment.');
  }
  return schedule;
}

function buildDeck({ title, topics, modules, cfg, company, audience }) {
  const slides = [];
  slides.push({
    section: 'Opening', title,
    bullets: [cfg.label, company ? `Prepared for ${company}` : 'In-company workshop', audience ? `Audience: ${audience}` : 'Audience: managers and team leads', 'Lux Nova Training'],
    notes: 'Welcome participants. One sentence on why the company is investing in this now.'
  });
  slides.push({
    section: 'Opening', title: 'Why this training',
    bullets: topics.map(t => t.blurb),
    notes: 'Connect each line to a situation participants will recognise from their own work. Ask for a show of hands.'
  });
  slides.push({
    section: 'Opening', title: 'What you will be able to do',
    bullets: topics.flatMap(t => t.learningOutcomes.slice(0, 2)),
    notes: 'Outcomes, not topics. Invite participants to pick the one that matters most to them and note it down.'
  });
  slides.push({
    section: 'Opening', title: 'How we will work',
    bullets: [
      'Short evidence-based input, then practice on YOUR real cases',
      'Everything discussed here stays here',
      'Phones away during practice blocks',
      'You leave with written commitments, not just notes'
    ],
    notes: 'Set ground rules early; real-case work requires the confidentiality agreement to be explicit.'
  });
  for (const m of modules) {
    slides.push({
      section: `Module ${m.number}`, title: m.title,
      bullets: [m.model.summary],
      notes: `Section divider. Frame the module with a question the room will recognise. Sources: ${m.sources[0]}.`
    });
    slides.push({
      section: `Module ${m.number}`, title: m.model.name,
      bullets: m.model.teachPoints,
      notes: `Teach with one concrete workplace example per point. Evidence base: ${m.sources.join('; ')}.`
    });
    slides.push({
      section: `Module ${m.number}`, title: `Practice: ${m.exercise.name}`,
      bullets: [
        `Format: ${m.exercise.type} · ${m.exercise.duration} minutes`,
        m.exercise.description
      ],
      notes: `Keep timing visible. Debrief focus: ${m.exercise.debrief}`
    });
  }
  slides.push({
    section: 'Close', title: 'Key takeaways',
    bullets: modules.slice(0, 6).map(m => `${m.topicName}: ${m.model.teachPoints[0]}`),
    notes: 'Run as a participant round first ("what stays with you?"), then show the slide.'
  });
  slides.push({
    section: 'Close', title: 'Your commitments',
    bullets: [
      'One behaviour you will start within 2 weeks — written, dated, witnessed by a partner',
      '30-day follow-up: short check-in session on what worked and what got blocked',
      'Your manager receives the themes (not individual details) to support follow-through'
    ],
    notes: 'Collect commitments on cards or shared doc; these feed the follow-up session.'
  });
  slides.push({
    section: 'Close', title: 'Evidence base',
    bullets: [...new Set(topics.flatMap(t => t.literature.map(l => `${l.authors} (${l.year}) — ${l.title}`)))],
    notes: 'Available for participants who want to go deeper; offer the one-page reading guide from the materials pack.'
  });
  return slides;
}

function buildMaterials({ title, topics, modules, schedule }) {
  const materials = [];

  materials.push({
    name: 'Facilitator guide',
    type: 'facilitator',
    sections: schedule.map(b => ({
      heading: `${b.day ? b.day + ' · ' : ''}${b.start}–${b.end} — ${b.block}`,
      body: b.type === 'module'
        ? b.details + ' Watch for: participants using invented cases instead of real ones — redirect early.'
        : (b.details || 'Logistics block.')
    }))
  });

  materials.push({
    name: 'Participant workbook',
    type: 'participant',
    sections: modules.map(m => ({
      heading: `Module ${m.number} — ${m.exercise.name}`,
      body: `${m.exercise.description}\n\nWorksheet prompts:\n` +
        `1. My real case for this exercise: …\n` +
        `2. Applying ${m.model.name.split('(')[0].trim()}: …\n` +
        `3. What I noticed during practice: …\n` +
        `4. One thing I will do differently, by when: …`
    })).concat([{
      heading: 'Personal action plan',
      body: 'Commitment 1 (start within 2 weeks): …\nCommitment 2 (start within 30 days): …\nMy accountability partner: …\nWhat could block me, and my countermeasure: …'
    }])
  });

  const uniqueModuleTopics = [...new Set(modules.map(m => m.topicName))].slice(0, 3);
  materials.push({
    name: 'Pre-work email (send 1 week before)',
    type: 'pre-work',
    sections: [{
      heading: 'Email template',
      body: `Subject: Preparation for your upcoming training — 10 minutes needed\n\n` +
        `Hello,\n\nAhead of "${title}", please come prepared with:\n` +
        uniqueModuleTopics.map((name, i) =>
          `${i + 1}. One real, current situation related to ${name.toLowerCase()} that you would like to handle better.`
        ).join('\n') +
        `\n\nNo reading is required. The cases you bring stay confidential within the group.\n\nSee you there.`
    }]
  });

  materials.push({
    name: 'Reading guide (one page)',
    type: 'reading',
    sections: topics.map(t => ({
      heading: t.name,
      body: t.literature.map(l => `• ${l.authors} (${l.year}), "${l.title}" — ${l.keyIdeas[0]}`).join('\n')
    }))
  });

  materials.push({
    name: '30-day follow-up plan',
    type: 'follow-up',
    sections: [
      { heading: 'Week 1', body: 'Participants start commitment 1. Trainer sends one-line reminder referencing each participant\'s own written commitment.' },
      { heading: 'Week 2', body: 'Accountability pairs check in (15 min, their own calendar). Managers ask each participant one open question about the training in their 1:1.' },
      { heading: 'Week 4', body: '60–90 min group follow-up session (remote acceptable): wins round, blocked-commitment clinic using the trained models, recommit or revise.' },
      { heading: 'Measurement', body: 'Compare pre/post self-assessment on the learning outcomes; collect 2–3 behavioural examples per participant; report themes to sponsor.' }
    ]
  });

  return materials;
}

function buildBrief({ title, topics, modules, cfg, company, audience }) {
  const totalSources = [...new Set(topics.flatMap(t => t.literature.map(l => l.title)))].length;
  return {
    title: `Management brief — proposal for approval: ${title}`,
    preparedFor: company || 'Management team',
    executiveSummary:
      `Proposal for a ${cfg.label.toLowerCase()} for ${audience || 'managers and team leads'}, covering ${topics.map(t => t.name).join(', ')}. ` +
      `The design is grounded in ${totalSources} published sources and built around practice on participants' real cases rather than theory. ` +
      `Participants leave with written, dated commitments; a structured 30-day follow-up converts the session into observable behaviour change.`,
    businessCase: topics.map(t => ({
      topic: t.name,
      rationale: t.blurb,
      evidence: t.literature[0] ? `${t.literature[0].authors} (${t.literature[0].year}): ${t.literature[0].keyIdeas[0]}` : ''
    })),
    expectedOutcomes: topics.flatMap(t => t.learningOutcomes.slice(0, 2)),
    format: {
      duration: cfg.label,
      schedule: `${cfg.days > 1 ? 'Each day ' : ''}09:00 start; ${modules.length} practice-centred modules; see attached schedule`,
      groupSize: '8–12 participants (practice formats require small groups)',
      delivery: 'In person preferred; materials provided: participant workbook, reading guide, action plans',
      followUp: '30-day structured follow-up included (accountability pairs, manager prompts, group session)'
    },
    evidenceBase: topics.flatMap(t => t.literature.map(l => `${l.authors} (${l.year}) — ${l.title}`)),
    investment: [
      'Trainer fee: per current Lux Nova Training rate card (to be inserted)',
      `Participant time: ${cfg.days > 1 ? cfg.days + ' working days' : cfg.label.toLowerCase()} per participant`,
      'Room and catering: client-provided',
      'Included: design, materials, delivery, 30-day follow-up session, sponsor report'
    ],
    measurement: [
      'Pre/post self-assessment against the stated learning outcomes',
      'Written commitments tracked at the 30-day follow-up',
      'Themes report to sponsor (aggregated, no individual evaluations)'
    ],
    nextSteps: [
      'Approve scope and date window',
      'Nominate 8–12 participants and a management sponsor',
      'Lux Nova confirms date, sends pre-work one week ahead',
      'Delivery, then 30-day follow-up and sponsor report'
    ]
  };
}

function generatePackage({ topics, duration, audience, company }) {
  const cfg = DURATIONS[duration] || DURATIONS['full-day'];
  const totalSlots = cfg.moduleSlotsPerDay * cfg.days;
  const title = buildTitle(topics);
  const modules = buildModules(topics, totalSlots);
  const schedule = buildSchedule(modules, cfg);
  const deck = buildDeck({ title, topics, modules, cfg, company, audience });
  const materials = buildMaterials({ title, topics, modules, schedule });
  const brief = buildBrief({ title, topics, modules, cfg, company, audience });
  const warnings = [];
  if (topics.length > totalSlots) {
    warnings.push(`You selected ${topics.length} topics but this duration fits ${totalSlots} module(s). ` +
      `Only the first ${totalSlots} topic(s) get a module — choose a longer format or fewer topics for full coverage.`);
  }
  return {
    meta: { title, duration, durationLabel: cfg.label, audience: audience || '', company: company || '', topicNames: topics.map(t => t.name) },
    warnings, schedule, deck, materials, brief
  };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { generatePackage, DURATIONS };
