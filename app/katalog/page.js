import Image from "next/image";
import Link from "next/link";
import { semuaProduk } from "@/lib/produk";
import { KATEGORI } from "@/lib/site";

export const metadata = { title: "Katalog | Wayang Uwuh" };
export const revalidate = 3600; // ISR; juga di-revalidate langsung oleh API saat produk baru masuk

export default async function Katalog({ searchParams }) {
  const { jenis } = await searchParams;
  const pilih = KATEGORI.some((k) => k.key === jenis) ? jenis : KATEGORI[0].key;
  const produk = (await semuaProduk()).filter((p) => p.kategori === pilih);

  return (
    <div className="katalog">
      <nav className="submenu">
        {KATEGORI.map((k) => (
          <Link key={k.key} href={`/katalog?jenis=${k.key}`} className={k.key === pilih ? "aktif" : ""} scroll={false}>
            {k.label}
          </Link>
        ))}
      </nav>
      {produk.length === 0 ? (
        <p className="kosong">Belum ada produk di kategori ini.</p>
      ) : (
        <div className="katalog-grid">
          {produk.map((p) => (
            <Link key={p.slug} href={`/katalog/${p.slug}`} className="kartu">
              <div className="kartu-foto">
                <Image src={p.foto} alt={p.nama} fill sizes="(max-width: 860px) 50vw, 180px" />
              </div>
              <p className="kartu-nama">{p.nama}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
