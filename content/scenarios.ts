// The 90-second demo. Three scenarios, deliberately from three different kinds of world,
// so a first-time visitor sees the range rather than one genre.
//
// `share` is what the choice bars show. It is ILLUSTRATIVE — a designed distribution, not a
// measurement of real players. Nothing on this site may present invented numbers as live
// data, so the demo says so on screen (see `SHARE_DISCLOSURE`) and the shape of this type
// keeps the word "share" away from anything that reads as a live count.

export interface ScenarioChoice {
  id: string;
  /** The move, in one line. */
  label: string;
  /** The same move, short enough for the bar chart’s left column. */
  short: string;
  /** What it actually costs — the tradeoff, stated before the player commits. */
  detail: string;
  /** Illustrative share of the split, 0–100. The three in a scenario total 100. */
  share: number;
  /** What follows, including the human cost. */
  result: string;
}

export interface Scenario {
  id: string;
  tabLabel: string;
  /** The situation, stated plainly enough that a stranger can act on it. */
  prompt: string;
  choices: ScenarioChoice[];
  historicalNote?: string;
}

export const SHARE_DISCLOSURE =
  'The split below is illustrative — a designed distribution, not a count of real players. Real breakdowns appear once enough people have played this.';

export const SCENARIOS: Scenario[] = [
  {
    id: 'reservoir',
    tabLabel: 'Survival & Collapse',
    prompt:
      "The reservoir valve fails in 15 minutes, no matter what you do. Riverside General has 40 patients on ventilators and backup power that’s already flickering. Eastgate Apartments has 1,200 residents in a heat wave with no working AC. You can only protect one district’s water pressure — you’re choosing who loses it first, and for how long.",
    choices: [
      {
        id: 'A',
        label: 'Divert to the hospital district',
        short: 'Hospital district',
        detail:
          'Riverside General keeps full pressure — ventilators and dialysis stay safe. Eastgate Apartments loses pressure by morning; residents will need water trucked in.',
        share: 41,
        result:
          'The hospital holds — all 40 patients on ventilators make it through the night. By 6 a.m., three residential blocks are calling the city about dry taps. By the next afternoon, three elderly Eastgate residents are found dead of heat exposure — the water trucks arrived four hours after they needed it. The story runs with your name in it: whoever made this call chose the hospital.',
      },
      {
        id: 'B',
        label: 'Divert to the residential district',
        short: 'Residential district',
        detail:
          "Eastgate Apartments' 1,200 residents keep water through the heat. Riverside General switches to reserve tanks that have never been tested under a full patient load.",
        share: 47,
        result:
          "Homes keep pressure and nobody in Eastgate makes the news. At 4 a.m., Riverside’s untested reserve tanks lose pressure anyway — two dialysis patients are mid-treatment when it happens. One is stabilized on a backup line. One isn’t. The hospital board wants to know who decided the reserve tanks were an acceptable risk.",
      },
      {
        id: 'C',
        label: 'Attempt a manual override first',
        short: 'Manual override',
        detail:
          'A twelve-minute gamble with maybe a one-in-five chance of working. If it fails, the valve fails uncontrolled with three minutes left — not enough time left to choose who loses pressure. Both districts lose it, including Riverside.',
        share: 12,
        result:
          "The override fails at the eleven-minute mark. There’s no time left to divert anything — the valve fails uncontrolled. Riverside’s backup generators buy the ventilators ninety minutes; Eastgate gets no warning at all. By morning, both districts are counting losses, and the inquiry’s first question is why you gambled the extra time instead of choosing.",
      },
    ],
  },
  {
    id: 'mutiny',
    tabLabel: 'Crime & Underworld',
    prompt:
      "It’s 1721, three weeks out from Nassau. Your crew hasn’t been paid since the last raid came up empty, and your quartermaster just told you two-thirds of the men will vote to maroon you by nightfall unless you turn toward a merchant convoy you know is guarded by a Royal Navy frigate. You can smell mutiny already.",
    choices: [
      {
        id: 'A',
        label: 'Turn toward the convoy anyway',
        short: 'Take the convoy',
        detail: 'The crew stays loyal tonight. The frigate is real, and it is faster than your ship.',
        share: 29,
        result:
          "The crew cheers as you come about. Two days later the frigate runs you down off the shoals — you take the convoy’s gold, but lose eleven men and your foremast doing it. You limp into Nassau a legend with half a crew.",
      },
      {
        id: 'B',
        label: 'Let them maroon you rather than risk the ship',
        short: 'Accept marooning',
        detail:
          'You keep your principles and lose your command. Someone else takes the helm — possibly the quartermaster who proposed this in the first place.',
        share: 21,
        result:
          "They put you ashore with a pistol, one shot, and no crew. Six months later you hear your old ship went down chasing that same convoy. You’re alive. You’re also nobody, on an island, starting over.",
      },
      {
        id: 'C',
        label: 'Propose a smaller, safer prize instead',
        short: 'Smaller prize',
        detail: 'A weaker plunder that keeps the crew paid without the frigate. It may not be enough to stop the vote.',
        share: 50,
        result:
          "Half the crew grumbles but takes the deal. The other half remembers you flinched when it mattered — and that memory doesn’t go away just because tonight went fine.",
      },
    ],
  },
  {
    id: 'flank',
    tabLabel: 'War & Command',
    prompt:
      "Dawn, 1809. Your gun crews are down to their last dozen rounds per cannon and the enemy line hasn’t broken. Your aide reports the left flank is folding — reinforcements could hold it, but pulling them from the center opens a gap the enemy cavalry will find within the hour. Your general is dead. You’re the ranking officer now.",
    choices: [
      {
        id: 'A',
        label: 'Reinforce the collapsing left flank',
        short: 'Reinforce the flank',
        detail:
          'The flank holds through the morning. The center thins to a single line that a determined cavalry charge could punch straight through.',
        share: 33,
        result:
          'The left holds. At 9:40, enemy cavalry finds the thinned center exactly as feared — your line breaks, and the retreat that follows costs more men than the flank would have.',
      },
      {
        id: 'B',
        label: 'Hold the center, let the left fall back on its own',
        short: 'Hold the center',
        detail:
          "You keep the line’s spine intact. The left flank collapses and 200 men are cut off with no order to retreat.",
        share: 44,
        result:
          "The center holds through the day and the position is saved. The 200 men on the left are captured, not killed — a mercy you didn’t plan for and can’t take credit for.",
      },
      {
        id: 'C',
        label: 'Order a full tactical withdrawal',
        short: 'Withdraw',
        detail:
          "Nobody breaks, nobody’s cut off. You also concede the ground you were sent here to hold, and someone will ask why by tomorrow.",
        share: 23,
        result:
          'The withdrawal is orderly and the army survives intact. The dispatch back to command reads as a retreat regardless of the reasons, and reputations — including yours — take the hit that casualties usually take instead.',
      },
    ],
    historicalNote:
      "Historians still argue over which of these calls the real commanders at engagements like this one actually made under the same pressure — the record is thinner than you’d expect.",
  },
];
