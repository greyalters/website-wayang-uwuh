import Image from "next/image";

export const metadata = { title: "Tentang Kami | Wayang Uwuh" };

// Isi biodata, sejarah, dan foto arsip di sini.
const BIODATA = [
  "Nama: Pak Iskandar",
  "Asal: Demangan, Yogyakarta",
  "Berkarya sejak: (isi tahun)",
  "Keahlian: Wayang Uwuh & lukis",
];
const SEJARAH = [
  "(Isi sejarah Wayang Uwuh: awal mula Pak Iskandar membuat wayang dari barang bekas.)",
  "(Paragraf kedua sejarah.)",
];
const ARSIP = ["/arsip/1.svg", "/arsip/2.svg", "/arsip/3.svg", "/arsip/4.svg"];

export default function TentangKami() {
  return (
    <div className="konten">
      <section className="seksi" id="profil">
        <h2 className="judul-seksi">Profil Seniman</h2>
        <div className="profil">
          <div className="profil-foto">
            <Image src="/iskandar.svg" alt="Foto Pak Iskandar" fill sizes="200px" />
          </div>
          <div>{BIODATA.map((b) => <p key={b} className="teks-25">{b}</p>)}</div>
        </div>
      </section>

      <section className="seksi" id="sejarah">
        <h2 className="judul-seksi">Sejarah Wayang Uwuh</h2>
        <div className="sejarah">{SEJARAH.map((s, i) => <p key={i} className="teks-25">{s}</p>)}</div>
      </section>

      <section className="seksi" id="arsip">
        <h2 className="judul-seksi">Arsip Kegiatan</h2>
        <div className="arsip-grid">
          {ARSIP.map((src, i) => (
            <div key={i} className="arsip-item">
              <Image src={src} alt={`Dokumentasi kegiatan ${i + 1}`} fill sizes="(max-width: 860px) 50vw, 200px" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
