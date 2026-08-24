'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SCENARIOS, SHARE_DISCLOSURE } from '@/content/scenarios';

/** The 90-second demo: one situation, three moves, and what the world does with the one
 *  you pick. Switching scenarios clears the choice, because a result from the last world
 *  sitting under a new prompt reads as this world's answer. */
export function ScenarioDemo() {
  const [active, setActive] = useState(0);
  const [choiceId, setChoiceId] = useState<string | null>(null);

  const scenario = SCENARIOS[active];
  const chosen = choiceId ? (scenario.choices.find((c) => c.id === choiceId) ?? null) : null;

  return (
    <div className="demo">
      <div>
        <p className="eyebrow">YOUR MOVE — 90 SECONDS</p>
        <h2>We need a decision. Now.</h2>
        <p className="demo-intro">
          No signup. One scenario, real information, one decision — and a look at what the world does with it. This is
          one of hundreds of moments like it.
        </p>
        <div className="demo-tabs" role="tablist" aria-label="Choose a scenario">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${s.id}`}
              className="demo-tab"
              onClick={() => {
                setActive(i);
                setChoiceId(null);
              }}
            >
              {s.tabLabel}
            </button>
          ))}
        </div>
        <p className="demo-prompt">{scenario.prompt}</p>
      </div>

      <div className="demo-card" role="tabpanel" id={`panel-${scenario.id}`} aria-labelledby={`tab-${scenario.id}`}>
        {chosen ? (
          <div>
            <p className="demo-result">{chosen.result}</p>
            <p className="demo-disclosure">{SHARE_DISCLOSURE}</p>
            <div className="demo-bars">
              {scenario.choices.map((c) => (
                <div className="demo-bar" key={c.id}>
                  <div className="demo-bar-label">{c.short}</div>
                  <div className="demo-bar-track">
                    <div className="demo-bar-fill" style={{ width: `${c.share}%` }} />
                  </div>
                  <div className="demo-bar-pct">{c.share}%</div>
                </div>
              ))}
            </div>
            {scenario.historicalNote && <p className="demo-note">{scenario.historicalNote}</p>}
            <Link href="#early-access" className="btn btn-sm">
              Enter the full world
            </Link>
            <button type="button" className="demo-again" onClick={() => setChoiceId(null)}>
              Take it back
            </button>
          </div>
        ) : (
          <div className="demo-choices">
            {scenario.choices.map((c) => (
              <button key={c.id} type="button" className="demo-choice" onClick={() => setChoiceId(c.id)}>
                <span className="demo-choice-label">{c.label}</span>
                <span className="demo-choice-detail">{c.detail}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
