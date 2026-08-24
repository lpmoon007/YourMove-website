import Link from 'next/link';
import { Footer, Grain, Nav } from '@/components/site/Chrome';
import { EarlyAccess } from '@/components/site/EarlyAccess';
import { Hero } from '@/components/site/Hero';
import { GenreIcon } from '@/components/site/icons';
import { ScenarioDemo } from '@/components/site/ScenarioDemo';
import { DIFFICULTIES, GENRES, GENRES_IN_DEVELOPMENT } from '@/content/genres';

const LOOP = ['WORLD CHANGES', 'YOU DECIDE', 'PEOPLE REACT', 'CONSEQUENCES RIPPLE', 'NEW SITUATION'];

const MEMORY_EXAMPLES = [
  'Ask experts early, every time? The next world may make expertise harder to find.',
  'Move fast on limited information? Speed helps you here — and costs you elsewhere.',
  'Avoid uncertain social situations? The world can make that blind spot matter.',
];

const CONTROLS = [
  { key: 'Difficulty', val: 'How hard the world pushes' },
  { key: 'Memory', val: 'How much it remembers' },
  { key: 'Adaptation', val: 'How differently it responds' },
];

const HORIZONS = [
  {
    label: 'SHORT EXPERIENCES',
    name: 'Stories',
    body: "Want to know if you'd have survived as a pirate captain in 1720? Or held your nerve as a bomb disposal officer? Step in, live it, find out — one sitting, then replay it differently.",
  },
  {
    label: 'PERSISTENT ROLES',
    name: 'Lives',
    body: 'Do not just visit the precinct, the ship, or the campaign trail — live there. Build a career as a detective, an explorer, a captain, a politician. People remember what you did last year.',
  },
  {
    label: 'SHARED & PERSISTENT',
    name: 'Worlds',
    body: 'Thousands of human and AI characters, living and scheming inside the same world at once — one you can step into and out of, and it keeps going without you.',
  },
];

const NEXT_UP = [
  { stage: 'NOW', what: 'Stories you can enter and finish', lit: true },
  { stage: 'NEXT', what: 'Worlds that remember you', lit: false },
  { stage: 'THEN', what: 'Lives that persist', lit: false },
  { stage: 'BEYOND', what: 'Worlds that keep going without you', lit: false },
];

const AUDIENCES = [
  {
    label: 'HORIZON',
    name: 'Creators',
    body: 'Historians, novelists, journalists and game designers will eventually build and publish their own worlds.',
  },
  {
    label: 'NEXT',
    name: 'Education',
    body: "Play history before learning how it ended — then compare the class's outcome to what actually happened.",
  },
  {
    label: 'PLAYABLE / NOW',
    name: 'Groups & Live',
    body: 'Bring a world into the room — retreats, conferences and facilitated live events.',
  },
];

