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
npm run build    # type-check, compile, and write the static site to out/
```

Both `npm test` and `npm run build` must pass before pushing. For anything a visitor reads,
also run it and look at the screen.

## Shape

```
app/                    routes: / , /where-were-going , /profile , /legal
app/globals.css         the whole design system — tokens, both palettes, every class
public/signup.php       the signup collector — the only server-side code on the site
components/site/        chrome, the four interactive pieces, and the icon set
content/                every player-facing string, as typed data
scripts/publish.sh      builds and pushes the deploy branch
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
| Early access | `components/site/EarlyAccess.tsx` | Multi-select chips, client-side email validation, then a real POST to `signup.php`. |
| How You Play | `components/site/HowYouPlay.tsx` | Eight dimensions, each opening onto its evidence. Independently toggleable. |
| Dossier card | `components/site/DossierCard.tsx` | Draws the card to a canvas and downloads a real PNG. |

## Configuration

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SIGNUP_ENDPOINT` | Where the signup form posts. Defaults to `/signup.php`. Read at build time — rebuild after changing it. |

## Deploying

Two branches:

| Branch | Holds | Who reads it |
| --- | --- | --- |
| `main` | source — what you edit | people |
| `deploy` | the built site only: HTML, CSS, JS, `signup.php` | the web server |

`deploy` exists so the server stays ordinary. Its document root is `httpdocs`, the same as
every other site on the host — no per-site special case to rediscover in a year. The branch
contains exactly what a browser needs and nothing else: no source, no `package.json`, no
build step on the server.

**To publish a change:**

```bash
npm run publish     # tests, builds, and pushes the deploy branch
```

Then in Plesk: **Git → Pull now → Deploy now**. That is the whole deployment.

`npm run publish` refuses to run on a dirty working tree, runs the copy checks, rebuilds from
scratch, verifies every page and `signup.php` are present in the output, and only then
replaces the `deploy` branch. It builds in a temporary worktree, so your checkout is never
touched. Never edit `deploy` by hand — the next publish overwrites it.

**Plesk setup, once:** Websites & Domains → Git → repository
`https://github.com/lpmoon007/YourMove-website`, branch **`deploy`**, deploying to
`/httpdocs`. Leave the document root alone.

### Where signups go

`public/signup.php` is copied into `out/` and is the one dynamic piece — PHP the server
already runs, not Node. It appends each signup as a JSON line to:

```
<one directory above the document root>/yourmove-signups/early-access.jsonl
```

With the document root at `/httpdocs`, that is one level above it. **Above the document root
is the point** — the file holds email addresses, and anything inside the
document root is a URL somebody can fetch. If the collector cannot find a private location it
refuses to store anything rather than write addresses somewhere readable, and the form shows
that refusal instead of a confirmation.

Read the signups over SFTP, or in Plesk's File Manager one level above `httpdocs`.
The file is created mode `0600`; each line looks like:

```json
{"email":"...","genres":["History"],"interests":["Solo play"],"at":"2026-08-25T01:54:19+00:00"}
```

To send signups to a CRM or mailing list instead, set `NEXT_PUBLIC_SIGNUP_ENDPOINT` to its
URL and rebuild. The form posts the same JSON body and still shows whatever that endpoint
actually returned.

### Certificates

Issue the Let's Encrypt certificate from Plesk with the `www` subdomain included. Apache logs
`AH01909: server certificate does NOT include an ID which matches the server name` when the
domain's DNS does not yet resolve to this server — validation fails, no certificate is bound,
and the default self-signed one is used instead. Fix DNS first, then issue.

## Still open

- **Real player breakdowns.** The demo's percentages are illustrative and labeled as such.
  Wire them to real aggregation, or remove the bars, before that label stops being true.
- **Signups are a file, not a CRM.** Good enough to start collecting; move to
  `NEXT_PUBLIC_SIGNUP_ENDPOINT` pointing at a real list before the first send.
- **Photography and art direction.** v1 is deliberately graphic-only — inline SVG line work,
  no imagery. The original brief asks for cinematic full-bleed photography; that is a later
  pass, not a decision to skip imagery forever.
- **Legal copy.** `/legal` is a stub. Counsel drafts the real policy before public launch.
