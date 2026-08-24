'use client';

import { useState } from 'react';
import { PROFILE } from '@/content/profile';
import { Crest } from './icons';

const W = 1200;
const H = 630;
const PAPER = '#efe9db';
const PANEL = '#e6ddc8';
const BRASS = '#9c6b1f';
const INK = '#201c17';
const INK_3 = '#5c5343';
const INK_4 = '#8a7d68';

/** The shareable dossier card, drawn to a canvas and handed over as a real PNG.
 *
 *  A button that looks like it downloads something and does not is worse than no button, so
 *  this one draws the card rather than promising one. Fonts fall back to the system serif if
 *  Spectral has not loaded — the card still reads. */
export function DossierCard() {
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = PANEL;
      ctx.fillRect(48, 48, W - 96, H - 96);
      ctx.strokeStyle = BRASS;
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, W - 96, H - 96);

      ctx.fillStyle = INK_4;
      ctx.font = '500 20px "IBM Plex Mono", ui-monospace, monospace';
      ctx.fillText('Y O U R   M O V E', 96, 120);

      ctx.fillStyle = INK;
      ctx.font = '600 76px Spectral, Georgia, serif';
      ctx.fillText(PROFILE.name, 96, 240);

      ctx.fillStyle = BRASS;
      ctx.font = '400 38px Spectral, Georgia, serif';
      ctx.fillText(PROFILE.title, 96, 300);

      ctx.fillStyle = INK_3;
      ctx.font = '400 26px "IBM Plex Sans", system-ui, sans-serif';
      for (const [i, line] of PROFILE.dossierLine.split(' · ').entries()) {
        ctx.fillText(line, 96, 380 + i * 42);
      }

      ctx.strokeStyle = BRASS;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(W - 200, 200, 62, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = BRASS;
      ctx.font = '600 44px Spectral, Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(PROFILE.monogram, W - 200, 216);
      ctx.textAlign = 'left';

      ctx.fillStyle = INK_4;
      ctx.font = '500 20px "IBM Plex Mono", ui-monospace, monospace';
      ctx.fillText('CONCEPT PREVIEW — A FICTIONAL PLAYER', 96, H - 110);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'your-move-dossier.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="dossier">
      <div className="dossier-id">
        <div className="crest">
          <Crest />
        </div>
        <div>
          <p className="eyebrow-sm" style={{ marginBottom: 4 }}>
            DOSSIER — SHAREABLE
          </p>
          <div className="dossier-name">
            {PROFILE.name}, {PROFILE.title}
          </div>
          <div className="dossier-line">{PROFILE.dossierLine}</div>
        </div>
      </div>
      <button type="button" className="dossier-btn" onClick={download} disabled={busy}>
        {busy ? 'Drawing…' : 'Download Dossier Card'}
      </button>
    </div>
  );
}
