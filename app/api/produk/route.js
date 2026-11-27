import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { simpanProduk } from "@/lib/produk";
import { slugify } from "@/lib/site";

// Dipanggil oleh Google Apps Script (onFormSubmit) setiap kali Pak Iskandar mengisi Google Form.
// Body JSON: { nama, golongan, cerita, harga, foto: { base64, mimeType, name } }
// Header: Authorization: Bearer <FORM_SECRET_TOKEN>
export async function POST(req) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!process.env.FORM_SECRET_TOKEN || token !== process.env.FORM_SECRET_TOKEN) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "json tidak valid" }, { status: 400 }); }

  const nama = String(body.nama || "").trim();
  if (!nama || !body.foto?.base64) {
    return NextResponse.json({ ok: false, error: "nama dan foto wajib diisi" }, { status: 400 });
  }

  try {
    const slug = slugify(nama);
    const ext = (body.foto.name?.split(".").pop() || "jpg").toLowerCase();
    const blob = await put(`produk/${slug}-${Date.now()}.${ext}`, Buffer.from(body.foto.base64, "base64"), {
      access: "public",
      contentType: body.foto.mimeType || "image/jpeg",
    });

    const produk = await simpanProduk({
      slug, nama,
      golongan: String(body.golongan || "").trim(),
      cerita: String(body.cerita || "").trim(),
      harga: String(body.harga || "").trim(),
      foto: blob.url,
    });

    revalidatePath("/katalog");
    revalidatePath(`/katalog/${produk.slug}`);
    return NextResponse.json({ ok: true, slug: produk.slug });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: String(e.message || e) }, { status: 500 });
  }
}
