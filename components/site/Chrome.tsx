import Link from 'next/link';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/where-were-going', label: "Where We're Going" },
  { href: '/profile', label: 'Profile' },
];

/** The nav stays dark on every page, including the light Profile, so the brand holds. */
export function Nav({ current, cta = true }: { current: string; cta?: boolean }) {
  return (
    <nav className="nav">
      <Link href="/" className="nav-mark" aria-label="Your Move — home">
        YOUR MOVE
      </Link>
      <div className="nav-links">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={l.href === current ? 'page' : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
      {cta && (
        <Link href="/#early-access" className="nav-cta">
          Join Early Access
        </Link>
      )}
    </nav>
  );
}

export function Footer({ current }: { current: string }) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/where-were-going', label: "Where We're Going" },
    { href: '/profile', label: 'Profile' },
    { href: '/legal', label: 'Privacy & Terms' },
  ].filter((l) => l.href !== current);

  return (
    <footer className="foot">
      <div>© 2026 Your Move</div>
      <div className="foot-links">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}

/** Film grain. Fixed, non-interactive, and it stops moving under reduced motion. */
export function Grain({ dark = false }: { dark?: boolean }) {
  return <div className={dark ? 'grain grain-dark' : 'grain'} aria-hidden="true" />;
}
