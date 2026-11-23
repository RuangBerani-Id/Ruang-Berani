import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IdCard } from '@/components/Cards';
import QrCode from '@/components/QrCode';
import { instagramUrl, instagramHandle } from '@/lib/instagram';
import { getMember, getMembers } from '@/lib/data';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const m = await getMember(id);
  return { title: m ? m.name : 'Member' };
}

export default async function MemberDetail({ params }) {
  const { id } = await params;
  const [m, all] = await Promise.all([getMember(id), getMembers()]);
  if (!m || m.is_vacant) notFound();
  const people = all.filter((x) => !x.is_vacant);
  const ig = instagramUrl(m.instagram_url);
  const i = people.findIndex((x) => x.id === m.id);
  const prev = people[i - 1], next = people[i + 1];
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="container section">
      <Link href="/gallery" className="back">← BACK TO GALLERY</Link>
      <div className="detail-card"><IdCard m={m} variant="full" as="div" /></div>
      <div className="detail-info">
        <div>
          <h1 className="h-serif sc">{m.name}</h1>
          <p className="lead">{m.bio || `${m.position || 'Member'} of Ruang Berani Indonesia.`}</p>
        </div>
        <dl className="meta">
          <dt>{m.number_label || 'NTA'}</dt><dd>{m.nta || '-'}</dd>
          <dt>JABATAN</dt><dd>{m.position || '-'}</dd>
          {m.location && (<><dt>ALAMAT DINAS</dt><dd>{m.location}</dd></>)}
        </dl>
      </div>
      {ig && (
        <aside className="qr card">
          <QrCode url={ig} />
          <div>
            <strong>Scan untuk melihat Instagram</strong>
            <p>{instagramHandle(ig)}</p>
            <a className="btn btn--outline btn--sm" href={ig} target="_blank" rel="noopener noreferrer">Buka Instagram ›</a>
          </div>
        </aside>
      )}
      <nav className="pager" aria-label="Anggota lain">
        {prev ? <Link href={`/gallery/members/${prev.id}`}>‹ Sebelumnya</Link> : <span />}
        <span>{pad(i + 1)} / {pad(people.length)}</span>
        {next ? <Link href={`/gallery/members/${next.id}`}>Berikutnya ›</Link> : <span />}
      </nav>
    </div>
  );
}
