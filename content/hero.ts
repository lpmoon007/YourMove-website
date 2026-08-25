// The hero.
//
// Three cold opens, one per rotating backdrop, each the situation the photograph behind it
// shows. They live here rather than in the component for the reason the rule exists: a
// string hard-coded into a component is a string nobody reviews alongside the rest of the
// copy. The 1777 paragraph shipped with one path costing nothing — a decision with a right
// answer, which is the one thing this product is not selling — and no test could see it,
// because no test could read it.
//
// What a hero paragraph has to do:
//
//   - Put a stranger inside a specific situation, in the first sentence.
//   - Give BOTH paths a real cost. If one option is free, there is no decision, and the
//     paragraph is an advertisement for the wrong product.
//   - Keep every referent unmistakable. Two people in sixty words means naming each of them
//     the same way every time, and never a pronoun that could reach either one.
//   - Never a proper name. Nothing here has introduced anybody, so a name is a stranger's
//     name doing no work — describe people by what the reader can picture instead.

export interface HeroOpening {
  /** Matches the genre key of the photograph behind it — see HERO_GENRES. */
  genre: string;
  text: string;
}

export const HERO_EYEBROW = 'PLAYABLE / NOW';
export const HERO_TITLE = 'Your Move';
export const HERO_SUBHEAD = 'The world changes. Your move.';
export const HERO_REASSURANCE =
  'No predetermined path. No single right answer. No two stories have to end the same way.';

export const HERO_OPENINGS: HeroOpening[] = [
  {
    genre: 'history',
    text: 'It’s 1777, and the man about to hang for passing letters to the British is a corporal with three children in Danbury. He didn’t write them — your own agent did. Your agent feeds the British just enough to keep their trust, and brings back where they’ll march next. Clear the corporal and you burn your agent. Say nothing and the corporal hangs Friday.',
  },
  {
    genre: 'crime',
    text: 'It’s 1986 in Miami. The jewelry exchange on Ocean Drive was the biggest score of your career, and you swore under oath you were home all night. Now a detective slides a photograph across the table — you, in the vault’s service alley, timestamped four minutes before the alarm tripped. What do you say?',
  },
  {
    genre: 'survival',
    text: 'It’s 2028, three days after coordinated high-altitude EMP strikes took down the country’s grid. Your building’s old diesel generator — no electronic ignition, nothing to fry — is one of the few things still running, and it has six hours of fuel left to power either the water pump or the medical fridge holding a neighbor’s insulin. Forty people are asking which one you’ll choose. You’re not reading about it. You’re the one who has to decide.',
  },
];
