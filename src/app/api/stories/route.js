
import { publicClient } from '@/lib/supabase/public';
import { validateStory, cleanStory } from '@/lib/storyRules';

export const runtime = 'nodejs';

const BOOLEAN_FIELDS = [
  'is_minor',
  'consent_storage',
  'consent_adaptation',
  'consent_publication',
  'consent_school_forward',
  'guardian_permission',
];

// Never log request bodies or headers.
// This protects the anonymity of report submitters.
export async function POST(req) {
  let body;

  // 1. Parse and validate JSON structure
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { errors: { form: 'Permintaan tidak valid.' } },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json(
      { errors: { form: 'Format data tidak valid.' } },
      { status: 400 }
    );
  }

  // 2. Honeypot protection
  if (body.website) {
    return Response.json({ ok: true });
  }

  // 3. Strict boolean validation
  const booleanErrors = {};

  for (const field of BOOLEAN_FIELDS) {
    if (typeof body[field] !== 'boolean') {
      booleanErrors[field] = 'Format persetujuan tidak valid.';
    }
  }

  if (Object.keys(booleanErrors).length > 0) {
    return Response.json(
      { errors: booleanErrors },
      { status: 400 }
    );
  }

  // 4. Validate story content
  const { ok, errors } = validateStory(body);

  if (!ok) {
    return Response.json({ errors }, { status: 400 });
  }

  // 5. Initialize public Supabase client
  const sb = publicClient();

  if (!sb) {
    return Response.json(
      { errors: { form: 'Layanan belum dikonfigurasi.' } },
      { status: 503 }
    );
  }

  // 6. Insert only sanitized fields
  const { error } = await sb
    .from('stories')
    .insert(cleanStory(body));

  if (error) {
    // Log error code only, never report content.
    console.error('stories insert failed, code:', error.code);

    return Response.json(
      {
        errors: {
          form: 'Gagal menyimpan. Coba lagi beberapa saat.',
        },
        code: error.code || 'unknown',
      },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
