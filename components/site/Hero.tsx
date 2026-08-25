'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GENRES, HERO_GENRES } from '@/content/genres';
import {
  HERO_EYEBROW,
  HERO_OPENINGS,
  HERO_REASSURANCE,
  HERO_SUBHEAD,
  HERO_TITLE,
} from '@/content/hero';

const INTERVAL_MS = 3400;

/** Each panel is a photograph, the genre label that names it, and the opening it illustrates.
 *  Pairing them here means a backdrop can never drift out of step with the copy beside it. */
const PANELS = HERO_GENRES.map((key) => {
  const genre = GENRES.find((g) => g.key === key);
  if (!genre) throw new Error(`HERO_GENRES names ${key}, which is not a genre.`);
  const opening = HERO_OPENINGS.find((o) => o.genre === key);
  if (!opening) throw new Error(`No hero opening written for ${key}.`);
  return { ...genre, opening: opening.text };
});

/** The rotating genre panel behind the hero.
 *
 *  It stops when a pointer is over the hero, when focus lands inside it, when the tab is
 *  hidden, when the visitor asks it to, and when the operating system says reduce motion.
 *  A carousel nobody can stop is a carousel nobody can read. */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const hovering = useRef(false);
  const focused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) setStopped(true);
    const onChange = (e: MediaQueryListEvent) => setStopped(e.matches);
    reduce.addEventListener('change', onChange);
    return () => reduce.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (paused || stopped) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % PANELS.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, stopped]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden || hovering.current || focused.current);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const hold = useCallback((which: 'hover' | 'focus', on: boolean) => {
    if (which === 'hover') hovering.current = on;
    else focused.current = on;
    setPaused(hovering.current || focused.current);
  }, []);

  const active = PANELS[index];

  return (
    <section
      className="hero"
      onMouseEnter={() => hold('hover', true)}
      onMouseLeave={() => hold('hover', false)}
      onFocusCapture={() => hold('focus', true)}
      onBlurCapture={() => hold('focus', false)}
    >
      <div className="hero-panels" aria-hidden="true">
        {PANELS.map((g, i) => (
          <div key={g.key} className="hero-panel" data-active={i === index}>
            <picture>
              <source
                type="image/webp"
                sizes="100vw"
                srcSet={`/hero/${g.key}-1000.webp 1000w, /hero/${g.key}-1935.webp 1935w`}
              />
              <img
                src={`/hero/${g.key}-1935.jpg`}
                alt=""
                decoding="async"
                // The first panel is on screen before anything scrolls, so it is not lazy.
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'low'}
              />
            </picture>
          </div>
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <p className="hero-eyebrow">
          {HERO_EYEBROW} &nbsp;·&nbsp; <span aria-live="polite">{active.label}</span>
        </p>
        <h1>{HERO_TITLE}</h1>
        <p className="hero-sub">{HERO_SUBHEAD}</p>
        {PANELS.map((g) => (
          <p className="hero-para" key={g.key}>
            {g.opening}
          </p>
        ))}
        <div className="hero-ctas">
          <Link href="#early-access" className="btn">
            Join Early Access
          </Link>
          <Link href="/where-were-going" className="btn-ghost">
            See Where We&rsquo;re Going
          </Link>
        </div>
        <p className="hero-note">{HERO_REASSURANCE}</p>
      </div>

      <button type="button" className="hero-pause" onClick={() => setStopped((s) => !s)} aria-pressed={stopped}>
        {stopped ? 'RESUME BACKDROP' : 'PAUSE BACKDROP'}
      </button>
    </section>
  );
}
