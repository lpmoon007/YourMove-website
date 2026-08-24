// HOW YOU PLAY — the marketing site’s view of the Core Eight.
//
// The dimension names, ends, and framing mirror `lib/aw/play/dimensions.ts` in the engine
// repository. They describe OBSERVABLE PLAY and nothing else. Rules that hold for every
// string in this file, and that `tests/copy.test.ts` enforces:
//
//   - Never "you are". Write "you tend to", "so far you’ve often", "in the worlds you played".
//   - Neither end is better than the other. Force is not worse than Diplomacy.
//   - Nothing is permanent, and thin evidence says so.
//   - A dimension no world has tested reads as untested, never as a neutral middle.
//   - Two contradictory nights stay contradictory. The contradiction is the interesting part.
//   - Every reading cites the events behind it, and counter-evidence is shown, not hidden.

/** How much the world has actually seen. Never a score, and never permanent. */
export type PlayConfidence = 'emerging' | 'developing' | 'established' | 'context-dependent';

export interface PlayReading {
  id: string;
  /** The 0% end of the line. */
  left: string;
  /** The 100% end of the line. */
  right: string;
  /** Where the evidence sits, 0–100. 0 is hard left, 100 is hard right. */
  position: number;
  confidence: PlayConfidence;
  /** What the world has seen, in the player’s words — always sized, never asserted. */
  note: string;
  /** The events behind the reading. Empty only when the dimension is untested. */
  why: string[];
  /** The events that cut the other way. Shown, never hidden. */
  counter: string[];
  /** Set instead of `why` when the reading changes so much by world that a position would lie. */
  context?: string;
}

export const HOW_YOU_PLAY_INTRO =
  'Every world puts you in different situations. Over time, Your Move watches how you tend to act — whether you negotiate or push, move fast or deliberate, protect what you have or take the risk. Neither end of any line is better than the other, and none of it is permanent. These are patterns in how you have played so far — a record of the worlds, not a verdict on the person.';

export const HOW_YOU_PLAY_HEADING = 'A pattern the world has started to notice.';

// The Core Eight, read against Alex Morgan’s twenty-seven worlds. Fictional player,
// fictional evidence — see `PROFILE_DISCLAIMER` in content/profile.ts.
export const PLAY_READINGS: PlayReading[] = [
  {
    id: 'force_diplomacy',
    left: 'Force',
    right: 'Diplomacy',
    position: 81,
    confidence: 'established',
    note: '14 opportunities across 9 worlds',
    why: [
      'In The American Revolution, Alex negotiated with a British quartermaster before ever forging the manifest.',
      'In Grid Down: Day One, Alex built consensus among four floor representatives rather than imposing rationing by order.',
    ],
    counter: ['In The Campaign, Alex issued an ultimatum to a donor before attempting to negotiate.'],
  },
  {
    id: 'caution_boldness',
    left: 'Caution',
    right: 'Boldness',
    position: 39,
    confidence: 'context-dependent',
    note: 'the reading changes by world, so the marker is only half the story',
    why: [],
    counter: [],
    context:
      'How boldly Alex plays changes sharply with pressure. In political and negotiation worlds, the play favors caution — verifying twice before committing. Under direct survival pressure, like the reservoir crisis and Grid Down, the same player becomes substantially more willing to act on incomplete information.',
  },
  {
    id: 'solo_coalition',
    left: 'Solo',
    right: 'Coalition',
    position: 88,
    confidence: 'established',
    note: 'the most repeated pattern on this profile',
    why: ['In The Campaign, Alex recruited two organizers before acting alone on the donor lead.'],
    counter: ['In Northwest Passage, Alex made the turn-back call without waiting for the crew vote.'],
  },
  {
    id: 'speed_deliberation',
    left: 'Speed',
    right: 'Deliberation',
    position: 70,
    confidence: 'developing',
    note: '6 opportunities so far — thin, and it says so',
    why: [
      'In Grid Down, Alex waited three sessions before proposing the consensus council rather than acting on day one. Still early evidence — more opportunities are needed before this reading means much.',
    ],
    counter: [],
  },
  {
    id: 'control_delegation',
    left: 'Control',
    right: 'Delegation',
    position: 34,
    confidence: 'developing',
    note: '7 opportunities across 5 worlds',
    why: [
      'In The American Revolution, Alex set the press every night personally for two years rather than training a second printer.',
      'In Miami, 1986, Alex ran the informant meet alone instead of sending the junior detective who had the relationship.',
    ],
    counter: [
      'In Grid Down, Alex handed each floor representative real authority over their own rationing and did not overturn a single one of their calls.',
    ],
  },
  {
    id: 'preserve_risk',
    left: 'Preserve',
    right: 'Risk',
    position: 44,
    confidence: 'context-dependent',
    note: 'what Alex protects depends on whose it is',
    why: [],
    counter: [],
    context:
      "With other people’s safety on the table, the play is protective — Northwest Passage ended eleven days short of the strait with the whole crew alive. With Alex’s own standing on the table, the same player spends freely: the forged manifest in The American Revolution risked a hanging, and the leaked donor list in The Campaign risked everything Alex had built with that friend.",
  },
  {
    id: 'direct_cunning',
    left: 'Direct',
    right: 'Cunning',
    position: 58,
    confidence: 'developing',
    note: 'leans cunning in crime and investigation worlds, straight everywhere else',
    why: [
      'In Miami, 1986, Alex extracted information from an informant without revealing what evidence was already in hand.',
    ],
    counter: ['In The Campaign, Alex stated intentions plainly before confronting the donor.'],
  },
  {
    id: 'loyalty_opportunism',
    left: 'Loyalty',
    right: 'Opportunism',
    position: 23,
    confidence: 'established',
    note: 'one of the most consistent patterns here',
    why: [
      'Alex has never abandoned an ally in a persistent world — including Dr. Okafor, kept close since Northwest Passage.',
    ],
    counter: [],
  },
];

export const CONTRADICTION =
  "Alex is unusually loyal in persistent worlds and noticeably more opportunistic in one-shot scenarios there’s no returning to. Both nights really happened. The world keeps them both rather than averaging them into something tidier.";

export const DIRECTORS_NOTE =
  '“Alex has stopped asking me for certainty. Lately I have been giving less of it — on purpose.”';
