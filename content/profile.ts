// The demo profile. Alex Morgan does not exist — this page shows what twenty-seven worlds
// of real play would leave behind, and the banner at the top of the page says so before a
// visitor reads a single number.

export const PROFILE_DISCLAIMER =
  'CONCEPT PREVIEW — Alex Morgan is a fictional player, shown to demonstrate what a profile looks like after real play. Every number here is invented. The lines under How You Play are interactive: open one to see the evidence behind it.';

export const PROFILE = {
  name: 'Alex Morgan',
  monogram: 'AM',
  joined: 'Joined 2026',
  title: 'The Diplomat',
  streak: '11-DAY STREAK',
  intro:
    'Two years in. Alex has run a printing press during a revolution, talked a hostage-taker down in Miami, and let a colony collapse rather than break a promise. Twenty-seven worlds have not made Alex predictable — mostly, they have made Alex someone worth watching.',
  dossierLine: '27 worlds · Top 4% expedition survival · Rarest badge: The Wild Card',
};

export const PROFILE_STATS = [
  { value: '27', label: 'WORLDS ENTERED', accent: false },
  { value: '61', label: 'STORIES COMPLETED', accent: false },
  { value: '34', label: 'ENDINGS FOUND', accent: false },
  { value: '7', label: 'RARE OUTCOMES', accent: true },
  { value: 'TOP 4%', label: 'EXPEDITION SURVIVAL', accent: false },
];

export const ARC = [
  { when: '2026', what: 'Joined during early access', current: false, accent: false },
  { when: 'MONTH 3', what: 'First title earned: The Investigator', current: false, accent: false },
  { when: 'MONTH 9', what: 'First rare ending: The Long Winter', current: false, accent: true },
  { when: 'YEAR 2', what: 'Reputation starts crossing between worlds', current: false, accent: false },
  { when: 'NOW', what: '27 worlds, and the Director is adapting to Alex specifically', current: true, accent: true },
];

export type WorldIcon = 'seal' | 'file' | 'signal' | 'crew' | 'hall';

export const WORLDS_PLAYED: {
  icon: WorldIcon;
  world: string;
  role: string;
  ending: string;
  rare: boolean;
  outcome: string;
  friends: string;
}[] = [
  {
    icon: 'seal',
    world: 'The American Revolution',
    role: 'Printer & Spy',
    ending: 'The Ledger Burns',
    rare: false,
    outcome:
      'Ran a secret press for two years, then handed a forged supply manifest to a British quartermaster who never learned the truth.',
    friends: '2 friends also played this world — neither found this ending.',
  },
  {
    icon: 'file',
    world: 'Miami, 1986',
    role: 'Homicide Detective',
    ending: 'Closed, Not Clean',
    rare: false,
    outcome: "Solved the Ocean Drive case in nine days. The confession Alex got wasn’t the one that held up in court.",
    friends: '3 friends also played this world — Alex is the only one who reached this ending.',
  },
  {
    icon: 'signal',
    world: 'Grid Down: Day One',
    role: 'Building Superintendent',
    ending: 'The Long Winter (rare — 3% of players)',
    rare: true,
    outcome:
      'Refused to ration by force. Held the building together through consensus and lost two floors of trust doing it.',
    friends: 'No friends have found this ending yet.',
  },
  {
    icon: 'crew',
    world: 'Northwest Passage, 1845',
    role: "Ship’s Surgeon",
    ending: 'Turned Back',
    rare: false,
    outcome:
      'Called the expedition off eleven days from the strait. The crew survived. The record books never mention them.',
    friends: '1 friend played this world — pushed on and lost the ship.',
  },
  {
    icon: 'hall',
    world: 'The Campaign',
    role: 'Field Organizer',
    ending: 'Won the District, Lost the Friend',
    rare: false,
    outcome:
      "Flipped a swing precinct by exposing an opponent’s donor list — leaked by someone Alex had promised never to burn.",
    friends: '2 friends also played this world — both stayed clean and lost the district.',
  },
];

export const WORLDS_REMAINING = '+ 22 more worlds';

