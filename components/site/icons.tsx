// The small marks on this site are drawn, not photographed: stroke-only line work, no fills.
// The hero is the exception — it carries real photography, one image per genre, because at
// hero scale a line drawing reads as a placeholder rather than a choice.

import type { GenreKey } from '@/content/genres';
import type { BadgeIcon, WorldIcon } from '@/content/profile';

const brass = '#c99a4a';
const dim = '#7d7364';

/** The small mark above each genre tile. */
export function GenreIcon({ genre }: { genre: GenreKey }) {
  switch (genre) {
    case 'history':
      return (
        <svg width="90" height="34" viewBox="0 0 90 34" aria-hidden="true">
          <path d="M0 26 Q15 10 30 24 T60 20 T90 8" stroke={brass} strokeWidth="1.4" fill="none" />
          <path d="M0 32 Q20 22 40 30 T90 22" stroke={dim} strokeWidth="1" fill="none" />
        </svg>
      );
    case 'mystery':
      return (
        <svg width="90" height="34" viewBox="0 0 90 34" aria-hidden="true">
          <circle cx="8" cy="10" r="2.5" fill={brass} />
          <circle cx="45" cy="24" r="2.5" fill={brass} />
          <circle cx="78" cy="8" r="2.5" fill={brass} />
          <line x1="8" y1="10" x2="45" y2="24" stroke={dim} strokeDasharray="2 3" />
          <line x1="45" y1="24" x2="78" y2="8" stroke={dim} strokeDasharray="2 3" />
        </svg>
      );
    case 'survival':
      return (
        <svg width="90" height="30" viewBox="0 0 90 30" aria-hidden="true">
          <path d="M0 15 L10 15 L14 3 L20 27 L26 8 L32 22 L38 15 L90 15" stroke={brass} strokeWidth="1.4" fill="none" />
        </svg>
      );
    case 'expedition':
      return (
        <svg width="90" height="34" viewBox="0 0 90 34" aria-hidden="true">
          <path
            d="M2 30 L20 20 L18 10 L34 4 L48 16 L64 6 L88 14"
            stroke={brass}
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="4 3"
          />
          <circle cx="20" cy="20" r="2" fill="#f4efe4" />
          <circle cx="64" cy="6" r="2" fill="#f4efe4" />
        </svg>
      );
    case 'politics':
      return (
        <svg width="90" height="30" viewBox="0 0 90 30" aria-hidden="true">
          <rect x="0" y="22" width="14" height="6" fill={dim} />
          <rect x="20" y="14" width="14" height="14" fill={brass} />
          <rect x="40" y="6" width="14" height="22" fill={dim} />
          <rect x="60" y="18" width="14" height="10" fill={brass} />
          <rect x="80" y="10" width="10" height="18" fill={dim} />
        </svg>
      );
    case 'crime':
      return (
        <svg width="90" height="30" viewBox="0 0 90 30" aria-hidden="true">
          <rect x="0" y="4" width="90" height="6" fill={dim} />
          <rect x="0" y="14" width="60" height="6" fill={dim} />
          <rect x="0" y="24" width="76" height="6" fill={brass} />
        </svg>
      );
    case 'war':
      return (
        <svg width="90" height="30" viewBox="0 0 90 30" aria-hidden="true">
          <path
            d="M2 24h14M2 24v-8h8M18 24V10l10-6 10 6v14M46 24V4h30v20"
            stroke={brass}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );
  }
}

/** Small period marks beside each world in the Profile's history. */
export function WorldGlyph({ icon, rare }: { icon: WorldIcon; rare?: boolean }) {
  const stroke = rare ? '#b9852e' : '#9c6b1f';
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 1.5 } as const;
  switch (icon) {
    case 'seal':
      return (
        <svg {...p} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 9h8M8 12h5M8 15h6" />
        </svg>
      );
    case 'file':
      return (
        <svg {...p} aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="1" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      );
    case 'signal':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M4 18l4-8 4 5 3-6 5 9" />
        </svg>
      );
    case 'crew':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M4 20c4-1 4-4 8-4s4 3 8 4" />
          <circle cx="12" cy="9" r="3" />
        </svg>
      );
    case 'hall':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M5 20V10M5 10l7-6 7 6M9 20v-6h6v6" />
        </svg>
      );
  }
}

/** Badge glyphs. Locked badges draw in the muted ink, earned ones in brass. */
export function BadgeGlyph({ icon, rare, locked }: { icon: BadgeIcon; rare?: boolean; locked?: boolean }) {
  const stroke = locked ? '#8a7d68' : rare ? '#b9852e' : '#9c6b1f';
  const size = locked ? 18 : 20;
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 1.6 } as const;
  switch (icon) {
    case 'glass':
      return (
        <svg {...p} aria-hidden="true">
          <circle cx="10" cy="10" r="6" />
          <line x1="15" y1="15" x2="21" y2="21" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M12 3c3 3.5 5 6 5 9a5 5 0 0 1-10 0c0-1.6.7-2.8 1.6-4 .3 1 1 1.6 1.6 1.2C10.8 8 10 6 12 3z" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M4 12c2-4 5-6 8-6s6 2 8 6c-2 4-5 6-8 6s-6-2-8-6z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'star':
      return (
        <svg {...p} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8l1.6 3.4 3.4.6-2.5 2.4.6 3.4L12 16l-3.1 1.8.6-3.4-2.5-2.4 3.4-.6z" />
        </svg>
      );
    case 'archive':
      return (
        <svg {...p} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="8" y1="4" x2="8" y2="9" />
        </svg>
      );
    case 'wild':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
        </svg>
      );
    case 'return':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M4 15c3-6 6-9 9-9M9 5h4v4" />
        </svg>
      );
    case 'knot':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M6 3h12M6 21h12M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...p} aria-hidden="true">
          <rect x="5" y="11" width="14" height="9" rx="1" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case 'cross':
      return (
        <svg {...p} aria-hidden="true">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
  }
}

/** The star on the shareable dossier card. */
export function Crest() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9c6b1f" strokeWidth="1.4" aria-hidden="true">
      <path d="M12 2l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 15l-5.2 3 1-5.8-4.3-4.1 5.9-.8z" />
    </svg>
  );
}
