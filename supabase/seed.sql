-- Starter content (v2). Run AFTER schema.sql. Safe to re-run: it replaces only the rows it created before.
-- consent_confirmed = true reflects the consent the organisers stated for these people and photos.
insert into public.site_settings (key, value) values ('site', '{}'::jsonb) on conflict (key) do nothing;

delete from public.members where nta in ('001','002','003','004','005','006','007','008','009','010','011','012','013','014','015','016','00001','00002','003 / 010')
   or name like 'Co-Founder (HESA)%' or name = 'Posisi terbuka';
delete from public.events where title like 'Indonesia Youth Summit 2026:%' or title like 'ADK Movement%';
delete from public.affiliations where slug in ('gak','fosi','fustagen');

insert into public.members (name, nta, number_label, position, location, photo_url, instagram_url, is_vacant, sort_order, consent_confirmed, published) values
('Safa Tiara Salsabillah',        '001',       'NTA', 'Founder',                              'Jakarta', '/images/members/safa.jpg',        'https://www.instagram.com/safa_tiara_salsabillah/', false, 1,  true, true),
('Mahesa Oktafiyanti',            '002',       'NTA', 'Co-Founder',                           'Bekasi',  '/images/members/mahesa.jpg',      'https://www.instagram.com/hesaoktaf/',              false, 2,  true, true),
('Muhammad Habib Mirwan',         '003 / 010', 'NTA', 'Co-Founder & Kepala Divisi R&D Digital Tech', 'Bekasi', '/images/members/habib.jpg', 'https://www.instagram.com/thearchhabib/',          false, 3,  true, true),
('Alfa Ridho',                    '00001',     'NTP', 'Kepala Dewan Pengawas (Pembina)',      'Jakarta', '/images/members/alfa.jpg',        'https://www.instagram.com/ylzdho_chennel_official/', false, 4, true, true),
('Pasha Satria Ramadhan Chaerudy','00002',     'NTP', 'Anggota Dewan Pengawas',               'Jakarta', '/images/members/pasha.jpg',       'https://www.instagram.com/yukk1to/',                false, 5,  true, true),
('Aruna Galuh',                   '005',       'NTA', 'Ketua Bendahara Umum',                 'Jakarta', '/images/members/aruna.jpg',       'https://www.instagram.com/navieraeri/',             false, 6,  true, true),
('Lamborghini Yopi Ibrahim',      '006',       'NTA', 'Wakil Ketua Bendahara Umum',           'Jakarta', '/images/members/lamborghini.jpg', null,                                                false, 7,  true, true),
('Posisi terbuka',                '004',       'NTA', 'Sekretaris Umum',                      null,      null,                              null,                                                true,  8,  true, true),
('Aqila Maeza Salsabila',         '013',       'NTA', 'Kepala Divisi Media Kreatif',          'Jakarta', '/images/members/aqila.jpg',       'https://www.instagram.com/aqilalune/',              false, 9,  true, true),
('Asyifa Aisyah Nurdadi',         '015',       'NTA', 'Kepala Divisi Kemitraan Strategis',    'Jakarta', '/images/members/asyifa.jpg',      'https://www.instagram.com/syifaa__aisyaa/',         false, 10, true, true),
('Posisi terbuka',                '007',       'NTA', 'Kepala R&D of Education',              null,      null,                              null,                                                true,  11, true, true),
('Ibrahim Kasyafany',             '008',       'NTA', 'Staff in R&D of Education',            'Jakarta', '/images/members/ibrahim.jpg',     'https://www.instagram.com/ibrahim.xyzk/',           false, 12, true, true),
('Nur Rahmawati',                 '009',       'NTA', 'Staff in R&D of Education',            'Jakarta', '/images/members/nur.jpg',         'https://www.instagram.com/nur.rhmawtiii/',          false, 13, true, true),
('Marsekal Dirgantara',           '016',       'NTA', 'Staff Divisi Media Kreatif',           'Jakarta', '/images/members/marsekal.jpg',    'https://www.instagram.com/sekalcaskeyy/',           false, 14, true, true),
('Febryana',                      '014',       'NTA', 'Staff',                                'Jakarta', '/images/members/febryana.jpg',    'https://www.instagram.com/fbryana_8/',              false, 15, true, true),
('Posisi terbuka',                '011',       'NTA', 'Staff Divisi R&D Digital Tech',        null,      null,                              null,                                                true,  16, true, true),
('Posisi terbuka',                '012',       'NTA', 'Staff Divisi R&D Digital Tech',        null,      null,                              null,                                                true,  17, true, true);

insert into public.events (title, caption, date_label, location, description, cover_url, sort_order, consent_confirmed, published) values
('ADK Movement: Hari Anak Internasional 2026', 'Bersama Melawan Kekerasan Anak', '20 November 2026', null,
 'Dokumentasi ADK Movement dalam rangka memperingati Hari Anak Internasional, 20 November 2026.', '/images/events/adk-1.jpg', 1, true, true),
('Indonesia Youth Summit 2026: Malam di Booth GAK', 'Ruang Berani Untuk Indonesia', '29-30 Oktober 2026', 'Gedung Teater Jakarta, Taman Ismail Marzuki',
 'Tim di depan booth Generasi Anti Kekerasan Indonesia pada malam hari.', '/images/events/summit-5.jpg', 2, true, true),
('ADK Movement: Foto Bersama Peserta', 'Bersama Melawan Kekerasan Anak', '20 November 2026', null,
 'Foto bersama peserta ADK Movement, Hari Anak Internasional 2026.', '/images/events/adk-2.jpg', 3, true, true),
('Indonesia Youth Summit 2026: Tim Ruang Berani', 'Bersama, Kita Berani!', '29-30 Oktober 2026', 'Gedung Teater Jakarta, Taman Ismail Marzuki',
 'Tim di booth Generasi Anti Kekerasan Indonesia pada Indonesia Youth Summit 2026.', '/images/events/summit-3.jpg', 4, true, true),
('Indonesia Youth Summit 2026: Kebersamaan Tim', 'Satu Tim, Satu Semangat', '29-30 Oktober 2026', 'Gedung Teater Jakarta, Taman Ismail Marzuki',
 'Dokumentasi kebersamaan tim di booth Generasi Anti Kekerasan Indonesia.', '/images/events/summit-4.jpg', 5, true, true),
('Indonesia Youth Summit 2026: Booth GAK', 'Semangat Terus Pemuda-Pemudi Indonesia', '29-30 Oktober 2026', 'Gedung Teater Jakarta, Taman Ismail Marzuki',
 'Dokumentasi Ruang Berani di booth Generasi Anti Kekerasan Indonesia pada Indonesia Youth Summit 2026.', '/images/events/summit-2.jpg', 6, true, true);

insert into public.affiliations (name, slug, logo_url, description, status, since_label, until_label, sort_order, consent_confirmed, published) values
('FOSI', 'fosi', '/images/affiliations/fosi.png', 'Forum OSIS Se-Indonesia, penaung Ruang Berani.', 'Penaung (Affiliation)', '8 November 2026', 'Undecided time', 1, true, true),
('GAK', 'gak', '/images/affiliations/gak.png', 'Generasi Anti Kekerasan, mitra Ruang Berani di Indonesia Youth Summit 2026.', 'Partner', null, 'Undecided time', 2, true, true),
('FUSTAGEN', 'fustagen', '/images/affiliations/fustagen.png', 'FUSTAGEN, mitra kreatif (Creative Partner) Ruang Berani.', 'Creative Partner', null, 'Undecided time', 3, true, true);
