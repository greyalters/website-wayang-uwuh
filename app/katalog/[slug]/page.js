import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { produkBySlug, semuaProduk } from "@/lib/produk";
import { kategoriLabel, formatHarga } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await semuaProduk()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await produkBySlug((await params).slug);
  return { title: p ? `${p.nama} | Wayang Uwuh` : "Wayang Uwuh" };
}

export default async function DetailKatalog({ params }) {
  const p = await produkBySlug((await params).slug);
  if (!p) notFound();
  const harga = formatHarga(p.harga);
  return (
    <div className="detail">
      <div className="detail-foto">
        <Image src={p.foto} alt={p.nama} fill sizes="(max-width: 860px) 100vw, 360px" priority />
      </div>
      <div className="detail-info">
        <h1 className="detail-nama">{p.nama}</h1>
        <p className="detail-jenis">{kategoriLabel(p.kategori)}</p>
        {p.cerita && <p className="detail-cerita">{p.cerita}</p>}
        {harga && <p className="detail-harga">{harga}</p>}
        <Link href={`/katalog?jenis=${p.kategori}`} className="kembali">Kembali ke Katalog</Link>
      </div>
    </div>
  );
}
