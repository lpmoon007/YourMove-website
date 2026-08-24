# YourMove.world

The marketing site for **Your Move** — a decision-driven narrative platform where the world
remembers what you do. Four pages: Home, Where We're Going, Profile, and a legal stub.

Built from the `design_handoff_yourmove_site` direction (Home, WhereWereGoing, YourRecord,
Legal) in the framework the product actually ships on: Next.js App Router, React 19,
TypeScript, hand-written CSS. The handoff's prototype scaffolding is not in this repo — only
its design, copy, and interaction intent.

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # the copy and structure checks — no network, no build needed
npm run build    # type-check + compile
```

Both `npm test` and `npm run build` must pass before pushing. For anything a visitor reads,
also run it and look at the screen.

## Shape

```
app/                    routes: / , /where-were-going , /profile , /legal
app/globals.css         the whole design system — tokens, both palettes, every class
app/api/early-access/   the signup endpoint
components/site/        chrome, the four interactive pieces, and the icon set
content/                every player-facing string, as typed data
tests/                  the checks that hold the line on that copy
```

**Copy lives in `content/`, not in components.** That is what makes it checkable: the tests
read those modules and fail the build on personality language, British spellings, a genre
without a texture cue, a reading with no evidence behind it, or invented numbers that are not
disclosed as invented.

## Rules this site is held to

These come from the engine repository's `CLAUDE.md` and apply the same way here.

1. **Every string assumes the reader knows nothing.** No name before an introduction, no
   genre shorthand standing in for a situation. Read it cold before shipping it.
2. **Fix the class, not the instance.** When a correction arrives, find every other place the
   same defect can live, fix them together, and add the mechanical check.
3. **This is entertainment.** No score, no coaching, no assessment language anywhere a
   visitor can see.
4. **How You Play measures play, never personality.** "You tend to", never "you are". Neither
   end of a dimension is better than the other. Nothing is permanent, thin evidence says so,
   and every reading shows the events behind it — counter-evidence included. The eight
   dimensions and their framing mirror `lib/aw/play/dimensions.ts` in the engine repository;
   if they change there, change them here.
5. **Nothing invented may read as measured.** The demo's choice split is a designed
   distribution and says so on screen. The Profile is a fictional player and says so above
   the first number. No live activity ticker until real metrics exist.
6. **American English.**

## Interactive pieces

| Piece | File | Behavior |
| --- | --- | --- |
| Hero genre cycler | `components/site/Hero.tsx` | Crossfades seven genre panels every 3.4s. Pauses on hover, on focus, when the tab is hidden, on request, and under `prefers-reduced-motion`. |
| 90-second demo | `components/site/ScenarioDemo.tsx` | Three scenarios, three moves each. Switching scenarios clears the prior choice. |
| Early access | `components/site/EarlyAccess.tsx` | Multi-select chips, client-side email validation, then a real POST. |
| How You Play | `components/site/HowYouPlay.tsx` | Eight dimensions, each opening onto its evidence. Independently toggleable. |
| Dossier card | `components/site/DossierCard.tsx` | Draws the card to a canvas and downloads a real PNG. |

## Configuration

| Variable | Effect |
| --- | --- |
| `EARLY_ACCESS_WEBHOOK_URL` | Where signups are forwarded (list, CRM, or function). **Until this is set, the form tells the visitor the signup is not connected and saves nothing** — it never shows a confirmation for a signup that went nowhere. |

## Still open

- **Real player breakdowns.** The demo's percentages are illustrative and labeled as such.
  Wire them to real aggregation, or remove the bars, before that label stops being true.
- **Photography and art direction.** v1 is deliberately graphic-only — inline SVG line work,
  no imagery. The original brief asks for cinematic full-bleed photography; that is a later
  pass, not a decision to skip imagery forever.
- **Legal copy.** `/legal` is a stub. Counsel drafts the real policy before public launch.
