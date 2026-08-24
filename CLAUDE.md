# YourMove.world — working rules

This is the marketing site. It is a different repository from the engine, but it is the same
product, and it is held to the same rules about what a person is allowed to read.

Read the engine repository's `CLAUDE.md` too. Where the two overlap, it wins.

---

## 1. Every string assumes the reader knows nothing

A visitor has this page and nothing else. They have not played a world, do not know the
genres, and have never heard of the Director. Before shipping any copy, read it as a stranger
and list every noun and reference that assumes prior knowledge. Each one is a defect.

- Say what the situation literally is. "The job went perfectly" is genre shorthand.
- A scenario prompt has to give a stranger enough to actually decide.
- A genre tile says what you do there and what is in your hands, not just a mood.
- A difficulty level says what changes mechanically, not just a name.

## 2. Fix the class, not the instance

The sentence quoted in a correction is a sample, not the scope. Name the class, grep for
every other place it can live, fix them in one pass, and add the mechanical check —
`tests/copy.test.ts` is where that check goes.

## 3. Copy lives in `content/`, not in components

That is what makes rule 2 possible. A string hard-coded into a component is a string the
tests cannot see. Structural chrome and headings may sit in the page; anything with voice
belongs in `content/`.

## 4. How You Play measures play, never personality

The dimensions, their ends, and their framing mirror `lib/aw/play/dimensions.ts` in the engine
repository. Keep them in step.

- "You tend to", "so far you've often", "in the worlds you played". Never "you are".
- Never the words personality, trait, psychological, diagnosis, assessment, leadership style,
  behavioral type. A test fails the build on any of them.
- Neither end of a dimension is better than the other. Force is not worse than Diplomacy.
- Nothing is permanent, and thin evidence says so.
- Two contradictory nights stay contradictory. The contradiction is the interesting part.
- Every reading cites the events behind it, and counter-evidence is shown, not hidden.

## 5. Nothing invented may read as measured

This site describes a product that is still being built. It may say so; it may not paper over
it.

- Invented figures are labeled as invented, on screen, before the figure.
- No live activity ticker, player counts, or real-time events until real metrics exist.
- No confirmation for something that did not happen — the signup form shows what the endpoint
  actually returned.
- A button that appears to produce a file produces a file.

## 6. This is entertainment

No score, no coaching, no learning frame, no assessment language anywhere a visitor can see.

## 7. American English

jewelry, gray, color, behavior, honor, story, rumor, dialed, and the -ize forms.

## 8. Build and verify

```bash
npm test        # the copy and structure checks
npm run build   # type-check + compile
```

Both must pass before pushing. For anything a visitor reads, also run the site and look at
the screen — green checks have never once proved that a page is comprehensible.

Work on `claude/new-session-jve29i`.
