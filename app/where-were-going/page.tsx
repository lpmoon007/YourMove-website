import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Grain, Nav } from '@/components/site/Chrome';
import {
  CAREER_LADDERS,
  CREATOR_KINDS,
  DIRECTOR_FACETS,
  FAQ,
  LEGACY_TAGS,
  ROADMAP,
  SEVEN_LAYERS,
  SHARED_WORLD_EXAMPLES,
} from '@/content/roadmap';
import { GENRES } from '@/content/genres';

export const metadata: Metadata = {
  title: "Where We're Going — Your Move",
  description:
    'The roadmap: what Your Move is today, what memory and persistent worlds change, and what we mean by worlds once we get there.',
};

const STAGE_COLOR: Record<string, string> = {
  NOW: 'var(--brass)',
  NEXT: 'var(--ink-2)',
  THEN: 'var(--ink-3)',
  SHARED: '#8f7c5e',
  CREATE: 'var(--ink-4)',
  BEYOND: '#5f584c',
};

const COLLAPSE_CHAIN = ['SURVIVAL', 'COMMUNITY', 'FACTION', 'GOVERNMENT', 'CIVILIZATION'];

export default function WhereWereGoingPage() {
  return (
    <div className="page">
      <Grain />
      <Nav current="/where-were-going" />

      <section className="section" style={{ padding: '140px var(--pad) 90px' }}>
        <div className="wrap-narrow center">
          <p className="eyebrow" style={{ letterSpacing: '0.24em', marginBottom: 22 }}>
            HORIZON
          </p>
          <h1 style={{ fontSize: 56, lineHeight: 1.1, marginBottom: 24 }}>Where We&rsquo;re Going</h1>
          <p className="pull" style={{ fontSize: 24, margin: '0 0 24px', color: '#e0d9c9' }}>
            We&rsquo;re starting small because the destination isn&rsquo;t.
          </p>
          <p className="lede" style={{ maxWidth: 660, margin: '0 auto 20px' }}>
            Today, Your Move begins with individual playable stories — self-contained, finishable in a sitting,
            replayable on your terms. That&rsquo;s the product you can join now.
          </p>
          <p className="lede" style={{ maxWidth: 660, margin: '0 auto' }}>
            What we&rsquo;re building toward is much larger: living worlds filled with humans and AI, where decisions
            accumulate, relationships persist, institutions remember, history changes, and the world keeps running even
            while you&rsquo;re away. Below is the actual roadmap — what exists, what&rsquo;s next, and what we mean by
            &ldquo;worlds&rdquo; once we get there.
          </p>
        </div>
      </section>

      <section className="section section-2 section-ruled-both" style={{ padding: '90px var(--pad)' }}>
        <div className="wrap-narrow rows">
          {ROADMAP.map((r) => (
            <div className="stage-row" key={r.stage}>
              <span className="stage-label" style={{ color: STAGE_COLOR[r.stage] }}>
                {r.stage}
              </span>
              <div>
                <div className="stage-name">{r.name}</div>
                <div className="stage-body">{r.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-2 section-ruled-both">
        <div className="wrap">
          <p className="eyebrow">THE GENRES</p>
          <h2 style={{ fontSize: 32, maxWidth: 700 }}>Seven kinds of worlds, one system underneath.</h2>
          <p className="body" style={{ maxWidth: 700, marginBottom: 44, fontSize: 14.5 }}>
            The Director, the memory, the difficulty controls — all of it is genre-agnostic. What changes from world to
            world is the texture: the documents you handle, the maps you read, the artifacts of the era. Here&rsquo;s
            what each genre brings, and where it&rsquo;s headed.
          </p>
          <div className="grid grid-3 grid-on-3">
            {GENRES.map((g) => (
              <div key={g.key}>
                <p className="eyebrow-sm">{g.title}</p>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'var(--ink-2)',
                    margin: '0 0 14px',
                  }}
                >
                  {g.texture} {g.hook}
                </p>
                <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: 0 }}>Horizon: {g.horizon}</p>
              </div>
            ))}
          </div>
          <p className="small" style={{ maxWidth: 700, margin: '36px 0 0' }}>
            Also on the way: espionage, courtroom &amp; law, disaster response, heists, exploration, horror, first
            contact, and dynasties that span generations. The genre list keeps the format the same — it&rsquo;s the
            texture that changes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">THE ENGINE</p>
          <h2 style={{ fontSize: 32, maxWidth: 700, lineHeight: 1.25 }}>
            Underneath every world is an AI engine we call the Director.
          </h2>
          <p className="body" style={{ maxWidth: 680, marginBottom: 44, fontSize: 14.5 }}>
            The Director doesn&rsquo;t write a script and wait for you to follow it. It tracks what you do, what you
            ignore, who you trust, and how you behave under pressure — then decides what happens next, in real time, in
            language and consequence, not menus.
          </p>
          <div className="grid grid-3">
            {DIRECTOR_FACETS.map((f) => (
              <div key={f.label}>
                <p className="eyebrow-sm">{f.label}</p>
                <h3 style={{ fontSize: 18 }}>{f.title}</h3>
                <p className="genre-hook" style={{ fontSize: 13 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled-both">
        <div className="wrap">
          <p className="eyebrow">SHARED — HORIZON</p>
          <h2 style={{ fontSize: 34, maxWidth: 720 }}>
            Somewhere in your world, another human may be making a move against you.
          </h2>
          <p className="body" style={{ maxWidth: 700, marginBottom: 44, fontSize: 15 }}>
            Shared worlds don&rsquo;t require shared schedules. Make decisions today. Someone else&rsquo;s decisions
            tomorrow may change what happened because of them. Go offline — your organization, your precinct, your ship
            continues according to the instructions you left behind.
          </p>
          <div className="grid grid-3 grid-on-3">
            {SHARED_WORLD_EXAMPLES.map((e) => (
              <div key={e.label} style={{ padding: 32 }}>
                <p className="eyebrow-sm on">{e.label}</p>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'var(--ink-2)',
                    margin: 0,
                  }}
                >
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">THEN — HORIZON</p>
            <h2 style={{ fontSize: 28 }}>You don&rsquo;t always begin at the top.</h2>
            <p className="body" style={{ marginBottom: 26 }}>
              Earn trust. Build reputation. Get promoted. Take power. Higher status creates greater opportunity — but
              also greater vulnerability. A captain can be mutinied against in a way a sailor can&rsquo;t.
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                fontSize: 13,
                color: 'var(--ink-2)',
                fontFamily: 'var(--mono)',
              }}
            >
              {CAREER_LADDERS.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">LEGACY</p>
            <h2 style={{ fontSize: 28 }}>Eventually, every role ends.</h2>
            <p className="body" style={{ marginBottom: 22 }}>
              You retire. You lose an election. Your captain dies. You simply decide you&rsquo;re done. What remains
              because you were here — and does the next player who enters this world inherit any of it?
            </p>
            <div className="tags">
              {LEGACY_TAGS.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled-both">
        <div className="wrap">
          <p className="eyebrow">NOW — EXAMPLE WORLD</p>
          <h2 style={{ fontSize: 32 }}>The American Revolution — Five Years in Five Months</h2>
          <p className="body" style={{ maxWidth: 700, marginBottom: 30, fontSize: 14.5 }}>
            Choose your role — spy, printer, merchant, soldier, officer, diplomat. Enter the war at different times,
            alongside other players, and change the outcome. History gives you the setting, not the ending.
          </p>
          <div className="tags" style={{ gap: 14, marginBottom: 40 }}>
            {['What if Britain wins?', 'What if the war ends in 1778?', 'What if France never enters?'].map((q) => (
              <span
                key={q}
                className="tag"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--brass)',
                  borderColor: 'var(--brass-line)',
                  padding: '9px 14px',
                }}
              >
                {q}
              </span>
            ))}
          </div>
          <div className="grid grid-2 grid-on-3">
            <div style={{ padding: 32 }}>
              <p className="eyebrow-sm">NEXT — EXAMPLE WORLD</p>
              <h3 style={{ fontSize: 20 }}>Miami, 1986</h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: 'var(--ink-2)',
                  margin: 0,
                }}
              >
                Play a homicide detective working a case that touches a cocaine pipeline, a city government on the take,
                and a newsroom that keeps almost printing the truth. Or play the organization the detective is chasing.
                Same city, same year, opposing vantage points.
              </p>
            </div>
            <div style={{ padding: 32 }}>
              <p className="eyebrow-sm">NEXT — EXAMPLE WORLD</p>
              <h3 style={{ fontSize: 20 }}>Northwest Passage, 1845</h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: 'var(--ink-2)',
                  margin: 0,
                }}
              >
                Command or serve aboard an expedition into the Arctic with real period constraints: fixed supplies, no
                rescue, a crew that starts trusting you and can stop. Turning back is always an option. It&rsquo;s just
                never a free one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split-tight">
          <div>
            <p className="eyebrow">HORIZON</p>
            <h2 style={{ fontSize: 28 }}>What happens after the world ends?</h2>
            <p className="body" style={{ marginBottom: 20 }}>
              Survive the first 72 hours. Then the first month. Then decide what kind of society comes next — the
              choices you make in week one about food, force, and trust shape which of these paths even stay open.
            </p>
            <p className="small">
              Some buildings organize by consensus and hold. Others organize by force and hold longer, but crueler. A
              few don&rsquo;t hold at all — and that&rsquo;s a valid, playable ending too.
            </p>
          </div>
          <div className="chain" style={{ color: 'var(--ink-2)' }}>
            {COLLAPSE_CHAIN.map((step, i) => (
              <span key={step} style={{ display: 'contents' }}>
                <span
                  className="chain-step"
                  style={
                    i === COLLAPSE_CHAIN.length - 1
                      ? {
                          color: 'var(--brass)',
                          borderColor: 'var(--brass-line)',
                        }
                      : { borderColor: 'var(--line-2)' }
                  }
                >
                  {step}
                </span>
                {i < COLLAPSE_CHAIN.length - 1 && <span className="chain-arrow">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled-both">
        <div className="wrap">
          <p className="eyebrow">THEN — SHOWCASE LIFE</p>
          <h2 style={{ fontSize: 32 }}>Detective Life</h2>
          <p className="body" style={{ maxWidth: 700, marginBottom: 40, fontSize: 14.5 }}>
            Walk the same streets for years. Work with the same partner. Build informants. Close cases. Watch
            yesterday&rsquo;s decisions become tomorrow&rsquo;s crimes.
          </p>
          <div className="grid grid-2 grid-on-3">
            <div style={{ padding: 36 }}>
              <p className="eyebrow-sm">YOUR AI PARTNER</p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: 'var(--ink-2)',
                  margin: 0,
                }}
              >
                Remembers how you treat them. May trust you. Challenge you. Cover for you. Refuse you. Leave — and if
                they leave, the next partner has heard about it.
              </p>
            </div>
            <div style={{ padding: 36 }}>
              <p className="eyebrow-sm">YOUR CASELOAD</p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: 'var(--ink-2)',
                  margin: 0,
                }}
              >
                Cases don&rsquo;t reset when you close one. A suspect you let walk on a technicality can resurface three
                cases later, now smarter about how you build evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">WORLDS AS SYSTEMS</p>
          <h2 style={{ fontSize: 32, marginBottom: 40 }}>The Seven Layers of Reality</h2>
          <div className="rows">
            {SEVEN_LAYERS.map((l) => (
              <div className="layer-row" key={l.layer}>
                <span className="layer-name">{l.layer}</span>
                <span className="layer-body">{l.body}</span>
              </div>
            ))}
          </div>
          <p
            className="center"
            style={{
              marginTop: 24,
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--brass)',
              letterSpacing: '0.15em',
            }}
          >
            ↑ THE DIRECTOR — keeps all seven layers coherent, fair, alive, and playable
          </p>
        </div>
      </section>

      <section className="section section-2 section-ruled-both">
        <div className="wrap">
          <p className="eyebrow">CREATE — HORIZON</p>
          <h2 style={{ fontSize: 32, maxWidth: 700 }}>
            Eventually, you won&rsquo;t just enter worlds. You&rsquo;ll build them.
          </h2>
          <p className="body" style={{ maxWidth: 700, marginBottom: 44, fontSize: 14.5 }}>
            Creators will define world truth, characters, secrets, motives, factions and endings — the Director runs the
            simulation, but the creator sets what&rsquo;s true. Our long-term goal is to make it possible for great
            world builders to earn a living creating experiences other people want to enter, the way a novelist or
            showrunner does today.
          </p>
          <div className="grid grid-4 grid-on-3">
            {CREATOR_KINDS.map((c) => (
              <div key={c.who} style={{ padding: 28 }}>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 16,
                    marginBottom: 8,
                    color: 'var(--brass)',
                  }}
                >
                  {c.who}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: 'var(--ink-3)',
                    lineHeight: 1.6,
                  }}
                >
                  {c.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">NEXT — EDUCATION</p>
          <h2 style={{ fontSize: 30, maxWidth: 680 }}>Play history before learning how it ended.</h2>
          <p className="body" style={{ maxWidth: 680, marginBottom: 30, fontSize: 14.5 }}>
            A classroom could play the Cuban Missile Crisis as a group before the textbook chapter on it — then compare
            the class&rsquo;s outcome to what actually happened, and talk about where and why they diverged. That
            comparison, not a quiz score, is the lesson.
          </p>
          <div className="tags" style={{ gap: 14 }}>
            {['group play', 'facilitator mode', 'outcome comparison', 'retreats & live events'].map((t) => (
              <span className="tag" key={t} style={{ color: 'var(--ink-3)', padding: '8px 12px' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper section-ruled" style={{ padding: '100px var(--pad)' }}>
        <div className="wrap-narrow">
          <p className="eyebrow center" style={{ marginBottom: 24 }}>
            QUESTIONS WE GET A LOT
          </p>
          <div className="rows">
            {FAQ.map((f) => (
              <div className="faq-row" key={f.q}>
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section center" style={{ padding: '120px var(--pad)' }}>
        <div className="wrap-tight">
          <p
            className="pull"
            style={{
              fontSize: 22,
              lineHeight: 1.7,
              color: '#e0d9c9',
              margin: '0 0 30px',
            }}
          >
            Movies show you what happened. Books tell you what happened. Games usually tell you what you&rsquo;re
            allowed to do. Your Move asks what you would actually do — and lets the world deal with the answer.
          </p>
          <p className="body" style={{ marginBottom: 40 }}>
            We&rsquo;re building toward worlds with memory, history, economies, institutions, relationships, rivals,
            careers and creators — and real people whose choices collide with yours.
          </p>
          <Link href="/#early-access" className="btn">
            Join Early Access
          </Link>
        </div>
      </section>

      <Footer current="/where-were-going" />
    </div>
  );
}