export const PEOPLE = [
  {
    name: 'Marcus Webb',
    world: 'Miami, 1986',
    status: 'ALLY — trusts you',
    ally: true,
    body: 'Alex’s former partner. Still owes Alex for covering the Ocean Drive paperwork.',
  },
  {
    name: 'Colonel Ashford',
    world: 'American Revolution',
    status: 'RIVAL — suspects you',
    ally: false,
    body: 'Never proved the manifest was forged. Still looking.',
  },
  {
    name: 'Dr. Okafor',
    world: 'Northwest Passage',
    status: 'ALLY — deeply loyal',
    ally: true,
    body: 'The crewman whose life Alex saved by turning back. Would sail with Alex again.',
  },
];

export const LEFT_BEHIND = [
  {
    world: 'MIAMI, 1986',
    effect: 'The task force Alex built to break the case is still active — and still calling for consults.',
  },
  { world: 'GRID DOWN', effect: 'The consensus council Alex started still governs the building — barely.' },
  {
    world: 'THE CAMPAIGN',
    effect: 'One unresolved thread: the friend Alex burned has never answered a message since.',
  },
];

export type BadgeIcon =
  | 'glass'
  | 'flame'
  | 'eye'
  | 'star'
  | 'archive'
  | 'wild'
  | 'bolt'
  | 'return'
  | 'knot'
  | 'lock'
  | 'cross';

export const BADGES: { icon: BadgeIcon; name: string; earned: string; rare?: boolean; locked?: boolean }[] = [
  { icon: 'glass', name: 'The Investigator', earned: 'Found the hidden explanation in 4 mystery worlds.' },
  { icon: 'flame', name: 'Cool Under Fire', earned: 'Held a plan together through five high-pressure situations.' },
  { icon: 'eye', name: 'The Diplomat', earned: 'Resolved three conflicts without force.' },
  { icon: 'star', name: 'The Survivor', earned: 'Reached a thriving outcome in five survival worlds.' },
  { icon: 'archive', name: 'The Historian', earned: 'Completed 10 historically grounded worlds.' },
  { icon: 'wild', name: 'The Wild Card', earned: 'Reached an ending fewer than 1% of players discovered.', rare: true },
  { icon: 'bolt', name: 'Worldbreaker', earned: 'Caused a major historical divergence.' },
  { icon: 'return', name: 'The Comeback', earned: 'Recovered from a near-catastrophic state.' },
  { icon: 'knot', name: 'Unfinished Business', earned: 'Has an unresolved case spanning multiple sessions.' },
  {
    icon: 'lock',
    name: 'The Kingmaker',
    earned: 'Locked — install a candidate in three political worlds.',
    locked: true,
  },
  { icon: 'cross', name: 'Double Agent', earned: 'Locked — betray a faction you helped found.', locked: true },
];

export const NEXT_MILESTONE = {
  prefix: 'Next milestone:',
  highlight: '3 more diplomatic resolutions',
  suffix: 'unlocks The Kingmaker.',
};

export const SESSION_TIMELINE = [
  { at: '10:14', what: 'Contacted the Harbor Master', turningPoint: false },
  { at: '10:19', what: 'Rejected the evacuation recommendation', turningPoint: false },
  { at: '10:26', what: 'Discovered the missing weather report', turningPoint: true },
  { at: '10:31', what: 'Redirected the vessel', turningPoint: false },
  { at: '10:47', what: 'Storm intensified', turningPoint: false },
  { at: '11:06', what: '41 passengers rescued', turningPoint: false },
];

export const SESSION_ANALYSIS = [
  { label: 'TURNING POINT', body: 'The decision at 10:26 changed three later events.' },
  { label: 'WHAT YOU MISSED', body: 'Dr. Ellis had information Alex never requested.' },
  { label: 'ANOTHER PATH', body: '14% of players in this world made a different call here.' },
];

export const PASSPORT = [
  'History (10) — American Revolution, Northwest Passage era',
  'Mystery (6) — Miami, 1986 and four others',
  'Survival (5)',
  'Expedition (3)',
  'Politics (2)',
  'Crime (1)',
];

export const RAREST_STAMP = {
  prefix: 'Rarest stamp:',
  highlight: 'Grid Down: Day One — The Long Winter',
  suffix: 'held by 3% of players who have entered that world.',
};
