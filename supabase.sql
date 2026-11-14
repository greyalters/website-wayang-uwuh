-- Jalankan sekali di Supabase > SQL Editor
create table if not exists produk (
  id bigint generated always as identity primary key,
  slug text unique not null,
  nama text not null,
  kategori text not null check (kategori in ('wayang','lukis-kaca','lukis-besek','lukis-kanvas')),
  cerita text,
  harga text,
  foto text not null,
  created_at timestamptz default now()
);
-- Hanya server (service role key) yang boleh membaca/menulis
alter table produk enable row level security;
