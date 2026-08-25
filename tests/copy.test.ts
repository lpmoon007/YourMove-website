// The checks that hold the line on player-facing copy.
//
// Rule: when a correction arrives, fix the class and then make the class checkable. These
// tests are the mechanical half of that. They read the real source files, so a defect
// reintroduced in a component fails the build the same as one reintroduced in content.

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { SCENARIOS } from '../content/scenarios.js';
import { GENRES, DIFFICULTIES } from '../content/genres.js';
import { PLAY_READINGS, HOW_YOU_PLAY_INTRO, CONTRADICTION } from '../content/play.js';
import { BADGES, PROFILE_DISCLAIMER, WORLDS_PLAYED } from '../content/profile.js';
import { FAQ, ROADMAP, SEVEN_LAYERS } from '../content/roadmap.js';
import { HERO_OPENINGS } from '../content/hero.js';
import { HERO_GENRES } from '../content/genres.js';

const ROOT = new URL('..', import.meta.url).pathname;

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, entry);
    if (statSync(join(ROOT, rel)).isDirectory()) sourceFiles(rel, out);
    else if (/\.(ts|tsx)$/.test(entry) && !rel.includes('tests/')) out.push(rel);
  }
  return out;
}

const SOURCES = [...sourceFiles('app'), ...sourceFiles('components'), ...sourceFiles('content')];
const TEXT = SOURCES.map((f) => ({ file: f, body: readFileSync(join(ROOT, f), 'utf8') }));

// ---------------------------------------------------------------------------------------
// How You Play measures play, never personality.
// ---------------------------------------------------------------------------------------

const PERSONALITY_WORDS = [
  'personality',
  'psychological',
  'psychometric',
  'diagnosis',
  'diagnostic',
  'assessment',
  'leadership style',
  'behavioral type',
  'behavioural type',
  'personality test',
];

test('no personality or assessment language anywhere a visitor can read it', () => {
  for (const { file, body } of TEXT) {
    for (const word of PERSONALITY_WORDS) {
      assert.ok(
        !body.toLowerCase().includes(word),
        `${file} uses "${word}". How You Play measures observable play, never a person.`,
      );
    }
  }
});

test('the word "trait" never reaches a visitor', () => {
  // "trait" is the word that turns a record of play into a claim about a person. The engine
  // repository fails its build on it too.
  for (const { file, body } of TEXT) {
    assert.ok(!/\btraits?\b/i.test(body), `${file} uses "trait". Say dimension, line, or pattern.`);
  }
});

