import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Grain, Nav } from '@/components/site/Chrome';

export const metadata: Metadata = {
  title: 'Privacy & Terms — Your Move',
  description: 'How Your Move handles memory and data, how age and content ratings work, and the early-access terms.',
};

// A stub, and it says so. Counsel drafts the real policy before public launch.
export default function LegalPage() {
  return (
    <div className="page">
      <Grain />
      <Nav current="/legal" cta={false} />

      <section className="section" style={{ padding: '100px var(--pad)' }}>
        <div className="wrap-tight legal">
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            LEGAL
          </p>
          <h1>Privacy &amp; Terms</h1>

          <h2>Privacy, in short</h2>
          <p>
            Your Move&rsquo;s memory system tracks how you play a character inside a world — the decisions, not you. It
            exists to keep the fiction from repeating itself, and it never reaches past the worlds you played into a
            claim about who you are. We don&rsquo;t sell your data. The full policy will be published before public
            launch.
          </p>

          <h2>Age &amp; content ratings</h2>
          <p>
            Some worlds — currently Crime &amp; Underworld — contain violence, criminal activity, and mature themes, and
            are age-verified at entry (18+). Depicting a world is not endorsing it. Characters may be enemies. Players
            are not.
          </p>

          <h2>Terms, in short</h2>
          <p>
            Your Move is in early access. Features, worlds, and pricing described on this site are part of an active
            roadmap and may change before general availability. Full terms of service will be published before public
            launch.
          </p>

          <p className="small" style={{ marginTop: 50 }}>
            Questions in the meantime: <Link href="/#early-access">join early access</Link> and we&rsquo;ll follow up
            directly.
          </p>
        </div>
      </section>

      <Footer current="/legal" />
    </div>
  );
}
