// Early access signup.
//
// The site never shows a confirmation for a signup that went nowhere. If no destination is
// configured, this route says so plainly and the form surfaces that message. Set
// EARLY_ACCESS_WEBHOOK_URL to the list, CRM, or function that should receive signups.

import { NextResponse } from 'next/server';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Signup {
  email?: unknown;
  genres?: unknown;
  interests?: unknown;
}

const strings = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, 20) : [];

export async function POST(request: Request) {
  let body: Signup;
  try {
    body = (await request.json()) as Signup;
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not read that request.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: 'Enter a valid email address to join.' }, { status: 400 });
  }

  const destination = process.env.EARLY_ACCESS_WEBHOOK_URL;
  if (!destination) {
    console.warn('[early-access] EARLY_ACCESS_WEBHOOK_URL is not set — signup was not stored.');
    return NextResponse.json(
      { ok: false, error: 'Early access signup is not connected yet. Nothing was saved — please try again soon.' },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(destination, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email,
        genres: strings(body.genres),
        interests: strings(body.interests),
        source: 'yourmove.world',
        at: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`destination responded ${res.status}`);
  } catch (err) {
    console.error('[early-access] signup could not be forwarded:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong on our end. Try again in a moment.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
