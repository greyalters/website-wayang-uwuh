# Website Wayang Uwuh

Dibuat sesuai *Guideline Design & Teknis Pembuatan Web Wayang Uwuh*.

- **Framework:** Next.js (App Router)
- **Font:** Cinzel Decorative, Noto Sans Javanese, IM Fell Great Primer SC lewat `next/font/google`
- **Warna:** #FFFFFF, #F39B6D, #E9E3B3, #AABE8D, #456078, #000000
- **Halaman:** Beranda (`/`), Katalog (`/katalog?jenis=...`), Detail Katalog (`/katalog/[slug]`), Tentang Kami (`/tentang-kami`: Profil Seniman, Sejarah, Arsip Kegiatan dalam satu halaman)
- **Hosting:** Vercel. **Database:** Supabase. **Foto:** Vercel Blob.

## Menjalankan di komputer

```bash
npm install
npm run dev     # buka http://localhost:3000
```
Tanpa `.env`, website memakai data contoh (`lib/produk-contoh.json`).

## Yang perlu diganti dengan konten asli

| Apa | Di mana |
|---|---|
| Foto background Beranda (wayang + Pak Iskandar) | `public/beranda/`, lalu daftar di `app/page.js` |
| Kalimat di bawah judul Beranda | `app/page.js` |
| Foto, biodata, sejarah, foto arsip | `public/iskandar.*`, `public/arsip/`, `app/tentang-kami/page.js` |
| Nomor WhatsApp | env `NEXT_PUBLIC_WA_NUMBER` |

## Deploy ke Vercel + integrasi Google Form

1. Push folder ini ke GitHub, lalu Import di vercel.com.
2. **Supabase:** buat project, jalankan `supabase.sql` di SQL Editor. Salin URL dan *service_role key*.
3. **Vercel Blob:** di project Vercel > Storage > Create Blob store (token `BLOB_READ_WRITE_TOKEN` otomatis masuk).
4. Isi Environment Variables di Vercel sesuai `.env.example`, lalu Redeploy.
5. **Google Form:** buat pertanyaan dengan judul persis:
   - `Nama Wayang` (jawaban singkat)
   - `Jenis/Kategori Wayang` (pilihan ganda: Wayang, Lukis Kaca, Lukis Besek, Lukis Kanvas)
   - `Cerita/Detail Wayang` (paragraf)
   - `Harga Jual` (jawaban singkat, boleh kosong)
   - `Foto Wayang` (upload file, 1 gambar)
6. Di Form: titik tiga > **Apps Script**, tempel `google-apps-script/Code.gs`, isi `WEBSITE_URL` dan `SECRET_TOKEN`.
7. Pasang trigger: ikon jam > Add Trigger > `onFormSubmit` > From form > On form submit. Izinkan akses.

Alur: Form disubmit → Apps Script kirim data + foto ke `/api/produk` (dengan token) → foto ke Vercel Blob, teks ke Supabase → `revalidatePath` memperbarui Katalog & Detail → setelah website menjawab sukses, respons Form dan file foto di Drive dihapus.
