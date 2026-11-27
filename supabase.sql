-- Jalankan sekali di Supabase > SQL Editor (project baru)
create table if not exists produk (
  id bigint generated always as identity primary key,
  slug text unique not null,
  nama text not null,
  golongan text,            -- Jenis/Golongan Penokohan Wayang (isian bebas dari Google Form)
  cerita text,
  harga text,
  foto text not null,
  created_at timestamptz default now()
);
-- Hanya server (service role key) yang boleh membaca/menulis
alter table produk enable row level security;

-- ------------------------------------------------------------------
-- MIGRASI: jalankan ini HANYA bila tabel "produk" sudah ada dengan kolom lama "kategori"
-- ------------------------------------------------------------------
-- alter table produk drop constraint if exists produk_kategori_check;
-- alter table produk rename column kategori to golongan;
-- alter table produk alter column golongan drop not null;
-- update produk set golongan = null where golongan in ('wayang','lukis-kaca','lukis-besek','lukis-kanvas');
