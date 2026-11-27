import Image from "next/image";
import Link from "next/link";
import { semuaProduk } from "@/lib/produk";
import { formatHarga } from "@/lib/site";

export const metadata = { title: "Katalog | Wayang Uwuh" };
export const revalidate = 3600; // ISR; juga di-revalidate langsung oleh API saat produk baru masuk

export default async function Katalog() {
  const produk = await semuaProduk();

  return (
    <div className="katalog">
      {produk.length === 0 ? (
        <p className="kosong">Belum ada wayang di katalog.</p>
      ) : (
        <div className="katalog-grid">
          {produk.map((p) => {
            const harga = formatHarga(p.harga);
            return (
              <Link key={p.slug} href={`/katalog/${p.slug}`} className="kartu">
                <div className="kartu-foto">
                  <Image src={p.foto} alt={p.nama} fill sizes="(max-width: 860px) 50vw, 180px" />
                </div>
                <p className="kartu-nama">{p.nama}</p>
                {p.golongan && <p className="kartu-golongan">{p.golongan}</p>}
                {harga && <p className="kartu-harga">{harga}</p>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
