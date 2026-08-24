'use client';

import { useState } from 'react';

const GENRE_CHIPS = ['History', 'Mystery', 'Crime', 'Survival', 'Expedition', 'Politics', 'Other'];
const INTEREST_CHIPS = ['Solo play', 'Multiplayer', 'Persistent worlds', 'Creator tools', 'Education', 'Live events'];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Early access signup.
 *
 *  The chips are a personalization signal and never block the form. The email goes to a real
 *  endpoint — see app/api/early-access/route.ts. When no list is wired up, the endpoint says
 *  so and this form shows that instead of a confirmation, because a confirmation for a signup
 *  that went nowhere is a lie told to the person most willing to help. */
export function EarlyAccess() {
  const [genres, setGenres] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [joined, setJoined] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email)) {
      setError('Enter a valid email address to join.');
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, genres, interests }),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && body.ok) setJoined(true);
      else setError(body.error ?? 'Something went wrong on our end. Try again in a moment.');
    } catch {
      setError('Could not reach us just now. Try again in a moment.');
    } finally {
      setSending(false);
    }
  }

  if (joined) {
    return <div className="signup-done">You&rsquo;re on the list. Founder badge reserved.</div>;
  }

  return (
    <form onSubmit={submit} noValidate>
      <fieldset className="chip-group">
        <legend className="chip-legend">WHAT WOULD YOU PLAY FIRST?</legend>
        <div className="chips">
          {GENRE_CHIPS.map((g) => (
            <button
              key={g}
              type="button"
              className="chip"
              aria-pressed={genres.includes(g)}
              onClick={() => toggle(genres, setGenres, g)}
            >
              {genres.includes(g) ? `● ${g}` : g}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="chip-group">
        <legend className="chip-legend">INTERESTED IN</legend>
        <div className="chips">
          {INTEREST_CHIPS.map((g) => (
            <button
              key={g}
              type="button"
              className="chip"
              aria-pressed={interests.includes(g)}
              onClick={() => toggle(interests, setInterests, g)}
            >
              {interests.includes(g) ? `● ${g}` : g}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="signup-field">
        <label htmlFor="early-access-email" style={{ position: 'absolute', left: '-9999px' }}>
          Email address
        </label>
        <input
          id="early-access-email"
          className="signup-input"
          type="email"
          value={email}
          placeholder="you@email.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'early-access-error' : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
        />
        <button type="submit" className="signup-submit" disabled={sending}>
          {sending ? 'Sending…' : 'Join Early Access'}
        </button>
      </div>
      {error && (
        <div className="signup-error" id="early-access-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
