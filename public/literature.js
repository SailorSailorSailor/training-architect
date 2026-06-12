// Curated evidence base: seminal + recent literature for each training topic.
// Loaded directly in the browser; also consumable from Node (optional server).

const TOPICS = [
  {
    id: 'feedback',
    name: 'Giving & Receiving Feedback',
    domain: 'Managerial Skills',
    blurb: 'Deliver feedback that changes behaviour without damaging the relationship, and build a team that asks for it.',
    learningOutcomes: [
      'Structure feedback with the SBI model so it lands as observation, not judgement',
      'Match feedback style to the situation using the Radical Candor framework',
      'Recognise the three triggers that make feedback hard to receive, and work around them',
      'Build a personal routine for actively seeking feedback from reports and peers'
    ],
    literature: [
      {
        title: 'Thanks for the Feedback', authors: 'Douglas Stone & Sheila Heen', year: 2014,
        keyIdeas: [
          'Receivers, not givers, control whether feedback works — train receiving as a skill',
          'Three triggers block feedback: truth ("that\'s wrong"), relationship ("not from you"), identity ("I\'m a failure")'
        ]
      },
      {
        title: 'Radical Candor', authors: 'Kim Scott', year: 2017,
        keyIdeas: [
          'Effective feedback requires caring personally AND challenging directly — most managers fail on one axis',
          '"Ruinous empathy" (caring without challenging) is the most common and most damaging failure mode'
        ]
      },
      {
        title: 'The Effects of Feedback Interventions on Performance (meta-analysis)', authors: 'Avraham Kluger & Angelo DeNisi', year: 1996,
        keyIdeas: [
          'Across 607 studies, 1/3 of feedback interventions made performance WORSE',
          'Feedback that directs attention to the task improves performance; feedback aimed at the person degrades it'
        ]
      }
    ],
    coreModels: [
      {
        name: 'SBI — Situation, Behaviour, Impact (Center for Creative Leadership)',
        summary: 'Anchor feedback in a specific situation, describe observable behaviour, state the impact. Removes judgement and inference.',
        teachPoints: [
          'Situation: when and where — "In Tuesday\'s client call…"',
          'Behaviour: what was seen or heard, not interpreted — "you interrupted the client three times"',
          'Impact: effect on you, the team, or the result — "the client stopped sharing requirements"',
          'Common failure: jumping to motive ("you don\'t respect clients") — stay at behaviour level'
        ]
      },
      {
        name: 'Radical Candor 2×2 (Scott, 2017)',
        summary: 'Two axes: Care Personally vs Challenge Directly. Four quadrants: Radical Candor, Ruinous Empathy, Obnoxious Aggression, Manipulative Insincerity.',
        teachPoints: [
          'Map your last three feedback conversations onto the 2×2',
          'Ruinous empathy feels kind today and costs careers later',
          'Challenge directly only works on a foundation of demonstrated care'
        ]
      },
      {
        name: 'The three receiving triggers (Stone & Heen, 2014)',
        summary: 'Truth, relationship and identity triggers explain why competent adults reject useful feedback.',
        teachPoints: [
          'Truth trigger: separate the data from the interpretation before rejecting',
          'Relationship trigger: don\'t let "who" cancel "what" — switchtrack conversations',
          'Identity trigger: know your own wiring (swing, recovery) and name it'
        ]
      }
    ],
    exercises: [
      {
        name: 'SBI drafting drill', duration: 25, type: 'individual + pairs',
        description: 'Each participant writes two real pieces of feedback they owe someone, restructured as SBI. Pairs critique: is the behaviour observable? Is the impact concrete?',
        debrief: 'Collect the most common drift (behaviour → motive) on a flipchart.'
      },
      {
        name: 'Feedback role-play rounds', duration: 35, type: 'trios (giver / receiver / observer)',
        description: 'Three rounds of 7 minutes using participants\' real cases. Observer scores against SBI and the Radical Candor 2×2. Rotate roles.',
        debrief: 'Each trio reports one thing that made the feedback land and one trigger they noticed in themselves.'
      },
      {
        name: 'Feedback-seeking plan', duration: 15, type: 'individual',
        description: 'Participants design one concrete ask ("What\'s one thing I could do differently in our weekly meeting?") and commit to a person and a date within 2 weeks.',
        debrief: 'Pairs exchange plans for accountability.'
      }
    ]
  },

  {
    id: 'difficult-conversations',
    name: 'Difficult Conversations',
    domain: 'Communication',
    blurb: 'Handle high-stakes, emotionally charged conversations — underperformance, conflict, bad news — without avoidance or escalation.',
    learningOutcomes: [
      'Decode the three layered conversations (facts, feelings, identity) inside any difficult exchange',
      'Open a high-stakes conversation with the STATE structure',
      'Keep dialogue open when the other party goes to silence or aggression',
      'Create conditions of psychological safety so difficult topics surface earlier'
    ],
    literature: [
      {
        title: 'Difficult Conversations', authors: 'Douglas Stone, Bruce Patton & Sheila Heen (Harvard Negotiation Project)', year: 1999,
        keyIdeas: [
          'Every difficult conversation is three: the "what happened" conversation, the feelings conversation, the identity conversation',
          'Shift from delivering a message to exploring a learning conversation — from certainty to curiosity'
        ]
      },
      {
        title: 'Crucial Conversations', authors: 'Kerry Patterson, Joseph Grenny, Ron McMillan & Al Switzler', year: 2002,
        keyIdeas: [
          'When stakes, opinions and emotions are high, people move to silence or violence — watch for both',
          'Safety is the precondition for dialogue: restore it with contrasting ("I don\'t mean X, I do mean Y")'
        ]
      },
      {
        title: 'The Fearless Organization', authors: 'Amy Edmondson', year: 2018,
        keyIdeas: [
          'Psychological safety — belief that the team is safe for interpersonal risk — predicts learning and performance',
          'Leaders create it by framing work as learning, acknowledging fallibility, and asking questions'
        ]
      }
    ],
    coreModels: [
      {
        name: 'The Three Conversations (Stone, Patton & Heen, 1999)',
        summary: 'Beneath "what happened" disputes sit a feelings conversation and an identity conversation. Naming all three changes the dynamic.',
        teachPoints: [
          '"What happened": swap certainty for curiosity — both stories are partial',
          'Feelings: unexpressed feelings leak into tone and sarcasm',
          'Identity: "Am I competent? Am I a good person?" — the real source of defensiveness'
        ]
      },
      {
        name: 'STATE (Patterson et al., 2002)',
        summary: 'Share facts, Tell your story, Ask for their path, Talk tentatively, Encourage testing — an opening sequence for risky topics.',
        teachPoints: [
          'Start with the least controversial, most persuasive material: facts',
          'Tentative ≠ weak: "I\'m starting to wonder whether…" invites dialogue',
          'Encourage testing: genuinely invite disagreement, then prove it\'s safe to give'
        ]
      },
      {
        name: 'Psychological safety levers (Edmondson, 2018)',
        summary: 'Three leader behaviours: frame the work, acknowledge fallibility, practice inquiry.',
        teachPoints: [
          'Frame meetings as problem-solving, not performance reviews',
          '"I may be missing something — what are you seeing?" as a daily habit',
          'Respond to bad news with thanks before analysis, or it stops coming'
        ]
      }
    ],
    exercises: [
      {
        name: 'Three-conversations case mapping', duration: 25, type: 'individual + pairs',
        description: 'Participants pick a real conversation they are avoiding and map it: facts in dispute, feelings in play, identity at stake. Pairs pressure-test the map.',
        debrief: 'Ask: which of the three layers were you ignoring? (Usually identity.)'
      },
      {
        name: 'STATE opening rehearsal', duration: 30, type: 'trios',
        description: 'Each participant scripts and rehearses the first 90 seconds of their avoided conversation using STATE. Trio gives feedback on tone and tentativeness, two rehearsal cycles.',
        debrief: 'Volunteers perform their opening to the room; group identifies what created or destroyed safety.'
      },
      {
        name: 'Silence/violence spotting', duration: 20, type: 'plenary + pairs',
        description: 'Trainer plays short scripted dialogues; participants flag the moment dialogue dies and classify the move (masking, avoiding, withdrawing / controlling, labelling, attacking). Pairs then recall a live example from their team.',
        debrief: 'Build a team-specific early warning list.'
      }
    ]
  },

  {
    id: 'emotional-intelligence',
    name: 'Emotional Intelligence at Work',
    domain: 'Personal Development',
    blurb: 'Recognise and regulate emotions — yours and others\' — to make better decisions and build stronger working relationships.',
    learningOutcomes: [
      'Self-assess against the five components of emotional intelligence',
      'Apply emotion-labelling and reappraisal techniques to regulate under pressure',
      'Read emotional data in meetings and use it instead of suppressing it',
      'Replace emotional rigidity with the four steps of emotional agility'
    ],
    literature: [
      {
        title: 'What Makes a Leader (HBR) / Emotional Intelligence', authors: 'Daniel Goleman', year: 1998,
        keyIdeas: [
          'Five components: self-awareness, self-regulation, motivation, empathy, social skill',
          'In Goleman\'s analysis of competency models, EI mattered twice as much as IQ and technical skill for senior performance'
        ]
      },
      {
        title: 'Emotional Intelligence (founding paper)', authors: 'Peter Salovey & John Mayer', year: 1990,
        keyIdeas: [
          'EI defined as the ability to perceive, use, understand and manage emotions — an ability, hence trainable',
          'Emotions are data about the environment, not noise to suppress'
        ]
      },
      {
        title: 'Emotional Agility', authors: 'Susan David', year: 2016,
        keyIdeas: [
          'Being "hooked" by thoughts and emotions drives rigid behaviour; the goal is agility, not positivity',
          'Four moves: show up, step out, walk your why, move on — values-connected small adjustments'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Goleman\'s five components (1998)',
        summary: 'Self-awareness, self-regulation, motivation, empathy, social skill — a practical audit grid for managers.',
        teachPoints: [
          'Self-awareness first: you cannot regulate what you do not notice',
          'Empathy at work = considering employees\' feelings in the decision, not agreeing with them',
          'Each component maps to observable workplace behaviours — make it concrete'
        ]
      },
      {
        name: 'Name it to tame it — affect labelling',
        summary: 'Putting feelings into precise words measurably reduces amygdala response (Lieberman et al., 2007). Granularity matters: "frustrated about the deadline slip" beats "stressed".',
        teachPoints: [
          'Build emotional vocabulary beyond mad/sad/glad',
          'Label silently in meetings before responding',
          '90-second rule: the physiological wave passes if you don\'t re-trigger it'
        ]
      },
      {
        name: 'Emotional agility — show up, step out, walk your why (David, 2016)',
        summary: 'Acknowledge the emotion, create distance from it ("I notice I\'m having the thought that…"), reconnect to values, adjust behaviour.',
        teachPoints: [
          '"I am angry" vs "I notice anger" — fusion vs observation',
          'Values as the tiebreaker when emotion and goal conflict',
          'Tiny tweaks beat grand resolutions'
        ]
      }
    ],
    exercises: [
      {
        name: 'EI self-audit', duration: 20, type: 'individual',
        description: 'Structured self-rating against the five Goleman components with behavioural anchors; participants identify their lowest component and one workplace situation where it costs them.',
        debrief: 'Pairs share one insight; trainer notes that self-ratings of self-awareness are the least reliable — invite peer input.'
      },
      {
        name: 'Trigger mapping & reappraisal', duration: 30, type: 'individual + pairs',
        description: 'Participants map their top three workplace triggers (situation → bodily signal → default reaction → cost), then script a label + reappraisal for each.',
        debrief: 'Discuss: where in the chain is your earliest intervention point?'
      },
      {
        name: 'Emotion-data meeting replay', duration: 25, type: 'small groups',
        description: 'Groups replay a recent tense meeting: what emotional data was in the room, who suppressed what, what decision quality was lost. Re-run the key moment with labelling.',
        debrief: 'Each group states one norm they\'d change in their real meetings.'
      }
    ]
  },

  {
    id: 'time-management',
    name: 'Time Management & Prioritisation',
    domain: 'Personal Development',
    blurb: 'Move from reactive busyness to deliberate allocation of attention: prioritise, protect deep work, and close open loops.',
    learningOutcomes: [
      'Triage workload with the urgent/important matrix and defend Quadrant II time',
      'Design a weekly deep-work block structure compatible with team obligations',
      'Capture and clarify commitments so they stop occupying working memory',
      'Say no (or negotiate scope) using priority-based scripts'
    ],
    literature: [
      {
        title: 'The 7 Habits of Highly Effective People', authors: 'Stephen Covey', year: 1989,
        keyIdeas: [
          'Urgent/important matrix: effectiveness lives in Quadrant II (important, not urgent)',
          'Schedule priorities instead of prioritising the schedule — "big rocks first"'
        ]
      },
      {
        title: 'Deep Work', authors: 'Cal Newport', year: 2016,
        keyIdeas: [
          'Knowledge-work value concentrates in cognitively demanding, distraction-free work — which is becoming rare and therefore valuable',
          'Attention residue: switching tasks leaves residue that degrades performance on the next task (Leroy, 2009)'
        ]
      },
      {
        title: 'Getting Things Done', authors: 'David Allen', year: 2001,
        keyIdeas: [
          'Open loops held in the head create stress and consume working memory (Zeigarnik effect)',
          'Capture everything, clarify to next physical action, review weekly'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Eisenhower / Covey matrix (1989)',
        summary: 'Urgent×Important 2×2. Q1 firefighting, Q2 planning & development, Q3 interruptions disguised as work, Q4 escape.',
        teachPoints: [
          'Most managers\' calendars are Q1+Q3; their job description is Q2',
          'Audit a real week against the matrix — data beats intention',
          'Q2 time must be scheduled and defended, never "found"'
        ]
      },
      {
        name: 'Deep work scheduling (Newport, 2016)',
        summary: 'Rhythmic blocks of distraction-free work on the highest-value task; shallow work batched and bounded.',
        teachPoints: [
          'Start with 2×90-minute protected blocks per week — realistic beats heroic',
          'Attention residue: a 5-second inbox glance taxes the next 20 minutes',
          'Make blocks visible to the team: shared norms, not personal heroics'
        ]
      },
      {
        name: 'Capture–Clarify–Next Action (Allen, 2001)',
        summary: 'A trusted external system: capture all inputs, clarify each to a concrete next action, review weekly.',
        teachPoints: [
          '"Prepare board pack" is a project; "email Sara for Q2 figures" is a next action',
          'The weekly review is the keystone habit — without it the system rots',
          'One capture tool, always available, always emptied'
        ]
      }
    ],
    exercises: [
      {
        name: 'Calendar autopsy', duration: 25, type: 'individual + pairs',
        description: 'Participants classify every block of their last real week into the four quadrants, compute percentages, and identify the two biggest Q3 sources.',
        debrief: 'Room poll on Q2 percentage; discuss what the gap costs the business.'
      },
      {
        name: 'Deep-work block design', duration: 25, type: 'individual',
        description: 'Each participant designs next week\'s two protected blocks: task, time, location, shutdown ritual, and the message they\'ll send the team about availability.',
        debrief: 'Identify the most likely saboteur (usually self) and a countermeasure.'
      },
      {
        name: 'The "no" script clinic', duration: 20, type: 'pairs',
        description: 'Participants bring one real request they should decline or renegotiate. Pairs draft and rehearse a response that names current priorities and offers an alternative.',
        debrief: 'Collect best scripts on a shared sheet for the team.'
      }
    ]
  },

  {
    id: 'delegation',
    name: 'Delegation & Empowerment',
    domain: 'Managerial Skills',
    blurb: 'Hand over work at the right level of autonomy, keep accountability without micromanaging, and stop absorbing your team\'s problems.',
    learningOutcomes: [
      'Match delegation level to the person\'s competence and commitment for that specific task',
      'Run a delegation conversation that transfers ownership, not just tasks',
      'Spot and refuse "upward delegation" — monkeys jumping back',
      'Use intent-based language ("I intend to…") to push decision authority down'
    ],
    literature: [
      {
        title: 'Management of Organizational Behavior (Situational Leadership)', authors: 'Paul Hersey & Ken Blanchard', year: 1969,
        keyIdeas: [
          'No best leadership style: match directing/coaching/supporting/delegating to follower readiness',
          'Readiness is task-specific — a senior expert can be a beginner on a new task'
        ]
      },
      {
        title: 'The One Minute Manager Meets the Monkey', authors: 'Ken Blanchard, William Oncken & Hal Burrows', year: 1989,
        keyIdeas: [
          '"Monkeys" (next moves on problems) jump from report to manager in casual exchanges — "leave it with me"',
          'Every monkey gets an owner and a feeding schedule; the owner is never the manager by default'
        ]
      },
      {
        title: 'Turn the Ship Around!', authors: 'L. David Marquet', year: 2012,
        keyIdeas: [
          'Move authority to where the information is; "leader-leader" beats "leader-follower"',
          'Mechanism: replace requests for permission with statements of intent — "I intend to…"'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Situational Leadership II grid (Hersey & Blanchard)',
        summary: 'Diagnose development level (competence × commitment) per task; respond with directing, coaching, supporting or delegating.',
        teachPoints: [
          'Map each direct report against their three main tasks — levels differ per task',
          'Over-supervising the competent demotivates; under-supervising the new sets them up to fail',
          'The conversation is explicit: agree the level together'
        ]
      },
      {
        name: 'Monkey management (Oncken & Blanchard, 1989)',
        summary: 'Rules for keeping problem ownership with the problem-holder: describe, assign, insure, schedule.',
        teachPoints: [
          'Audit: how many of your current to-dos arrived as someone else\'s problem?',
          '"What do you recommend?" as the default reply to "we have a problem"',
          'Hallway commitments are where monkeys jump — slow those moments down'
        ]
      },
      {
        name: 'Ladder of leadership / intent (Marquet, 2012)',
        summary: 'Move people up the ladder: "tell me what to do" → "I see / I think / I intend / I\'ve done". Leaders certify, not direct.',
        teachPoints: [
          'Respond to "what should I do?" with "what do you intend to do?"',
          'Certify with two questions: what do you see, what would make this unsafe/wrong?',
          'Authority moves to information, not the reverse'
        ]
      }
    ],
    exercises: [
      {
        name: 'Delegation portfolio audit', duration: 25, type: 'individual',
        description: 'Participants list their 10 recurring tasks, mark each: must-keep / should-delegate / already-delegated-but-I-hover. For two "should-delegate" tasks, name the person and the development level.',
        debrief: 'Room stat: average number of delegable tasks still held. Discuss the real blocker (trust, speed, identity).'
      },
      {
        name: 'Delegation conversation role-play', duration: 30, type: 'trios',
        description: 'Using a real task from the audit, rehearse the handover conversation: outcome, constraints, level of autonomy, check-in cadence. Observer checks ownership actually transferred.',
        debrief: 'Common failure: outcome stated but autonomy level left implicit.'
      },
      {
        name: 'Monkey refusal drill', duration: 20, type: 'pairs',
        description: 'Rapid-fire rounds: one plays a report bringing problems ("quick question…"), the other practices returning ownership with coaching questions, without being dismissive.',
        debrief: 'Collect the three best ownership-returning phrases.'
      }
    ]
  },

  {
    id: 'coaching',
    name: 'Coaching Skills for Managers',
    domain: 'Managerial Skills',
    blurb: 'Shift from giving answers to growing capability: ask better questions, structure coaching conversations, and build a coaching habit into 1:1s.',
    learningOutcomes: [
      'Run a 20-minute coaching conversation using the GROW structure',
      'Replace advice-giving reflexes with the seven essential questions',
      'Listen at the level of meaning, not just content',
      'Convert existing 1:1s into development conversations'
    ],
    literature: [
      {
        title: 'Coaching for Performance', authors: 'John Whitmore', year: 1992,
        keyIdeas: [
          'GROW: Goal, Reality, Options, Will — performance = potential minus interference',
          'Awareness and responsibility are the goals of coaching; advice undermines both'
        ]
      },
      {
        title: 'The Coaching Habit', authors: 'Michael Bungay Stanier', year: 2016,
        keyIdeas: [
          'The advice monster: managers jump to solutions before the real problem is found',
          'Seven questions, led by "What\'s on your mind?" and "And what else?" — stay curious 3 seconds longer'
        ]
      },
      {
        title: 'The Inner Game of Work', authors: 'W. Timothy Gallwey', year: 2000,
        keyIdeas: [
          'Self 1 (the judging voice) interferes with Self 2 (capability); coaching quiets interference',
          'Non-judgemental awareness of what IS changes behaviour faster than instruction'
        ]
      }
    ],
    coreModels: [
      {
        name: 'GROW (Whitmore, 1992)',
        summary: 'Goal–Reality–Options–Will: a conversation arc from desired outcome through honest current state to chosen action.',
        teachPoints: [
          'Most conversations skip Goal and drown in Reality — anchor the goal first',
          'In Options, quantity before quality; the coachee\'s option list, not yours',
          'Will: "What will you do, by when, and how will I know?" — commitment, not intention'
        ]
      },
      {
        name: 'The seven questions (Bungay Stanier, 2016)',
        summary: 'Kickstart, AWE ("And what else?"), focus ("What\'s the real challenge here for you?"), foundation, lazy, strategic, learning questions.',
        teachPoints: [
          '"What\'s the real challenge here for you?" — the focus question does most of the work',
          'AWE question: first answers are rarely the real ones',
          'Tame the advice monster: notice the urge, ask one more question'
        ]
      },
      {
        name: 'Three levels of listening',
        summary: 'Level 1: listening to respond. Level 2: listening to the speaker\'s content. Level 3: listening to meaning, emotion, and what\'s unsaid.',
        teachPoints: [
          'Diagnostic: if you\'re rehearsing your reply, you\'re at level 1',
          'Silence is a tool — count three seconds after they stop',
          'Reflect meaning back ("sounds like the real worry is…") and let them correct you'
        ]
      }
    ],
    exercises: [
      {
        name: 'GROW live practice', duration: 35, type: 'trios (coach / coachee / observer)',
        description: 'Real topics only — each coachee brings a genuine current challenge. 12-minute coached conversation, observer tracks GROW phases and counts advice-giving slips. Rotate.',
        debrief: 'Observers report: where did the coach jump to options? What question unlocked the most?'
      },
      {
        name: 'Advice monster awareness round', duration: 20, type: 'pairs',
        description: 'One speaks for 4 minutes on a problem; the listener may ONLY ask questions — zero statements, zero suggestions. Swap. Then discuss how it felt on both sides.',
        debrief: 'Name the moment the urge to advise peaked; what question replaced it?'
      },
      {
        name: '1:1 redesign', duration: 20, type: 'individual',
        description: 'Participants redesign their standing 1:1 agenda: which 10 minutes become coaching, which questions open it, what they will stop doing (status they can read elsewhere).',
        debrief: 'Commit to one redesigned 1:1 within a week; pair accountability.'
      }
    ]
  },

  {
    id: 'conflict',
    name: 'Conflict Resolution & Negotiation',
    domain: 'Communication',
    blurb: 'Treat conflict as information: diagnose your default mode, negotiate on interests instead of positions, and turn team friction into productive disagreement.',
    learningOutcomes: [
      'Identify your default conflict mode and its cost using the Thomas-Kilmann framework',
      'Move a stuck disagreement from positions to interests',
      'Generate options for mutual gain before dividing value',
      'Distinguish productive task conflict from destructive relationship conflict'
    ],
    literature: [
      {
        title: 'Thomas-Kilmann Conflict Mode Instrument', authors: 'Kenneth Thomas & Ralph Kilmann', year: 1974,
        keyIdeas: [
          'Five modes from two axes (assertiveness × cooperativeness): competing, collaborating, compromising, avoiding, accommodating',
          'Every mode is right somewhere; dysfunction is using one mode everywhere'
        ]
      },
      {
        title: 'Getting to Yes', authors: 'Roger Fisher & William Ury (Harvard Negotiation Project)', year: 1981,
        keyIdeas: [
          'Separate the people from the problem; negotiate interests, not positions',
          'Invent options for mutual gain; insist on objective criteria; know your BATNA'
        ]
      },
      {
        title: 'The Five Dysfunctions of a Team', authors: 'Patrick Lencioni', year: 2002,
        keyIdeas: [
          'Fear of conflict produces artificial harmony and weak commitment',
          'Trust (vulnerability-based) is the foundation that makes healthy conflict possible'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Thomas-Kilmann five modes (1974)',
        summary: 'Competing, collaborating, compromising, avoiding, accommodating — each a legitimate tool with a context.',
        teachPoints: [
          'Self-assess: which mode is your reflex under pressure?',
          'Avoiding is the most expensive mode in management roles — issues compound',
          'Pick mode deliberately: stakes × relationship × time available'
        ]
      },
      {
        name: 'Positions vs interests (Fisher & Ury, 1981)',
        summary: 'A position is what they say they want; an interest is why. Agreements live where interests overlap.',
        teachPoints: [
          'Ask "what would that get you?" until you hit the interest',
          'BATNA: your power is your walk-away alternative, not your stubbornness',
          'Objective criteria de-personalise: market data, precedent, policy'
        ]
      },
      {
        name: 'Task conflict vs relationship conflict',
        summary: 'Disagreement about the work improves decisions; disagreement that turns personal destroys them. The manager\'s job is keeping conflict in the first lane.',
        teachPoints: [
          'Norms that protect task conflict: argue the idea, steelman first, decide-and-commit',
          'Watch the flip moment: "your plan is risky" → "you are careless"',
          'After decision: disagree-and-commit is explicit, not assumed'
        ]
      }
    ],
    exercises: [
      {
        name: 'Conflict mode self-diagnosis', duration: 20, type: 'individual + pairs',
        description: 'Short TKI-style questionnaire; participants identify default and least-used modes, then recall one situation where the default mode cost them.',
        debrief: 'Room map of modes; discuss the team\'s collective blind spot.'
      },
      {
        name: 'Interest excavation role-play', duration: 30, type: 'pairs + observer',
        description: 'Scripted two-party standoff (e.g., resource allocation). Negotiators must surface three interests behind the other\'s position before proposing anything. Observer flags positional slips.',
        debrief: 'Which question unlocked the interests? Replay the moment agreement became possible.'
      },
      {
        name: 'Real conflict rehearsal', duration: 25, type: 'trios',
        description: 'Participants bring one live workplace conflict. Trio helps map modes, interests and BATNA, then rehearses the opening exchange.',
        debrief: 'Each participant states their chosen mode and first sentence.'
      }
    ]
  },

  {
    id: 'change-management',
    name: 'Leading Change',
    domain: 'Managerial Skills',
    blurb: 'Lead teams through change without losing them: build urgency, manage the human transition, and design the environment so change sticks.',
    learningOutcomes: [
      'Diagnose why a current change effort is stalling using Kotter\'s 8 steps',
      'Distinguish the change (event) from the transition (psychological process) and manage both',
      'Apply the Switch framework: direct the rider, motivate the elephant, shape the path',
      'Plan communication for the change curve, not just the project plan'
    ],
    literature: [
      {
        title: 'Leading Change', authors: 'John Kotter', year: 1996,
        keyIdeas: [
          '8 steps: urgency, coalition, vision, communication, empowerment, short-term wins, consolidation, anchoring',
          'Most transformations fail at step 1 — under 50% of leaders establish real urgency'
        ]
      },
      {
        title: 'Switch: How to Change Things When Change Is Hard', authors: 'Chip Heath & Dan Heath', year: 2010,
        keyIdeas: [
          'Rider (rational), Elephant (emotional), Path (environment) — change fails when you only brief the rider',
          'Shrink the change, script the critical moves, build habits into the environment'
        ]
      },
      {
        title: 'Managing Transitions', authors: 'William Bridges', year: 1991,
        keyIdeas: [
          'Change is situational; transition is psychological: ending → neutral zone → new beginning',
          'People must be allowed to grieve the ending; skipped endings resurface as resistance'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Kotter\'s 8 steps (1996)',
        summary: 'A sequence for organisational change, from creating urgency to anchoring new approaches in culture.',
        teachPoints: [
          'Diagnose a live change against all 8 — stalls usually trace to a skipped early step',
          'Short-term wins are designed, not hoped for: visible, unambiguous, within 6–18 months',
          'Communication: ×10 less than needed is the norm — repeat through every channel'
        ]
      },
      {
        name: 'Rider–Elephant–Path (Heath & Heath, 2010)',
        summary: 'Direct the rider (crystal-clear direction), motivate the elephant (feeling, not just data), shape the path (environment and habits).',
        teachPoints: [
          'What looks like resistance is often lack of clarity — script the critical moves',
          'What looks like laziness is often exhaustion — shrink the change',
          'What looks like a people problem is often a situation problem — fix the path'
        ]
      },
      {
        name: 'Bridges transition curve (1991)',
        summary: 'Endings, the neutral zone, new beginnings — each phase needs different leadership behaviour.',
        teachPoints: [
          'Name what people are losing — specifically, openly, without selling',
          'The neutral zone is where innovation happens AND where people quit: over-communicate',
          'Mark the new beginning visibly: purpose, picture, plan, part to play'
        ]
      }
    ],
    exercises: [
      {
        name: 'Stalled change autopsy', duration: 30, type: 'small groups',
        description: 'Each group takes a real stalled change from a member\'s organisation and scores it 0–10 against each Kotter step, identifying the first broken step.',
        debrief: 'Groups present the broken step and one corrective action; trainer maps the room\'s pattern.'
      },
      {
        name: 'Elephant & path redesign', duration: 25, type: 'pairs',
        description: 'For a change participants must lead soon: write the rider briefing they already have, then design one elephant move (feeling) and two path moves (environment) they didn\'t have.',
        debrief: 'Best elephant moves shared; note how few changes have any.'
      },
      {
        name: 'Losses conversation rehearsal', duration: 20, type: 'pairs',
        description: 'Rehearse the conversation acknowledging what a team loses in the change — without minimising, selling, or rushing to the bright side.',
        debrief: 'Discuss discomfort: why naming losses feels risky and why skipping it costs more.'
      }
    ]
  },

  {
    id: 'presentation',
    name: 'Presentation & Influencing Skills',
    domain: 'Communication',
    blurb: 'Build presentations around the audience\'s journey, make messages stick, and use evidence-based influence ethically.',
    learningOutcomes: [
      'Structure a presentation as an audience journey from "what is" to "what could be"',
      'Apply the SUCCESs principles to make key messages memorable',
      'Use the six principles of influence appropriately in stakeholder communication',
      'Cut slide content to what supports the spoken argument'
    ],
    literature: [
      {
        title: 'Resonate', authors: 'Nancy Duarte', year: 2010,
        keyIdeas: [
          'The audience is the hero; the presenter is the mentor',
          'Great talks oscillate between "what is" and "what could be", ending with the new bliss'
        ]
      },
      {
        title: 'Made to Stick', authors: 'Chip Heath & Dan Heath', year: 2007,
        keyIdeas: [
          'SUCCESs: Simple, Unexpected, Concrete, Credible, Emotional, Stories',
          'The Curse of Knowledge: experts can\'t imagine not knowing — the #1 communication failure'
        ]
      },
      {
        title: 'Influence: The Psychology of Persuasion', authors: 'Robert Cialdini', year: 1984,
        keyIdeas: [
          'Six principles: reciprocity, commitment/consistency, social proof, authority, liking, scarcity',
          'Influence works pre-suasively: the frame before the message shapes its reception'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Duarte sparkline (2010)',
        summary: 'Open with "what is", contrast with "what could be", oscillate, end with the call to action and the "new bliss".',
        teachPoints: [
          'Find the gap: if there\'s no contrast, there\'s no reason to listen',
          'Map your last presentation on the sparkline — most are a flat line of "what is"',
          'The ending sells the future state, not the agenda recap'
        ]
      },
      {
        name: 'SUCCESs (Heath & Heath, 2007)',
        summary: 'Six properties of ideas that survive: Simple, Unexpected, Concrete, Credible, Emotional, Stories.',
        teachPoints: [
          'Simple = core + compact, not dumbed down ("commander\'s intent")',
          'Concrete beats abstract: "15% churn" → "we lose one customer every working day"',
          'Test for the Curse of Knowledge: read your slides as a new hire'
        ]
      },
      {
        name: 'Cialdini\'s six principles (1984)',
        summary: 'Reciprocity, commitment, social proof, authority, liking, scarcity — levers to use transparently, never to manipulate.',
        teachPoints: [
          'Social proof in proposals: who else (credible, similar) already does this?',
          'Commitment: small public yeses before the big ask',
          'Ethics line: influence aligns interests; manipulation hides them'
        ]
      }
    ],
    exercises: [
      {
        name: 'Sparkline rebuild', duration: 30, type: 'individual + pairs',
        description: 'Participants take a real upcoming presentation and restructure it on the sparkline: what is / what could be / call to action. Pairs challenge: where\'s the gap, who\'s the hero?',
        debrief: 'Two volunteers present their before/after structure.'
      },
      {
        name: 'Message stickiness workshop', duration: 25, type: 'small groups',
        description: 'Each group takes one abstract corporate message ("we must improve cross-functional collaboration") and rewrites it through the SUCCESs filter — concrete, unexpected, story-led.',
        debrief: 'Groups vote on stickiest rewrite; extract what made it work.'
      },
      {
        name: '90-second pitch rounds', duration: 30, type: 'plenary',
        description: 'Each participant delivers a 90-second pitch of their restructured opening; audience scores: did I know the gap? did I feel the stakes? Camera optional for self-review.',
        debrief: 'Pattern feedback on openings — most bury the contrast.'
      }
    ]
  },

  {
    id: 'resilience',
    name: 'Resilience & Stress Management',
    domain: 'Personal Development',
    blurb: 'Build sustainable performance: reframe stress, train explanatory style, and design real recovery into the working week.',
    learningOutcomes: [
      'Reframe stress responses using the stress-mindset research',
      'Identify and dispute pessimistic explanatory patterns under setback',
      'Design daily and weekly recovery practices that actually restore capacity',
      'Recognise early overload signals in self and team and act on them'
    ],
    literature: [
      {
        title: 'The Upside of Stress', authors: 'Kelly McGonigal', year: 2015,
        keyIdeas: [
          'Stress mindset changes physiology: viewing stress as enhancing alters the cardiovascular response (Crum et al., 2013)',
          'The stress response can be channelled: challenge response and tend-and-befriend, not just fight-or-flight'
        ]
      },
      {
        title: 'Learned Optimism', authors: 'Martin Seligman', year: 1990,
        keyIdeas: [
          'Explanatory style — permanent/pervasive/personal vs temporary/specific/external — predicts resilience under setback',
          'Disputation (ABCDE) is trainable and changes outcomes'
        ]
      },
      {
        title: 'Recovery research (work & rest)', authors: 'Sabine Sonnentag et al.', year: 2007,
        keyIdeas: [
          'Psychological detachment from work during off-hours predicts next-day energy and engagement',
          'Recovery quality beats recovery quantity: mastery experiences and control matter more than hours'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Stress mindset reframe (Crum/McGonigal)',
        summary: 'The belief "stress is enhancing" vs "stress is debilitating" changes hormonal and performance outcomes. Reframe: this is my body resourcing me.',
        teachPoints: [
          'Racing heart before a presentation = oxygen delivery, not malfunction',
          'Three-step reframe: notice, welcome ("this means I care"), use the energy',
          'Mindset is not denial — workload problems still need workload solutions'
        ]
      },
      {
        name: 'ABCDE disputation (Seligman, 1990)',
        summary: 'Adversity → Belief → Consequence → Disputation → Energisation. Catch the belief, argue it like a lawyer, observe the shift.',
        teachPoints: [
          'The 3 Ps under setback: "always" (permanent), "everything" (pervasive), "all me" (personal)',
          'Dispute with evidence, alternatives, implications, usefulness',
          'Write it down — disputation in the head loses to rumination'
        ]
      },
      {
        name: 'Detachment & recovery design (Sonnentag)',
        summary: 'Recovery requires psychological detachment, relaxation, mastery, and control — design all four into the week.',
        teachPoints: [
          'A shutdown ritual creates the boundary the open laptop erases',
          'Mastery experiences (sport, music, craft) restore more than passive scrolling',
          'Managers set the recovery norms: your 11pm email is a policy statement'
        ]
      }
    ],
    exercises: [
      {
        name: 'Stress audit & reframe', duration: 25, type: 'individual + pairs',
        description: 'Participants list current top three stressors, classify each (challenge vs threat appraisal, controllable vs not), and script a reframe for one and a concrete action for another.',
        debrief: 'Key distinction: reframe what you can\'t change, change what you can.'
      },
      {
        name: 'ABCDE on a live setback', duration: 25, type: 'individual + trios',
        description: 'Each participant runs a recent professional setback through ABCDE in writing, then reads B and D aloud to the trio, who strengthen the disputation.',
        debrief: 'Spot the 3 Ps in the room\'s beliefs; note how predictable they are.'
      },
      {
        name: 'Recovery week design', duration: 20, type: 'individual',
        description: 'Participants score last week on detachment, relaxation, mastery, control (1–5 each), then design next week with one concrete change per lowest dimension, plus a shutdown ritual.',
        debrief: 'Pairs exchange one commitment; managers asked what norm they\'ll change for their team.'
      }
    ]
  },

  {
    id: 'team-effectiveness',
    name: 'Building High-Performing Teams',
    domain: 'Managerial Skills',
    blurb: 'Engineer the conditions research says high-performing teams share: psychological safety, vulnerability-based trust, and real commitment.',
    learningOutcomes: [
      'Assess a team against the five dysfunctions pyramid and pick the binding constraint',
      'Apply the Project Aristotle findings, starting with psychological safety',
      'Diagnose which stage of development a team is in and lead accordingly',
      'Design team norms that survive pressure'
    ],
    literature: [
      {
        title: 'The Five Dysfunctions of a Team', authors: 'Patrick Lencioni', year: 2002,
        keyIdeas: [
          'Pyramid: absence of trust → fear of conflict → lack of commitment → avoidance of accountability → inattention to results',
          'Trust here means vulnerability: able to say "I was wrong", "I need help"'
        ]
      },
      {
        title: 'Project Aristotle (Google re:Work)', authors: 'Google People Analytics (reported by Charles Duhigg, NYT)', year: 2016,
        keyIdeas: [
          'Who is on the team matters less than how the team interacts',
          'Five factors, in order: psychological safety, dependability, structure & clarity, meaning, impact'
        ]
      },
      {
        title: 'Developmental Sequence in Small Groups', authors: 'Bruce Tuckman', year: 1965,
        keyIdeas: [
          'Forming, storming, norming, performing — storming is necessary, not a failure',
          'Teams regress to earlier stages when membership or mission changes'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Five dysfunctions pyramid (Lencioni, 2002)',
        summary: 'Each layer enables the next; fix from the bottom. The team\'s visible problem (missed results) is rarely the binding constraint.',
        teachPoints: [
          'Quick team diagnostic across the five layers',
          'Trust-building is engineered: personal histories, strengths exercises, leader goes first',
          'Accountability is peer-to-peer in healthy teams, not just leader-to-member'
        ]
      },
      {
        name: 'Project Aristotle five factors (2016)',
        summary: 'Psychological safety, dependability, structure & clarity, meaning, impact — measurable and improvable.',
        teachPoints: [
          'Safety is measured by question-asking and mistake-admitting frequency, not surveys alone',
          'Dependability: explicit working agreements beat assumed professionalism',
          'Clarity: every member can state team goals and their own role\'s success measure'
        ]
      },
      {
        name: 'Tuckman stages (1965)',
        summary: 'Forming, storming, norming, performing (+ adjourning). Each stage needs different leadership.',
        teachPoints: [
          'Storming suppressed is storming postponed — usually to a worse moment',
          'New member or new mission = partial reset; plan for it',
          'Performing teams need the leader to get out of the way and guard the boundaries'
        ]
      }
    ],
    exercises: [
      {
        name: 'Team diagnostic', duration: 25, type: 'individual + small groups',
        description: 'Managers score their real team on the five dysfunctions and the five Aristotle factors, then identify the single binding constraint with evidence.',
        debrief: 'Pattern check: most rooms over-diagnose accountability and under-diagnose trust.'
      },
      {
        name: 'Norms under pressure workshop', duration: 30, type: 'small groups',
        description: 'Groups draft three team norms that specifically address their binding constraint, then stress-test each: "what happens to this norm in the worst week of the quarter?"',
        debrief: 'Norms that survive pressure are behavioural and observable, not aspirational.'
      },
      {
        name: 'Leader-goes-first planning', duration: 20, type: 'individual + pairs',
        description: 'Each manager scripts one act of leader vulnerability for their next team meeting (a mistake owned, help requested, feedback asked for) and rehearses delivery with a partner.',
        debrief: 'Discuss the line between authentic vulnerability and oversharing.'
      }
    ]
  },

  {
    id: 'decision-making',
    name: 'Decision Making & Problem Solving',
    domain: 'Managerial Skills',
    blurb: 'Make better calls under uncertainty: counter predictable biases, widen options, and pressure-test decisions before reality does.',
    learningOutcomes: [
      'Recognise the highest-cost cognitive biases in management decisions',
      'Apply the WRAP process to a live decision',
      'Run a premortem to surface failure modes before committing',
      'Match decision process to decision type (reversible vs irreversible)'
    ],
    literature: [
      {
        title: 'Thinking, Fast and Slow', authors: 'Daniel Kahneman', year: 2011,
        keyIdeas: [
          'System 1 (fast, intuitive) drives most judgements and carries systematic biases: anchoring, availability, overconfidence, loss aversion',
          'WYSIATI — what you see is all there is: confidence reflects story coherence, not evidence quality'
        ]
      },
      {
        title: 'Decisive', authors: 'Chip Heath & Dan Heath', year: 2013,
        keyIdeas: [
          'Four villains of decisions: narrow framing, confirmation bias, short-term emotion, overconfidence',
          'WRAP: Widen options, Reality-test assumptions, Attain distance, Prepare to be wrong'
        ]
      },
      {
        title: 'Performing a Project Premortem (HBR)', authors: 'Gary Klein', year: 2007,
        keyIdeas: [
          'Prospective hindsight: "imagine it\'s a year later and the decision failed — write the story" raises correct identification of failure causes by ~30%',
          'Premortems legitimise dissent that politeness suppresses'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Bias field guide (Kahneman, 2011)',
        summary: 'The four most expensive biases in management: anchoring, availability, confirmation, overconfidence — with workplace tells for each.',
        teachPoints: [
          'Anchoring: first numbers in budget talks frame everything after — sequence deliberately',
          'Availability: vivid recent events crowd out base rates',
          'You can\'t debias yourself in the moment; you can design process that catches it'
        ]
      },
      {
        name: 'WRAP (Heath & Heath, 2013)',
        summary: 'Widen options (avoid "whether or not"), Reality-test (run experiments, ask disconfirming questions), Attain distance (10/10/10), Prepare to be wrong (tripwires).',
        teachPoints: [
          '"Whether or not" decisions fail far more often than multi-option ones — find the third option',
          'Vanishing options test: if you couldn\'t do any current option, what would you do?',
          'Tripwires: decide now what evidence would change your mind later'
        ]
      },
      {
        name: 'Premortem protocol (Klein, 2007)',
        summary: 'Before committing: "It\'s 12 months from now. This failed badly. Each person writes the story of why." Then consolidate and mitigate.',
        teachPoints: [
          'Writing individually before sharing prevents anchoring on the boss\'s story',
          'Failure stories, not risk lists — narrative surfaces what checklists miss',
          'Output: top three failure modes each get an owner and a mitigation or tripwire'
        ]
      }
    ],
    exercises: [
      {
        name: 'Bias spotting in real cases', duration: 25, type: 'small groups',
        description: 'Groups analyse two short management decision cases (one provided, one from a member\'s experience) and identify which biases plausibly operated, with the textual evidence.',
        debrief: 'Key point: biases are visible in hindsight and in others — hence process, not willpower.'
      },
      {
        name: 'WRAP a live decision', duration: 30, type: 'pairs',
        description: 'Each participant brings one real pending decision and walks it through all four WRAP steps with a partner challenging at each step ("what\'s your third option?", "what would disconfirm this?").',
        debrief: 'Poll: how many decisions changed shape? Usually most.'
      },
      {
        name: 'Premortem simulation', duration: 25, type: 'small groups',
        description: 'Full premortem on one group member\'s real upcoming decision: 5 minutes silent failure-story writing, share, cluster, assign mitigations and tripwires.',
        debrief: 'Compare what surfaced vs the original risk discussion — the delta is the method\'s value.'
      }
    ]
  },

  {
    id: 'managing-up',
    name: 'Managing Up & Stakeholder Management',
    domain: 'Managerial Skills',
    blurb: 'Manage the relationship with your boss and key stakeholders deliberately: align expectations, communicate in their format, and build influence without authority.',
    learningOutcomes: [
      'Map stakeholders by interest and influence and set an engagement strategy for each',
      'Diagnose your manager\'s working style and adapt the communication contract',
      'Frame proposals in the stakeholder\'s currency (risk, cost, time, reputation)',
      'Escalate problems early in a way that builds rather than burns credibility'
    ],
    literature: [
      {
        title: 'Managing Your Boss (HBR)', authors: 'John Gabarro & John Kotter', year: 1980,
        keyIdeas: [
          'The boss relationship is one of mutual dependence between fallible humans — manage it consciously',
          'Understand their pressures, strengths, blind spots and preferred information style (reader vs listener)'
        ]
      },
      {
        title: 'Influence Without Authority', authors: 'Allan Cohen & David Bradford', year: 1989,
        keyIdeas: [
          'Influence is exchange: identify the currencies the other party values (recognition, resources, certainty, vision)',
          'Treat the other party as a potential ally, not an obstacle'
        ]
      },
      {
        title: 'The First 90 Days', authors: 'Michael Watkins', year: 2003,
        keyIdeas: [
          'Negotiate expectations explicitly: situation, expectations, resources, style, personal development — the five conversations',
          'Match strategy to the situation (STARS: start-up, turnaround, accelerated growth, realignment, sustaining success)'
        ]
      }
    ],
    coreModels: [
      {
        name: 'Reader/listener & style contract (Gabarro & Kotter, 1980)',
        summary: 'Diagnose how your boss consumes information and decides; agree explicitly on format, frequency, and no-surprise rules.',
        teachPoints: [
          'Reader bosses want the memo before the meeting; listener bosses want the conversation first',
          'The "no surprises" rule is the single most universal boss expectation',
          'Misalignment is your problem to fix — you have more to lose'
        ]
      },
      {
        name: 'Stakeholder grid (interest × influence)',
        summary: 'Map stakeholders into manage closely / keep satisfied / keep informed / monitor; engagement effort follows the grid.',
        teachPoints: [
          'Re-map at every project phase change — positions move',
          'The dangerous quadrant: high influence, low engagement effort',
          'For each "manage closely" stakeholder: what is their currency and their fear?'
        ]
      },
      {
        name: 'Currencies of influence (Cohen & Bradford, 1989)',
        summary: 'Inspiration, task, position, relationship and personal currencies — frame requests as exchanges in the currency they value.',
        teachPoints: [
          'Translate your ask: what does this give THEM in their currency?',
          'Build credit before you need it — influence runs on a balance',
          'Ask: "what would make this a win for your team?" and use the answer'
        ]
      }
    ],
    exercises: [
      {
        name: 'Boss style diagnostic', duration: 20, type: 'individual + pairs',
        description: 'Structured worksheet: boss\'s pressures, goals, style (reader/listener, detail/headline, risk appetite), and the two biggest mismatches with the participant\'s current habits.',
        debrief: 'Each participant names one concrete adaptation to start this month.'
      },
      {
        name: 'Stakeholder mapping on a live project', duration: 25, type: 'individual + small groups',
        description: 'Participants map their real key project\'s stakeholders on the grid, then for the top two: currency, fear, current relationship balance, next move.',
        debrief: 'Group spots the neglected high-influence stakeholder — there usually is one.'
      },
      {
        name: 'Escalation rehearsal', duration: 25, type: 'trios',
        description: 'Rehearse delivering early bad news upward: the problem, the impact, the options, the recommendation (not just the problem). Observer checks: would the boss feel informed or dumped on?',
        debrief: 'Contrast "bringing problems" vs "bringing problems with options" — credibility effect.'
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) module.exports = { TOPICS };
