// Where We’re Going. Every entry says plainly whether it exists today or is a destination,
// because a roadmap that reads like a feature list is a promise the product has not made.

export interface RoadmapStage {
  /** NOW / NEXT / THEN / SHARED / CREATE / BEYOND — the horizon, not a date. */
  stage: string;
  name: string;
  body: string;
}

export const ROADMAP: RoadmapStage[] = [
  {
    stage: 'NOW',
    name: 'Stories',
    body: "Play consequential scenarios, start to finish, in a single sitting. No account required to try one. This is what’s live today, and it’s where most of our engineering effort is right now: making the writing sharper, the choices harder, and the AI’s reactions feel earned rather than random.",
  },
  {
    stage: 'NEXT',
    name: 'Memory',
    body: "Worlds that remember your last visit — the same detective world knows you already talked to the informant, already burned that lead, already have a reputation with the precinct. Replaying isn’t resetting; it’s returning to a place that changed because you were in it.",
  },
  {
    stage: 'THEN',
    name: 'Lives',
    body: "Not a new game each time — a career. You keep the same detective, the same ship’s captain, the same organizer, across dozens of sessions over months. Promotions, rivals, debts, and reputations carry forward the way they would in an actual life.",
  },
  {
    stage: 'SHARED',
    name: 'Worlds',
    body: "Humans and AI inhabit the same persistent environment on different schedules. Your organization keeps running while you sleep. Another player’s investigation into you doesn’t pause because you logged off.",
  },
  {
    stage: 'CREATE',
    name: 'Studio',
    body: 'Historians, novelists, journalists, museums, and game designers get tools to define world truth, characters, secrets, and endings — and a marketplace where players can find and enter what they build.',
  },
  {
    stage: 'BEYOND',
    name: 'Everywhere',
    body: "Physical artifacts tied to your character’s history, real locations that unlock world content, and connected worlds that reference each other’s history.",
  },
];

export const DIRECTOR_FACETS = [
  {
    label: 'CHARACTERS',
    title: 'They act on motives, not scripts',
    body: 'Characters pursue their own goals whether or not you are watching. A witness who feels cornered may lie even if lying makes no narrative “sense” — because it makes sense for them.',
  },
  {
    label: 'PACING',
    title: 'It knows when to slow down',
    body: 'The Director can stretch a single tense negotiation across an hour, or compress six months of a printing operation into a paragraph — whichever the moment calls for.',
  },
  {
    label: 'FAIRNESS',
    title: 'Hard, never rigged',
    body: "Difficulty is your setting. The Director’s job within it is to stay coherent and consistent — the world can be brutal, but it always plays fair with the rules it already told you.",
  },
];

export const SHARED_WORLD_EXAMPLES = [
  {
    label: 'MIAMI, 1986',
    body: "You’re building a criminal organization. Another player is a detective closing in. Another is a prosecutor building a case. One of your own lieutenants may secretly be a third player — and none of you had to start on the same day.",
  },
  {
    label: 'THE CAMPAIGN',
    body: 'You are a field organizer for one candidate. A friend from an earlier world turns up running opposition research for the other side — and remembers exactly how you play.',
  },
  {
    label: 'GRID DOWN',
    body: 'You govern one building by consensus. The building three blocks over is run by force, by another player, and eventually the two communities have to negotiate over the same water supply.',
  },
];

export const CAREER_LADDERS = [
  'Officer → Detective → Commander',
  'Sailor → Officer → Captain',
  'Crew → Lieutenant → Boss',
  'Volunteer → Organizer → Candidate',
  'Apprentice → Printer → Publisher',
];

export const LEGACY_TAGS = ['laws', 'protégés', 'enemies', 'reputation', 'unresolved cases', 'institutions founded'];

export const SEVEN_LAYERS = [
  {
    layer: 'Environment',
    body: 'Weather, geography, resources, disease — the physical facts a decision has to reckon with.',
  },
  {
    layer: 'Population & Economy',
    body: "Trade, migration, labor, scarcity — what things cost and who’s willing to pay it.",
  },
  { layer: 'Institutions', body: 'Law, government, precedent, culture — the rules that outlast any one person.' },
  {
    layer: 'Organizations',
    body: 'Companies, gangs, armies, newspapers, parties — the groups that act with one intent.',
  },
  { layer: 'Characters', body: 'Humans and AI, with memory, trust, and ambition of their own — including you.' },
  { layer: 'Information', body: 'Facts, secrets, rumors, lies, propaganda — who knows what, and how they found out.' },
  { layer: 'History', body: "Everything that happened before you arrived — and everything you’re now adding to it." },
];

export const CREATOR_KINDS = [
  { who: 'Historians', body: 'Build accurate settings people can actually enter, not just read about.' },
  { who: 'Novelists', body: 'Turn a fictional world into something readers can live inside, not just follow.' },
  { who: 'Journalists', body: "Recreate an investigation’s real pressure and incomplete information." },
  {
    who: 'Museums & educators',
    body: 'Let visitors and students play a moment, then compare it to what actually happened.',
  },
];

export const FAQ = [
  {
    q: 'Does memory mean the AI is profiling me?',
    a: 'No. It remembers how you play a character in a world — the decisions, not you. It exists to keep the fiction from repeating itself, and it never reaches past the worlds you played into a claim about who you are.',
  },
  {
    q: 'Is this trying to rewrite history?',
    a: 'No — historical worlds start from real events and real stakes. What changes is your role inside them, not the historical record. “What if” scenarios are clearly marked as such.',
  },
  {
    q: 'What about the mature content — crime, violence, collapse?',
    a: 'Depicting a world is not endorsing it. Age-gating and content settings apply per world, and the worlds that carry them say so before you enter.',
  },
  {
    q: 'What happens to a persistent world if I stop playing?',
    a: 'It keeps going without you, according to the last instructions you left and the people you left in charge. You can always come back and see what happened.',
  },
];
