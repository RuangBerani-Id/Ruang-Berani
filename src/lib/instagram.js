// Normalises any Instagram profile link or @handle to https://www.instagram.com/<handle>/
// (share-link tracking parameters are dropped). Returns null when it is not a valid profile.
export function instagramUrl(input) {
  if (!input || typeof input !== 'string') return null;
  let s = input.trim();
  if (!s) return null;
  if (s.startsWith('@')) s = s.slice(1);
  if (!/^https?:\/\//i.test(s)) s = s.toLowerCase().includes('instagram.com') ? `https://${s}` : `https://www.instagram.com/${s}`;
  let u;
  try { u = new URL(s); } catch { return null; }
  const host = u.hostname.toLowerCase();
  if (host !== 'instagram.com' && host !== 'www.instagram.com') return null;
  const handle = u.pathname.split('/').filter(Boolean)[0] || '';
  if (!/^[A-Za-z0-9._]{1,30}$/.test(handle)) return null;
  if (['p', 'reel', 'reels', 'stories', 'explore', 'accounts', 'direct', 'tv'].includes(handle.toLowerCase())) return null;
  return `https://www.instagram.com/${handle}/`;
}
export const instagramHandle = (url) => { const m = /instagram\.com\/([^/]+)/.exec(url || ''); return m ? `@${m[1]}` : ''; };
