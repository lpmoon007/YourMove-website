'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GENRES } from '@/content/genres';
import { HeroPanel } from './icons';

const INTERVAL_MS = 3400;

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
    const id = window.setInterval(() => setIndex((i) => (i + 1) % GENRES.length), INTERVAL_MS);
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

  const active = GENRES[index];

  return (
    <section
      className="hero"
      onMouseEnter={() => hold('hover', true)}
      onMouseLeave={() => hold('hover', false)}
      onFocusCapture={() => hold('focus', true)}
      onBlurCapture={() => hold('focus', false)}
    >
      <div className="hero-panels" aria-hidden="true">
        {GENRES.map((g, i) => (
          <div key={g.key} className="hero-panel" data-active={i === index}>
            <HeroPanel genre={g.key} />
          </div>
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <p className="hero-eyebrow">
          PLAYABLE / NOW &nbsp;·&nbsp; <span aria-live="polite">{active.label}</span>
        </p>
        <h1>Your Move</h1>
        <p className="hero-sub">The world changes. Your move.</p>
        <p className="hero-para">
          It&rsquo;s 1777, and a courier just handed you a letter naming a spy inside your own regiment. You recognize
          the handwriting — it isn&rsquo;t the traitor&rsquo;s. Now you have to decide whether to expose the letter as a
          forgery, or let an innocent man hang for it.
        </p>
        <p className="hero-para">
          It&rsquo;s 1986 in Miami. The jewelry exchange on Ocean Drive was the biggest score of your career, and you
          swore under oath you were home all night. Now a detective slides a photograph across the table — you, in the
          vault&rsquo;s service alley, timestamped four minutes before the alarm tripped. What do you say?
        </p>
        <p className="hero-para">
          It&rsquo;s 2028, three days after coordinated high-altitude EMP strikes took down the country&rsquo;s grid.
          Your building&rsquo;s old diesel generator — no electronic ignition, nothing to fry — is one of the few things
          still running, and it has six hours of fuel left to power either the water pump or the medical fridge holding
          a neighbor&rsquo;s insulin. Forty people are asking which one you&rsquo;ll choose. You&rsquo;re not reading
          about it. You&rsquo;re the one who has to decide.
        </p>
        <div className="hero-ctas">
          <Link href="#early-access" className="btn">
            Join Early Access
          </Link>
          <Link href="/where-were-going" className="btn-ghost">
            See Where We&rsquo;re Going
          </Link>
        </div>
        <p className="hero-note">
          No predetermined path. No single right answer. No two stories have to end the same way.
        </p>
      </div>

      <button type="button" className="hero-pause" onClick={() => setStopped((s) => !s)} aria-pressed={stopped}>
        {stopped ? 'RESUME BACKDROP' : 'PAUSE BACKDROP'}
      </button>
    </section>
  );
}
