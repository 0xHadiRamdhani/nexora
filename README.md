# NexoraLabStudio

Landing page untuk NexoraLabStudio, studio yang membuat website, aplikasi web, serta aplikasi Android dan iOS. Situs ini satu halaman (single page) dengan dua bahasa (Inggris dan Indonesia), tema terang dan gelap, dan animasi berbasis Framer Motion serta canvas 2D.

Produksi: https://nexoralabstudio.com (domain yang dipakai di metadata, `robots.ts`, dan `sitemap.ts`).

## Daftar isi

1. [Teknologi](#teknologi)
2. [Prasyarat](#prasyarat)
3. [Menjalankan secara lokal](#menjalankan-secara-lokal)
4. [Perintah npm](#perintah-npm)
5. [Struktur direktori](#struktur-direktori)
6. [Susunan halaman](#susunan-halaman)
7. [Bahasa (i18n)](#bahasa-i18n)
8. [Tema dan design token](#tema-dan-design-token)
9. [Sistem animasi](#sistem-animasi)
10. [Formulir kontak dan API](#formulir-kontak-dan-api)
11. [Data proyek](#data-proyek)
12. [SEO](#seo)
13. [Konfigurasi](#konfigurasi)
14. [Deploy](#deploy)
15. [Catatan pengembangan](#catatan-pengembangan)
16. [Kekurangan yang diketahui](#kekurangan-yang-diketahui)

## Teknologi

| Bagian | Paket | Versi di `package.json` |
| --- | --- | --- |
| Framework | `next` (App Router, Turbopack) | 16.3.8 |
| UI | `react`, `react-dom` | 19.2.8 |
| Bahasa | TypeScript (mode `strict`) | ^5 |
| Styling | `tailwindcss`, `@tailwindcss/postcss` | ^4 |
| Animasi | `framer-motion` | ^13.4.6 |
| Ikon | `lucide-react` | ^1.49.0 |
| Tema | `next-themes` | ^0.4.6 |
| Formulir | `react-hook-form`, `@hookform/resolvers` | ^7.89.0, ^5.9.1 |
| Validasi | `zod` | ^4.6.5 |
| Utilitas kelas | `clsx`, `tailwind-merge`, `class-variance-authority` | ^2.1.1, ^3.7.0, ^0.7.1 |
| Komponen dasar | `@radix-ui/react-slot` | ^1.3.3 |
| Lint | `eslint` dengan `eslint-config-next` (core-web-vitals dan typescript) | ^9, 16.3.8 |

Font memakai Plus Jakarta Sans lewat `next/font/google`, diekspos sebagai variabel CSS `--font-jakarta`.

Next.js 16 punya perubahan API dibanding versi sebelumnya. Sebelum mengubah kode yang menyentuh API Next, baca dokumentasi yang ikut terpasang di `node_modules/next/dist/docs/` (lihat `AGENTS.md`).

## Prasyarat

- Node.js 20.9.0 atau lebih baru (nilai `engines.node` dari paket `next`).
- npm. Repo menyertakan `package-lock.json`, jadi gunakan npm agar versi dependensi sama.

## Menjalankan secara lokal

```bash
npm install
```

```bash
npm run dev
```

Dev server berjalan di port 8080 (diatur di skrip `dev`). Buka http://localhost:8080 atau http://127.0.0.1:8080. Akses lewat `127.0.0.1` hanya berfungsi karena `allowedDevOrigins` di `next.config.ts`. Kalau kamu membuka dev server dari host lain (misalnya IP LAN untuk tes di HP), tambahkan host tersebut ke daftar itu.

Tidak ada variabel lingkungan yang wajib diisi untuk menjalankan proyek.

## Perintah npm

| Perintah | Isi | Kegunaan |
| --- | --- | --- |
| `npm run dev` | `next dev --port 8080` | Dev server dengan hot reload |
| `npm run build` | `next build` | Build produksi ke `.next/` |
| `npm run start` | `next start` | Menjalankan hasil build (port bawaan 3000, ubah dengan `-p`) |
| `npm run lint` | `eslint` | Lint seluruh proyek dengan konfigurasi `eslint.config.mjs` |

Untuk mengecek hasil build di port lain:

```bash
npm run build && npx next start -p 3100
```

## Struktur direktori

```
src/
  app/
    layout.tsx            Root layout: font, metadata, viewport, provider, Navbar, Footer
    page.tsx              Merangkai semua section halaman
    globals.css           Tailwind v4, design token, keyframe, utilitas CSS
    api/contact/route.ts  Endpoint POST untuk formulir kontak
    robots.ts             robots.txt
    sitemap.ts            sitemap.xml
    favicon.ico
  components/
    layout/
      navbar.tsx            Navigasi, pemilih bahasa, toggle tema, menu mobile
      footer.tsx            Footer dengan swarm wordmark
      language-provider.tsx Context bahasa dan hook useLanguage()
      theme-provider.tsx    Pembungkus next-themes
      motion-provider.tsx   MotionConfig reducedMotion="user"
    motion/
      hover.tsx             Primitif interaksi hover (lihat Sistem animasi)
      section-swarm.tsx     Komponen React untuk mesin swarm
    sections/
      hero.tsx, device-morph.tsx, services.tsx, projects.tsx,
      process.tsx, team.tsx, stack.tsx, faq.tsx, contact.tsx
    ui/
      button.tsx, container.tsx, input.tsx, textarea.tsx,
      select-native.tsx, section-heading.tsx
  data/
    projects.ts           Daftar proyek portofolio
  lib/
    translations.ts       Semua teks EN dan ID, plus CONTACT_EMAIL
    validations.ts        Skema zod formulir kontak, PROJECT_TYPES, BUDGETS
    swarm.ts              Mesin partikel canvas 2D, tanpa dependensi
    utils.ts              cn() = clsx + tailwind-merge
  types/
    index.ts              Tipe Project dan ProjectCategory
public/
  images/founders/        Foto tim yang dipakai section Team
assets/                   File sumber gambar, tidak disajikan oleh Next
```

Alias impor `@/*` mengarah ke `./src/*` (diatur di `tsconfig.json`).

## Susunan halaman

`src/app/page.tsx` merender section dengan urutan berikut. Navbar dan Footer ada di `layout.tsx`.

| Urutan | Komponen | Anchor | Isi |
| --- | --- | --- | --- |
| 1 | `Hero` | `#home` | Judul, CTA, dan `DeviceMorph`: satu contoh produk yang berpindah bentuk antara tampilan website dan aplikasi HP lewat layout animation |
| 2 | `Services` | `#services` | Kartu layanan dengan efek spotlight mengikuti kursor |
| 3 | `Projects` | `#work` | Mulai breakpoint `md`, section di-pin dan scroll vertikal menggerakkan track kartu secara horizontal, dengan bar progres. Di bawah `md` kartu tersusun dalam grid satu kolom |
| 4 | `Process` | `#process` | Langkah kerja dengan garis progres yang mengikuti scroll dan penghitung langkah besar |
| 5 | `Team` | `#team` | Prinsip kerja dan tiga kartu anggota tim yang dibagikan seperti kartu remi |
| 6 | `Stack` | tanpa `id` | Teknologi yang dipakai (`aria-labelledby="stack-title"`) |
| 7 | `Faq` | `#faq` | Accordion pertanyaan |
| 8 | `Contact` | `#contact` | Langkah setelah menghubungi, alamat email, dan formulir |

Section Stack tidak punya `id`, jadi belum bisa ditaut langsung. `html` memakai `scroll-padding-top: 5rem` agar judul section tidak tertutup navbar saat melompat ke anchor.

## Bahasa (i18n)

- Semua teks ada di `src/lib/translations.ts` dalam dua objek, `en` dan `id`. Tipe `Translations` diturunkan dari `typeof en`, dan `translations` diketik sebagai `Record<Language, Translations>`. Akibatnya, kunci yang ada di `en` tapi hilang di `id` akan gagal saat type check.
- `LanguageProvider` menyimpan bahasa aktif di state React dan di `localStorage` dengan kunci `language`. Nilai awal saat render server adalah `en`, lalu diganti dengan nilai tersimpan setelah hydration.
- Komponen membaca teks dengan `const { t, language, setLanguage } = useLanguage()`.
- Deskripsi proyek tidak ada di file terjemahan. Setiap proyek di `src/data/projects.ts` menyimpan `description: { en, id }` sendiri.
- Label opsi formulir (`projectTypes`, `budgets`) diterjemahkan di `translations.ts`, sedangkan nilai yang dikirim ke API selalu nilai bahasa Inggris dari `PROJECT_TYPES` dan `BUDGETS` di `validations.ts`.

Untuk menambah teks baru: tambahkan kuncinya di `en`, lalu di `id`, lalu pakai lewat `t`.

## Tema dan design token

- `next-themes` mengatur kelas `dark` di elemen `html`, dengan `defaultTheme="light"`.
- Tailwind v4 dikonfigurasi langsung di `globals.css`, tanpa `tailwind.config`. Varian `dark:` didefinisikan ulang dengan `@custom-variant dark (&:where(.dark, .dark *))` agar mengikuti kelas, bukan media query.
- Warna didefinisikan sebagai variabel CSS di `:root` dan `.dark`, lalu dipetakan ke utilitas Tailwind lewat `@theme`.

| Token | Terang | Gelap | Utilitas |
| --- | --- | --- | --- |
| `--background` | `#f4f6fb` | `#050b1f` | `bg-background` |
| `--foreground` | `#0a1b4d` | `#eef2ff` | `text-foreground` |
| `--surface` | `#ffffff` | `#0b1530` | `bg-surface` |
| `--muted` | `#e6eaf4` | `#13204a` | `bg-muted` |
| `--muted-foreground` | `#4a5578` | `#9aa6c8` | `text-muted-foreground` |
| `--border` | `#d5dbea` | `#1d2b57` | `border-border` |
| `--brand` | `#1653f0` | `#4d7dff` | `bg-brand`, `text-brand` |
| `--brand-foreground` | `#ffffff` | `#04122f` | `text-brand-foreground` |
| `--accent` | `#14c8d4` | `#2fdde6` | `bg-accent`, `text-accent` |
| `--accent-foreground` | `#04122f` | `#04122f` | `text-accent-foreground` |

`--color-navy` (`#0a1b4d`) bernilai tetap di kedua tema dan dipakai untuk section berlatar gelap seperti Team. `--color-card` dan `--color-secondary` adalah alias lama untuk komponen formulir.

Utilitas CSS kustom di `globals.css`:

- `.animate-rise`: animasi masuk untuk teks hero. Sengaja ditulis di CSS, bukan Framer Motion, supaya judul (elemen LCP) langsung beranimasi dari HTML hasil server tanpa menunggu hydration. Urutan diatur dengan variabel `--i`.
- `.link-sweep`: garis bawah yang tergambar dari kiri saat hover, aktif hanya di perangkat dengan `hover: hover`.
- `.spotlight`: gradien radial di posisi `--mx`/`--my`, diisi oleh hook `useSpotlight()`.

## Sistem animasi

### Prinsip umum

- `MotionProvider` membungkus aplikasi dengan `MotionConfig reducedMotion="user"`, jadi animasi transform Framer Motion mengikuti pengaturan reduce motion di sistem operasi.
- Efek yang mengikuti kursor hanya bereaksi pada `pointerType === 'mouse'`, sehingga tidak muncul di layar sentuh.
- Animasi berbasis CSS punya cabang `@media (prefers-reduced-motion: reduce)` sendiri.

### Primitif hover (`src/components/motion/hover.tsx`)

| Ekspor | Fungsi |
| --- | --- |
| `RollText` | Teks yang bergulir ke atas dan diganti salinannya saat hover |
| `Magnetic` | Elemen yang tertarik ke arah kursor, kekuatan diatur prop `strength` (bawaan 0.25) |
| `CtaLink` | Tautan CTA: gabungan `Magnetic`, isian warna yang naik dari bawah, dan `RollText`. Varian `primary` dan ukuran `lg` sebagai bawaan |
| `useSpotlight` | Hook yang menulis posisi kursor ke `--mx`/`--my` pada elemen, dipakai bersama kelas `.spotlight` |
| `TiltCard` | Kartu dengan kemiringan 3D dan kilau mengikuti kursor, sudut maksimum lewat prop `max` (bawaan 14) |

### Kartu proyek (`src/components/sections/projects.tsx`)

Hover pada kartu proyek menggabungkan beberapa efek:

- Kartu lain di track meredup dan kehilangan saturasi. Ini dilakukan murni dengan CSS lewat selector `.card-track:has(a:hover)` pada varian arbitrary Tailwind, hanya di breakpoint `md` ke atas.
- Gambar menyusut ke dalam bingkai dengan transisi `clip-path: inset()`.
- Gambar bergeser berlawanan arah kursor (parallax, sekitar 12px) memakai `useSpring`, sambil diperbesar dan saturasinya dinaikkan.
- Chip teknologi muncul satu per satu dengan `transitionDelay` bertahap di atas gradasi navy.
- Kursor diganti lingkaran accent berisi teks melingkar (SVG `textPath`) yang berputar, dan miring mengikuti kecepatan horizontal kursor (`useVelocity` lalu `useTransform` ke rentang -25 sampai 25 derajat).
- Saat kartu difokus lewat keyboard, muncul badge pengganti karena lingkaran kursor tidak tersedia.

### Swarm partikel (`src/lib/swarm.ts`, `src/components/motion/section-swarm.tsx`)

Setiap section punya satu kumpulan partikel di canvas 2D yang menyusun diri menjadi sebuah bentuk saat section masuk ke layar, dan buyar saat keluar. Mesin ini tidak memakai library.

Cara kerja `Swarm`:

1. Bentuk diambil dari `SHAPES`. Bentuk `paths` memakai path SVG ikon lucide (grid 24x24 kecuali ada `view`), digambar ke canvas tersembunyi lewat `Path2D`. Bentuk `text` digambar dengan `fillText` memakai font halaman. Piksel hasil gambar disampel dengan jarak `max(2, min(w, h) / 140)` menjadi titik target.
2. Jumlah partikel = 60% jumlah titik target dikali `density`, dibatasi 450 sampai 1600.
3. Setiap partikel ditarik ke targetnya dengan pegas (kekakuan berbeda per partikel agar datang tidak bersamaan), berputar di sekitar target saat masih jauh, dan didorong menjauh oleh kursor dalam radius `max(70, min(w, h) * 0.18)`.
4. Fisika dihitung per langkah 60 Hz. Setiap frame menjalankan 1 sampai 4 langkah sesuai waktu nyata yang berlalu, jadi kecepatan sama di layar 60 Hz, 120 Hz, maupun tab yang di-throttle.
5. Loop `requestAnimationFrame` berhenti sendiri saat energi rata-rata partikel di bawah ambang dan kursor tidak aktif, serta tidak berjalan saat section tidak terlihat.
6. Ukuran partikel `max(2, min(w, h) / 220)` piksel, dengan `devicePixelRatio` dibatasi 2.

Tanggung jawab `SectionSwarm`:

- Membaca warna `--brand` dan `--accent` dari CSS, lalu membacanya ulang lewat `MutationObserver` saat kelas tema di `html` berubah.
- Menyesuaikan ukuran canvas lewat `ResizeObserver`.
- Menyampel ulang bentuk teks setelah `document.fonts.ready`, karena wordmark digambar dari web font.
- `IntersectionObserver` dengan threshold 0.3: `rebuild()` saat masuk, `scatter()` saat keluar, sehingga kunjungan berikutnya menyusun ulang.
- Mendengarkan `pointermove` di seluruh `section` atau `footer` terdekat, dengan jangkauan 160px di luar kotak swarm.
- Saat reduce motion aktif, partikel langsung digambar di posisi akhir tanpa animasi.
- Elemen pembungkus memakai `aria-hidden` dan `pointer-events-none`.

Prop: `shape` (nama di `SHAPES`), `className` (posisi dan ukuran kotak, termasuk breakpoint seperti `hidden lg:block`), `accentShare` (porsi partikel berwarna accent, bawaan 0.18), `density` (pengali jumlah partikel, bawaan 1).

Bentuk yang tersedia dan tempat pemakaiannya:

| Nama | Isi | Section |
| --- | --- | --- |
| `idea` | Ikon lampu | Hero |
| `devices` | Laptop dan HP (view 34x24) | Services |
| `code` | Ikon kode | Projects |
| `rocket` | Ikon roket | Process |
| `team` | Ikon orang | Team (`accentShare={0.75}`) |
| `layers` | Ikon lapisan | Stack |
| `question` | Ikon tanda tanya | FAQ |
| `mail` | Ikon amplop | Contact |
| `brand` | Teks `NEXORA` | Footer |

Section yang memuat swarm harus punya `relative isolate` agar swarm dengan `-z-10` tetap di belakang konten tapi di atas latar section.

Menambah bentuk baru: tambahkan entri di `SHAPES` (path SVG atau teks), lalu pasang `<SectionSwarm shape="namaBaru" className="absolute ..." />` di section. Periksa dengan `getBoundingClientRect` bahwa kotaknya tidak menimpa teks di breakpoint tempat ia tampil.

## Formulir kontak dan API

Alur data:

1. `contact.tsx` memakai `react-hook-form` dengan `zodResolver(contactFormSchema)`. Pesan error yang tampil diambil dari `t.contact.errors`, bukan dari pesan bawaan skema, sehingga ikut bahasa aktif.
2. Saat submit, klien mengirim `POST /api/contact` dengan body JSON.
3. `src/app/api/contact/route.ts` mem-parse body dengan skema yang sama, lalu membalas.

Skema (`src/lib/validations.ts`):

| Field | Aturan |
| --- | --- |
| `name` | string, di-trim, minimal 2 karakter |
| `email` | string, di-trim, format email |
| `company` | string, opsional |
| `projectType` | salah satu nilai `PROJECT_TYPES` |
| `budget` | salah satu nilai `BUDGETS` |
| `description` | string, di-trim, minimal 10 karakter |

Respons:

| Status | Body |
| --- | --- |
| 200 | `{ "message": "Inquiry received successfully", "data": { ...field yang lolos validasi } }` |
| 500 | `{ "error": "Failed to process inquiry" }`, termasuk saat validasi gagal |

Saat ini endpoint belum mengirim email atau menyimpan data. Ia hanya memvalidasi, menunggu 1 detik, lalu membalas 200. Untuk produksi, sambungkan ke layanan email atau database di dalam `POST`, simpan kunci API di variabel lingkungan, dan pertimbangkan membalas 400 untuk `ZodError` agar error validasi terpisah dari error server.

Alamat email yang tampil di section Contact berasal dari konstanta `CONTACT_EMAIL` di `src/lib/translations.ts`.

## Data proyek

Proyek portofolio didefinisikan di `src/data/projects.ts` dengan tipe `Project` dari `src/types/index.ts`:

```ts
interface Project {
  id: string;
  name: string;
  category: 'mobile' | 'web' | 'ios';
  description: Record<'en' | 'id', string>;
  technologies: string[];
  image: string;
  link: string;
}
```

Saat ini ada 6 proyek, masing-masing menaut ke repositori GitHub. Gambar memakai helper `unsplash(id)` yang menyusun URL `images.unsplash.com` dengan lebar 1200. Untuk gambar dari host lain, tambahkan host tersebut ke `images.remotePatterns` di `next.config.ts`, atau simpan gambar di `public/`.

Label badge kategori di kartu diambil dari `t.work.categories`, jadi kategori baru perlu ditambahkan di tipe `ProjectCategory` dan di kedua bahasa pada `translations.ts`.

## SEO

- Metadata di `layout.tsx`: `title`, `description`, `metadataBase` (`https://nexoralabstudio.com`), canonical `/`, Open Graph, Twitter card `summary_large_image`, dan aturan `robots`.
- `viewport.themeColor` mengikuti skema warna sistem: `#f4f6fb` untuk terang, `#050b1f` untuk gelap.
- `robots.ts` mengizinkan semua crawler kecuali `/api/`, dan menunjuk ke `sitemap.xml`.
- `sitemap.ts` berisi satu URL (halaman utama) dengan `changeFrequency: 'weekly'`.

## Konfigurasi

`next.config.ts`:

| Opsi | Nilai | Alasan |
| --- | --- | --- |
| `allowedDevOrigins` | `['127.0.0.1']` | Dev server Next 16 hanya mempercayai `localhost`. Tanpa opsi ini, membuka `127.0.0.1:8080` memblokir bundle JS sehingga halaman tidak pernah hydrate |
| `images.remotePatterns` | `https://images.unsplash.com` | Gambar proyek dari Unsplash lewat `next/image` |

File lain: `postcss.config.mjs` (plugin `@tailwindcss/postcss`), `eslint.config.mjs` (flat config dari `eslint-config-next`), `tsconfig.json` (strict, `moduleResolution: bundler`, alias `@/*`), dan `.claude/launch.json` (konfigurasi preview dev server di port 8080).

## Deploy

Proyek ini tidak butuh konfigurasi khusus untuk Vercel. Hubungkan repositori, biarkan preset Next.js, dan Vercel menjalankan `npm run build`.

Untuk server sendiri:

```bash
npm ci && npm run build && npm run start -- -p 3000
```

Pastikan Node.js di server minimal 20.9.0.

## Catatan pengembangan

- Tailwind v4 memindai teks mentah dari file sumber untuk mencari nama kelas, dan dev server menyimpan kandidat itu sampai di-restart. Kalau sebuah nama kelas menghasilkan CSS tidak valid (misalnya varian arbitrary dengan karakter yang di-escape, seperti `.group\/nama`), dev server membalas 500 dengan pesan "Parsing CSS source code failed". Hapus kelas tersebut dari kode, lalu restart `npm run dev`. Build produksi tidak terpengaruh karena selalu memindai ulang dari awal.
- Gunakan varian arbitrary yang tidak butuh escape. Contoh yang dipakai di kartu proyek: `md:[.card-track:has(a:hover)_&:not(:hover)]:opacity-45`.
- Hindari `setState` langsung di dalam `useEffect` untuk mendeteksi mount. Navbar memakai `useSyncExternalStore` untuk itu agar lolos aturan lint React terbaru.
- Tab browser yang tersembunyi men-throttle `requestAnimationFrame` hingga beberapa frame per detik. Swarm tetap benar karena fisikanya berbasis waktu, tapi akan terlihat lambat. Uji animasi di tab yang aktif.
- Animasi masuk hero sengaja tidak memakai `key={language}`, supaya mengganti bahasa tidak memutar ulang animasi.

## Kekurangan yang diketahui

- `/api/contact` belum mengirim pesan ke mana pun (lihat [Formulir kontak dan API](#formulir-kontak-dan-api)).
- Metadata Open Graph dan Twitter menunjuk ke `/og-image.png`, tetapi file itu belum ada di `public/`. Pratinjau tautan di media sosial akan tampil tanpa gambar sampai file berukuran 1200x630 ditambahkan.
- `public/images/founders/keysha.PNG` tidak lagi dipakai sejak section Team dikurangi menjadi tiga anggota.
- `public/` masih berisi SVG bawaan `create-next-app` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) yang tidak dipakai.
- `language-provider.tsx` memanggil `setLanguage` di dalam `useEffect` untuk membaca `localStorage`. `npm run lint` melaporkannya sebagai error. Pola `useSyncExternalStore` seperti di navbar bisa menggantikannya.
- Bahasa awal dari server selalu `en`, jadi pengunjung yang menyimpan `id` melihat teks Inggris sesaat sebelum hydration.
