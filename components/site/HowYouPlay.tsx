'use client';

import { useState } from 'react';
import { CONTRADICTION, DIRECTORS_NOTE, HOW_YOU_PLAY_HEADING, HOW_YOU_PLAY_INTRO, PLAY_READINGS } from '@/content/play';

const TIER_WORD: Record<string, string> = {
  emerging: 'Barely enough to notice yet',
  developing: 'Developing',
  established: 'Established',
  'context-dependent': 'Context-dependent',
};

/** How You Play.
 *
 *  Each line opens onto the events behind it. That is the whole point: a reading you cannot
 *  check is a horoscope. Counter-evidence sits in the same card as the evidence, and a
 *  dimension the worlds pulled two ways says so instead of averaging itself into a middle. */
export function HowYouPlay() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <>
      <p className="eyebrow">HOW YOU PLAY</p>
      <h2 style={{ maxWidth: 640, fontSize: 26, lineHeight: 1.3 }}>{HOW_YOU_PLAY_HEADING}</h2>
      <p className="body" style={{ maxWidth: 640, marginBottom: 40 }}>
        {HOW_YOU_PLAY_INTRO}
      </p>

      <div className="dims">
        {PLAY_READINGS.map((d) => {
          const isOpen = !!open[d.id];
          return (
            <div key={d.id} className="dim">
              <button
                type="button"
                className="dim-btn"
                aria-expanded={isOpen}
                aria-controls={`evidence-${d.id}`}
                onClick={() => setOpen((o) => ({ ...o, [d.id]: !o[d.id] }))}
              >
                <div className="dim-ends">
                  <span>{d.left.toUpperCase()}</span>
                  <span>{d.right.toUpperCase()}</span>
                </div>
                <div className="dim-track">
                  <div className="dim-mark" style={{ left: `${d.position}%` }} />
                </div>
                <div className="dim-caption">
                  {TIER_WORD[d.confidence]} — {d.note} ·{' '}
                  <span className="dim-open">{isOpen ? 'hide the evidence' : 'open the evidence'}</span>
                </div>
              </button>

              {isOpen && (
                <div className="dim-evidence" id={`evidence-${d.id}`}>
                  {d.context ? (
                    <>
                      <p className="dim-evidence-head">Pulled both ways</p>
                      <p>{d.context}</p>
                    </>
                  ) : (
                    <>
                      <p className="dim-evidence-head">Why the world thinks this</p>
                      {d.why.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </>
                  )}
                  {d.counter.length > 0 && (
                    <>
                      <p className="dim-evidence-head counter">Counter-evidence</p>
                      {d.counter.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="callout">
        <p className="dim-evidence-head">Contradiction the world has noticed</p>
        <p>{CONTRADICTION}</p>
      </div>

      <div className="director-note">
        <p className="eyebrow-sm" style={{ marginBottom: 8 }}>
          DIRECTOR&rsquo;S NOTE
        </p>
        <p>{DIRECTORS_NOTE}</p>
      </div>
    </>
  );
}
