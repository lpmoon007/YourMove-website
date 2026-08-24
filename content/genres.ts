// The genres, as data. Each one has to answer three questions for someone who has never
// heard of Your Move: what kind of world is this, what do you do in it, and what does it
// physically feel like to be there (the texture line).

export type GenreKey = 'history' | 'mystery' | 'survival' | 'expedition' | 'politics' | 'crime' | 'war';

export interface Genre {
  key: GenreKey;
  /** Short label, used by the rotating hero panel. */
  label: string;
  /** Full name, used in the grid. */
  title: string;
  /** One line on what you actually do here. */
  hook: string;
  /** The documents and artifacts of the era — what’s in your hands. */
  texture: string;
  /** Where this genre is headed once worlds persist. */
  horizon: string;
  /** Set where a world carries an age gate, with the reason stated plainly. */
  maturity?: string;
}

export const GENRES: Genre[] = [
  {
    key: 'history',
    label: 'History',
    title: 'History',
    hook: 'Step into consequential moments without being forced to repeat history. Sometimes one variable changes.',
    texture: 'Engravings, campaign maps, wax seals.',
    horizon: 'Shared wars, generational play, decisions that change textbook outcomes.',
  },
  {
    key: 'mystery',
    label: 'Mystery',
    title: 'Mystery & Investigation',
    hook: 'Interview witnesses. Request evidence. Follow leads. The truth exists before you begin.',
    texture: 'Case files, evidence boards, analog photos.',
    horizon: 'A detective career with an AI partner who remembers every case you have closed.',
  },
  {
    key: 'survival',
    label: 'Survival',
    title: 'Survival & Collapse',
    hook: 'The lights go out. The roads close. Supplies run low. What do you do next?',
    texture: 'Emergency maps, radio logs, ration ledgers.',
    horizon: 'Whole communities of players rebuilding the same collapsed region differently.',
  },
  {
    key: 'expedition',
    label: 'Expedition',
    title: 'Expedition',
    hook: 'Lost places, dangerous routes, limited resources, competing objectives.',
    texture: "Field journals, topographic maps, ship’s logs.",
    horizon: 'Multi-year voyages, crews of real players, routes that stay lost until someone finds them.',
  },
  {
    key: 'politics',
    label: 'Politics',
    title: 'Power & Politics',
    hook: 'Campaign. Govern. Negotiate. Build coalitions. Handle scandal. Face opposition.',
    texture: 'Newspapers, polling graphics, briefing folders.',
    horizon: 'Persistent legislatures where other players are your allies, rivals, and constituents.',
  },
  {
    key: 'crime',
    label: 'Crime',
    title: 'Crime & Underworld',
    hook: 'Investigate the organization — or build one.',
    texture:
      'Sodium-vapor streets, newsprint, surveillance photos. Age-verified at entry; violence and drug content are depicted, never endorsed.',
    horizon: 'Organizations built by one player, investigated by another, in the same city at once.',
    maturity: '18+',
  },
  {
    key: 'war',
    label: 'War & Command',
    title: 'War & Command',
    hook: "You know how the battle ended. What happens when you’re the one in command?",
    texture: 'Field reports, situation maps, radio traffic.',
    horizon: 'Opposing commanders played by real people, each seeing only their own side of the map.',
  },
];

/** The tile that admits what does not exist yet, rather than implying everything does. */
export const GENRES_IN_DEVELOPMENT =
  'Espionage. Courtroom & law. Heists. Disaster response. Exploration. Horror. First contact. Dynasties that span generations.';

export const DIFFICULTIES: { name: string; effect: string }[] = [
  { name: 'Story', effect: 'Guided pacing, generous margin for error — built for a first world or a slower evening.' },
  { name: 'Standard', effect: 'Balanced stakes and information — the world pushes back, but rarely without warning.' },
  {
    name: 'Veteran',
    effect: "Tighter resources and margins — mistakes cost you, and there’s rarely a clean second chance.",
  },
  {
    name: 'Expert',
    effect: "Little certainty about anything — sources conflict, and you rarely know what you don’t know.",
  },
  { name: 'Brutal', effect: "No safety net. The world plays for keeps, and it won’t slow down to let you catch up." },
];
