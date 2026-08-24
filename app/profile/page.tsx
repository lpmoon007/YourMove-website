import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Grain, Nav } from '@/components/site/Chrome';
import { DossierCard } from '@/components/site/DossierCard';
import { HowYouPlay } from '@/components/site/HowYouPlay';
import { BadgeGlyph, WorldGlyph } from '@/components/site/icons';
import {
  ARC,
  BADGES,
  LEFT_BEHIND,
  NEXT_MILESTONE,
  PASSPORT,
  PEOPLE,
  PROFILE,
  PROFILE_DISCLAIMER,
  PROFILE_STATS,
  RAREST_STAMP,
  SESSION_ANALYSIS,
  SESSION_TIMELINE,
  WORLDS_PLAYED,
  WORLDS_REMAINING,
} from '@/content/profile';

export const metadata: Metadata = {
  title: 'Profile — Your Move',
  description:
    'A concept preview of a player profile after two years of play: worlds entered, endings found, the people who remember you, and how you tend to play.',
};

export default function ProfilePage() {
  return (
    <div className="page paper">
      <Grain dark />
      <Nav current="/profile" />

      <p className="banner">{PROFILE_DISCLAIMER}</p>

      <section className="section" style={{ padding: '80px var(--pad) 60px' }}>
        <div className="wrap-mid">
          <div className="profile-head">
            <div className="profile-id">
              <div className="monogram">{PROFILE.monogram}</div>
              <div>
                <p className="eyebrow" style={{ marginBottom: 14 }}>
                  PROFILE
                </p>
                <h1>{PROFILE.name}</h1>
                <div className="profile-meta">
                  {PROFILE.joined} &nbsp;·&nbsp; Equipped Title:{' '}
                  <span style={{ color: 'var(--brass)' }}>{PROFILE.title}</span>
                </div>
              </div>
            </div>
            <div className="streak">{PROFILE.streak}</div>
          </div>
          <p className="body" style={{ maxWidth: 720, marginBottom: 40, fontSize: 14.5 }}>
            {PROFILE.intro}
          </p>
          <div className="stat-row">
            {PROFILE_STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className={s.accent ? 'stat-num accent' : 'stat-num'}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '0 var(--pad) 90px' }}>
        <div className="wrap-mid">
          <DossierCard />
        </div>
      </section>

      <section className="section" style={{ padding: '0 var(--pad) 90px' }}>
        <div className="wrap-mid">
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            TWO-YEAR ARC
          </p>
          <div className="arc">
            <div className="arc-rule" aria-hidden="true" />
            {ARC.map((a) => (
              <div className="arc-point" key={a.when}>
                <div className={`arc-dot${a.accent ? ' accent' : ''}${a.current ? ' now' : ''}`} />
                <div className={`arc-when${a.current ? ' now' : ''}`}>{a.when}</div>
                <div className="arc-what">{a.what}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled-both" style={{ padding: '80px var(--pad)' }}>
        <div className="wrap-mid">
          <HowYouPlay />
        </div>
      </section>

      <section className="section" style={{ padding: '80px var(--pad)' }}>
        <div className="wrap-mid">
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            WORLDS PLAYED
          </p>
          <div className="rows">
            {WORLDS_PLAYED.map((w) => (
              <div className="world-row" key={w.world}>
                <div className="world-name">
                  <WorldGlyph icon={w.icon} rare={w.rare} />
                  <div>
                    <div className="world-title">{w.world}</div>
                    <div className="world-role">Role: {w.role}</div>
                  </div>
                </div>
                <div className={w.rare ? 'world-ending rare' : 'world-ending'}>Ending: {w.ending}</div>
                <div>
                  <div className="world-outcome">{w.outcome}</div>
                  <div className="world-friends">{w.friends}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="center" style={{ marginTop: 20, fontSize: 12.5, color: 'var(--ink-4)' }}>
            {WORLDS_REMAINING}
          </p>
        </div>
      </section>

      <section className="section section-2 section-ruled-both" style={{ padding: '80px var(--pad)' }}>
        <div className="wrap-mid">
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            PEOPLE WHO REMEMBER YOU
          </p>
          <div className="grid grid-3">
            {PEOPLE.map((p) => (
              <div className="person-card" key={p.name} style={{ background: 'var(--bg)', padding: 26 }}>
                <div className="person-head">
                  <span className="person-name">{p.name}</span>
                  <span className="person-world">{p.world}</span>
                </div>
                <div className={p.ally ? 'person-status ally' : 'person-status rival'}>{p.status}</div>
                <p
                  style={{
                    fontSize: 12.5,
                    color: 'var(--ink-3)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '80px var(--pad)' }}>
        <div className="wrap-mid">
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            WHAT&rsquo;S LEFT BEHIND
          </p>
          <p className="body" style={{ maxWidth: 680, marginBottom: 30 }}>
            Some worlds keep going after you leave them. Here&rsquo;s what still exists because Alex Morgan was there.
          </p>
          <div className="rows">
            {LEFT_BEHIND.map((l) => (
              <div className="legacy-row" key={l.world}>
                <span className="legacy-world">{l.world}</span>
                <span className="legacy-effect">{l.effect}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled-both" style={{ padding: '80px var(--pad)' }}>
        <div className="wrap-mid">
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            TITLES &amp; BADGES
          </p>
          <div className="grid grid-3">
            {BADGES.map((b) => (
              <div
                className={b.locked ? 'badge locked' : 'badge'}
                key={b.name}
                style={{
                  background: b.locked ? 'var(--bg-2)' : 'var(--bg)',
                  padding: 26,
                }}
              >
                <div className={`badge-ring${b.rare ? ' rare' : ''}${b.locked ? ' locked' : ''}`}>
                  <BadgeGlyph icon={b.icon} rare={b.rare} locked={b.locked} />
                </div>
                <div className={`badge-name${b.rare ? ' rare' : ''}${b.locked ? ' locked' : ''}`}>{b.name}</div>
                <div className="badge-earned">{b.earned}</div>
              </div>
            ))}
            {/* The hairline grid paints its own background, so a half-empty last row would
                read as a broken tile. Fill the remainder instead. */}
            {Array.from({ length: (3 - (BADGES.length % 3)) % 3 }).map((_, i) => (
              <div key={`filler-${i}`} aria-hidden="true" style={{ background: 'var(--bg)' }} />
            ))}
          </div>
          <p className="milestone">
            {NEXT_MILESTONE.prefix} <span style={{ color: 'var(--brass)' }}>{NEXT_MILESTONE.highlight}</span>{' '}
            {NEXT_MILESTONE.suffix}
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: '80px var(--pad)' }}>
        <div className="wrap-mid">
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            MY TIMELINE — LAST SESSION
          </p>
          <div className="session">
            <div className="session-list">
              {SESSION_TIMELINE.map((e) => (
                <div className={e.turningPoint ? 'session-event turn' : 'session-event'} key={e.at}>
                  <span className="session-at">{e.at}</span>
                  <span>{e.what}</span>
                </div>
              ))}
            </div>
            <div className="session-analysis">
              {SESSION_ANALYSIS.map((a) => (
                <div key={a.label}>
                  <div className="session-analysis-label">{a.label}</div>
                  <div className="session-analysis-body">{a.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-2 section-ruled-both" style={{ padding: '80px var(--pad)' }}>
        <div className="wrap-mid">
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            WORLD PASSPORT
          </p>
          <div className="passport">
            {PASSPORT.map((p) => (
              <span className="stamp" key={p}>
                {p}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink-4)', margin: 0 }}>
            {RAREST_STAMP.prefix} <span style={{ color: 'var(--brass-lit)' }}>{RAREST_STAMP.highlight}</span>,{' '}
            {RAREST_STAMP.suffix}
          </p>
        </div>
      </section>

      <section className="section center" style={{ padding: '100px var(--pad)' }}>
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>This profile starts on day one.</h2>
        <p className="body" style={{ marginBottom: 34 }}>
          Join early access and it starts accumulating with your first story.
        </p>
        <Link href="/#early-access" className="btn">
          Join Early Access
        </Link>
      </section>

      <Footer current="/profile" />
    </div>
  );
}
