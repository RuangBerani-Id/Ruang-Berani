import HScroller from '@/components/HScroller';
import { IdCard, ReviewCard, SecHead, Empty } from '@/components/Cards';
import { getMembers, getTestimonials } from '@/lib/data';
export const metadata = { title: 'Gallery' };

export default async function Gallery() {
  const [members, reviews] = await Promise.all([getMembers(), getTestimonials('highlight')]);
  return (
    <div className="container section">
      <SecHead title="Our Members" href="/gallery/members" />
      {members.length ? (
        <HScroller label="Our members">{members.map((m) => <IdCard key={m.id} m={m} />)}</HScroller>
      ) : <Empty>Profil anggota akan tampil di sini.</Empty>}

      {/* Appears automatically once the first review is published in the CMS. */}
      {reviews.length > 0 && (
        <>
          <div className="gap-lg" />
          <SecHead title="What people say about us" href="/testimonials" cta="SEE ALL" />
          <HScroller label="What people say about us">{reviews.map((t) => <ReviewCard key={t.id} t={t} quote />)}</HScroller>
        </>
      )}
    </div>
  );
}
