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

## Deploying to Plesk (Node.js hosting)

This is a Next.js app, not static files. `/api/early-access` runs on the server, so the site
needs a Node process — it cannot be dropped into an Apache document root.

Plesk runs Node apps under Phusion Passenger, which wants a startup file rather than an
`npm start` command. `server.js` is that file: it hands every request to the same Next.js
handler `next start` uses.

**In Plesk → Websites & Domains → your domain → Node.js:**

| Field | Value |
| --- | --- |
| Node.js version | 20 or newer (Next 15 needs 18.18+) |
| Application mode | `production` |
| Application root | the folder holding this repo (for example `/httpdocs`) |
| Document root | the same folder |
| Application startup file | `server.js` |

Then, in the same panel, add the environment variable:

```
EARLY_ACCESS_WEBHOOK_URL = <your list or CRM endpoint>
```

Leave it unset and the site still works — the signup form just tells visitors it is not
connected rather than faking a confirmation.

**Getting the code onto the server.** Websites & Domains → Git can pull this repository on
each push. After every pull the app must be rebuilt, because a production Next.js server
serves the compiled output in `.next` and will not start without it:

```bash
npm ci
npm run build
```

Plesk's Node.js panel has buttons for both: *NPM install*, then *Run script* → `build`.
Restart the app afterward.

**Certificates.** Issue the Let's Encrypt certificate from Plesk with the `www` subdomain
included, and select it under Hosting Settings → Security. Apache logs `AH01909: server
certificate does NOT include an ID which matches the server name` whenever the domain's DNS
does not yet resolve to this server — validation fails, no certificate is bound, and the
default self-signed one is used instead. Fix DNS first, then issue.

## Still open

- **Real player breakdowns.** The demo's percentages are illustrative and labeled as such.
  Wire them to real aggregation, or remove the bars, before that label stops being true.
- **Photography and art direction.** v1 is deliberately graphic-only — inline SVG line work,
  no imagery. The original brief asks for cinematic full-bleed photography; that is a later
  pass, not a decision to skip imagery forever.
- **Legal copy.** `/legal` is a stub. Counsel drafts the real policy before public launch.