export default function HomePage() {
  return (
    <div className="page">
      <Grain />
      <Nav current="/" />
      <Hero />

      <section className="section section-2 section-ruled">
        <div className="wrap">
          <ScenarioDemo />
        </div>
      </section>

      <section className="section">
        <div className="wrap center">
          <h2 style={{ fontSize: 38, maxWidth: 720, margin: '0 auto 20px' }}>
            Not a movie. Not a quiz. Not a game with four buttons.
          </h2>
          <p className="body" style={{ maxWidth: 640, margin: '0 auto 24px', fontSize: 16 }}>
            Your Move puts you inside a living situation with people, information, pressure, limited resources, hidden
            motives, and consequences. The world responds to what you actually do.
          </p>
          <p className="body" style={{ maxWidth: 640, margin: '0 auto 64px', fontSize: 16 }}>
            Nothing lands in isolation. The ally you saved may owe you later — or resent how it happened. The lead you
            ignored can surface again, worse. Ripples move through history, crime, and everything between: some
            you&rsquo;ll see coming, some you won&rsquo;t.
          </p>
          <div className="chain" style={{ justifyContent: 'center' }}>
            {LOOP.map((step, i) => (
              <span key={step} style={{ display: 'contents' }}>
                <span className="chain-step">{step}</span>
                {i < LOOP.length - 1 && <span className="chain-arrow">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled">
        <div className="wrap">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 style={{ maxWidth: 720 }}>The world doesn&rsquo;t wait for you to pick A, B, or C.</h2>
          <p className="lede" style={{ maxWidth: 680, marginBottom: 50 }}>
            Your Move is powered by an AI-driven world engine that tracks what you do, what you ignore, who you trust,
            what you ask, and how you respond under pressure. The world changes around those decisions — sometimes
            immediately, sometimes much later.
          </p>

          <div
            className="split split-tight"
            style={{
              alignItems: 'start',
              paddingBottom: 56,
              borderBottom: '1px solid var(--line)',
              marginBottom: 56,
            }}
          >
            <div>
              <h3 style={{ fontSize: 21, marginBottom: 14 }}>It remembers how you play.</h3>
              <p className="body" style={{ marginBottom: 16 }}>
                With memory enabled, Your Move carries what it learns from one decision into the next.
              </p>
              <div className="stack" style={{ gap: 10, color: 'var(--ink-2)' }}>
                {MEMORY_EXAMPLES.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 21, marginBottom: 14 }}>You control difficulty. It controls variation.</h3>
              <div className="rows">
                {CONTROLS.map((c) => (
                  <div className="row" key={c.key}>
                    <span className="row-key">{c.key}</span>
                    <span className="row-val">{c.val}</span>
                  </div>
                ))}
              </div>
              <p className="pull" style={{ fontSize: 13, lineHeight: 1.7, margin: '20px 0 0' }}>
                Memory isn&rsquo;t there to make you lose. It&rsquo;s there to keep the world from becoming predictable.
              </p>
            </div>
          </div>

          <div className="grid grid-2">
            <div>
              <p className="eyebrow-sm">TRADITIONAL INTERACTIVE STORY</p>
              <div className="stack stack-dim">
                <div>Fixed choices</div>
                <div>Fixed branches</div>
                <div>Known endings</div>
                <div>Replay reveals the tree</div>
              </div>
            </div>
            <div style={{ background: 'var(--bg-3)' }}>
              <p className="eyebrow-sm on">YOUR MOVE</p>
              <div className="stack stack-lit">
                <div>Open-ended decisions</div>
                <div>Adaptive characters</div>
                <div>Changing information</div>
                <div>Persistent memory</div>
                <div>Replay can produce different conditions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">EXPLORE</p>
          <h2>Play different kinds of worlds</h2>
          <p className="body" style={{ maxWidth: 520, marginBottom: 56 }}>
            Same engine, same Director, same memory and difficulty controls underneath every one of these. What changes
            is the era, the documents in your hands, and what&rsquo;s actually at stake.
          </p>
          <div className="genres">
            {GENRES.map((g) => (
              <div className="genre" key={g.key}>
                <div className="genre-icon">
                  <GenreIcon genre={g.key} />
                </div>
                <h3>
                  {g.title}
                  {g.maturity && (
                    <span className="flag" style={{ marginLeft: 8 }}>
                      {g.maturity}
                    </span>
                  )}
                </h3>
                <p className="genre-hook">{g.hook}</p>
                <p className="genre-texture">{g.texture}</p>
              </div>
            ))}
            <div className="genre">
              <div className="genre-icon">
                <p className="eyebrow-sm" style={{ marginBottom: 0 }}>
                  IN DEVELOPMENT
                </p>
              </div>
              <h3>More worlds ahead</h3>
              <p className="genre-hook" style={{ fontSize: 12.5 }}>
                {GENRES_IN_DEVELOPMENT}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">DIFFICULTY</p>
          <h2 style={{ fontSize: 30, maxWidth: 600 }}>Decide how hard you want the world to push back.</h2>
          <p className="body" style={{ maxWidth: 560, marginBottom: 28, fontSize: 14.5 }}>
            Harder worlds don&rsquo;t cheat. They give you less certainty, tighter resources, more conflicting
            information, and less room for error.
          </p>
          <div className="rows" style={{ maxWidth: 640 }}>
            {DIFFICULTIES.map((d) => (
              <div className="row" key={d.name}>
                <span className="row-key" style={{ width: 90, color: 'var(--ink)' }}>
                  {d.name}
                </span>
                <span className="row-val" style={{ color: 'var(--ink-3)' }}>
                  {d.effect}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled center">
        <p className="eyebrow">HOW WORLDS GROW</p>
        <h2 style={{ fontSize: 32, marginBottom: 56 }}>Stories → Lives → Worlds</h2>
        <div className="grid grid-3" style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'left' }}>
          {HORIZONS.map((h) => (
            <div key={h.name}>
              <p className="eyebrow-sm">{h.label}</p>
              <h3 style={{ fontSize: 20 }}>{h.name}</h3>
              <p className="genre-hook">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div
          className="wrap split"
          style={{
            gridTemplateColumns: '0.9fr 1.4fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div>
            <p className="eyebrow">PROFILE — CONCEPT PREVIEW</p>
            <h2 style={{ fontSize: 30 }}>Every story adds to your profile.</h2>
            <p className="body" style={{ marginBottom: 26, fontSize: 14.5 }}>
              Worlds entered, endings discovered, titles earned, relationships that outlast a single run. See what it
              looks like after two years of play.
            </p>
            <Link href="/profile" className="link-rule">
              View the demo profile →
            </Link>
          </div>
          <div
            style={{
              background: 'var(--bg-3)',
              border: '1px solid var(--line)',
              padding: '36px 40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 16,
                marginBottom: 24,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 22,
                    fontWeight: 600,
                  }}
                >
                  Alex Morgan
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-4)' }}>Joined 2026 · The Diplomat</div>
              </div>
              <div className="streak">11-DAY STREAK</div>
            </div>
            <div className="grid grid-4 grid-on-3" style={{ marginBottom: 20 }}>
              {[
                ['27', 'WORLDS'],
                ['61', 'STORIES'],
                ['34', 'ENDINGS'],
                ['7', 'RARE'],
              ].map(([n, l]) => (
                <div key={l} style={{ padding: 16, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{n}</div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'var(--ink-4)',
                      marginTop: 4,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <div className="tags">
              <span className="tag" style={{ color: 'var(--ink-2)' }}>
                The Investigator
              </span>
              <span className="tag" style={{ color: 'var(--ink-2)' }}>
                Cool Under Fire
              </span>
              <span
                className="tag"
                style={{
                  color: 'var(--brass)',
                  borderColor: 'var(--brass-line)',
                }}
              >
                The Wild Card
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled">
        <div className="wrap split split-tight">
          <div>
            <p className="eyebrow">HORIZON</p>
            <h2 style={{ fontSize: 32 }}>We&rsquo;re starting small because the destination isn&rsquo;t.</h2>
            <p className="body" style={{ maxWidth: 480, marginBottom: 26, fontSize: 14.5 }}>
              Today, Your Move begins with individual playable experiences. The destination is much larger: living
              worlds filled with humans and AI, where decisions accumulate and history changes.
            </p>
            <Link href="/where-were-going" className="btn">
              Read the full vision
            </Link>
          </div>
          <div className="rows">
            {NEXT_UP.map((n) => (
              <div
                key={n.stage}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 0',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <span
                  className="stage-label"
                  style={{
                    width: 70,
                    color: n.lit ? 'var(--brass)' : 'var(--ink-4)',
                    fontSize: 10,
                  }}
                >
                  {n.stage}
                </span>
                <span
                  style={{
                    fontSize: 13.5,
                    color: n.lit ? 'var(--ink)' : 'var(--ink-2)',
                  }}
                >
                  {n.what}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid grid-3">
          {AUDIENCES.map((a) => (
            <div key={a.name} style={{ background: 'var(--bg)', padding: 40 }}>
              <p className="eyebrow-sm on">{a.label}</p>
              <h3>{a.name}</h3>
              <p className="genre-hook" style={{ fontSize: 13 }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-2 section-ruled-both center" style={{ padding: '90px var(--pad)' }}>
        <h2 className="quote">&ldquo;The fiction can be brutal. The platform cannot be abusive.&rdquo;</h2>
        <p className="small" style={{ maxWidth: 560, margin: '0 auto' }}>
          Depicting a world is not endorsing it. Characters may be enemies. Players are not.
        </p>
      </section>

      <section className="section" id="early-access" style={{ padding: '120px var(--pad)' }}>
        <div className="signup">
          <h2>Be here when the first worlds open.</h2>
          <p className="body" style={{ fontSize: 14.5, marginBottom: 20 }}>
            Your Move is being built now. Early players won&rsquo;t just test the product — they&rsquo;ll help shape
            what comes next: which worlds we build first, how hard the Director should push, what a fair difficulty
            curve feels like.
          </p>
          <p className="small" style={{ marginBottom: 44 }}>
            Founders get a permanent badge, first access to every new world at launch, and a direct line to the team
            building this.
          </p>
          <EarlyAccess />
        </div>
      </section>

      <Footer current="/" />
    </div>
  );
}