test('How You Play copy never says "you are"', () => {
  const strings = [
    HOW_YOU_PLAY_INTRO,
    CONTRADICTION,
    ...PLAY_READINGS.flatMap((d) => [d.note, d.context ?? '', ...d.why, ...d.counter]),
  ];
  for (const s of strings) {
    assert.ok(!/\byou are\b/i.test(s), `"${s}" asserts what someone is. Write what they tend to do.`);
    assert.ok(!/\byou're\b/i.test(s), `"${s}" asserts what someone is. Write what they tend to do.`);
  }
});

test('every reading carries the evidence behind it, counter-evidence included', () => {
  for (const d of PLAY_READINGS) {
    const grounded = d.context ? d.context.length > 0 : d.why.length > 0;
    assert.ok(grounded, `${d.id} shows a marker with nothing behind it.`);
    assert.ok(d.position >= 0 && d.position <= 100, `${d.id} sits off the line.`);
    if (d.confidence === 'context-dependent') {
      assert.ok(d.context, `${d.id} is context-dependent but does not say what changes with the context.`);
    }
  }
});

test('the Core Eight are all present, in the engine order', () => {
  assert.deepEqual(
    PLAY_READINGS.map((d) => d.id),
    [
      'force_diplomacy',
      'caution_boldness',
      'solo_coalition',
      'speed_deliberation',
      'control_delegation',
      'preserve_risk',
      'direct_cunning',
      'loyalty_opportunism',
    ],
  );
});

// ---------------------------------------------------------------------------------------
// The hero.
// ---------------------------------------------------------------------------------------

test('every rotating backdrop has an opening written for it, and an image to show', () => {
  for (const key of HERO_GENRES) {
    const opening = HERO_OPENINGS.find((o) => o.genre === key);
    assert.ok(opening, `${key} rotates in the hero with no opening written for it.`);
    assert.ok(
      opening.text.length > 200,
      `The ${key} opening is too short to put a stranger inside a situation.`,
    );
    for (const asset of [`${key}-1000.webp`, `${key}-1935.webp`, `${key}-1935.jpg`]) {
      assert.ok(
        existsSync(join(ROOT, 'public/hero', asset)),
        `${key} rotates in the hero but public/hero/${asset} is missing — run npm run images.`,
      );
    }
  }
});

test('the hero copy lives in content, not in the component', () => {
  // The 1777 opening shipped with one path costing nothing, and no test could see it, because
  // it was hard-coded in Hero.tsx where nothing reads it alongside the other copy.
  //
  // Checking only that today's exact wording is absent is not enough — an earlier draft left
  // behind would pass that and still be what visitors read. So look for prose of any kind.
  const hero = readFileSync(join(ROOT, 'components/site/Hero.tsx'), 'utf8');

  assert.ok(hero.includes('HERO_OPENINGS'), 'Hero.tsx does not take its copy from content/.');

  const withoutComments = hero.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  // A JSX text node long enough to be a sentence is copy, and copy belongs in content/.
  for (const [, text] of withoutComments.matchAll(/>([^<>{}]{60,})</g)) {
    assert.fail(`Hero.tsx has copy inline: "${text.trim().slice(0, 60)}…"`);
  }
});

test('the hero names nobody it has not introduced', () => {
  // Nothing on this page has told the reader who anyone is, so a proper name is a stranger's
  // name doing no work. Describe people by what a reader can picture instead.
  const titled = /\b(Mr|Mrs|Ms|Dr|Sergeant|Corporal|Captain|Colonel|Major|Lieutenant|Detective|Officer)\.?\s+[A-Z][a-z]+/;
  for (const opening of HERO_OPENINGS) {
    const found = opening.text.match(titled);
    assert.ok(!found, `The ${opening.genre} opening names "${found?.[0]}" without introducing them.`);
  }
});

// ---------------------------------------------------------------------------------------
// Nothing invented may read as measured.
// ---------------------------------------------------------------------------------------

test('the demo says its split is illustrative, and the shares add up', () => {
  const demo = readFileSync(join(ROOT, 'components/site/ScenarioDemo.tsx'), 'utf8');
  assert.ok(demo.includes('SHARE_DISCLOSURE'), 'the demo shows invented percentages without disclosing it.');
  for (const s of SCENARIOS) {
    const total = s.choices.reduce((n, c) => n + c.share, 0);
    assert.equal(total, 100, `${s.id} splits to ${total}%, not 100%.`);
  }
});

test('the demo profile is labeled fictional before any number appears', () => {
  assert.match(PROFILE_DISCLAIMER, /fictional/i);
  assert.match(PROFILE_DISCLAIMER, /invented/i);
  const page = readFileSync(join(ROOT, 'app/profile/page.tsx'), 'utf8');
  const banner = page.indexOf('PROFILE_DISCLAIMER');
  const stats = page.indexOf('PROFILE_STATS');
  assert.ok(banner > -1 && banner < stats, 'the numbers appear before the page says they are invented.');
});

// ---------------------------------------------------------------------------------------
// A stranger has to be able to read every screen.
// ---------------------------------------------------------------------------------------

test('every scenario states the situation, and every choice states its cost', () => {
  for (const s of SCENARIOS) {
    assert.ok(s.prompt.length > 120, `${s.id} does not say enough for a stranger to act on it.`);
    assert.equal(s.choices.length, 3, `${s.id} does not offer three moves.`);
    for (const c of s.choices) {
      assert.ok(c.detail.length > 40, `${s.id}/${c.id} states a move without stating what it costs.`);
      assert.ok(c.result.length > 80, `${s.id}/${c.id} resolves without saying what actually followed.`);
      assert.ok(c.short.length <= 24, `${s.id}/${c.id} has a bar label too long for its column.`);
    }
  }
});

test('every genre says what you do there and what it feels like to be there', () => {
  assert.equal(GENRES.length, 7);
  for (const g of GENRES) {
    assert.ok(g.hook.length > 30, `${g.key} has no hook.`);
    assert.ok(g.texture.length > 20, `${g.key} has no texture cue.`);
    assert.ok(g.horizon.length > 20, `${g.key} has no horizon.`);
  }
  const page = readFileSync(join(ROOT, 'app/where-were-going/page.tsx'), 'utf8');
  assert.ok(page.includes('Seven kinds of worlds'), 'the genre heading has to count the genres actually on the page.');
});

test('difficulty says what changes mechanically, not just a label', () => {
  assert.equal(DIFFICULTIES.length, 5);
  for (const d of DIFFICULTIES) {
    assert.ok(d.effect.length > 40, `${d.name} is a label with nothing under it.`);
  }
});

test('the roadmap, the layers, the badges and the FAQ are all filled in', () => {
  assert.equal(ROADMAP.length, 6);
  assert.equal(SEVEN_LAYERS.length, 7);
  assert.ok(FAQ.length >= 4);
  for (const b of BADGES) assert.ok(b.earned.length > 15, `${b.name} does not say how it is earned.`);
  for (const w of WORLDS_PLAYED) assert.ok(w.outcome.length > 60, `${w.world} does not say what happened.`);
});

// ---------------------------------------------------------------------------------------
// American English.
// ---------------------------------------------------------------------------------------

const BRITISH = [
  'jewellery',
  'grey',
  'colour',
  'behaviour',
  'honour',
  'rumour',
  'dialled',
  'travelled',
  'realise',
  'recognise',
  'organise',
  'apologise',
  'authorise',
  'normalise',
  'optimise',
  'analyse',
  'defence',
  'licence',
  'centre',
  'theatre',
];

test('American English throughout', () => {
  for (const { file, body } of TEXT) {
    const lower = body.toLowerCase();
    for (const word of BRITISH) {
      assert.ok(!new RegExp(`\\b${word}`).test(lower), `${file} uses the British spelling "${word}".`);
    }
  }
});

// ---------------------------------------------------------------------------------------
// The site never promises what it cannot do.
// ---------------------------------------------------------------------------------------

test('the signup form only confirms when the endpoint confirms', () => {
  const form = readFileSync(join(ROOT, 'components/site/EarlyAccess.tsx'), 'utf8');
  assert.ok(form.includes('fetch(ENDPOINT'), 'the signup form does not reach a real endpoint.');
  assert.ok(form.includes('body.ok'), 'the signup form confirms without waiting for the endpoint.');
});

test('the signup collector keeps addresses out of the document root', () => {
  // Signups are email addresses. Anything under the document root is a URL someone can
  // fetch, so the collector has to store them elsewhere — and refuse rather than fall back.
  const php = readFileSync(join(ROOT, 'public/signup.php'), 'utf8');
  assert.ok(php.includes('FILTER_VALIDATE_EMAIL'), 'the collector does not validate the address.');
  assert.ok(php.includes('str_starts_with'), 'the collector does not check where it is writing.');
  assert.ok(php.includes('LOCK_EX'), 'concurrent signups could interleave a line.');
  assert.ok(!/echo\s+\$/.test(php), 'the collector echoes a variable back to the caller.');
});

test('the dossier button produces an actual file', () => {
  const card = readFileSync(join(ROOT, 'components/site/DossierCard.tsx'), 'utf8');
  assert.ok(card.includes('toBlob'), 'the download button does not draw anything.');
  assert.ok(card.includes("a.download = 'your-move-dossier.png'"), 'the download button hands over nothing.');
});
