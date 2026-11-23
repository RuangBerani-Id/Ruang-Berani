'use client';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/browser';

// Re-encoding through a canvas drops EXIF metadata (GPS location, device info) and caps the size.
async function clean(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise((r) => c.toBlob(r, file.type, 0.9));
    return blob ? new File([blob], file.name, { type: file.type }) : file;
  } catch { return file; }
}

export default function ImageUpload({ value, onChange, folder = 'misc', multiple = false }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const list = multiple ? value || [] : value ? [value] : [];

  async function pick(e) {
    setErr('');
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true);
    const sb = supabaseBrowser();
    const urls = [];
    for (const file of files) {
      if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) { setErr('Hanya gambar, maksimal 5 MB per file.'); continue; }
      const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const { error } = await sb.storage.from('media').upload(path, await clean(file), { upsert: false });
      if (error) { setErr(error.message); continue; }
      urls.push(sb.storage.from('media').getPublicUrl(path).data.publicUrl);
    }
    setBusy(false);
    e.target.value = '';
    if (urls.length) onChange(multiple ? [...list, ...urls] : urls[0]);
  }

  return (
    <div className="upload">
      <div className="upload__thumbs">
        {list.map((u) => (
          <div key={u} className="upload__thumb">
            <img src={u} alt="" />
            <button type="button" onClick={() => onChange(multiple ? list.filter((x) => x !== u) : '')} aria-label="Hapus gambar">×</button>
          </div>
        ))}
      </div>
      <input type="file" accept="image/*" multiple={multiple} onChange={pick} disabled={busy} />
      {busy && <small>Mengunggah...</small>}
      {err && <p className="err">{err}</p>}
    </div>
  );
}
