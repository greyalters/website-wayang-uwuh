import { createClient } from "@supabase/supabase-js";
import contoh from "./produk-contoh.json";

// Produk disimpan di tabel Supabase "produk". Bila env Supabase belum diisi,
// website memakai data contoh (lib/produk-contoh.json) supaya tetap bisa dijalankan.
function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function semuaProduk() {
  const c = db();
  if (!c) return contoh;
  const { data, error } = await c.from("produk").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function produkBySlug(slug) {
  const c = db();
  if (!c) return contoh.find((p) => p.slug === slug) ?? null;
  const { data } = await c.from("produk").select("*").eq("slug", slug).maybeSingle();
  return data;
}

export async function simpanProduk(p) {
  const c = db();
  if (!c) throw new Error("Supabase belum dikonfigurasi");
  let slug = p.slug, i = 2;
  for (;;) {
    const { data } = await c.from("produk").select("id").eq("slug", slug).maybeSingle();
    if (!data) break;
    slug = `${p.slug}-${i++}`;
  }
  const { data, error } = await c.from("produk").insert({ ...p, slug }).select().single();
  if (error) throw error;
  return data;
}
