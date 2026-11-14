import Slideshow from "@/components/Slideshow";

// Ganti/tambah foto di public/beranda/ (kolase foto wayang + foto Pak Iskandar).
const FOTO_BERANDA = ["/beranda/1.svg", "/beranda/2.svg", "/beranda/3.svg", "/beranda/4.svg"];

export default function Beranda() {
  return (
    <section className="beranda">
      <Slideshow foto={FOTO_BERANDA} />
      <div className="beranda-overlay" />
      <div className="beranda-teks">
        <h1 className="beranda-judul">Wayang Uwuh</h1>
        <p className="beranda-sub">Karya seni dari barang bekas oleh Pak Iskandar, Demangan, Yogyakarta.</p>
      </div>
    </section>
  );
}
